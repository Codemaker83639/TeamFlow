// En: server/src/teams/teams.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { Team } from './entities/team.entity';
import { TeamMember } from './entities/team-member.entity';
import { Project } from '../projects/entities/project.entity';
import { ProjectsModule } from '../projects/projects.module'; // 1. Importa ProjectsModule

@Module({
    // 2. Añade ProjectsModule a la lista de imports
    imports: [TypeOrmModule.forFeature([Team, TeamMember, Project]), ProjectsModule],
    controllers: [TeamsController],
    providers: [TeamsService],
})
export class TeamsModule { }