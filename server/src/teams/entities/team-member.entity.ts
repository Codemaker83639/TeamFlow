import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Team } from './team.entity';
import { UserRole } from '../../auth/entities/user.enums'; // <--- CAMBIO AQUÍ: Importamos desde el nuevo archivo

@Entity('team_members')
export class TeamMember {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Team, (team) => team.members)
    @JoinColumn({ name: 'team_id' })
    team: Team;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.MEMBER, // Este error ahora está solucionado
    })
    role: UserRole;
}