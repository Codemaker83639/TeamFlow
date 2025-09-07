import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
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

    switch (timeRange) {
      case TimeRange.DAILY:
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case TimeRange.MONTHLY:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case TimeRange.WEEKLY:
      default:
        const firstDayOfWeek = now.getDate() - now.getDay();
        startDate = new Date(now.setDate(firstDayOfWeek));
        startDate.setHours(0, 0, 0, 0);
        break;
    }

    const completedTasksQuery = this.taskRepository.createQueryBuilder('task')
      .where('task.status = :status', { status: TaskStatus.DONE })
      .andWhere('task.updated_at BETWEEN :startDate AND :now', { startDate, now });

    const loggedHoursQuery = this.timeEntryRepository.createQueryBuilder('time_entry')
      .select('SUM(time_entry.duration_minutes)', 'total_minutes')
      .where('time_entry.start_time BETWEEN :startDate AND :now', { startDate, now });

    const completedProjectsQuery = this.projectRepository.createQueryBuilder('project')
      .where('project.status = :status', { status: ProjectStatus.COMPLETED })
      .andWhere('project.updated_at BETWEEN :startDate AND :now', { startDate, now });

    const effortByProjectQuery = this.timeEntryRepository.createQueryBuilder('time_entry')
      .select('p.name', 'projectName')
      .addSelect('SUM(time_entry.duration_minutes)', 'total_minutes')
      .innerJoin('time_entry.task', 't')
      .innerJoin('t.project', 'p')
      .where('time_entry.start_time BETWEEN :startDate AND :now', { startDate, now })
      .groupBy('p.name');

    if (userId) {
      completedTasksQuery.andWhere('task.assigned_to_id = :userId', { userId });
      loggedHoursQuery.andWhere('time_entry.user_id = :userId', { userId });
      effortByProjectQuery.andWhere('time_entry.user_id = :userId', { userId });

      // --- CORRECCIÓN FINAL ---
      // Ahora solo contamos proyectos completados si el usuario tiene tareas en ellos.
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
    }

    const [completedTasks, loggedHoursResult, completedProjects, effortByProjectResult] = await Promise.all([
      completedTasksQuery.getCount(),
      loggedHoursQuery.getRawOne(),
      completedProjectsQuery.getCount(),
      effortByProjectQuery.getRawMany()
    ]);

    const loggedHours = (loggedHoursResult?.total_minutes || 0) / 60;

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
        loggedHours: parseFloat(loggedHours.toFixed(2)),
        completedProjects,
      },
      charts: {
        taskStatusDistribution: [], // Placeholder
        effortByProject,
      },
      filtersApplied,
    };
  }
}

