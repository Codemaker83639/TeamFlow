import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Task } from '../tasks/entities/task.entity';
import { User } from '../auth/entities/user.entity';
// --- 1. IMPORTAMOS EL MÓDULO DE NOTIFICACIONES ---
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  // --- 2. AÑADIMOS NotificationsModule A LA LISTA DE IMPORTS ---
  imports: [TypeOrmModule.forFeature([Comment, Task, User]), NotificationsModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule { }