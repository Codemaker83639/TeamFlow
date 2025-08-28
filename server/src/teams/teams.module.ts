import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { Team } from './entities/team.entity';
import { TeamMember } from './entities/team-member.entity';
import { Project } from '../projects/entities/project.entity';
import { ProjectsModule } from '../projects/projects.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { User } from '../auth/entities/user.entity'; // <-- AÑADIR IMPORTACIÓN

@Module({
    imports: [
        TypeOrmModule.forFeature([Team, TeamMember, Project, User]), // <-- AÑADIR USER
        ProjectsModule,
        NotificationsModule
    ],
    controllers: [TeamsController],
    providers: [TeamsService],
})
export class TeamsModule { }