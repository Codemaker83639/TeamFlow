import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Project, ProjectStatus } from '../projects/entities/project.entity';
import { Task } from '../tasks/entities/task.entity';
import { TaskStatus } from '../tasks/entities/task.enums';
import { TeamMember } from '../teams/entities/team-member.entity';
import { TimeEntry } from '../time-tracking/entities/time-entry.entity'; // <-- 1. IMPORTAR

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(TeamMember)
    private readonly teamMemberRepository: Repository<TeamMember>,
    @InjectRepository(TimeEntry) // <-- 2. INYECTAR EL NUEVO REPOSITORIO
    private readonly timeEntryRepository: Repository<TimeEntry>,
  ) { }

  async getStatsForUser(user: User) {
    // ... (Cálculos de completedTasksCount, activeProjectsCount, teamMembersCount no cambian)
    const completedTasksCount = await this.taskRepository.count({
      where: { assigned_to: { id: user.id }, status: TaskStatus.DONE },
    });
    const userMemberships = await this.teamMemberRepository.find({
      where: { user: { id: user.id } },
      relations: ['team'],
    });
    const teamIds = userMemberships.map(m => m.team.id);
    let activeProjectsCount = 0;
    if (teamIds.length > 0) {
      activeProjectsCount = await this.projectRepository.count({
        where: { team: { id: In(teamIds) }, status: ProjectStatus.ACTIVE },
      });
    }
    let teamMembersCount = 0;
    if (teamIds.length > 0) {
      const members = await this.teamMemberRepository.find({
        where: { team: { id: In(teamIds) } },
        relations: ['user']
      });
      const uniqueMemberIds = new Set(members.map(m => m.user.id));
      uniqueMemberIds.delete(user.id);
      teamMembersCount = uniqueMemberIds.size;
    }

    // --- 3. NUEVA LÓGICA PARA CALCULAR HORAS TRABAJADAS ---
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Sumamos la columna 'duration_minutes' para todas las entradas de los últimos 7 días
    const result = await this.timeEntryRepository
      .createQueryBuilder('time_entry')
      .select('SUM(time_entry.duration_minutes)', 'totalMinutes')
      .where('time_entry.user_id = :userId', { userId: user.id })
      .andWhere('time_entry.created_at >= :sevenDaysAgo', { sevenDaysAgo })
      .getRawOne();

    const totalMinutes = result.totalMinutes || 0;
    // Convertimos los minutos a horas y redondeamos a un decimal
    const workedHours = parseFloat((totalMinutes / 60).toFixed(1));
    // --- FIN DE LA LÓGICA ---

    return {
      activeProjects: activeProjectsCount,
      completedTasks: completedTasksCount,
      teamMembers: teamMembersCount,
      workedHours: workedHours, // <-- Usamos el valor calculado
    };
  }
}