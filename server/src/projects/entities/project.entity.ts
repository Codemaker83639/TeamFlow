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
import { Team } from '../../teams/entities/team.entity';
import { Task } from '../../tasks/entities/task.entity';

export enum ProjectStatus {
    ACTIVE = 'active',
    COMPLETED = 'completed',
    ARCHIVED = 'archived',
}

@Entity({ name: 'projects' })
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // ... (columnas name, description, status, start_date, end_date sin cambios)
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({
        type: 'enum',
        enum: ProjectStatus,
        default: ProjectStatus.ACTIVE,
    })
    status: ProjectStatus;

    @Column({ type: 'date', nullable: true })
    start_date: Date;

    @Column({ type: 'date', nullable: true })
    end_date: Date;

    // --- CAMBIO AQUÍ: Se añade el tipo explícito 'Team' ---
    @ManyToOne(() => Team, (team: Team) => team.projects)
    @JoinColumn({ name: 'team_id' })
    team: Team;

    // --- CAMBIO AQUÍ: Se añade el tipo explícito 'Task' ---
    @OneToMany(() => Task, (task: Task) => task.project)
    tasks: Task[];

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}