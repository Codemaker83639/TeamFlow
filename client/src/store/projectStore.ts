// client/src/store/projectStore.ts
import { defineStore } from 'pinia';
import projectService from '@/services/projectService';
import type { Project } from '@/types/Project';
import { ProjectStatus } from '@/types/Project';

interface ProjectStoreState {
    projects: Project[];
    isLoading: boolean;
    statusFilter: ProjectStatus | 'all'; // Para el filtro por estado
    searchQuery: string;                   // Para el filtro por nombre
}

interface CreateProjectPayload {
    name: string;
    description?: string;
    team_id: string;
}

export const useProjectStore = defineStore('projectStore', {
    state: (): ProjectStoreState => ({
        projects: [],
        isLoading: false,
        statusFilter: 'all', // Por defecto, muestra todos
        searchQuery: '',     // Por defecto, la búsqueda está vacía
    }),

    getters: {
        /**
         * Devuelve una lista de proyectos filtrada según el estado y la búsqueda.
         * Este getter es reactivo: se recalculará automáticamente cada vez que
         * cambie el estado de los filtros o la lista de proyectos.
         */
        filteredProjects(state): Project[] {
            let projectsToFilter = [...state.projects];

            // 1. Aplicar filtro por estado
            if (state.statusFilter !== 'all') {
                projectsToFilter = projectsToFilter.filter(
                    (project) => project.status === state.statusFilter
                );
            }

            // 2. Aplicar filtro por búsqueda de texto
            if (state.searchQuery) {
                const query = state.searchQuery.toLowerCase();
                projectsToFilter = projectsToFilter.filter((project) =>
                    project.name.toLowerCase().includes(query)
                );
            }

            return projectsToFilter;
        }
    },

    actions: {
        async fetchAllProjects() {
            this.isLoading = true;
            try {
                const response = await projectService.getAllProjects();
                this.projects = response.data;
            } catch (error) {
                console.error('Error fetching all projects:', error);
            } finally {
                this.isLoading = false;
            }
        },

        async createProject(payload: CreateProjectPayload) {
            // ... (sin cambios)
        },

        // --- NUEVAS ACCIONES PARA MANEJAR LOS FILTROS ---
        setStatusFilter(status: ProjectStatus | 'all') {
            this.statusFilter = status;
        },

        setSearchQuery(query: string) {
            this.searchQuery = query;
        },
    },
});