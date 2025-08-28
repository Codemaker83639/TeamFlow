import { defineStore } from 'pinia';
import notificationService from '@/services/notificationService';

export interface Notification {
    id: number;
    message: string;
    is_read: boolean;
    created_at: string;
    type?: 'info' | 'success' | 'warning' | 'error';
}

interface NotificationStoreState {
    toastNotifications: Notification[];
    notificationHistory: Notification[];
    isLoadingHistory: boolean;
    nextToastId: number; // Renombramos para mayor claridad
}

export const useNotificationStore = defineStore('notificationStore', {
    state: (): NotificationStoreState => ({
        toastNotifications: [],
        notificationHistory: [],
        isLoadingHistory: false,
        nextToastId: 1,
    }),

    actions: {
        // Esta acción AÑADE un toast a la pantalla
        addToastNotification(notification: { message: string, type: 'info' | 'success' | 'warning' | 'error' }) {
            const newToast: Notification = {
                id: this.nextToastId++, // Usa su propio ID, ya que no viene de la BD
                is_read: false,
                created_at: new Date().toISOString(),
                ...notification,
            };
            this.toastNotifications.push(newToast);
        },

        // Esta acción ELIMINA un toast de la pantalla
        removeToastNotification(id: number) {
            this.toastNotifications = this.toastNotifications.filter(n => n.id !== id);
        },

        // Esta acción OBTIENE el historial desde la API
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

        // --- ¡NUEVA ACCIÓN CLAVE! ---
        // Esta acción maneja una notificación que llega en tiempo real
        handleIncomingNotification(notificationFromServer: { message: string }) {
            // 1. La mostramos como un "toast" emergente
            this.addToastNotification({
                message: notificationFromServer.message,
                type: 'info',
            });

            // 2. La añadimos al principio del historial del dashboard
            // Creamos un objeto temporal hasta que recarguemos la página
            const newHistoryItem: Notification = {
                id: Date.now(), // ID temporal para el v-for
                message: notificationFromServer.message,
                is_read: false,
                created_at: new Date().toISOString(),
            };
            this.notificationHistory.unshift(newHistoryItem);
        },
    },

    getters: {
        recentNotifications(state): Notification[] {
            return state.notificationHistory.slice(0, 3);
        },
        hasMoreNotifications(state): boolean {
            return state.notificationHistory.length > 3;
        }
    }
});