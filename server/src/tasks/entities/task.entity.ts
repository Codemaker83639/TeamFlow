import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
// Asumiendo que tu entidad User está en esta ruta. ¡Verifícala!
import { User } from '../../auth/entities/user.entity';
import { TaskStatus, TaskPriority } from './task.enums'; // Crearemos este archivo ahora

@Entity({ name: 'tasks' })
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.TODO,
    })
    status: TaskStatus;

    @Column({
        type: 'enum',
        enum: TaskPriority,
        default: TaskPriority.MEDIUM,
    })
    priority: TaskPriority;

    @Column({ type: 'date', nullable: true })
    due_date: Date;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    estimated_hours: number;

    // --- RELACIONES ACTIVADAS ---

    // Relación con el usuario que CREÓ la tarea
    @ManyToOne(() => User, { eager: false }) // eager: false para no cargar siempre el usuario
    @JoinColumn({ name: 'created_by_id' }) // Especifica el nombre de la columna FK
    created_by: User;

    // Relación con el usuario ASIGNADO a la tarea (puede ser nulo)
    @ManyToOne(() => User, { nullable: true, eager: true }) // eager: true para que siempre traiga el usuario asignado
    @JoinColumn({ name: 'assigned_to_id' }) // Especifica el nombre de la columna FK
    assigned_to: User | null;


    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}