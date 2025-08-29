import { defineStore } from 'pinia';
import taskService, { type CreateTaskPayload, type UpdateTaskPayload } from '@/services/taskService';
import type { Task, Comment, TaskAttachment } from '@/types/Task';
import { TaskStatus } from '@/types/Task';

interface AbandonedTimerInfo {
    taskId: string;
    taskTitle: string;
    startTime: string;
}

interface TaskStoreState {
    tasks: Task[];
    isLoading: boolean;
    isLoadingComments: boolean;
    isLoadingAttachments: boolean;
    currentTaskComments: Comment[];
    currentTaskAttachments: TaskAttachment[];
    activeTimerTaskId: string | null;
    abandonedTimerInfo: AbandonedTimerInfo | null;
    hasBeenNotifiedOfAbandonedTimer: boolean;
}

type GroupedTasks = Record<TaskStatus, Task[]>;

export const useTaskStore = defineStore('taskStore', {
    state: (): TaskStoreState => ({
        tasks: [],
        isLoading: false,
        isLoadingComments: false,
        isLoadingAttachments: false,
        currentTaskComments: [],
        currentTaskAttachments: [],
        activeTimerTaskId: null,
        abandonedTimerInfo: null,
        hasBeenNotifiedOfAbandonedTimer: false,
    }),
    getters: {
        groupedTasks(state): GroupedTasks {
            const initialGroups: GroupedTasks = { [TaskStatus.BACKLOG]: [], [TaskStatus.TODO]: [], [TaskStatus.IN_PROGRESS]: [], [TaskStatus.REVIEW]: [], [TaskStatus.DONE]: [] };
            return state.tasks.reduce((groups, task) => {
                if (groups[task.status]) { groups[task.status].push(task); }
                return groups;
            }, initialGroups);
        },
        isTimerActiveForTask: (state) => (taskId: string) => state.activeTimerTaskId === taskId,
    },
    actions: {
        // --- 👇 ACCIÓN FINAL AÑADIDA AQUÍ 👇 ---
        async discardTimer(taskId: string) {
            try {
                await taskService.discardTaskTimer(taskId);
                // Si se descarta un timer activo, actualizamos el estado
                if (this.activeTimerTaskId === taskId) {
                    this.activeTimerTaskId = null;
                }
            } catch (error) {
                console.error(`Error discarding timer for task ${taskId}:`, error);
                alert('No se pudo descartar el cronómetro.');
            }
        },
        async fetchTasksByProject(projectId: string) {
            this.isLoading = true;
            try {
                const response = await taskService.getTasksByProject(projectId);
                this.tasks = response.data;
            } catch (error) {
                console.error(`Error fetching tasks for project ${projectId}:`, error);
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
            }
        },
        async deleteTask(taskId: string, projectId: string) {
            if (!window.confirm('¿Estás seguro?')) return;
            try {
                await taskService.deleteTask(taskId);
                this.tasks = this.tasks.filter(t => t.id !== taskId);
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        },
        async fetchCommentsForTask(taskId: string) {
            this.isLoadingComments = true;
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
            }
        },
        async fetchAttachmentsForTask(taskId: string) {
            this.isLoadingAttachments = true;
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
                throw error;
            } finally {
                this.isLoadingAttachments = false;
            }
        },
        async startTimer(taskId: string) {
            try {
                await taskService.startTaskTimer(taskId);
                this.activeTimerTaskId = taskId;
            } catch (error) {
                console.error(`Error starting timer for task ${taskId}:`, error);
            }
        },
        async stopTimer(taskId: string) {
            try {
                await taskService.stopTaskTimer(taskId);
                this.activeTimerTaskId = null;
            } catch (error) {
                console.error(`Error stopping timer for task ${taskId}:`, error);
            }
        },
        setAbandonedTimer(payload: AbandonedTimerInfo) {
            if (this.hasBeenNotifiedOfAbandonedTimer) return;
            this.abandonedTimerInfo = payload;
            this.hasBeenNotifiedOfAbandonedTimer = true;
        },
        clearAbandonedTimer() {
            this.abandonedTimerInfo = null;
        },
        resetAbandonedTimerNotification() {
            this.abandonedTimerInfo = null;
            this.hasBeenNotifiedOfAbandonedTimer = false;
        },
    }
});