// client/src/stores/taskStore.ts
import { defineStore } from 'pinia';
import taskService from '@/services/taskService';
import type { Task } from '@/types/Task';
import { TaskStatus } from '@/types/Task';

interface TaskStoreState {
    tasks: Task[];
    isLoading: boolean;
}

// Define la estructura del objeto de tareas agrupadas para mayor claridad
type GroupedTasks = Record<TaskStatus, Task[]>;

export const useTaskStore = defineStore('taskStore', {
    state: (): TaskStoreState => ({
        tasks: [],
        isLoading: false,
    }),

    getters: {
        // Este getter agrupa las tareas por su estado de forma segura.
        groupedTasks(state): GroupedTasks {
            // Creamos un objeto inicial con todas las columnas posibles
            const initialGroups: GroupedTasks = {
                [TaskStatus.BACKLOG]: [],
                [TaskStatus.TODO]: [],
                [TaskStatus.IN_PROGRESS]: [],
                [TaskStatus.REVIEW]: [],
                [TaskStatus.DONE]: [],
            };

            // Usamos reduce para agrupar las tareas en sus columnas correspondientes
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
                // Podríamos añadir un estado de error aquí para mostrarlo en la UI
            } finally {
                this.isLoading = false;
            }
        },

        // --- NUEVA ACCIÓN AÑADIDA AQUÍ ---
        async updateTaskStatus(task: Task, newStatus: TaskStatus) {
            // Actualización optimista: cambiamos el estado en la UI inmediatamente
            // para que la experiencia del usuario sea fluida.
            const originalStatus = task.status;
            task.status = newStatus;

            try {
                // Intentamos guardar el cambio en el backend.
                await taskService.updateTask(task.id, { status: newStatus });
            } catch (error) {
                console.error('Error updating task status:', error);
                // Si la llamada al backend falla, revertimos el cambio en la UI
                // para mantener la consistencia de los datos.
                task.status = originalStatus;
                alert('No se pudo actualizar la tarea. Por favor, intenta de nuevo.');
            }
        }
    }
});