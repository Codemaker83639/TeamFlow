import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import { TeamMember } from './team-member.entity';
import { Project } from '../../projects/entities/project.entity';

@Entity('teams')
export class Team {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // ... (columnas name, description, avatar_url y relación members sin cambios)
    @Column()
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ nullable: true })
    avatar_url: string;

    @OneToMany(() => TeamMember, (teamMember) => teamMember.team, { cascade: true, eager: true })
    members: TeamMember[];

    // --- CAMBIO AQUÍ: Se añade el tipo explícito 'Project' ---
    @OneToMany(() => Project, (project: Project) => project.team)
    projects: Project[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}