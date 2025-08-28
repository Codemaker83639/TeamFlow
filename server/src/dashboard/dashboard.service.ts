import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Project, ProjectStatus } from '../projects/entities/project.entity';
import { Task } from '../tasks/entities/task.entity';
import { TaskStatus } from '../tasks/entities/task.enums';
import { TeamMember } from '../teams/entities/team-member.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(TeamMember)
    private readonly teamMemberRepository: Repository<TeamMember>,
  ) { }

  /**
   * Calcula y devuelve las estadísticas del dashboard para un usuario específico.
   * @param user El usuario autenticado.
   */
  async getStatsForUser(user: User) {
    // 1. Tareas completadas por el usuario
    const completedTasksCount = await this.taskRepository.count({
      where: {
        assigned_to: { id: user.id },
        status: TaskStatus.DONE,
      },
    });

    // 2. Proyectos activos del usuario
    // Primero, encontramos todos los equipos a los que pertenece el usuario
    const userMemberships = await this.teamMemberRepository.find({
      where: { user: { id: user.id } },
      relations: ['team'],
    });
    const teamIds = userMemberships.map(m => m.team.id);

    let activeProjectsCount = 0;
    // Si el usuario pertenece a algún equipo, buscamos los proyectos de esos equipos
    if (teamIds.length > 0) {
      activeProjectsCount = await this.projectRepository.count({
        where: {
          team: { id: In(teamIds) },
          status: ProjectStatus.ACTIVE,
        },
      });
    }

    // 3. Miembros del equipo (contamos compañeros únicos)
    let teamMembersCount = 0;
    if (teamIds.length > 0) {
      const members = await this.teamMemberRepository.find({
        where: { team: { id: In(teamIds) } },
        relations: ['user']
      });
      // Usamos un Set para contar solo los IDs de usuario únicos y excluimos al propio usuario
      const uniqueMemberIds = new Set(members.map(m => m.user.id));
      uniqueMemberIds.delete(user.id);
      teamMembersCount = uniqueMemberIds.size;
    }


    // Devolvemos un objeto con todas las estadísticas
    return {
      activeProjects: activeProjectsCount,
      completedTasks: completedTasksCount,
      teamMembers: teamMembersCount,
      workedHours: 0, // Placeholder, ya que aún no implementamos el time tracking
    };
  }
}