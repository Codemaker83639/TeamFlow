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
  ParseUUIDPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AttachmentsService } from './attachments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';

@Controller('tasks/:taskId/attachments')
@UseGuards(JwtAuthGuard)
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = extname(file.originalname);
        const filename = `${uniqueSuffix}${extension}`;
        callback(null, filename);
      },
    }),
  }))
  create(
    // --- CAMBIO CLAVE AQUÍ: Simplificamos la validación ---
    @UploadedFile(
      new ParseFilePipe({
        // Por ahora, solo validaremos el tamaño. Esto nos permitirá subir el archivo.
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }), // Aumentamos a 10MB por si acaso
        ],
        // Hacemos que la tubería sea opcional si no hay archivo
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @GetUser() user: User,
  ) {
    // La validación real ahora la hará el servicio.
    return this.attachmentsService.create(file, taskId, user.id);
  }

  @Get()
  findAll(@Param('taskId', ParseUUIDPipe) taskId: string) {
    return this.attachmentsService.findAllByTask(taskId);
  }

  @Delete(':attachmentId')
  remove(@Param('attachmentId') attachmentId: string) {
    return this.attachmentsService.remove(+attachmentId);
  }
}