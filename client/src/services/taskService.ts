// client/src/services/taskService.ts
import axios, { type AxiosResponse } from 'axios';
// La corrección está en esta línea, al añadir TaskStatus a la importación
import type { Task, TaskStatus } from '@/types/Task';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { 'Content-Type': 'application/json' }
});

export default {
    getTasks(): Promise<AxiosResponse<Task[]>> {
        return apiClient.get('/tasks');
    },

    updateTask(taskId: string, updates: { status?: TaskStatus }): Promise<AxiosResponse<Task>> {
        return apiClient.patch(`/tasks/${taskId}`, updates);
    }
};