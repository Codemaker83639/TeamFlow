import { defineStore } from 'pinia';
import taskService, { type CreateTaskPayload, type UpdateTaskPayload } from '@/services/taskService';
import type { Task } from '@/types/Task';
import { TaskStatus } from '@/types/Task';

interface TaskStoreState {
    tasks: Task[];
    isLoading: boolean;
}

type GroupedTasks = Record<TaskStatus, Task[]>;

export const useTaskStore = defineStore('taskStore', {
    state: (): TaskStoreState => ({
        tasks: [],
        isLoading: false,
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
                // Refrescamos para asegurar que todos los datos estén actualizados
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
        }
    }
});