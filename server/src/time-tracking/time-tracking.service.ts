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

  async startTimer(taskId: string, userId: string): Promise<TimeEntry> {
    const task = await this.taskRepository.findOneBy({ id: taskId });
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!task || !user) {
      throw new NotFoundException('Task or User not found');
    }

    const existingEntry = await this.timeEntryRepository.findOne({
      where: {
        task: { id: taskId },
        user: { id: userId },
        end_time: IsNull(),
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

  async stopTimer(taskId: string, userId: string): Promise<TimeEntry> {
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

    const durationMs = endTime.getTime() - startTime.getTime();
    const durationMinutes = Math.round(durationMs / 60000);

    timeEntry.end_time = endTime;
    timeEntry.duration_minutes = durationMinutes;

    return this.timeEntryRepository.save(timeEntry);
  }

  // --- 👇 NUEVO MÉTODO PARA DESCARTAR EL TIEMPO 👇 ---
  /**
   * Busca y elimina una entrada de tiempo activa (sin finalizar).
   */
  async discardTimer(taskId: string, userId: string): Promise<void> {
    const result = await this.timeEntryRepository.delete({
      task: { id: taskId },
      user: { id: userId },
      end_time: IsNull(),
    });

    if (result.affected === 0) {
      throw new NotFoundException('No active timer found to discard.');
    }
  }
}