import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { Team } from './entities/team.entity';
import { TeamMember } from './entities/team-member.entity';
import { Project } from '../projects/entities/project.entity';
import { ProjectsModule } from '../projects/projects.module';
// --- 1. IMPORTAMOS EL MÓDULO DE NOTIFICACIONES ---
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
    // --- 2. AÑADIMOS NotificationsModule A LA LISTA DE IMPORTS ---
    imports: [
        TypeOrmModule.forFeature([Team, TeamMember, Project]),
        ProjectsModule,
        NotificationsModule
    ],
    controllers: [TeamsController],
    providers: [TeamsService],
})
export class TeamsModule { }