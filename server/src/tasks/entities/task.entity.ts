import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
// Importaremos las otras entidades cuando las tengamos, por ahora las comentamos
// import { Project } from '../../projects/entities/project.entity';
// import { User } from '../../users/entities/user.entity';

// Usamos los enums definidos en la tesis
export enum TaskStatus {
    BACKLOG = 'backlog',
    TODO = 'todo',
    IN_PROGRESS = 'in_progress',
    REVIEW = 'review',
    DONE = 'done',
}

export enum TaskPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    URGENT = 'urgent',
}

@Entity({ name: 'tasks' })
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // @Column()
    // project_id: string; // Lo activaremos cuando el módulo de proyectos esté listo

    // @Column()
    // assigned_to: string; // Lo activaremos cuando el módulo de usuarios esté listo

    // @Column()
    // created_by: string; // Lo activaremos cuando el módulo de usuarios esté listo

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

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    // Faltan las relaciones con Project y User, las agregaremos después
    // para no complicar este sprint inicial.
}