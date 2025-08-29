import { Module } from '@nestjs/common';
import { TimeTrackingService } from './time-tracking.service';
import { TimeTrackingController } from './time-tracking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeEntry } from './entities/time-entry.entity';
import { Task } from '../tasks/entities/task.entity';
import { User } from '../auth/entities/user.entity';

@Module({
  // Importamos TypeOrmModule con todas las entidades que nuestro servicio necesitará
  imports: [TypeOrmModule.forFeature([TimeEntry, Task, User])],
  controllers: [TimeTrackingController],
  providers: [TimeTrackingService],
})
export class TimeTrackingModule { }