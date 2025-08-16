import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
    UseGuards,
    Request,
} from '@nestjs/common';
import { TasksService, CreateTaskDto, UpdateTaskDto } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    @UseGuards(AuthGuard('jwt')) // <-- 1. PROTEGE LA RUTA, requiere un token de autenticación
    create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
        // 2. Extraemos el usuario del token (inyectado por el AuthGuard)
        const creator = req.user;
        // 3. Pasamos el DTO y el usuario creador al servicio
        return this.tasksService.create(createTaskDto, creator);
    }

    @Get()
    findAll() {
        return this.tasksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.tasksService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateTaskDto: UpdateTaskDto,
    ) {
        return this.tasksService.update(id, updateTaskDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.tasksService.remove(id);
    }
}