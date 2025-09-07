import { defineStore } from 'pinia';
import reportService, { type ReportFilters } from '@/services/reportService';

// Interfaces para la estructura de datos
interface ReportMetrics {
    completedTasks: number;
    loggedHours: number;
    completedProjects: number;
}

interface ChartDataPoint {
    [key: string]: any;
}

interface ReportCharts {
    taskStatusDistribution: ChartDataPoint[];
    effortByProject: { projectName: string; hours: number }[];
}

interface ReportStoreState {
    metrics: ReportMetrics | null;
    charts: ReportCharts; // <-- CAMBIO #1: Ya no es nullable
    isLoading: boolean;
    error: string | null;
    appliedFilters: ReportFilters | null;
}

// VALOR INICIAL PARA EL ESTADO
// Esto asegura que la estructura siempre exista, evitando errores de 'null'.
const initialState: ReportStoreState = {
    metrics: null,
    charts: { // <-- CAMBIO #2: Inicializamos con la estructura vacía
        taskStatusDistribution: [],
        effortByProject: [],
    },
    isLoading: false,
    error: null,
    appliedFilters: {
        timeRange: 'weekly',
    },
};

export const useReportStore = defineStore('reportStore', {
    state: (): ReportStoreState => initialState,

    actions: {
        async fetchReports(filters: ReportFilters = {}) {
            this.isLoading = true;
            this.error = null;

            // Combinamos los filtros actuales con los nuevos
            const queryFilters = { ...this.appliedFilters, ...filters };
            this.appliedFilters = queryFilters; // Actualizamos los filtros aplicados

            try {
                const response = await reportService.getReports(queryFilters);
                this.metrics = response.data.metrics;
                this.charts = response.data.charts;
            } catch (err: any) {
                this.error = err.response?.data?.message || 'Error al obtener los reportes.';
                // En caso de error, reseteamos a un estado seguro.
                this.metrics = null;
                this.charts = { taskStatusDistribution: [], effortByProject: [] };
            } finally {
                this.isLoading = false;
            }
        },

        // Acción para actualizar filtros y volver a llamar a la API
        async applyFilters(newFilters: ReportFilters) {
            await this.fetchReports(newFilters);
        },

        // Acción específica para el rango de tiempo
        async setTimeRange(timeRange: 'daily' | 'weekly' | 'monthly') {
            await this.fetchReports({ timeRange });
        }
    },
});

