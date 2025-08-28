import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { User } from '../auth/entities/user.entity';
import { Project } from '../projects/entities/project.entity';
import { Comment } from '../comments/entities/comment.entity';
import { TaskAttachment } from '../attachments/entities/task-attachment.entity';
// --- 1. IMPORTAMOS EL MÓDULO DE NOTIFICACIONES ---
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  // --- 2. AÑADIMOS NotificationsModule A LA LISTA DE IMPORTS ---
  imports: [
    TypeOrmModule.forFeature([Task, User, Project, Comment, TaskAttachment]),
    NotificationsModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule { }