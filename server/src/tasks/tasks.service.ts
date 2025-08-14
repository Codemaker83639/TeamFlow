import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus, TaskPriority } from './entities/task.entity';

// DTO (Data Transfer Object) para la creación de tareas.
// Define la forma de los datos que esperamos recibir del cliente.
export class CreateTaskDto {
    title: string;
    description?: string;
    priority?: TaskPriority;
    due_date?: Date;
    estimated_hours?: number;
}

// DTO para la actualización. Todos los campos son opcionales.
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
    // Inyectamos el Repositorio de Task.
    // NestJS, gracias al TypeOrmModule que configuramos antes,
    // nos da esta herramienta para hablar con la base de datos.
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) { }

    // --- MÉTODOS CRUD ---

    // CREAR una nueva tarea
    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        const newTask = this.taskRepository.create({
            ...createTaskDto,
            // Por ahora, no asignamos proyecto ni usuario.
        });
        return this.taskRepository.save(newTask);
    }

    // OBTENER todas las tareas
    async findAll(): Promise<Task[]> {
        return this.taskRepository.find();
    }

    // OBTENER una única tarea por su ID
    async findOne(id: string): Promise<Task> {
        const task = await this.taskRepository.findOneBy({ id });
        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return task;
    }

    // ACTUALIZAR una tarea por su ID
    async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        // 'preload' busca la tarea y la carga con los nuevos datos del DTO.
        const task = await this.taskRepository.preload({
            id: id,
            ...updateTaskDto,
        });
        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found to update`);
        }
        return this.taskRepository.save(task);
    }

    // ELIMINAR una tarea por su ID
    async remove(id: string): Promise<void> {
        const result = await this.taskRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found to delete`);
        }
    }
}