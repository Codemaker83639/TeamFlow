import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { User } from '../auth/entities/user.entity';
import { Project } from '../projects/entities/project.entity';
import { TaskStatus, TaskPriority } from './entities/task.enums';

export class CreateTaskDto {
    title: string;
    project_id: string;
    description?: string;
    priority?: TaskPriority;
    due_date?: Date;
    estimated_hours?: number;
    assigned_to_id?: string;
}

// DTO de actualización debe incluir el assigned_to_id
export class UpdateTaskDto {
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    due_date?: Date;
    estimated_hours?: number;
    assigned_to_id?: string;
}

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) { }

    async create(createTaskDto: CreateTaskDto, creator: User): Promise<Task> {
        const { assigned_to_id, project_id, ...taskData } = createTaskDto;
        const project = await this.projectRepository.findOneBy({ id: project_id });
        if (!project) {
            throw new BadRequestException(`Project with ID "${project_id}" not found.`);
        }
        let assignedUser: User | null = null;
        if (assigned_to_id) {
            assignedUser = await this.userRepository.findOneBy({ id: assigned_to_id });
            if (!assignedUser) {
                throw new BadRequestException(`User with ID "${assigned_to_id}" not found.`);
            }
        }
        const newTask = this.taskRepository.create({
            ...taskData,
            project,
            created_by: creator,
            assigned_to: assignedUser,
            status: TaskStatus.BACKLOG,
        });
        return this.taskRepository.save(newTask);
    }

    async findAllByProject(projectId: string): Promise<Task[]> {
        return this.taskRepository.find({
            where: { project: { id: projectId } },
            relations: { assigned_to: true },
        });
    }

    // --- MÉTODO UPDATE 100% CORREGIDO ---
    async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        // Usamos findOne para cargar la relación 'assigned_to' existente
        const task = await this.taskRepository.findOne({ where: { id }, relations: ['assigned_to'] });
        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        // Extraemos el assigned_to_id del resto de los datos a actualizar
        const { assigned_to_id, ...taskData } = updateTaskDto;

        // Si se proporcionó un assigned_to_id en la petición...
        if (assigned_to_id !== undefined) {
            if (assigned_to_id === null || assigned_to_id === '') {
                task.assigned_to = null; // Si es nulo o vacío, desasignamos el usuario
            } else {
                const assignedUser = await this.userRepository.findOneBy({ id: assigned_to_id });
                if (!assignedUser) {
                    throw new NotFoundException(`User with ID "${assigned_to_id}" not found to assign.`);
                }
                task.assigned_to = assignedUser; // Asignamos la nueva entidad de usuario
            }
        }

        // Aplicamos el resto de los cambios (título, descripción, etc.)
        Object.assign(task, taskData);

        // Guardamos la entidad 'task' completa con la nueva relación de usuario
        return this.taskRepository.save(task);
    }

    async remove(id: string): Promise<void> {
        const result = await this.taskRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found to delete`);
        }
    }

    async findOne(id: string): Promise<Task> {
        const task = await this.taskRepository.findOne({
            where: { id },
            relations: { assigned_to: true, project: true },
        });
        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return task;
    }

    async findAll(): Promise<Task[]> {
        return this.taskRepository.find({
            relations: { assigned_to: true, project: true },
        });
    }
}