// client/src/store/projectStore.ts
import { defineStore } from 'pinia';
import projectService from '@/services/projectService';
import type { Project } from '@/types/Project';

interface ProjectStoreState {
    projects: Project[];
    isLoading: boolean;
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
    }),

    actions: {
        // ACCIÓN ACTUALIZADA: Ahora obtiene todos los proyectos
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
            this.isLoading = true;
            try {
                await projectService.createProject(payload);
                // Después de crear, actualizamos la lista completa de proyectos
                await this.fetchAllProjects();
            } catch (error) {
                console.error('Error creating project:', error);
                throw error;
            } finally {
                this.isLoading = false;
            }
        },
    },
});