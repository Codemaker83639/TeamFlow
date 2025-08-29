import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity('time_entries')
export class TimeEntry {
    @PrimaryGeneratedColumn()
    id: number;

    // Relación con la tarea a la que pertenece esta entrada de tiempo
    @ManyToOne(() => Task, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'task_id' })
    task: Task;

    // Relación con el usuario que registró el tiempo
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'timestamp with time zone' })
    start_time: Date;

    @Column({ type: 'timestamp with time zone', nullable: true })
    end_time: Date;

    @Column({ type: 'int', nullable: true })
    duration_minutes: number;

    @CreateDateColumn()
    created_at: Date;
}