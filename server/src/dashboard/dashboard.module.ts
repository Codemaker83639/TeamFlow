import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../projects/entities/project.entity';
import { Task } from '../tasks/entities/task.entity';
import { Team } from '../teams/entities/team.entity';
import { TeamMember } from '../teams/entities/team-member.entity';
// --- 1. IMPORTAMOS LA NUEVA ENTIDAD ---
import { TimeEntry } from '../time-tracking/entities/time-entry.entity';

@Module({
  // --- 2. AÑADIMOS TimeEntry A LA LISTA ---
  imports: [TypeOrmModule.forFeature([Project, Task, Team, TeamMember, TimeEntry])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule { }