import { Controller, Get, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { Notification } from './entities/notification.entity';

@Controller('notifications')
@UseGuards(JwtAuthGuard) // 1. Proteger todas las rutas de este controlador
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }

  /**
   * Endpoint para obtener el historial de notificaciones del usuario autenticado.
   */
  @Get()
  findAllForUser(@GetUser() user: User): Promise<Notification[]> {
    // 2. Usamos el decorador @GetUser para obtener el usuario del token JWT
    // 3. Llamamos al servicio para que busque las notificaciones de ese usuario específico
    return this.notificationsService.findAllForUser(user.id);
  }

  // Más adelante, podríamos añadir un endpoint para marcar notificaciones como leídas
  // @Patch(':id/read')
  // markAsRead(@Param('id') id: string) { ... }
}