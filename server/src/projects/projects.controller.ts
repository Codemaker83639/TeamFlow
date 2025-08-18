import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards,
    Request,
    ParseUUIDPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './projects.service';
import { AuthGuard } from '@nestjs/passport';

// Usamos @UseGuards a nivel de controlador para proteger todas las rutas de proyectos
@Controller('projects')
@UseGuards(AuthGuard('jwt'))
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    /**
     * Endpoint para crear un nuevo proyecto.
     * Requiere un token de autenticación.
     * El body debe contener el 'name' y el 'team_id'.
     */
    @Post()
    create(@Body() createProjectDto: CreateProjectDto, @Request() req) {
        // El objeto 'user' se obtiene del token JWT gracias al AuthGuard
        const user = req.user;
        return this.projectsService.create(createProjectDto, user);
    }

    /**
     * Endpoint para obtener todos los proyectos de un equipo específico.
     * Requiere un token de autenticación.
     * El teamId se pasa como parámetro en la URL.
     */
    @Get('/team/:teamId')
    findAllByTeam(@Param('teamId', ParseUUIDPipe) teamId: string) {
        // ParseUUIDPipe valida que el teamId sea un UUID válido
        return this.projectsService.findAllByTeam(teamId);
    }
}