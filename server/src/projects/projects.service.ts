import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project, ProjectStatus } from './entities/project.entity';
import { Team } from '../teams/entities/team.entity';
import { User } from '../auth/entities/user.entity';
import { TaskStatus } from '../tasks/entities/task.enums';
import { NotificationsGateway } from '../notifications/notifications.gateway';

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
        private readonly notificationsGateway: NotificationsGateway,
    ) { }

    async create(createProjectDto: CreateProjectDto, user: User): Promise<Project> {
        const { team_id, name, description } = createProjectDto;
        const team = await this.teamRepository.findOne({ where: { id: team_id }, relations: ['members', 'members.user'] });
        if (!team) {
            throw new NotFoundException(`Team with ID "${team_id}" not found`);
        }
        const newProject = this.projectRepository.create({
            name,
            description,
            team,
            start_date: new Date(),
        });
        const savedProject = await this.projectRepository.save(newProject);

        for (const member of team.members) {
            if (member.user) { // Asegurarse que el usuario existe
                const payload = {
                    message: `Tu equipo "${team.name}" ha sido asignado al nuevo proyecto: "${savedProject.name}"`,
                };
                this.notificationsGateway.sendNotificationToUser(member.user, payload);
            }
        }

        return savedProject;
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
            const completedHours = project.tasks.filter(task => task.status === TaskStatus.DONE).reduce((acc, task) => acc + (Number(task.estimated_hours) || 0), 0);
            const progress = totalHours > 0 ? Math.round((completedHours / totalHours) * 100) : 0;
            return { ...project, progress };
        });
        return projectsWithProgress as Project[];
    }

    async findOne(id: string): Promise<Project> {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: {
                team: { members: { user: true } },
            },
        });
        if (!project) {
            throw new NotFoundException(`Project with ID "${id}" not found`);
        }
        return project;
    }

    async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
        const projectToUpdate = await this.projectRepository.findOne({ where: { id }, relations: ['team'] });
        if (!projectToUpdate) {
            throw new NotFoundException(`Project with ID "${id}" not found`);
        }

        const oldTeamId = projectToUpdate.team?.id;

        if (updateProjectDto.status === ProjectStatus.COMPLETED && projectToUpdate.status !== ProjectStatus.COMPLETED) {
            updateProjectDto.end_date = new Date();
        }

        if (updateProjectDto.team_id && updateProjectDto.team_id !== oldTeamId) {
            const newTeam = await this.teamRepository.findOne({ where: { id: updateProjectDto.team_id }, relations: ['members', 'members.user'] });
            if (!newTeam) {
                throw new NotFoundException(`Team with ID "${updateProjectDto.team_id}" not found`);
            }
            projectToUpdate.team = newTeam;

            for (const member of newTeam.members) {
                if (member.user) {
                    const payload = {
                        message: `Tu equipo "${newTeam.name}" ha sido reasignado al proyecto: "${projectToUpdate.name}"`,
                    };
                    this.notificationsGateway.sendNotificationToUser(member.user, payload);
                }
            }
        }

        Object.assign(projectToUpdate, updateProjectDto);
        await this.projectRepository.save(projectToUpdate);

        const fullProject = await this.findOne(id);
        const projectsWithProgress = (await this.findAll()).find(p => p.id === fullProject.id);
        return projectsWithProgress as Project;
    }

    async remove(id: string): Promise<void> {
        const result = await this.projectRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Project with ID "${id}" not found`);
        }
    }
}