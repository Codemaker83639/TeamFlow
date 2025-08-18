// client/src/services/projectService.ts
import axios, { type AxiosResponse } from 'axios';
import type { Project } from '@/types/Project';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

interface CreateProjectPayload {
    name: string;
    description?: string;
    team_id: string;
}

export default {
    // FUNCIÓN ACTUALIZADA: Ahora llama al endpoint que devuelve todos los proyectos
    getAllProjects(): Promise<AxiosResponse<Project[]>> {
        return apiClient.get('/projects');
    },

    createProject(payload: CreateProjectPayload): Promise<AxiosResponse<Project>> {
        return apiClient.post('/projects', payload);
    },
};