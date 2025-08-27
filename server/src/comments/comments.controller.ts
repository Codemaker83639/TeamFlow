import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator'; // Asumimos que tienes este decorador
import { User } from '../auth/entities/user.entity';

@Controller('tasks/:taskId/comments') // 1. Rutas anidadas bajo tareas
@UseGuards(JwtAuthGuard) // 2. Proteger todas las rutas
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post() // Ruta final: POST /tasks/:taskId/comments
  create(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Body() createCommentDto: CreateCommentDto,
    @GetUser() user: User, // 3. Obtener el usuario del token JWT
  ) {
    return this.commentsService.create(createCommentDto, user.id, taskId);
  }

  @Get() // Ruta final: GET /tasks/:taskId/comments
  findAll(@Param('taskId', ParseUUIDPipe) taskId: string) {
    return this.commentsService.findAllByTaskId(taskId);
  }

  // --- Las siguientes rutas operan sobre un comentario específico, por lo que no necesitan el taskId ---
  // Se podría crear un controlador aparte para esto, pero por simplicidad lo dejamos aquí.

  @Patch('/comment/:commentId') // Ruta final: PATCH /tasks/:taskId/comments/comment/:commentId
  update(
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto
  ) {
    // Aquí podrías añadir lógica para asegurar que solo el autor del comentario puede editarlo
    return this.commentsService.update(+commentId, updateCommentDto);
  }

  @Delete('/comment/:commentId') // Ruta final: DELETE /tasks/:taskId/comments/comment/:commentId
  remove(@Param('commentId') commentId: string) {
    // Aquí también iría la lógica de autorización
    return this.commentsService.remove(+commentId);
  }
}