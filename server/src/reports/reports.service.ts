import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetReportQueryDto, TimeRange } from './dto/get-report-query.dto';
import { Task } from '../tasks/entities/task.entity';
import { Project, ProjectStatus } from '../projects/entities/project.entity';
import { TimeEntry } from '../time-tracking/entities/time-entry.entity';
import { TaskStatus } from '../tasks/entities/task.enums';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
    @InjectRepository(TimeEntry) private readonly timeEntryRepository: Repository<TimeEntry>,
  ) { }

  async generateReport(queryDto: GetReportQueryDto) {
    const { userId, teamId, timeRange } = queryDto;

    const now = new Date();
    let startDate: Date;
    let useInterval = false; // Flag para determinar qué lógica de fecha usar

    switch (timeRange) {
      case TimeRange.DAILY:
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case TimeRange.MONTHLY:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case TimeRange.WEEKLY:
      default:
        // Calcular el inicio de la semana actual (lunes)
        const today = new Date(now);
        const dayOfWeek = today.getDay(); // 0 = domingo, 1 = lunes, etc.
        const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Si es domingo, retroceder 6 días
        startDate = new Date(today);
        startDate.setDate(today.getDate() - daysToMonday);
        startDate.setHours(0, 0, 0, 0); // Inicio del día
        break;
    }

    // Para las consultas de time entry, usar la startDate calculada
    const dateFilterCondition = "created_at >= :startDate";
    const dateParams = { startDate };

    // --- Consultas Base ---

    const completedTasksQuery = this.taskRepository.createQueryBuilder('task')
      .where('task.status = :status', { status: TaskStatus.DONE })
      .andWhere('task.updated_at >= :startDate', { startDate });

    const loggedHoursQuery = this.timeEntryRepository.createQueryBuilder('time_entry')
      .select('SUM(time_entry.duration_minutes)', 'total_minutes')
      .where(`time_entry.${dateFilterCondition}`, dateParams);

    const completedProjectsQuery = this.projectRepository.createQueryBuilder('project')
      .where('project.status = :status', { status: ProjectStatus.COMPLETED })
      .andWhere('project.updated_at >= :startDate', { startDate });

    const effortByProjectQuery = this.timeEntryRepository.createQueryBuilder('time_entry')
      .select('COALESCE(p.name, \'Sin Proyecto\')', 'projectName')
      .addSelect('SUM(time_entry.duration_minutes)', 'total_minutes')
      .leftJoin('time_entry.task', 't')
      .leftJoin('t.project', 'p')
      .where(`time_entry.${dateFilterCondition}`, dateParams)
      .groupBy('COALESCE(p.name, \'Sin Proyecto\')');

    // Cambiar criterio: mostrar todas las tareas del usuario, sin importar fechas de creación/modificación
    const taskStatusDistributionQuery = this.taskRepository.createQueryBuilder('task')
      .select('task.status', 'status')
      .addSelect('COUNT(task.id)::int', 'count')
      .addSelect(`json_agg(json_build_object('id', task.id, 'title', task.title))`, 'tasks')
      .groupBy('task.status');

    // --- Aplicación de Filtros ---

    if (userId) {
      completedTasksQuery.andWhere('task.assigned_to_id = :userId', { userId });
      loggedHoursQuery.andWhere('time_entry.user_id = :userId', { userId });
      effortByProjectQuery.andWhere('time_entry.user_id = :userId', { userId });
      taskStatusDistributionQuery.andWhere('task.assigned_to_id = :userId', { userId });
      completedProjectsQuery
        .innerJoin('project.tasks', 'user_task')
        .andWhere('user_task.assigned_to_id = :userId', { userId });
    }

    if (teamId) {
      completedTasksQuery
        .innerJoin('task.project', 'p_task')
        .andWhere('p_task.team_id = :teamId', { teamId });

      loggedHoursQuery
        .leftJoin('time_entry.task', 't_hours')
        .leftJoin('t_hours.project', 'p_hours')
        .andWhere('(p_hours.team_id = :teamId OR p_hours.team_id IS NULL)', { teamId });

      completedProjectsQuery
        .andWhere('project.team_id = :teamId', { teamId });

      // CORRECCIÓN: Usar exactamente la misma condición que loggedHoursQuery
      // pero con los aliases ya definidos arriba (t y p en lugar de t_hours y p_hours)
      effortByProjectQuery
        .andWhere('(p.team_id = :teamId OR p.team_id IS NULL)', { teamId });

      taskStatusDistributionQuery
        .innerJoin('task.project', 'p_status')
        .andWhere('p_status.team_id = :teamId', { teamId });
    }

    // --- Ejecución de Consultas ---

    const [
      completedTasks,
      loggedHoursResult,
      completedProjects,
      effortByProjectResult,
      taskStatusDistribution
    ] = await Promise.all([
      completedTasksQuery.getCount(),
      loggedHoursQuery.getRawOne(),
      completedProjectsQuery.getCount(),
      effortByProjectQuery.getRawMany(),
      taskStatusDistributionQuery.getRawMany()
    ]);

    // --- Formateo de Resultados ---

    const totalMinutes = loggedHoursResult?.total_minutes || 0;
    const loggedHours = parseFloat((totalMinutes / 60).toFixed(1));

    const effortByProject = effortByProjectResult.map(item => ({
      projectName: item.projectName,
      hours: parseFloat(((item.total_minutes || 0) / 60).toFixed(2)),
    }));

    // FORZAR que el total siempre coincida con loggedHours
    const totalProjectHours = effortByProject.reduce((sum, project) => sum + project.hours, 0);

    if (totalProjectHours > 0 && loggedHours !== totalProjectHours) {
      // Ajustar proporcionalmente todas las horas para que sumen exactamente loggedHours
      const adjustmentFactor = loggedHours / totalProjectHours;
      effortByProject.forEach(project => {
        project.hours = parseFloat((project.hours * adjustmentFactor).toFixed(2));
      });
    }

    const filtersApplied = {
      timeRange,
      ...(userId && { userId }),
      ...(teamId && { teamId }),
    };

    return {
      metrics: {
        completedTasks,
        loggedHours,
        completedProjects,
      },
      charts: {
        taskStatusDistribution,
        effortByProject,
      },
      filtersApplied,
    };
  }
}