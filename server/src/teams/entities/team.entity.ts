import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import { TeamMember } from './team-member.entity';

@Entity('teams')
export class Team {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ nullable: true })
    avatar_url: string;

    // --- CAMBIO CLAVE ---
    // 'eager: true' le dice a TypeORM que siempre cargue esta relación (los miembros)
    // cuando se busque un equipo. Esto nos simplifica el código en el servicio.
    @OneToMany(() => TeamMember, (teamMember) => teamMember.team, { cascade: true, eager: true })
    members: TeamMember[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}