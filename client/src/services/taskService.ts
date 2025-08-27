import axios, { type AxiosResponse } from 'axios';
// --- 1. IMPORTAMOS EL TIPO Comment ---
import type { Task, TaskStatus, TaskPriority, Comment } from '@/types/Task';

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

// --- 2. DEFINIMOS EL PAYLOAD PARA CREAR UN COMENTARIO ---
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

    // --- 👇 NUEVAS FUNCIONES PARA COMENTARIOS 👇 ---

    /**
     * Obtiene todos los comentarios de una tarea específica.
     * @param taskId El ID de la tarea.
     */
    getComments(taskId: string): Promise<AxiosResponse<Comment[]>> {
        // La ruta coincide con la que definimos en el controller de NestJS
        return apiClient.get(`/tasks/${taskId}/comments`);
    },

    /**
     * Añade un nuevo comentario a una tarea.
     * @param taskId El ID de la tarea a la que se añade el comentario.
     * @param payload El contenido del comentario.
     */
    addComment(taskId: string, payload: AddCommentPayload): Promise<AxiosResponse<Comment>> {
        return apiClient.post(`/tasks/${taskId}/comments`, payload);
    }
};