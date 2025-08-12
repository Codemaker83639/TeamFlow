import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(Team)
        private readonly teamsRepository: Repository<Team>,
    ) { }

    async create(createTeamDto: CreateTeamDto): Promise<Team> {
        const newTeam = this.teamsRepository.create(createTeamDto);
        return this.teamsRepository.save(newTeam);
    }

    // --- NUEVO MÉTODO PARA OBTENER TODOS LOS EQUIPOS ---
    async findAll(): Promise<Team[]> {
        return this.teamsRepository.find();
    }
}