import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskAttachment } from './entities/task-attachment.entity';
import { Task } from '../tasks/entities/task.entity';
import { User } from '../auth/entities/user.entity';
// --- 1. IMPORTAMOS EL MÓDULO DE NOTIFICACIONES ---
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  // --- 2. AÑADIMOS NotificationsModule A LA LISTA DE IMPORTS ---
  imports: [TypeOrmModule.forFeature([TaskAttachment, Task, User]), NotificationsModule],
  controllers: [AttachmentsController],
  providers: [AttachmentsService],
})
export class AttachmentsModule { }