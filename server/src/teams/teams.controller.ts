import { Controller, Post, Body, UseGuards, Get, Param, Patch, Delete } from '@nestjs/common'; // Se añaden Param, Patch, Delete
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto'; // Se importa el nuevo DTO
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

    @Get()
    findAll() {
        return this.teamsService.findAll();
    }

    // --- NUEVO ENDPOINT PARA ACTUALIZAR EQUIPOS ---
    @Patch(':id')
    @Roles(UserRole.ADMIN)
    update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
        return this.teamsService.update(id, updateTeamDto);
    }

    // --- NUEVO ENDPOINT PARA ELIMINAR EQUIPOS ---
    @Delete(':id')
    @Roles(UserRole.ADMIN)
    remove(@Param('id') id: string) {
        return this.teamsService.remove(id);
    }
}