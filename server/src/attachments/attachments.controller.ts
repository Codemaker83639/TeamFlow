import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AttachmentsService } from './attachments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';

@Controller('tasks/:taskId/attachments') // Rutas anidadas bajo tareas
@UseGuards(JwtAuthGuard) // Proteger todas las rutas
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) { }

  /**
   * Endpoint para subir un archivo adjunto a una tarea.
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // 1. Interceptor para manejar un solo archivo llamado 'file'
  create(
    @UploadedFile(
      // 2. Tuberías de validación para el archivo
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // Límite de 5MB
          new FileTypeValidator({
            // Expresión regular para los tipos de archivo permitidos
            fileType: '.(png|jpeg|jpg|gif|pdf|doc|docx|xls|xlsx|ppt|pptx)',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @GetUser() user: User, // 3. Obtener el usuario autenticado
  ) {
    return this.attachmentsService.create(file, taskId, user.id);
  }

  /**
   * Endpoint para obtener todos los adjuntos de una tarea.
   */
  @Get()
  findAll(@Param('taskId', ParseUUIDPipe) taskId: string) {
    return this.attachmentsService.findAllByTask(taskId);
  }

  /**
   * Endpoint para eliminar un adjunto.
   */
  @Delete(':attachmentId')
  remove(@Param('attachmentId') attachmentId: string) {
    // El '+' convierte el string del parámetro a número
    return this.attachmentsService.remove(+attachmentId);
  }
}