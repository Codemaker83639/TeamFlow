import { User } from '../../auth/entities/user.entity';
// --- CAMBIO EN LA SIGUIENTE LÍNEA ---
import { Task } from '../../tasks/entities/task.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
} from 'typeorm';

@Entity('task_attachments')
export class TaskAttachment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    file_name: string;

    @Column()
    file_path: string;

    @Column()
    mime_type: string;

    @Column({ type: 'int', nullable: true })
    file_size_kb: number;

    @CreateDateColumn()
    created_at: Date;

    // --- Relaciones ---
    @ManyToOne(() => Task, (task) => task.attachments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'task_id' })
    task: Task;

    @ManyToOne(() => User, (user) => user.attachments, {
        eager: true,
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'uploaded_by_user_id' })
    uploaded_by: User;
}