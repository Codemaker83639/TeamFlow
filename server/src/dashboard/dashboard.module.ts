import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../projects/entities/project.entity';
import { Task } from '../tasks/entities/task.entity';
import { Team } from '../teams/entities/team.entity';
import { TeamMember } from '../teams/entities/team-member.entity';

@Module({
  // Importamos TypeOrmModule con todas las entidades que necesitamos para los cálculos
  imports: [TypeOrmModule.forFeature([Project, Task, Team, TeamMember])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule { }