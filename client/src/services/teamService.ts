// client/src/services/teamService.ts
import axios, { type AxiosResponse } from 'axios';
import type { Team } from '@/types/Project'; // Reutilizamos el tipo 'Team'

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default {
    // Asumiendo que tienes un endpoint GET /teams/my-teams que devuelve los equipos del usuario
    getUserTeams(): Promise<AxiosResponse<Team[]>> {
        return apiClient.get('/teams/my-teams');
    },
};