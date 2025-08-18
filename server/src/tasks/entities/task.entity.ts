import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { TaskStatus, TaskPriority } from './task.enums';
import { Project } from '../../projects/entities/project.entity';

@Entity({ name: 'tasks' })
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // ... (columnas de task y relaciones con User sin cambios)
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

    // --- CAMBIO AQUÍ: Se añade el tipo explícito 'Project' ---
    @ManyToOne(() => Project, (project: Project) => project.tasks)
    @JoinColumn({ name: 'project_id' })
    project: Project;

    @ManyToOne(() => User, { eager: false })
    @JoinColumn({ name: 'created_by_id' })
    created_by: User;

    @ManyToOne(() => User, { nullable: true, eager: true })
    @JoinColumn({ name: 'assigned_to_id' })
    assigned_to: User | null;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}