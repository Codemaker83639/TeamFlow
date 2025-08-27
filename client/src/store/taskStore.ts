import { defineStore } from 'pinia';
import taskService, { type CreateTaskPayload, type UpdateTaskPayload } from '@/services/taskService';
import type { Task, Comment } from '@/types/Task'; // Asumimos que el tipo Comment estará en Task types
import { TaskStatus } from '@/types/Task';

interface TaskStoreState {
    tasks: Task[];
    isLoading: boolean;
    // --- NUEVA PROPIEDAD EN EL ESTADO ---
    currentTaskComments: Comment[]; // Almacenará los comentarios de la tarea activa
}

type GroupedTasks = Record<TaskStatus, Task[]>;

export const useTaskStore = defineStore('taskStore', {
    state: (): TaskStoreState => ({
        tasks: [],
        isLoading: false,
        // --- VALOR INICIAL PARA LA NUEVA PROPIEDAD ---
        currentTaskComments: [],
    }),

    getters: {
        groupedTasks(state): GroupedTasks {
            const initialGroups: GroupedTasks = {
                [TaskStatus.BACKLOG]: [],
                [TaskStatus.TODO]: [],
                [TaskStatus.IN_PROGRESS]: [],
                [TaskStatus.REVIEW]: [],
                [TaskStatus.DONE]: [],
            };
            return state.tasks.reduce((groups, task) => {
                if (groups[task.status]) {
                    groups[task.status].push(task);
                }
                return groups;
            }, initialGroups);
        }
    },

    actions: {
        async fetchTasksByProject(projectId: string) {
            this.isLoading = true;
            this.tasks = [];
            try {
                const response = await taskService.getTasksByProject(projectId);
                this.tasks = response.data;
            } catch (error) {
                console.error(`Error fetching tasks for project ${projectId}:`, error);
                this.tasks = [];
            } finally {
                this.isLoading = false;
            }
        },

        async createTask(payload: CreateTaskPayload) {
            this.isLoading = true;
            try {
                await taskService.createTask(payload);
                await this.fetchTasksByProject(payload.project_id);
            } catch (error) {
                console.error('Error creating task:', error);
                throw error;
            } finally {
                this.isLoading = false;
            }
        },

        async updateTask(taskId: string, projectId: string, payload: UpdateTaskPayload) {
            try {
                await taskService.updateTask(taskId, payload);
                await this.fetchTasksByProject(projectId);
            } catch (error) {
                console.error('Error updating task:', error);
                alert('No se pudo actualizar la tarea.');
            }
        },

        async deleteTask(taskId: string, projectId: string) {
            const confirmed = window.confirm('¿Estás seguro de que quieres eliminar esta tarea?');
            if (!confirmed) return;
            try {
                await taskService.deleteTask(taskId);
                this.tasks = this.tasks.filter(t => t.id !== taskId);
            } catch (error) {
                console.error('Error deleting task:', error);
                alert('No se pudo eliminar la tarea.');
            }
        },

        // --- 👇 NUEVAS ACCIONES PARA COMENTARIOS 👇 ---

        /**
         * Obtiene los comentarios de una tarea específica y los guarda en el estado.
         */
        async fetchCommentsForTask(taskId: string) {
            this.isLoading = true;
            this.currentTaskComments = [];
            try {
                const response = await taskService.getComments(taskId);
                this.currentTaskComments = response.data;
            } catch (error) {
                console.error(`Error fetching comments for task ${taskId}:`, error);
            } finally {
                this.isLoading = false;
            }
        },

        /**
         * Añade un nuevo comentario a una tarea.
         */
        async addCommentToTask(taskId: string, content: string) {
            try {
                const response = await taskService.addComment(taskId, { content });
                // Añadimos el nuevo comentario a la lista local para no tener que recargar todo
                this.currentTaskComments.push(response.data);
            } catch (error) {
                console.error(`Error adding comment to task ${taskId}:`, error);
                alert('No se pudo añadir el comentario.');
            }
        }
    }
});