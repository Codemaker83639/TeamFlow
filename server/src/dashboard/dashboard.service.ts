import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// Asegúrate de que MoreThanOrEqual esté importado
import { In, MoreThanOrEqual, Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Project, ProjectStatus } from '../projects/entities/project.entity';
import { Task } from '../tasks/entities/task.entity';
import { TaskStatus } from '../tasks/entities/task.enums';
import { TeamMember } from '../teams/entities/team-member.entity';
import { TimeEntry } from '../time-tracking/entities/time-entry.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(TeamMember)
    private readonly teamMemberRepository: Repository<TeamMember>,
    @InjectRepository(TimeEntry)
    private readonly timeEntryRepository: Repository<TimeEntry>,
  ) { }

  async getStatsForUser(user: User) {

    // --- CAMBIO: Calcular inicio de semana actual (lunes) ---
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = domingo, 1 = lunes, etc.
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Si es domingo, retroceder 6 días
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - daysToMonday);
    weekStart.setHours(0, 0, 0, 0); // Inicio del día

    const completedTasksCount = await this.taskRepository.count({
      where: {
        assigned_to: { id: user.id },
        status: TaskStatus.DONE,
        // Cambio: usar weekStart en lugar de sevenDaysAgo
        updated_at: MoreThanOrEqual(weekStart)
      },
    });
    // --- FIN DE LA MODIFICACIÓN ---

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

    // --- CAMBIO: Usar parámetro en lugar de SQL INTERVAL ---
    const result = await this.timeEntryRepository
      .createQueryBuilder('time_entry')
      .select('SUM(time_entry.duration_minutes)', 'totalMinutes')
      .where('time_entry.user_id = :userId', { userId: user.id })
      .andWhere('time_entry.created_at >= :weekStart', { weekStart })
      .getRawOne();

    const totalMinutes = result.totalMinutes || 0;
    const workedHours = parseFloat((totalMinutes / 60).toFixed(1));

    return {
      activeProjects: activeProjectsCount,
      completedTasks: completedTasksCount, // Ahora filtrado por semana actual
      teamMembers: teamMembersCount,
      workedHours: workedHours, // Ahora filtrado por semana actual
    };
  }
}