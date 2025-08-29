import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { TimeEntry } from './entities/time-entry.entity';
import { Task } from '../tasks/entities/task.entity';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class TimeTrackingService {
  constructor(
    @InjectRepository(TimeEntry)
    private readonly timeEntryRepository: Repository<TimeEntry>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  /**
   * Inicia un cronómetro para una tarea y un usuario específicos.
   */
  async startTimer(taskId: string, userId: string): Promise<TimeEntry> {
    const task = await this.taskRepository.findOneBy({ id: taskId });
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!task || !user) {
      throw new NotFoundException('Task or User not found');
    }

    // Verificamos si ya existe un cronómetro activo para esta tarea y este usuario
    const existingEntry = await this.timeEntryRepository.findOne({
      where: {
        task: { id: taskId },
        user: { id: userId },
        end_time: IsNull(), // Buscamos una entrada que no tenga fecha de fin
      },
    });

    if (existingEntry) {
      throw new ConflictException('A timer is already running for this task by this user.');
    }

    const newTimeEntry = this.timeEntryRepository.create({
      task,
      user,
      start_time: new Date(),
    });

    return this.timeEntryRepository.save(newTimeEntry);
  }

  /**
   * Detiene el cronómetro activo para una tarea y un usuario.
   */
  async stopTimer(taskId: string, userId: string): Promise<TimeEntry> {
    // Buscamos la entrada de tiempo activa (sin fecha de fin)
    const timeEntry = await this.timeEntryRepository.findOne({
      where: {
        task: { id: taskId },
        user: { id: userId },
        end_time: IsNull(),
      },
    });

    if (!timeEntry) {
      throw new NotFoundException('No active timer found for this task by this user.');
    }

    const endTime = new Date();
    const startTime = timeEntry.start_time;

    // Calculamos la diferencia en milisegundos y la convertimos a minutos
    const durationMs = endTime.getTime() - startTime.getTime();
    const durationMinutes = Math.round(durationMs / 60000);

    timeEntry.end_time = endTime;
    timeEntry.duration_minutes = durationMinutes;

    return this.timeEntryRepository.save(timeEntry);
  }
}