import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamMember } from './entities/team-member.entity';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Project } from '../projects/entities/project.entity';
// --- 1. IMPORTAR EL GATEWAY ---
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(Team)
        private readonly teamsRepository: Repository<Team>,
        @InjectRepository(TeamMember)
        private readonly teamMembersRepository: Repository<TeamMember>,
        @InjectRepository(Project)
        private readonly projectsRepository: Repository<Project>,
        // --- 2. INYECTAR EL GATEWAY ---
        private readonly notificationsGateway: NotificationsGateway,
    ) { }

    async create(createTeamDto: CreateTeamDto): Promise<Team> {
        const { memberIds, ...teamData } = createTeamDto;
        const newTeam = this.teamsRepository.create(teamData);
        await this.teamsRepository.save(newTeam);

        if (memberIds && memberIds.length > 0) {
            const members = memberIds.map(userId => {
                return this.teamMembersRepository.create({
                    team: newTeam,
                    user: { id: userId },
                });
            });
            await this.teamMembersRepository.save(members);

            // --- 3. LÓGICA DE NOTIFICACIÓN AL CREAR ---
            for (const userId of memberIds) {
                const payload = {
                    message: `Has sido añadido al equipo: "${newTeam.name}"`,
                };
                this.notificationsGateway.sendNotificationToUser(userId, payload);
            }
        }
        return newTeam;
    }

    async findAll(): Promise<Team[]> {
        return this.teamsRepository.find({ relations: ['members', 'members.user'] });
    }

    async findOne(id: string): Promise<Team> {
        const team = await this.teamsRepository.findOne({ where: { id }, relations: ['members', 'members.user'] });
        if (!team) {
            throw new NotFoundException(`Equipo con ID "${id}" no encontrado.`);
        }
        return team;
    }

    async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
        const { memberIds, ...teamDataToUpdate } = updateTeamDto;
        const team = await this.findOne(id);

        // Guardamos los IDs de los miembros actuales para compararlos después
        const oldMemberIds = new Set(team.members.map(m => m.user.id));

        Object.assign(team, teamDataToUpdate);
        await this.teamsRepository.save(team);

        if (memberIds) {
            await this.teamMembersRepository.delete({ team: { id } });

            const members = memberIds.map(userId =>
                this.teamMembersRepository.create({
                    team: team,
                    user: { id: userId },
                })
            );
            await this.teamMembersRepository.save(members);

            // --- 4. LÓGICA DE NOTIFICACIÓN AL ACTUALIZAR ---
            for (const userId of memberIds) {
                // Si el nuevo ID de miembro no estaba en la lista de antiguos...
                if (!oldMemberIds.has(userId)) {
                    const payload = {
                        message: `Has sido añadido al equipo: "${team.name}"`,
                    };
                    // ...le enviamos una notificación.
                    this.notificationsGateway.sendNotificationToUser(userId, payload);
                }
            }
        }

        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        const team = await this.teamsRepository.findOneBy({ id });
        if (!team) {
            throw new NotFoundException(`Equipo con ID "${id}" no encontrado.`);
        }

        const associatedProjects = await this.projectsRepository.count({ where: { team: { id } } });
        if (associatedProjects > 0) {
            throw new ConflictException('No se puede eliminar el equipo porque tiene proyectos asociados.');
        }

        await this.teamMembersRepository.delete({ team: { id } });
        await this.teamsRepository.delete(id);
    }
}