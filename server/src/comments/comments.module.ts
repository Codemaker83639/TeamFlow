import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Task } from '../tasks/entities/task.entity'; // <-- AÑADIR
import { User } from '../auth/entities/user.entity'; // <-- AÑADIR

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Task, User])], // <-- AÑADIR Task y User aquí
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule { }