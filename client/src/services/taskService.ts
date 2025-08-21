import axios, { type AxiosResponse } from 'axios';
import type { Task, TaskStatus } from '@/types/Task';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { 'Content-Type': 'application/json' }
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

export default {
    getTasks(): Promise<AxiosResponse<Task[]>> {
        return apiClient.get('/tasks');
    },

    updateTask(taskId: string, updates: { status?: TaskStatus }): Promise<AxiosResponse<Task>> {
        return apiClient.patch(`/tasks/${taskId}`, updates);
    },

    getTasksByProject(projectId: string): Promise<AxiosResponse<Task[]>> {
        return apiClient.get(`/tasks/project/${projectId}`);
    }
};