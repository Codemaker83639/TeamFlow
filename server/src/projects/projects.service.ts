import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project, ProjectStatus } from './entities/project.entity';
import { Team } from '../teams/entities/team.entity';
import { User } from '../auth/entities/user.entity';
import { TaskStatus } from '../tasks/entities/task.enums';

export class CreateProjectDto {
    name: string;
    description?: string;
    team_id: string;
}

export class UpdateProjectDto {
    name?: string;
    description?: string;
    status?: ProjectStatus;
    start_date?: Date;
    end_date?: Date;
    team_id?: string;
}

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,
    ) { }

    async create(createProjectDto: CreateProjectDto, user: User): Promise<Project> {
        const { team_id, name, description } = createProjectDto;
        const team = await this.teamRepository.findOneBy({ id: team_id });
        if (!team) {
            throw new NotFoundException(`Team with ID "${team_id}" not found`);
        }
        const newProject = this.projectRepository.create({
            name,
            description,
            team,
            start_date: new Date(),
        });
        return this.projectRepository.save(newProject);
    }

    async findAll(): Promise<Project[]> {
        const projects = await this.projectRepository.find({
            relations: {
                team: { members: { user: true } },
                tasks: true,
            },
        });
        const projectsWithProgress = projects.map(project => {
            if (!project.tasks || project.tasks.length === 0) {
                return { ...project, progress: 0 };
            }
            const totalHours = project.tasks.reduce((acc, task) => acc + (Number(task.estimated_hours) || 0), 0);
            const completedHours = project.tasks
                .filter(task => task.status === TaskStatus.DONE)
                .reduce((acc, task) => acc + (Number(task.estimated_hours) || 0), 0);
            const progress = totalHours > 0 ? Math.round((completedHours / totalHours) * 100) : 0;
            return { ...project, progress };
        });
        return projectsWithProgress as Project[];
    }

    async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
        const projectToUpdate = await this.projectRepository.findOneBy({ id });
        if (!projectToUpdate) {
            throw new NotFoundException(`Project with ID "${id}" not found`);
        }

        if (updateProjectDto.team_id) {
            const newTeam = await this.teamRepository.findOneBy({ id: updateProjectDto.team_id });
            if (!newTeam) {
                throw new NotFoundException(`Team with ID "${updateProjectDto.team_id}" not found`);
            }
            projectToUpdate.team = newTeam;
        }

        if (updateProjectDto.status === ProjectStatus.COMPLETED && projectToUpdate.status !== ProjectStatus.COMPLETED) {
            updateProjectDto.end_date = new Date();
        }

        Object.assign(projectToUpdate, {
            name: updateProjectDto.name,
            description: updateProjectDto.description,
            status: updateProjectDto.status,
            start_date: updateProjectDto.start_date,
            end_date: updateProjectDto.end_date,
        });
        await this.projectRepository.save(projectToUpdate);

        const updatedProjectWithRelations = await this.projectRepository.findOne({
            where: { id },
            relations: {
                team: { members: { user: true } },
                tasks: true,
            },
        });

        const totalHours = updatedProjectWithRelations.tasks.reduce((acc, task) => acc + (Number(task.estimated_hours) || 0), 0);
        const completedHours = updatedProjectWithRelations.tasks
            .filter(task => task.status === TaskStatus.DONE)
            .reduce((acc, task) => acc + (Number(task.estimated_hours) || 0), 0);
        const progress = totalHours > 0 ? Math.round((completedHours / totalHours) * 100) : 0;

        return { ...updatedProjectWithRelations, progress } as Project;
    }

    async remove(id: string): Promise<void> {
        const result = await this.projectRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Project with ID "${id}" not found`);
        }
    }
}