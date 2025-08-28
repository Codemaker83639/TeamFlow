import { defineStore } from 'pinia';
import dashboardService, { type DashboardStats } from '@/services/dashboardService';

// Definimos la estructura del estado de esta tienda
interface DashboardStoreState {
    stats: DashboardStats | null;
    isLoading: boolean;
}

export const useDashboardStore = defineStore('dashboardStore', {
    state: (): DashboardStoreState => ({
        // Inicializamos las estadísticas como nulas hasta que las carguemos
        stats: null,
        isLoading: false,
    }),

    actions: {
        /**
         * Obtiene las estadísticas del dashboard desde el backend y las guarda en el estado.
         */
        async fetchDashboardStats() {
            this.isLoading = true;
            try {
                const response = await dashboardService.getStats();
                this.stats = response.data;
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
                // En caso de error, dejamos las estadísticas como nulas
                this.stats = null;
            } finally {
                this.isLoading = false;
            }
        },
    },
});