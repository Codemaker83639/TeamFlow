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
        // --- CORRECCIÓN AQUÍ ---
        const token = localStorage.getItem('accessToken'); // Usamos la clave correcta
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
    getProjectsByTeam(teamId: string): Promise<AxiosResponse<Project[]>> {
        return apiClient.get(`/projects/team/${teamId}`);
    },

    createProject(payload: CreateProjectPayload): Promise<AxiosResponse<Project>> {
        return apiClient.post('/projects', payload);
    },
};