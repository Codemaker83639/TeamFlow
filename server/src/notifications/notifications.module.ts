import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationsGateway } from './notifications.gateway';
// --- 1. IMPORTAMOS LAS ENTIDADES NECESARIAS ---
import { TimeEntry } from '../time-tracking/entities/time-entry.entity';
import { Task } from '../tasks/entities/task.entity';

@Module({
  // --- 2. AÑADIMOS LAS ENTIDADES AL ARRAY DE IMPORTS ---
  imports: [TypeOrmModule.forFeature([Notification, TimeEntry, Task])],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsGateway],
  exports: [NotificationsService, NotificationsGateway],
})
export class NotificationsModule { }