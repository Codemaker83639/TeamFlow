import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { User } from '../auth/entities/user.entity';
import { Project } from '../projects/entities/project.entity';
// --- 1. IMPORTAR LAS NUEVAS ENTIDADES ---
import { Comment } from '../comments/entities/comment.entity';
import { TaskAttachment } from './entities/task-attachment.entity';

@Module({
  // --- 2. AÑADIR LAS ENTIDADES AL ARRAY ---
  imports: [TypeOrmModule.forFeature([Task, User, Project, Comment, TaskAttachment])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule { }