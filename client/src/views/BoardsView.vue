<template>
  <MainLayout>
    <header class="bg-white dark:bg-gray-800 p-6 flex justify-between items-center shadow">
      <h2 class="text-2xl font-bold text-dark-purple dark:text-light">Tablero del Proyecto</h2>
       </header>

    <main class="flex-1 overflow-x-auto bg-light dark:bg-dark-purple p-6">
      <div v-if="taskStore.isLoading" class="text-center text-gray-500">
        Cargando tareas...
      </div>
      
      <div v-else class="flex space-x-4 h-full">
        <div 
          v-for="(tasks, status) in taskStore.groupedTasks" 
          :key="status" 
          class="flex-shrink-0 w-72 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner board-column"
          :data-status="status"
        >
          <div class="p-4 border-b border-gray-200 dark:border-gray-600">
            <h3 class="font-semibold text-dark-purple dark:text-light">
              {{ columnTitles[status as TaskStatus] }} ({{ tasks.length }})
            </h3>
          </div>
          
          <draggable
            :list="tasks"
            group="tasks"
            item-key="id"
            class="p-4 space-y-4 h-full"
            @end="event => handleDragEnd(event, status as TaskStatus)"
          >
            <template #item="{ element: task }">
              <div :data-id="task.id" class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow cursor-grab">
                <p class="font-semibold text-dark-purple dark:text-light">{{ task.title }}</p>
                <div class="mt-2 flex justify-between items-center">
                  <span 
                    v-if="task.priority"
                    :class="priorityClasses[task.priority]"
                    class="px-2 py-1 text-xs font-bold text-white rounded-full"
                  >
                    {{ task.priority }}
                  </span>
                  <div 
                    v-if="task.assigned_to" 
                    class="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs" 
                    :title="task.assigned_to.full_name"
                  >
                    {{ getInitials(task.assigned_to.full_name) }}
                  </div>
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </main>
  </MainLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import { useTaskStore } from '@/store/taskStore';
import type { Task, TaskStatus, TaskPriority } from '@/types/Task';
import draggable from 'vuedraggable';
import type { SortableEvent } from 'sortablejs';

const route = useRoute();
const taskStore = useTaskStore();

const getInitials = (fullName: string | undefined): string => {
  if (!fullName) return '';
  const names = fullName.split(' ');
  if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
  return (names[0][0] + names[names.length - 1][0]).toUpperCase();
};

const handleDragEnd = (event: SortableEvent) => {
  const item = event.item as HTMLElement;
  const to = event.to as HTMLElement;
  const from = event.from as HTMLElement;

  const originalStatus = from.closest('.board-column')?.dataset.status as TaskStatus | undefined;
  const newStatus = to.closest('.board-column')?.dataset.status as TaskStatus | undefined;
  
  const taskId = item.dataset.id;

  if (!taskId || !newStatus || !originalStatus || newStatus === originalStatus) {
    return;
  }

  const task = taskStore.tasks.find(t => t.id === taskId);
  if (task) {
    taskStore.updateTaskStatus(task, newStatus);
  }
};

const columnTitles: Record<TaskStatus, string> = {
  backlog: 'Backlog',
  todo: 'Por Hacer',
  in_progress: 'En Progreso',
  review: 'En Revisión',
  done: 'Completado'
};

const priorityClasses: Record<TaskPriority, string> = {
    low: 'bg-green-500',
    medium: 'bg-blue-500',
    high: 'bg-yellow-500',
    urgent: 'bg-red-500',
};

onMounted(() => {
  const projectId = route.params.projectId as string;
  if (projectId) {
    taskStore.fetchTasksByProject(projectId);
  } else {
    // Podríamos limpiar las tareas o mostrar un mensaje si no hay ID de proyecto
    taskStore.tasks = []; 
    console.error('Project ID is missing from the route!');
  }
});
</script>