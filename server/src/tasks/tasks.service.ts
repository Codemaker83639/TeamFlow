import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { User } from '../auth/entities/user.entity'; // Asegúrate que la ruta a User es correcta
import { TaskStatus, TaskPriority } from './entities/task.enums';

// DTO para la creación: ahora acepta un ID de usuario opcional
export class CreateTaskDto {
    title: string;
    description?: string;
    priority?: TaskPriority;
    due_date?: Date;
    estimated_hours?: number;
    assigned_to_id?: string; // <-- CAMPO NUEVO
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
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        // Inyectamos el Repositorio de User para poder buscar usuarios
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    // --- MÉTODOS CRUD ACTUALIZADOS ---

    // CREAR una nueva tarea, ahora recibe también al usuario que la crea
    async create(createTaskDto: CreateTaskDto, creator: User): Promise<Task> {
        const { assigned_to_id, ...taskData } = createTaskDto;

        let assignedUser: User | null = null;

        // Si en la petición viene un ID de usuario para asignar la tarea...
        if (assigned_to_id) {
            assignedUser = await this.userRepository.findOneBy({ id: assigned_to_id });
            if (!assignedUser) {
                // Si no se encuentra el usuario, lanzamos un error
                throw new BadRequestException(`User with ID "${assigned_to_id}" not found.`);
            }
        }

        // Creamos la nueva tarea en memoria
        const newTask = this.taskRepository.create({
            ...taskData,
            created_by: creator,      // Asignamos el usuario que crea la tarea
            assigned_to: assignedUser, // Asignamos el usuario responsable (puede ser null)
        });

        // Guardamos la tarea en la base de datos
        return this.taskRepository.save(newTask);
    }

    // OBTENER todas las tareas, ahora con la información de los usuarios
    async findAll(): Promise<Task[]> {
        return this.taskRepository.find({
            relations: {
                assigned_to: true,
            },
        });
    }

    // OBTENER una única tarea por su ID, con la información de los usuarios
    async findOne(id: string): Promise<Task> {
        const task = await this.taskRepository.findOne({
            where: { id },
            relations: {
                assigned_to: true,
            },
        });
        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return task;
    }

    // ACTUALIZAR una tarea por su ID
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

    // ELIMINAR una tarea por su ID
    async remove(id: string): Promise<void> {
        const result = await this.taskRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found to delete`);
        }
    }
}