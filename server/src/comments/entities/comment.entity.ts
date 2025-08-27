import { User } from '../../auth/entities/user.entity';
import { Task } from 'src/tasks/entities/task.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    content: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // --- Relaciones ---
    @ManyToOne(() => Task, (task) => task.comments, { onDelete: 'CASCADE' })
    task: Task;

    @ManyToOne(() => User, (user) => user.comments, {
        eager: true, // Cargar automáticamente el usuario al pedir un comentario
        onDelete: 'SET NULL',
    })
    user: User;
}