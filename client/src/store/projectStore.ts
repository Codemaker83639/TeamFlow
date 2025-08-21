import { defineStore } from 'pinia';
import projectService, { type UpdateProjectPayload } from '@/services/projectService';
import type { Project } from '@/types/Project';
import { ProjectStatus } from '@/types/Project';

interface ProjectStoreState {
    projects: Project[];
    isLoading: boolean;
    statusFilter: ProjectStatus | 'all';
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
                const cleanedProjects = response.data.map(project => {
                    if (project.team && !project.team.members) {
                        project.team.members = [];
                    }
                    return project;
                });
                this.projects = cleanedProjects;
            } catch (error) {
                console.error('Error fetching all projects:', error);
                this.projects = [];
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

        async updateProject(projectId: string, payload: UpdateProjectPayload) {
            try {
                const response = await projectService.updateProject(projectId, payload);
                const updatedProject = response.data;
                const index = this.projects.findIndex(p => p.id === projectId);
                if (index !== -1) {
                    this.projects[index] = { ...this.projects[index], ...updatedProject };
                }
            } catch (error) {
                console.error('Error updating project:', error);
                alert('No se pudo actualizar el proyecto.');
                throw error;
            }
        },

        async deleteProject(projectId: string) {
            const confirmed = window.confirm('¿Estás seguro de que quieres eliminar este proyecto? Esta acción no se puede deshacer.');
            if (!confirmed) return;

            try {
                await projectService.deleteProject(projectId);
                this.projects = this.projects.filter(p => p.id !== projectId);
            } catch (error) {
                console.error('Error deleting project:', error);
                alert('No se pudo eliminar el proyecto.');
                throw error;
            }
        },

        setStatusFilter(status: ProjectStatus | 'all') {
            this.statusFilter = status;
        },

        setSearchQuery(query: string) {
            this.searchQuery = query;
        },
    },
});