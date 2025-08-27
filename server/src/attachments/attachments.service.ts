import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskAttachment } from './entities/task-attachment.entity';
import { User } from '../auth/entities/user.entity';
import { Task } from '../tasks/entities/task.entity';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectRepository(TaskAttachment)
    private readonly attachmentRepository: Repository<TaskAttachment>,

    // Necesitamos verificar que la tarea y el usuario existen
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  /**
   * Crea un registro de un archivo adjunto en la base de datos.
   * @param file La información del archivo subido por Multer.
   * @param taskId El ID de la tarea a la que se adjunta el archivo.
   * @param userId El ID del usuario que sube el archivo.
   */
  async create(
    file: Express.Multer.File,
    taskId: string,
    userId: string,
  ): Promise<TaskAttachment> {
    if (!file) {
      throw new NotFoundException('File not provided');
    }

    const task = await this.taskRepository.findOneBy({ id: taskId });
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!task || !user) {
      throw new NotFoundException('Task or User not found');
    }

    const newAttachment = this.attachmentRepository.create({
      file_name: file.originalname,
      file_path: file.path, // La ruta donde Multer guardó el archivo
      mime_type: file.mimetype,
      file_size_kb: Math.round(file.size / 1024),
      task: task,
      uploaded_by: user,
    });

    return this.attachmentRepository.save(newAttachment);
  }

  /**
   * Obtiene todos los adjuntos de una tarea específica.
   * @param taskId El ID de la tarea.
   */
  async findAllByTask(taskId: string): Promise<TaskAttachment[]> {
    return this.attachmentRepository.find({
      where: { task: { id: taskId } },
      relations: ['uploaded_by'], // Carga la info del usuario que lo subió
      order: { created_at: 'ASC' },
    });
  }

  /**
   * Elimina un archivo adjunto.
   * @param id El ID del registro del adjunto.
   */
  async remove(id: number): Promise<void> {
    // Aquí también deberíamos añadir la lógica para borrar el archivo físico del servidor,
    // pero por ahora nos enfocaremos en borrar el registro de la BD.
    const result = await this.attachmentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Attachment with ID #${id} not found`);
    }
  }
}