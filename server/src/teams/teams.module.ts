import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { Team } from './entities/team.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Team])],
    controllers: [TeamsController], // Asegúrate de que TeamsController esté aquí
    providers: [TeamsService],
})
export class TeamsModule { }