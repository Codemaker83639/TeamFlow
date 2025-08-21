import axios, { type AxiosResponse } from 'axios';
import type { Task, TaskStatus, TaskPriority } from '@/types/Task';

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

export interface CreateTaskPayload {
    title: string;
    project_id: string;
    description?: string;
    priority?: TaskPriority;
    due_date?: Date;
    estimated_hours?: number;
    assigned_to_id?: string;
}

// Interfaz para actualizar cualquier campo de la tarea
export interface UpdateTaskPayload {
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    due_date?: Date;
    estimated_hours?: number;
    assigned_to_id?: string;
}

export default {
    getTasksByProject(projectId: string): Promise<AxiosResponse<Task[]>> {
        return apiClient.get(`/tasks/project/${projectId}`);
    },

    createTask(payload: CreateTaskPayload): Promise<AxiosResponse<Task>> {
        return apiClient.post('/tasks', payload);
    },

    updateTask(taskId: string, payload: UpdateTaskPayload): Promise<AxiosResponse<Task>> {
        return apiClient.patch(`/tasks/${taskId}`, payload);
    },

    deleteTask(taskId: string): Promise<AxiosResponse<void>> {
        return apiClient.delete(`/tasks/${taskId}`);
    }
};