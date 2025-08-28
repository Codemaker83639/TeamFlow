import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { User } from '../auth/entities/user.entity';

// Usaremos un DTO para definir los datos necesarios para crear una notificación
export interface CreateNotificationDto {
  message: string;
  recipient: User;
  // Podríamos añadir task, project, etc. aquí si fuera necesario
}

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) { }

  /**
   * Guarda una nueva notificación en la base de datos.
   * @param createNotificationDto Los datos de la notificación a crear.
   */
  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const newNotification = this.notificationRepository.create(createNotificationDto);
    return this.notificationRepository.save(newNotification);
  }

  /**
   * Busca todas las notificaciones para un usuario específico.
   * @param userId El ID del usuario para el que se buscan las notificaciones.
   */
  async findAllForUser(userId: string): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { recipient: { id: userId } },
      order: { created_at: 'DESC' }, // Ordenar de más reciente a más antigua
      take: 20, // Opcional: Limitar a las últimas 20 notificaciones para no sobrecargar
    });
  }

  // Más adelante podríamos añadir un método para marcar una notificación como leída
  // async markAsRead(notificationId: number): Promise<Notification> { ... }
}