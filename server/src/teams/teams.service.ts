import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamMember } from './entities/team-member.entity';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Project } from '../projects/entities/project.entity'; // Se importa Project

@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(Team)
        private readonly teamsRepository: Repository<Team>,
        @InjectRepository(TeamMember)
        private readonly teamMembersRepository: Repository<TeamMember>,
        @InjectRepository(Project) // Se inyecta el repositorio de Project
        private readonly projectsRepository: Repository<Project>,
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
        }
        return newTeam;
    }

    async findAll(): Promise<Team[]> {
        return this.teamsRepository.find();
    }

    async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
        const team = await this.teamsRepository.preload({
            id: id,
            ...updateTeamDto,
        });

        if (!team) {
            throw new NotFoundException(`Equipo con ID "${id}" no encontrado.`);
        }
        return this.teamsRepository.save(team);
    }

    // --- MÉTODO 'REMOVE' CORREGIDO Y MÁS SEGURO ---
    async remove(id: string): Promise<void> {
        // 1. Verificar si el equipo existe
        const team = await this.teamsRepository.findOneBy({ id });
        if (!team) {
            throw new NotFoundException(`Equipo con ID "${id}" no encontrado.`);
        }

        // 2. Verificar si hay proyectos asociados
        const associatedProjects = await this.projectsRepository.count({ where: { team: { id } } });
        if (associatedProjects > 0) {
            throw new ConflictException('No se puede eliminar el equipo porque tiene proyectos asociados.');
        }

        // 3. Si no hay proyectos, proceder a eliminar miembros y luego el equipo
        await this.teamMembersRepository.delete({ team: { id } });
        await this.teamsRepository.delete(id);
    }
}