import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskAttachment } from './entities/task-attachment.entity';
import { User } from '../auth/entities/user.entity';
import { Task } from '../tasks/entities/task.entity';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectRepository(TaskAttachment)
    private readonly attachmentRepository: Repository<TaskAttachment>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly notificationsGateway: NotificationsGateway,
  ) { }

  async create(
    file: Express.Multer.File,
    taskId: string,
    userId: string,
  ): Promise<TaskAttachment> {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['assigned_to'], // Cargamos la relación completa
    });

    if (!task || !user) {
      throw new NotFoundException('Task or User not found');
    }

    const filePath = file.path.replace(/\\/g, '/');

    const newAttachment = this.attachmentRepository.create({
      file_name: file.originalname,
      file_path: filePath,
      mime_type: file.mimetype,
      file_size_kb: Math.round(file.size / 1024),
      task: task,
      uploaded_by: user,
    });

    const savedAttachment = await this.attachmentRepository.save(newAttachment);

    // --- CORRECCIÓN AQUÍ ---
    if (task.assigned_to && task.assigned_to.id !== user.id) {
      const notificationPayload = {
        message: `${user.full_name} ha añadido un archivo a tu tarea: "${task.title}"`,
        taskId: task.id,
      };
      // Le pasamos el objeto de usuario completo (task.assigned_to)
      this.notificationsGateway.sendNotificationToUser(
        task.assigned_to,
        notificationPayload,
      );
    }
    // --- FIN DE LA CORRECCIÓN ---

    return savedAttachment;
  }

  async findAllByTask(taskId: string): Promise<TaskAttachment[]> {
    return this.attachmentRepository.find({
      where: { task: { id: taskId } },
      relations: ['uploaded_by'],
      order: { created_at: 'ASC' },
    });
  }

  async remove(id: number): Promise<void> {
    const result = await this.attachmentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Attachment with ID #${id} not found`);
    }
  }
}