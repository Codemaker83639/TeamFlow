import { defineStore } from 'pinia';
import taskService, { type CreateTaskPayload, type UpdateTaskPayload } from '@/services/taskService';
import type { Task, Comment, TaskAttachment } from '@/types/Task';
import { TaskStatus } from '@/types/Task';

interface TaskStoreState {
    tasks: Task[];
    isLoading: boolean;
    // Estados de carga específicos
    isLoadingComments: boolean;
    isLoadingAttachments: boolean;
    currentTaskComments: Comment[];
    currentTaskAttachments: TaskAttachment[];
    // Nueva propiedad para el cronómetro
    activeTimerTaskId: string | null;
}

type GroupedTasks = Record<TaskStatus, Task[]>;

export const useTaskStore = defineStore('taskStore', {
    state: (): TaskStoreState => ({
        tasks: [],
        isLoading: false, // Para la carga principal de tareas
        isLoadingComments: false,
        isLoadingAttachments: false,
        currentTaskComments: [],
        currentTaskAttachments: [],
        activeTimerTaskId: null, // Valor inicial para el cronómetro
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
        },
        // Getter de ayuda para saber si un cronómetro está activo para una tarea específica
        isTimerActiveForTask: (state) => {
            return (taskId: string) => state.activeTimerTaskId === taskId;
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

        async fetchCommentsForTask(taskId: string) {
            this.isLoadingComments = true;
            this.currentTaskComments = [];
            try {
                const response = await taskService.getComments(taskId);
                this.currentTaskComments = response.data;
            } catch (error) {
                console.error(`Error fetching comments for task ${taskId}:`, error);
            } finally {
                this.isLoadingComments = false;
            }
        },

        async addCommentToTask(taskId: string, content: string) {
            try {
                const response = await taskService.addComment(taskId, { content });
                this.currentTaskComments.push(response.data);
            } catch (error) {
                console.error(`Error adding comment to task ${taskId}:`, error);
                alert('No se pudo añadir el comentario.');
            }
        },

        async fetchAttachmentsForTask(taskId: string) {
            this.isLoadingAttachments = true;
            this.currentTaskAttachments = [];
            try {
                const response = await taskService.getAttachments(taskId);
                this.currentTaskAttachments = response.data;
            } catch (error) {
                console.error(`Error fetching attachments for task ${taskId}:`, error);
            } finally {
                this.isLoadingAttachments = false;
            }
        },

        async uploadAttachmentForTask(taskId: string, file: File) {
            this.isLoadingAttachments = true;
            try {
                const response = await taskService.uploadAttachment(taskId, file);
                this.currentTaskAttachments.push(response.data);
            } catch (error) {
                console.error(`Error uploading attachment for task ${taskId}:`, error);
                alert('No se pudo subir el archivo.');
                throw error;
            } finally {
                this.isLoadingAttachments = false;
            }
        },

        // --- NUEVAS ACCIONES PARA EL CRONÓMETRO ---

        async startTimer(taskId: string) {
            try {
                await taskService.startTaskTimer(taskId);
                this.activeTimerTaskId = taskId;
            } catch (error) {
                console.error(`Error starting timer for task ${taskId}:`, error);
                alert('No se pudo iniciar el cronómetro. Es posible que ya haya uno activo.');
            }
        },

        async stopTimer(taskId: string) {
            try {
                await taskService.stopTaskTimer(taskId);
                this.activeTimerTaskId = null;
            } catch (error) {
                console.error(`Error stopping timer for task ${taskId}:`, error);
                alert('No se pudo detener el cronómetro. Es posible que no hubiera uno activo.');
            }
        },
    }
});