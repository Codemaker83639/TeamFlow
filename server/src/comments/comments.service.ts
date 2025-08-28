import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { User } from '../auth/entities/user.entity';
import { Task } from '../tasks/entities/task.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
// --- 1. IMPORTAMOS NUESTRO GATEWAY ---
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // --- 2. INYECTAMOS EL GATEWAY ---
    private readonly notificationsGateway: NotificationsGateway,
  ) { }

  async create(
    createCommentDto: CreateCommentDto,
    userId: string,
    taskId: string,
  ): Promise<Comment> {
    const user = await this.userRepository.findOneBy({ id: userId });
    // --- 3. Cargamos la tarea con la relación 'assigned_to' para saber a quién notificar ---
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['assigned_to'],
    });

    if (!user || !task) {
      throw new NotFoundException('User or Task not found');
    }

    const newComment = this.commentRepository.create({
      content: createCommentDto.content,
      user,
      task,
    });

    const savedComment = await this.commentRepository.save(newComment);

    // --- 4. LÓGICA DE NOTIFICACIÓN ---
    // Si la tarea tiene un usuario asignado Y no es el mismo usuario que está comentando...
    if (task.assigned_to && task.assigned_to.id !== user.id) {
      const notificationPayload = {
        message: `${user.full_name} ha comentado en tu tarea: "${task.title}"`,
        taskId: task.id,
      };
      // ...le enviamos una notificación.
      this.notificationsGateway.sendNotificationToUser(
        task.assigned_to.id,
        notificationPayload,
      );
    }
    // --- FIN DE LA LÓGICA ---

    return savedComment;
  }

  // ... (El resto del servicio no cambia)
  async findAllByTaskId(taskId: string): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { task: { id: taskId } },
      relations: ['user'],
      order: { created_at: 'ASC' },
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.commentRepository.preload({ id: id, ...updateCommentDto });
    if (!comment) { throw new NotFoundException(`Comment with ID #${id} not found`); }
    return this.commentRepository.save(comment);
  }

  async remove(id: number): Promise<void> {
    const result = await this.commentRepository.delete(id);
    if (result.affected === 0) { throw new NotFoundException(`Comment with ID #${id} not found`); }
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOneBy({ id });
    if (!comment) { throw new NotFoundException(`Comment with ID #${id} not found`); }
    return comment;
  }
}