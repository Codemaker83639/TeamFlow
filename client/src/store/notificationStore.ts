import { defineStore } from 'pinia';

// Definimos la estructura de una notificación
export interface Notification {
    id: number;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    // taskId?: string; 
}

interface NotificationStoreState {
    notifications: Notification[];
    nextId: number;
}

export const useNotificationStore = defineStore('notificationStore', {
    state: (): NotificationStoreState => ({
        notifications: [],
        nextId: 1,
    }),

    actions: {
        /**
         * Añade una nueva notificación a la lista.
         * @param notification El objeto de notificación sin el ID.
         */
        addNotification(notification: Omit<Notification, 'id'>) {
            const newNotification = {
                id: this.nextId++,
                ...notification,
            };
            this.notifications.push(newNotification);

            // --- HEMOS ELIMINADO EL setTimeout DE AQUÍ ---
            // Ahora la notificación no desaparecerá por sí sola.
        },

        /**
         * Elimina una notificación de la lista por su ID.
         * @param id El ID de la notificación a eliminar.
         */
        removeNotification(id: number) {
            this.notifications = this.notifications.filter(n => n.id !== id);
        },
    },
});