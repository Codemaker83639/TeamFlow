import apiClient from '@/services/apiClient'; // Reutilizamos el apiClient que ya tienes
import type { AxiosResponse } from 'axios';
import type { Notification } from '@/store/notificationStore'; // Importamos el tipo

export default {
    /**
     * Obtiene el historial de notificaciones para el usuario autenticado.
     */
    getNotifications(): Promise<AxiosResponse<Notification[]>> {
        return apiClient.get('/notifications');
    },

    // Aquí podríamos añadir más llamadas en el futuro, como markAsRead, etc.
};