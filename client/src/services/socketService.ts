import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/auth';
import { useNotificationStore } from '@/store/notificationStore';
// --- 1. IMPORTAMOS LA TIENDA DE TAREAS ---
import { useTaskStore } from '@/store/taskStore';

// Definimos el tipo de datos que esperamos para un cronómetro activo
interface ActiveTimerPayload {
    taskId: string;
    taskTitle: string;
    startTime: string;
}

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

        this.socket.on('notification', (payload: { message: string }) => {
            console.log('New notification received:', payload);
            const notificationStore = useNotificationStore();
            notificationStore.handleIncomingNotification(payload);
        });

        // --- 2. NUEVO OYENTE PARA CRONÓMETROS ABANDONADOS ---
        this.socket.on('active_timer_found', (payload: ActiveTimerPayload) => {
            console.log('Active timer found:', payload);
            const taskStore = useTaskStore();
            // Llamamos a una acción en el taskStore para que sepa que debe mostrar el modal
            taskStore.setAbandonedTimer(payload);
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