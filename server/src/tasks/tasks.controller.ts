import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
} from '@nestjs/common';
import { TasksService, CreateTaskDto, UpdateTaskDto } from './tasks.service';

@Controller('tasks') // Todas las rutas de este controlador empezarán con /tasks
export class TasksController {
    // Inyectamos el servicio para poder usar sus métodos
    constructor(private readonly tasksService: TasksService) { }

    @Post() // Maneja las peticiones POST a /tasks
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(createTaskDto);
    }

    @Get() // Maneja las peticiones GET a /tasks
    findAll() {
        return this.tasksService.findAll();
    }

    @Get(':id') // Maneja las peticiones GET a /tasks/:id
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.tasksService.findOne(id);
    }

    @Patch(':id') // Maneja las peticiones PATCH a /tasks/:id
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateTaskDto: UpdateTaskDto,
    ) {
        return this.tasksService.update(id, updateTaskDto);
    }

    @Delete(':id') // Maneja las peticiones DELETE a /tasks/:id
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.tasksService.remove(id);
    }
}