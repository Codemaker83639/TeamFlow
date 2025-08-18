// client/src/store/projectStore.ts
import { defineStore } from 'pinia';
import projectService from '@/services/projectService';
import type { Project } from '@/types/Project';

interface ProjectStoreState {
    projects: Project[];
    isLoading: boolean;
}

// Definimos el tipo de datos que necesita la función de crear proyecto
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
        /**
         * Obtiene todos los proyectos de un equipo específico desde la API.
         * @param teamId El ID del equipo del cual obtener los proyectos.
         */
        async fetchProjectsByTeam(teamId: string) {
            this.isLoading = true;
            try {
                const response = await projectService.getProjectsByTeam(teamId);
                this.projects = response.data;
            } catch (error) {
                console.error('Error fetching projects:', error);
                // Aquí podríamos mostrar una notificación de error al usuario
            } finally {
                this.isLoading = false;
            }
        },

        /**
         * Crea un nuevo proyecto y actualiza la lista.
         * @param payload Los datos del nuevo proyecto.
         */
        async createProject(payload: CreateProjectPayload) {
            this.isLoading = true;
            try {
                await projectService.createProject(payload);
                // Después de crear, volvemos a obtener la lista de proyectos para que se refleje el nuevo.
                await this.fetchProjectsByTeam(payload.team_id);
            } catch (error) {
                console.error('Error creating project:', error);
                // Re-lanzamos el error para que el componente que llama a esta acción
                // sepa que algo salió mal y pueda reaccionar (ej: no cerrar un modal).
                throw error;
            } finally {
                this.isLoading = false;
            }
        },
    },
});