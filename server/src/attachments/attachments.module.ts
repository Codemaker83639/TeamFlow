import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskAttachment } from './entities/task-attachment.entity';
import { Task } from '../tasks/entities/task.entity'; // <-- AÑADIR
import { User } from '../auth/entities/user.entity'; // <-- AÑADIR

@Module({
  imports: [TypeOrmModule.forFeature([TaskAttachment, Task, User])], // <-- AÑADIR Task y User
  controllers: [AttachmentsController],
  providers: [AttachmentsService],
})
export class AttachmentsModule { }