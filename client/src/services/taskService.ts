import type { AxiosResponse } from 'axios';
import apiClient from '@/services/apiClient';
import type { Task, TaskStatus, TaskPriority, Comment, TaskAttachment } from '@/types/Task';

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

        return apiClient.post(`/tasks/${taskId}/attachments/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    startTaskTimer(taskId: string): Promise<AxiosResponse<void>> {
        return apiClient.post(`/tasks/${taskId}/timer/start`);
    },

    stopTaskTimer(taskId: string): Promise<AxiosResponse<void>> {
        return apiClient.post(`/tasks/${taskId}/timer/stop`);
    },

    // --- 👇 FUNCIÓN FINAL AÑADIDA AQUÍ 👇 ---
    /**
     * Envía la señal para descartar (eliminar) el cronómetro activo de una tarea.
     * @param taskId El ID de la tarea.
     */
    discardTaskTimer(taskId: string): Promise<AxiosResponse<void>> {
        return apiClient.post(`/tasks/${taskId}/timer/discard`);
    }
};