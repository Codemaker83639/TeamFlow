import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { TaskStatus, TaskPriority } from './task.enums';
import { Project } from '../../projects/entities/project.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { TaskAttachment } from '../../attachments/entities/task-attachment.entity';

@Entity({ name: 'tasks' })
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // ... columnas de tarea sin cambios ...
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

    // ... relaciones existentes sin cambios ...
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

    // --- Relaciones ---
    @OneToMany(() => Comment, (comment) => comment.task)
    comments: Comment[];

    // --- NUEVA RELACIÓN PARA ADJUNTOS ---
    @OneToMany(() => TaskAttachment, (attachment) => attachment.task)
    attachments: TaskAttachment[];
    // ------------------------------------
}