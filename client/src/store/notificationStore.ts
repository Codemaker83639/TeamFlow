import { defineStore } from 'pinia';
import notificationService from '@/services/notificationService';

// La interfaz Notification ahora necesita reflejar los datos del backend
export interface Notification {
    id: number;
    message: string;
    is_read: boolean;
    created_at: string;
    // Hacemos 'type' opcional para el historial, ya que viene del WebSocket sin él
    type?: 'info' | 'success' | 'warning' | 'error';
}

interface NotificationStoreState {
    toastNotifications: Notification[]; // Para las notificaciones emergentes
    notificationHistory: Notification[]; // Para el historial del dashboard
    isLoadingHistory: boolean;
    nextId: number;
}

export const useNotificationStore = defineStore('notificationStore', {
    state: (): NotificationStoreState => ({
        toastNotifications: [],
        notificationHistory: [],
        isLoadingHistory: false,
        nextId: 1,
    }),

    actions: {
        // Esta acción es para los TOASTS (notificaciones emergentes)
        addNotification(notification: { message: string, type: 'info' | 'success' | 'warning' | 'error' }) {
            const newNotification: Notification = {
                id: this.nextId++,
                is_read: false,
                created_at: new Date().toISOString(),
                ...notification,
            };
            this.toastNotifications.push(newNotification);
        },

        // Esta acción elimina un TOAST de la pantalla (cuando el usuario hace clic en la 'X')
        removeNotification(id: number) {
            this.toastNotifications = this.toastNotifications.filter(n => n.id !== id);
        },

        // Esta acción obtiene el historial para el dashboard
        async fetchNotificationHistory() {
            this.isLoadingHistory = true;
            try {
                const response = await notificationService.getNotifications();
                this.notificationHistory = response.data;
            } catch (error) {
                console.error('Error fetching notification history:', error);
                this.notificationHistory = [];
            } finally {
                this.isLoadingHistory = false;
            }
        },
    },

    // --- 👇 NUEVA SECCIÓN DE GETTERS 👇 ---
    getters: {
        /**
         * Devuelve las 3 notificaciones más recientes del historial.
         * El historial ya viene ordenado del más reciente al más antiguo desde el backend.
         */
        recentNotifications(state): Notification[] {
            return state.notificationHistory.slice(0, 3);
        },

        /**
         * Devuelve el número total de notificaciones en el historial.
         */
        hasMoreNotifications(state): boolean {
            return state.notificationHistory.length > 3;
        }
    }
});