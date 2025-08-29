import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationsService } from './notifications.service';
import { User } from '../auth/entities/user.entity';
// --- 1. IMPORTAMOS HERRAMIENTAS ADICIONALES ---
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { TimeEntry } from '../time-tracking/entities/time-entry.entity';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly notificationsService: NotificationsService,
    // --- 2. INYECTAMOS EL REPOSITORIO DE TimeEntry ---
    @InjectRepository(TimeEntry)
    private readonly timeEntryRepository: Repository<TimeEntry>,
  ) { }

  private connectedUsers: Map<string, string> = new Map();

  // --- 3. MODIFICAMOS handleConnection PARA QUE SEA ASÍNCRONO ---
  async handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      console.log(`User connected: ${userId} with socket ID: ${client.id}`);
      this.connectedUsers.set(userId, client.id);

      // --- 4. LÓGICA DE DETECCIÓN DE CRONÓMETRO ABANDONADO ---
      const activeTimer = await this.timeEntryRepository.findOne({
        where: {
          user: { id: userId },
          end_time: IsNull(),
        },
        relations: ['task'], // Cargamos la información de la tarea asociada
      });

      // Si se encuentra un cronómetro activo...
      if (activeTimer) {
        console.log(`Active timer found for user ${userId} on task "${activeTimer.task.title}"`);
        // ...le enviamos un evento privado solo a él.
        this.server.to(client.id).emit('active_timer_found', {
          taskId: activeTimer.task.id,
          taskTitle: activeTimer.task.title,
          startTime: activeTimer.start_time,
        });
      }
      // --- FIN DE LA LÓGICA ---
    }
  }

  handleDisconnect(client: Socket) {
    for (const [userId, socketId] of this.connectedUsers.entries()) {
      if (socketId === client.id) {
        this.connectedUsers.delete(userId);
        console.log(`User disconnected: ${userId}`);
        break;
      }
    }
  }

  async sendNotificationToUser(recipient: User, payload: { message: string; taskId?: string }) {
    await this.notificationsService.create({
      recipient: recipient,
      message: payload.message,
    });

    const socketId = this.connectedUsers.get(recipient.id);
    if (socketId) {
      this.server.to(socketId).emit('notification', payload);
      console.log(`Sent notification to user ${recipient.id}`);
    } else {
      console.log(`User ${recipient.id} not connected, notification stored in DB.`);
    }
  }
}