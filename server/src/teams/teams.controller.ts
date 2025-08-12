import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common'; // Se añade GET
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/entities/user.entity';

@Controller('teams')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) { }

    @Post()
    @Roles(UserRole.ADMIN)
    create(@Body() createTeamDto: CreateTeamDto) {
        return this.teamsService.create(createTeamDto);
    }

    // --- NUEVO ENDPOINT PARA OBTENER TODOS LOS EQUIPOS ---
    @Get()
    findAll() {
        // No se necesita protección de rol específica, 
        // ya que asumimos que todos los usuarios autenticados pueden ver los equipos.
        // El UseGuards a nivel de controlador ya protege la ruta.
        return this.teamsService.findAll();
    }
}