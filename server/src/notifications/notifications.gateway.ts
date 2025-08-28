import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// --- CONFIGURACIÓN DEFINITIVA DEL GATEWAY ---
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:8080', // Permitimos explícitamente a nuestro frontend
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket', 'polling'], // Métodos de conexión permitidos
})
// ------------------------------------------
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers: Map<string, string> = new Map(); // K: userId, V: socketId

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

  sendNotificationToUser(userId: string, payload: any) {
    const socketId = this.connectedUsers.get(userId);
    if (socketId) {
      this.server.to(socketId).emit('notification', payload);
      console.log(`Sent notification to user ${userId}`);
    } else {
      console.log(`User ${userId} not connected, notification not sent.`);
    }
  }
}