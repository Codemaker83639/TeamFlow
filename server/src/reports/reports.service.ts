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
        // Marcamos que para el semanal, usaremos el intervalo de la DB
        useInterval = true;
        // startDate sigue siendo necesario para otras consultas que no usan el intervalo
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        break;
    }

    // Lógica de fecha dinámica para las consultas de tiempo
    const dateFilterCondition = useInterval
      ? "created_at >= NOW() - INTERVAL '7 days'"
      : "created_at >= :startDate";

    const dateParams = useInterval ? {} : { startDate };


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
      .select('p.name', 'projectName')
      .addSelect('SUM(time_entry.duration_minutes)', 'total_minutes')
      .innerJoin('time_entry.task', 't')
      .innerJoin('t.project', 'p')
      .where(`time_entry.${dateFilterCondition}`, dateParams)
      .groupBy('p.name');

    const taskStatusDistributionQuery = this.taskRepository.createQueryBuilder('task')
      .select('task.status', 'status')
      .addSelect('COUNT(task.id)::int', 'count')
      .addSelect(`json_agg(json_build_object('id', task.id, 'title', task.title))`, 'tasks')
      .innerJoin(TimeEntry, 'te', 'te.task_id = task.id')
      .where(`te.${dateFilterCondition}`, dateParams)
      .groupBy('task.status');

    // --- Aplicación de Filtros ---

    if (userId) {
      completedTasksQuery.andWhere('task.assigned_to_id = :userId', { userId });
      loggedHoursQuery.andWhere('time_entry.user_id = :userId', { userId });
      effortByProjectQuery.andWhere('time_entry.user_id = :userId', { userId });
      taskStatusDistributionQuery.andWhere('te.user_id = :userId', { userId });
      completedProjectsQuery
        .innerJoin('project.tasks', 'user_task')
        .andWhere('user_task.assigned_to_id = :userId', { userId });
    }

    if (teamId) {
      completedTasksQuery
        .innerJoin('task.project', 'p_task')
        .andWhere('p_task.team_id = :teamId', { teamId });
      loggedHoursQuery
        .innerJoin('time_entry.task', 't_hours')
        .innerJoin('t_hours.project', 'p_hours')
        .andWhere('p_hours.team_id = :teamId', { teamId });
      completedProjectsQuery
        .andWhere('project.team_id = :teamId', { teamId });
      effortByProjectQuery
        .andWhere('p.team_id = :teamId', { teamId });
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
      hours: (item.total_minutes || 0) / 60,
    }));

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

