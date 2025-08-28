import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { User } from '../auth/entities/user.entity';
import { Task } from '../tasks/entities/task.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
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
    private readonly notificationsGateway: NotificationsGateway,
  ) { }

  async create(
    createCommentDto: CreateCommentDto,
    userId: string,
    taskId: string,
  ): Promise<Comment> {
    const user = await this.userRepository.findOneBy({ id: userId });
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['assigned_to'], // Cargamos la relación completa del usuario asignado
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

    // --- CORRECCIÓN AQUÍ ---
    if (task.assigned_to && task.assigned_to.id !== user.id) {
      const notificationPayload = {
        message: `${user.full_name} ha comentado en tu tarea: "${task.title}"`,
        taskId: task.id,
      };
      // Le pasamos el objeto de usuario completo (task.assigned_to)
      this.notificationsGateway.sendNotificationToUser(
        task.assigned_to,
        notificationPayload,
      );
    }
    // --- FIN DE LA CORRECCIÓN ---

    return savedComment;
  }

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