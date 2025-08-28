import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { User } from '../auth/entities/user.entity';
import { Project } from '../projects/entities/project.entity';
import { TaskStatus, TaskPriority } from './entities/task.enums';
import { NotificationsGateway } from '../notifications/notifications.gateway'; // <-- 1. IMPORTAR

// DTOs (se mantienen igual)
export class CreateTaskDto {
    title: string;
    project_id: string;
    description?: string;
    priority?: TaskPriority;
    due_date?: Date;
    estimated_hours?: number;
    assigned_to_id?: string;
}

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
        private readonly notificationsGateway: NotificationsGateway, // <-- 2. INYECTAR
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

        const savedTask = await this.taskRepository.save(newTask);

        // --- 3. LÓGICA DE NOTIFICACIÓN AL CREAR ---
        if (savedTask.assigned_to && savedTask.assigned_to.id !== creator.id) {
            const payload = {
                message: `${creator.full_name} te ha asignado una nueva tarea: "${savedTask.title}"`,
                taskId: savedTask.id,
            };
            this.notificationsGateway.sendNotificationToUser(savedTask.assigned_to, payload);
        }
        // --- FIN DE LA LÓGICA ---

        return savedTask;
    }

    async findAllByProject(projectId: string): Promise<Task[]> {
        return this.taskRepository.find({
            where: { project: { id: projectId } },
            relations: { assigned_to: true },
        });
    }

    async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { id }, relations: ['assigned_to'] });
        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        // Guardamos el ID del usuario asignado ANTES de cualquier cambio
        const oldAssignedToId = task.assigned_to?.id;

        const { assigned_to_id, ...taskData } = updateTaskDto;

        if (assigned_to_id !== undefined) {
            if (assigned_to_id === null || assigned_to_id === '') {
                task.assigned_to = null;
            } else {
                const assignedUser = await this.userRepository.findOneBy({ id: assigned_to_id });
                if (!assignedUser) {
                    throw new NotFoundException(`User with ID "${assigned_to_id}" not found to assign.`);
                }
                task.assigned_to = assignedUser;
            }
        }

        Object.assign(task, taskData);

        const updatedTask = await this.taskRepository.save(task);

        // --- 4. LÓGICA DE NOTIFICACIÓN AL ACTUALIZAR ---
        const newAssignedToId = updatedTask.assigned_to?.id;
        // Si hay un nuevo asignado Y es diferente al anterior...
        if (newAssignedToId && newAssignedToId !== oldAssignedToId) {
            const payload = {
                message: `Se te ha asignado la tarea: "${updatedTask.title}"`,
                taskId: updatedTask.id,
            };
            this.notificationsGateway.sendNotificationToUser(updatedTask.assigned_to, payload);
        }
        // --- FIN DE LA LÓGICA ---

        return updatedTask;
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