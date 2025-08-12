import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { Team } from './entities/team.entity';
import { TeamMember } from './entities/team-member.entity'; // Se importa TeamMember

@Module({
    imports: [TypeOrmModule.forFeature([Team, TeamMember])], // Se añade TeamMember aquí
    controllers: [TeamsController],
    providers: [TeamsService],
})
export class TeamsModule { }