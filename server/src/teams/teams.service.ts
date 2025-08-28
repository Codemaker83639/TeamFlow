import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamMember } from './entities/team-member.entity';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Project } from '../projects/entities/project.entity';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(Team)
        private readonly teamsRepository: Repository<Team>,
        @InjectRepository(TeamMember)
        private readonly teamMembersRepository: Repository<TeamMember>,
        @InjectRepository(Project)
        private readonly projectsRepository: Repository<Project>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
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

            const usersToNotify = await this.userRepository.findBy({ id: In(memberIds) });
            for (const user of usersToNotify) {
                const payload = {
                    message: `Has sido añadido al equipo: "${newTeam.name}"`,
                };
                this.notificationsGateway.sendNotificationToUser(user, payload);
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

        const oldMemberIds = new Set(team.members.map(m => m.user.id));

        Object.assign(team, teamDataToUpdate);
        await this.teamsRepository.save(team);

        if (memberIds) {
            await this.teamMembersRepository.delete({ team: { id } });

            const newMembers = memberIds.map(userId =>
                this.teamMembersRepository.create({
                    team: team,
                    user: { id: userId },
                })
            );
            await this.teamMembersRepository.save(newMembers);

            const newUsersToNotifyIds = memberIds.filter(id => !oldMemberIds.has(id));
            if (newUsersToNotifyIds.length > 0) {
                const newUsersToNotify = await this.userRepository.findBy({ id: In(newUsersToNotifyIds) });
                for (const user of newUsersToNotify) {
                    const payload = {
                        message: `Has sido añadido al equipo: "${team.name}"`,
                    };
                    this.notificationsGateway.sendNotificationToUser(user, payload);
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