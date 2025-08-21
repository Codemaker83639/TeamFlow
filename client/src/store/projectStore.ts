// client/src/store/projectStore.ts
import { defineStore } from 'pinia';
import projectService from '@/services/projectService';
import type { Project } from '@/types/Project';

interface ProjectStoreState {
    projects: Project[];
    isLoading: boolean;
    statusFilter: 'all' | 'active' | 'completed' | 'archived';
    searchQuery: string;
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
        statusFilter: 'all',
        searchQuery: '',
    }),

    getters: {
        filteredProjects(state): Project[] {
            let projectsToFilter = [...state.projects];
            if (state.statusFilter !== 'all') {
                projectsToFilter = projectsToFilter.filter(
                    (project) => project.status === state.statusFilter
                );
            }
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

                // --- LÓGICA DE NORMALIZACIÓN DE DATOS (LA SOLUCIÓN) ---
                // "Limpiamos" los datos antes de guardarlos en el estado.
                const cleanedProjects = response.data.map(project => {
                    // Nos aseguramos de que cada equipo tenga una lista de miembros,
                    // aunque sea vacía, para prevenir errores en el template.
                    if (project.team && !project.team.members) {
                        project.team.members = [];
                    }
                    return project;
                });

                this.projects = cleanedProjects;

            } catch (error) {
                console.error('Error fetching all projects:', error);
                this.projects = []; // En caso de error, asegurar que sea un array vacío
            } finally {
                this.isLoading = false;
            }
        },

        async createProject(payload: CreateProjectPayload) {
            this.isLoading = true;
            try {
                await projectService.createProject(payload);
                await this.fetchAllProjects();
            } catch (error) {
                console.error('Error creating project:', error);
                throw error;
            } finally {
                this.isLoading = false;
            }
        },

        setStatusFilter(status: 'all' | 'active' | 'completed' | 'archived') {
            this.statusFilter = status;
        },

        setSearchQuery(query: string) {
            this.searchQuery = query;
        },
    },
});