import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
// --- 1. IMPORTAMOS EL SERVICIO DE NOTIFICACIONES ---
import { NotificationsService } from './notifications.service';
import { User } from '../auth/entities/user.entity';

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

  // --- 2. INYECTAMOS EL SERVICIO EN EL CONSTRUCTOR ---
  constructor(private readonly notificationsService: NotificationsService) { }

  private connectedUsers: Map<string, string> = new Map();

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      console.log(`User connected: ${userId} with socket ID: ${client.id}`);
      this.connectedUsers.set(userId, client.id);
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

  /**
   * Envía una notificación en tiempo real a un usuario y la guarda en la base de datos.
   * @param recipient El usuario que recibirá la notificación.
   * @param payload El contenido del mensaje y los datos adicionales.
   */
  async sendNotificationToUser(recipient: User, payload: { message: string, taskId?: string }) {
    // --- 3. GUARDAMOS LA NOTIFICACIÓN EN LA BASE DE DATOS ---
    await this.notificationsService.create({
      recipient: recipient,
      message: payload.message,
      // Aquí podrías añadir la lógica para guardar task, project, etc.
    });
    // --------------------------------------------------------

    const socketId = this.connectedUsers.get(recipient.id);
    if (socketId) {
      // El payload que se envía al frontend es el mismo que recibimos
      this.server.to(socketId).emit('notification', payload);
      console.log(`Sent notification to user ${recipient.id}`);
    } else {
      console.log(`User ${recipient.id} not connected, notification stored in DB.`);
    }
  }
}