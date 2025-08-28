import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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

    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(
    file: Express.Multer.File,
    taskId: string,
    userId: string,
  ): Promise<TaskAttachment> {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const task = await this.taskRepository.findOneBy({ id: taskId });
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!task || !user) {
      throw new NotFoundException('Task or User not found');
    }

    // --- CORRECCIÓN DEFINITIVA ---
    // Guardamos solo el nombre del archivo, que es más robusto.
    const newAttachment = this.attachmentRepository.create({
      file_name: file.originalname,
      file_path: file.filename, // Usamos file.filename en lugar de file.path
      mime_type: file.mimetype,
      file_size_kb: Math.round(file.size / 1024),
      task: task,
      uploaded_by: user,
    });
    // ----------------------------

    return this.attachmentRepository.save(newAttachment);
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