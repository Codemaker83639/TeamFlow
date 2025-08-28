import apiClient from '@/services/apiClient';
import type { AxiosResponse } from 'axios';

// Definimos la "forma" de los datos que esperamos recibir del backend
export interface DashboardStats {
    activeProjects: number;
    completedTasks: number;
    teamMembers: number;
    workedHours: number;
}

export default {
    /**
     * Obtiene las estadísticas del dashboard para el usuario autenticado.
     */
    getStats(): Promise<AxiosResponse<DashboardStats>> {
        return apiClient.get('/dashboard/stats');
    },
};