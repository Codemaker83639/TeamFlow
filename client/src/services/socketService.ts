import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/auth';
// --- 1. IMPORTAMOS NUESTRA NUEVA TIENDA DE NOTIFICACIONES ---
import { useNotificationStore } from '@/store/notificationStore';

class SocketService {
    socket: Socket | null = null;

    connect(): void {
        if (this.socket?.connected) {
            return;
        }

        const authStore = useAuthStore();
        const user = authStore.user;

        if (!user) {
            console.error('SocketService: No user found to establish connection.');
            return;
        }

        console.log(`Attempting to connect WebSocket for user: ${user.id}`);

        this.socket = io('http://localhost:3000', {
            query: {
                userId: user.id,
            },
        });

        this.socket.on('connect', () => {
            console.log('Successfully connected to WebSocket server with ID:', this.socket?.id);
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server.');
        });

        // --- 2. MODIFICAMOS EL OYENTE DEL EVENTO 'notification' ---
        this.socket.on('notification', (payload: { message: string }) => {
            console.log('New notification received:', payload);

            // Obtenemos una instancia de nuestra tienda de notificaciones
            const notificationStore = useNotificationStore();

            // Llamamos a la acción para añadir la nueva notificación
            notificationStore.addNotification({
                message: payload.message,
                type: 'info', // Por ahora, todas serán de tipo 'info'
            });
        });
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}

export const socketService = new SocketService();