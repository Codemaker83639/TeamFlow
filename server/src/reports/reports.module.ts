import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';

// Importamos TODAS las entidades necesarias para las consultas
import { Task } from '../tasks/entities/task.entity';
import { User } from '../auth/entities/user.entity';
import { Project } from '../projects/entities/project.entity';
import { Team } from '../teams/entities/team.entity'; // <-- AÑADIDO
import { TimeEntry } from '../time-tracking/entities/time-entry.entity'; // <-- AÑADIDO

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Project,
      Task,
      Team, // <-- REGISTRADO
      TimeEntry, // <-- REGISTRADO
    ]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule { }

