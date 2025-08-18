import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { Team } from '../teams/entities/team.entity';
import { User } from '../auth/entities/user.entity';

// DTO para definir los datos necesarios para crear un proyecto
export class CreateProjectDto {
    name: string;
    description?: string;
    team_id: string; // El ID del equipo al que pertenecerá
}

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,
    ) { }

    /**
     * Crea un nuevo proyecto y lo asocia a un equipo.
     * @param createProjectDto Datos para crear el proyecto
     * @param user Usuario que crea el proyecto (para futuras auditorías, etc.)
     * @returns El proyecto recién creado.
     */
    async create(createProjectDto: CreateProjectDto, user: User): Promise<Project> {
        const { team_id, name, description } = createProjectDto;

        // 1. Buscamos el equipo al que se asignará el proyecto
        const team = await this.teamRepository.findOneBy({ id: team_id });
        if (!team) {
            throw new NotFoundException(`Team with ID "${team_id}" not found`);
        }

        // 2. Creamos la instancia del nuevo proyecto
        const newProject = this.projectRepository.create({
            name,
            description,
            team, // Asignamos la entidad completa del equipo
        });

        // 3. Guardamos el proyecto en la base de datos
        return this.projectRepository.save(newProject);
    }

    /**
     * Encuentra todos los proyectos asociados a un equipo específico.
     * @param team_id El ID del equipo
     * @returns Una lista de proyectos.
     */
    async findAllByTeam(team_id: string): Promise<Project[]> {
        return this.projectRepository.find({
            where: {
                team: {
                    id: team_id,
                },
            },
        });
    }
}