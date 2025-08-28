import axios, { type AxiosResponse } from 'axios';
import type { Task, TaskStatus, TaskPriority, Comment, TaskAttachment } from '@/types/Task';

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

export interface UpdateTaskPayload {
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    due_date?: Date;
    estimated_hours?: number;
    assigned_to_id?: string;
}

export interface AddCommentPayload {
    content: string;
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
    },

    getComments(taskId: string): Promise<AxiosResponse<Comment[]>> {
        return apiClient.get(`/tasks/${taskId}/comments`);
    },

    addComment(taskId: string, payload: AddCommentPayload): Promise<AxiosResponse<Comment>> {
        return apiClient.post(`/tasks/${taskId}/comments`, payload);
    },

    getAttachments(taskId: string): Promise<AxiosResponse<TaskAttachment[]>> {
        return apiClient.get(`/tasks/${taskId}/attachments`);
    },

    uploadAttachment(taskId: string, file: File): Promise<AxiosResponse<TaskAttachment>> {
        const formData = new FormData();
        formData.append('file', file);

        // --- CORRECCIÓN FINAL EN LA URL DE LA SIGUIENTE LÍNEA ---
        return apiClient.post(`/tasks/${taskId}/attachments/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
};