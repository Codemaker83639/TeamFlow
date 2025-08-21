import {
    Controller,
    Get,
    Post,
    Body,
    Patch,   // <--- Importado
    Param,   // <--- Importado
    Delete,  // <--- Importado
    UseGuards,
    Request,
    ParseUUIDPipe, // <--- Importado
} from '@nestjs/common';
import { ProjectsService, CreateProjectDto, UpdateProjectDto } from './projects.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')
@UseGuards(AuthGuard('jwt'))
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @Post()
    create(@Body() createProjectDto: CreateProjectDto, @Request() req) {
        return this.projectsService.create(createProjectDto, req.user);
    }

    @Get()
    findAll() {
        return this.projectsService.findAll();
    }

    // --- NUEVO ENDPOINT PARA ACTUALIZAR ---
    @Patch(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProjectDto: UpdateProjectDto) {
        return this.projectsService.update(id, updateProjectDto);
    }

    // --- NUEVO ENDPOINT PARA ELIMINAR ---
    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.projectsService.remove(id);
    }
}