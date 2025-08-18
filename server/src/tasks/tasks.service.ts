import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { User } from '../auth/entities/user.entity';
import { Project } from '../projects/entities/project.entity';
import { TaskStatus, TaskPriority } from './entities/task.enums';

export class CreateTaskDto {
    title: string;
    description?: string;
    priority?: TaskPriority;
    due_date?: Date;
    estimated_hours?: number;
    assigned_to_id?: string;
    project_id: string;
}

export class UpdateTaskDto {
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    due_date?: Date;
    estimated_hours?: number;
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
        });

        return this.taskRepository.save(newTask);
    }

    async findAll(): Promise<Task[]> {
        return this.taskRepository.find({
            relations: { assigned_to: true, project: true },
        });
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

    // --- MÉTODOS RESTAURADOS ---

    async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        const task = await this.taskRepository.preload({
            id: id,
            ...updateTaskDto,
        });
        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found to update`);
        }
        return this.taskRepository.save(task);
    }

    async remove(id: string): Promise<void> {
        const result = await this.taskRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found to delete`);
        }
    }
}