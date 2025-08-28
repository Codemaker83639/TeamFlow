import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './entities/project.entity';
import { Team } from '../teams/entities/team.entity';
// --- 1. IMPORTAMOS EL MÓDULO DE NOTIFICACIONES ---
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  // --- 2. AÑADIMOS NotificationsModule A LA LISTA DE IMPORTS ---
  imports: [TypeOrmModule.forFeature([Project, Team]), NotificationsModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule { }