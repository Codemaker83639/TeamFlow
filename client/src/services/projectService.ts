// client/src/services/projectService.ts
import axios, { type AxiosResponse } from 'axios';
import type { Project, ProjectStatus } from '@/types/Project';

const apiClient = axios.create({ baseURL: 'http://localhost:3000' });

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error)
);

export interface CreateProjectPayload {
    name: string;
    description?: string;
    team_id: string;
}

// Interfaz para los datos que se pueden actualizar
export interface UpdateProjectPayload {
    name?: string;
    description?: string;
    status?: ProjectStatus;
}

export default {
    getAllProjects(): Promise<AxiosResponse<Project[]>> {
        return apiClient.get('/projects');
    },
    createProject(payload: CreateProjectPayload): Promise<AxiosResponse<Project>> {
        return apiClient.post('/projects', payload);
    },
    // --- NUEVAS FUNCIONES AÑADIDAS ---
    updateProject(projectId: string, payload: UpdateProjectPayload): Promise<AxiosResponse<Project>> {
        return apiClient.patch(`/projects/${projectId}`, payload);
    },
    deleteProject(projectId: string): Promise<AxiosResponse<void>> {
        return apiClient.delete(`/projects/${projectId}`);
    },
};