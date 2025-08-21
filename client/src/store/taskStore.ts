import { defineStore } from 'pinia';
import taskService from '@/services/taskService';
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
        async fetchTasks() {
            this.isLoading = true;
            try {
                const response = await taskService.getTasks();
                this.tasks = response.data;
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                this.isLoading = false;
            }
        },

        async updateTaskStatus(task: Task, newStatus: TaskStatus) {
            const originalStatus = task.status;
            task.status = newStatus;
            try {
                await taskService.updateTask(task.id, { status: newStatus });
            } catch (error) {
                console.error('Error updating task status:', error);
                task.status = originalStatus;
                alert('No se pudo actualizar la tarea. Por favor, intenta de nuevo.');
            }
        },

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
        }
    }
});