// client/src/services/teamService.ts
import axios, { type AxiosResponse } from 'axios';
import type { Team } from '@/types/Project';

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
    getUserTeams(): Promise<AxiosResponse<Team[]>> {
        return apiClient.get('/teams/my-teams');
    },
    // --- NUEVA FUNCIÓN AÑADIDA ---
    getAllTeams(): Promise<AxiosResponse<Team[]>> {
        return apiClient.get('/teams');
    }
};