import type { AxiosResponse } from 'axios';
import apiClient from '@/services/apiClient';

// 1. Interfaces que definen la "forma" de los datos.
// Coinciden con las que definimos en el backend.

export type TimeRange = 'daily' | 'weekly' | 'monthly';

export interface ReportFilters {
    timeRange?: TimeRange;
    userId?: string;
    teamId?: string;
}

export interface ReportData {
    metrics: {
        completedTasks: number;
        loggedHours: number;
        completedProjects: number;
    };
    charts: {
        taskStatusDistribution: any[];
        effortByProject: { projectName: string; hours: number }[];
    };
    filtersApplied: {
        timeRange: string;
        userId?: string;
        teamId?: string;
    };
}

// 2. Exportamos un objeto default con nuestro método, igual que en tus otros servicios.
export default {
    /**
     * Obtiene los datos de reportes desde el backend, aplicando los filtros especificados.
     * @param filters - Un objeto con los filtros a aplicar (timeRange, userId, teamId).
     * @returns La respuesta completa de Axios con los datos del reporte.
     */
    getReports(filters: ReportFilters): Promise<AxiosResponse<ReportData>> {
        return apiClient.get('/reports', {
            params: filters,
        });
    },
};