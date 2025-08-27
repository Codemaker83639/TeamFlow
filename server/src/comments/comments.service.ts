import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { User } from '../auth/entities/user.entity';
import { Task } from '../tasks/entities/task.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    // Inyectamos los repositorios de Task y User para verificar que existan
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(
    createCommentDto: CreateCommentDto,
    userId: string,
    taskId: string,
  ): Promise<Comment> {
    // Verificamos que la tarea y el usuario existan
    const user = await this.userRepository.findOneBy({ id: userId });
    const task = await this.taskRepository.findOneBy({ id: taskId });

    if (!user || !task) {
      throw new NotFoundException('User or Task not found');
    }

    const newComment = this.commentRepository.create({
      content: createCommentDto.content,
      user, // Asociamos la entidad completa
      task, // Asociamos la entidad completa
    });

    return this.commentRepository.save(newComment);
  }

  // ... (El resto de los métodos: findAllByTaskId, update, remove, findOne no cambian)
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