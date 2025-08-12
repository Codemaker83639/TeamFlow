import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamMember } from './entities/team-member.entity';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Project } from '../projects/entities/project.entity';

@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(Team)
        private readonly teamsRepository: Repository<Team>,
        @InjectRepository(TeamMember)
        private readonly teamMembersRepository: Repository<TeamMember>,
        @InjectRepository(Project)
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

    async findOne(id: string): Promise<Team> {
        const team = await this.teamsRepository.findOneBy({ id });
        if (!team) {
            throw new NotFoundException(`Equipo con ID "${id}" no encontrado.`);
        }
        return team;
    }

    // --- MÉTODO 'UPDATE' REESCRITO PARA MAYOR ROBUSTEZ ---
    async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
        const { memberIds, ...teamDataToUpdate } = updateTeamDto;

        // 1. Buscamos el equipo para asegurarnos de que existe.
        const team = await this.findOne(id);

        // 2. Actualizamos las propiedades del equipo con los nuevos datos.
        //    Object.assign fusiona los datos del DTO en la entidad encontrada.
        Object.assign(team, teamDataToUpdate);

        // 3. Guardamos los cambios básicos del equipo (nombre, descripción).
        await this.teamsRepository.save(team);

        // 4. Si se envió una nueva lista de miembros, la sincronizamos.
        if (memberIds) {
            // Eliminamos las membresías anteriores
            await this.teamMembersRepository.delete({ team: { id } });

            // Creamos las nuevas membresías
            const members = memberIds.map(userId =>
                this.teamMembersRepository.create({
                    team: team,
                    user: { id: userId },
                })
            );
            await this.teamMembersRepository.save(members);
        }

        // 5. Devolvemos el equipo actualizado con todas sus relaciones.
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