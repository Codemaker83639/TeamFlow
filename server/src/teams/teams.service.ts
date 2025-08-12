import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamMember } from './entities/team-member.entity'; // 1. Importar TeamMember

@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(Team)
        private readonly teamsRepository: Repository<Team>,
        // 2. Inyectar el repositorio de TeamMember
        @InjectRepository(TeamMember)
        private readonly teamMembersRepository: Repository<TeamMember>,
    ) { }

    // 3. Método 'create' actualizado para añadir miembros
    async create(createTeamDto: CreateTeamDto): Promise<Team> {
        const { memberIds, ...teamData } = createTeamDto;

        // Primero, creamos y guardamos el equipo para obtener su ID
        const newTeam = this.teamsRepository.create(teamData);
        await this.teamsRepository.save(newTeam);

        // Si se proporcionaron IDs de miembros, los creamos
        if (memberIds && memberIds.length > 0) {
            const members = memberIds.map(userId => {
                return this.teamMembersRepository.create({
                    team: newTeam,
                    user: { id: userId }, // Asignamos la relación solo con el ID del usuario
                    // El rol por defecto se tomará de la entidad TeamMember
                });
            });
            await this.teamMembersRepository.save(members);
        }

        // Devolvemos el equipo recién creado
        // Podríamos querer devolverlo con sus miembros, pero por ahora esto es suficiente
        return newTeam;
    }

    async findAll(): Promise<Team[]> {
        return this.teamsRepository.find();
    }
}