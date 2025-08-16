import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity'; // Asegúrate de importar la entidad
import { User } from '../auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User])], // Añade esta línea
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule { }