import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/auth';
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

        // --- CORRECCIÓN AQUÍ ---
        this.socket.on('notification', (payload: { message: string }) => {
            console.log('New notification received:', payload);
            const notificationStore = useNotificationStore();
            // Llamamos a la nueva acción que actualiza tanto los toasts como el historial
            notificationStore.handleIncomingNotification(payload);
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