import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamMember } from './entities/team-member.entity';
import { UpdateTeamDto } from './dto/update-team.dto'; // Se importa el nuevo DTO

@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(Team)
        private readonly teamsRepository: Repository<Team>,
        @InjectRepository(TeamMember)
        private readonly teamMembersRepository: Repository<TeamMember>,
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

    // --- NUEVO MÉTODO PARA ACTUALIZAR EQUIPOS ---
    async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
        // Usamos preload para buscar el equipo y fusionar los nuevos datos.
        // Si no lo encuentra, devuelve undefined.
        const team = await this.teamsRepository.preload({
            id: id,
            ...updateTeamDto,
        });

        if (!team) {
            throw new NotFoundException(`Equipo con ID "${id}" no encontrado.`);
        }
        // Aquí podríamos añadir lógica para actualizar miembros si el DTO lo permite
        return this.teamsRepository.save(team);
    }

    // --- NUEVO MÉTODO PARA ELIMINAR EQUIPOS ---
    async remove(id: string): Promise<void> {
        // Primero eliminamos los miembros asociados a este equipo
        await this.teamMembersRepository.delete({ team: { id } });

        // Luego eliminamos el equipo
        const result = await this.teamsRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Equipo con ID "${id}" no encontrado.`);
        }
    }
}