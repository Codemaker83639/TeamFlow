import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Request,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './projects.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')
@UseGuards(AuthGuard('jwt'))
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    /**
     * Endpoint para crear un nuevo proyecto.
     */
    @Post()
    create(@Body() createProjectDto: CreateProjectDto, @Request() req) {
        const user = req.user;
        return this.projectsService.create(createProjectDto, user);
    }

    /**
     * Endpoint para obtener TODOS los proyectos.
     */
    @Get()
    findAll() {
        return this.projectsService.findAll();
    }
}