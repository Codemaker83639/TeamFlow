<template>
  <MainLayout>
    <header class="bg-white dark:bg-gray-800 p-6 flex justify-between items-center shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div>
        <h2 class="text-2xl font-bold text-dark-purple dark:text-light">
          {{ projectStore.currentProject?.name || 'Cargando...' }}
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Tablero del Proyecto</p>
      </div>
      
      <button 
        @click="isCreateModalOpen = true" 
        class="group relative bg-accent hover:bg-secondary text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 flex items-center space-x-2"
      >
        <svg class="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        <span>Agregar Tarea</span>
        
        <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
      </button>
    </header>

    <main class="flex-1 overflow-x-auto bg-light dark:bg-dark-purple p-6">
      <div v-if="taskStore.isLoading && taskStore.tasks.length === 0" class="flex flex-col items-center justify-center h-64 text-center">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-gray-200 border-t-accent rounded-full animate-spin"></div>
          <div class="w-12 h-12 border-4 border-transparent border-t-secondary rounded-full animate-spin absolute top-2 left-2" style="animation-direction: reverse; animation-duration: 1.5s;"></div>
        </div>
        <p class="text-gray-600 dark:text-gray-400 mt-4 text-lg">Cargando tareas...</p>
      </div>
      
      <div v-else class="flex space-x-6 h-full">
        <div 
          v-for="(tasks, status) in taskStore.groupedTasks" 
          :key="status" 
          class="flex-shrink-0 w-80 board-column group" 
          :data-status="status"
        >
          <div class="bg-gray-100 dark:bg-gray-700 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-600 h-full flex flex-col transition-all duration-300 hover:shadow-2xl">
            
            <div class="p-6 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-t-2xl">
              <div class="flex items-center justify-between">
                <h3 class="font-bold text-lg text-dark-purple dark:text-light">
                  {{ columnTitles[status as TaskStatus] }}
                </h3>
                <div class="flex items-center space-x-2">
                  <span class="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                    {{ tasks.length }}
                  </span>
                  <div class="w-3 h-3 rounded-full" :class="getStatusColor(status)"></div>
                </div>
              </div>
            </div>

            <draggable 
              :list="tasks" 
              group="tasks" 
              item-key="id" 
              class="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar min-h-[200px]" 
              @end="handleDragEnd"
              animation="300"
              ghost-class="ghost-card"
              drag-class="dragging-card"
            >
            <template #item="{ element: task }">
                <div 
                  :data-task-id="task.id" 
                  class="group/task bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 hover:border-accent cursor-pointer"
                >
                  
                  <div class="flex justify-between items-start mb-4">
                    <h4 class="font-semibold text-dark-purple dark:text-light flex-1 pr-3 leading-relaxed">
                      {{ task.title }}
                    </h4>
                    
                    <div class="relative flex-shrink-0">
                      <button 
                        @click="toggleTaskMenu(task.id)" 
                        class="p-2 rounded-lg text-gray-400 hover:text-accent hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 opacity-0 group-hover/task:opacity-100"
                      >
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                        </svg>
                      </button>
                      
                      <div 
                        v-if="openTaskMenuId === task.id" 
                        class="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-2xl bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-600 z-20 border border-gray-100 dark:border-gray-700"
                      >
                        <div class="py-2" @click.stop>
                          <a 
                            href="#" 
                            @click.prevent="openEditTaskModal(task)" 
                            class="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                          >
                            <svg class="w-4 h-4 mr-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                            Editar
                          </a>
                          <a 
                            href="#" 
                            @click.prevent="deleteTask(task.id)" 
                            class="flex items-center px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200"
                          >
                            <svg class="w-4 h-4 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                            Eliminar
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-3">
                      <span 
                        v-if="task.priority" 
                        :class="priorityClasses[task.priority]" 
                        class="px-3 py-1 text-xs font-bold text-white rounded-full shadow-sm"
                      >
                        {{ task.priority.toUpperCase() }}
                      </span>
                      
                      <button class="flex items-center space-x-1 text-xs text-gray-500 hover:text-accent transition-colors duration-200 p-1 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                        </svg>
                        <span>Comentar</span>
                      </button>
                    </div>
                    
                    <div 
                      v-if="task.assigned_to" 
                      class="relative group/avatar"
                      :title="task.assigned_to.full_name"
                    >
                      <div class="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold shadow-md ring-2 ring-white dark:ring-gray-800 transition-transform duration-200 group-hover/avatar:scale-110">
                        {{ getInitials(task.assigned_to.full_name) }}
                      </div>
                      
                      <div class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                        {{ task.assigned_to.full_name }}
                        <div class="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  </div>
                  

                </div>
              </template>
            </draggable>
            
            <div v-if="tasks.length === 0" class="flex-1 p-8 flex flex-col items-center justify-center text-center">
              <div class="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </div>
              <p class="text-gray-500 dark:text-gray-400 text-sm">
                Arrastra tareas aquí
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <CreateTaskModal 
      v-if="isCreateModalOpen && projectStore.currentProject" 
      :project-id="projectStore.currentProject.id" 
      :team-members="projectStore.currentProject.team.members" 
      @close="isCreateModalOpen = false"
    />
    <EditTaskModal 
      v-if="isEditModalOpen && taskToEdit"
      :project-id="projectStore.currentProject.id"
      :team-members="projectStore.currentProject.team.members"
      :task-to-edit="taskToEdit"
      @close="closeEditModal"
    />
  </MainLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import CreateTaskModal from '@/components/CreateTaskModal.vue';
import EditTaskModal from '@/components/EditTaskModal.vue';
import { useTaskStore } from '@/store/taskStore';
import { useProjectStore } from '@/store/projectStore';
import { useAuthStore } from '@/store/auth';
import type { Task, TaskStatus, TaskPriority } from '@/types/Task';
import draggable from 'vuedraggable';
import type { SortableEvent } from 'sortablejs';

const route = useRoute();
const taskStore = useTaskStore();
const projectStore = useProjectStore();
const authStore = useAuthStore();

const isCreateModalOpen = ref(false);
const isEditModalOpen = ref(false);
const taskToEdit = ref<Task | null>(null);
const openTaskMenuId = ref<string | null>(null);

const toggleTaskMenu = (taskId: string) => {
  openTaskMenuId.value = openTaskMenuId.value === taskId ? null : taskId;
};

const openEditTaskModal = (task: Task) => {
  taskToEdit.value = task;
  isEditModalOpen.value = true;
  openTaskMenuId.value = null;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
  taskToEdit.value = null;
};

const deleteTask = (taskId: string) => {
  const projectId = route.params.projectId as string;
  taskStore.deleteTask(taskId, projectId);
  openTaskMenuId.value = null;
};

const handleDragEnd = (event: SortableEvent) => {
  const item = event.item as HTMLElement;
  const to = event.to as HTMLElement;
  const from = event.from as HTMLElement;
  const newStatus = to.closest('.board-column')?.dataset.status as TaskStatus | undefined;
  const originalStatus = from.closest('.board-column')?.dataset.status as TaskStatus | undefined;
  const taskId = item.dataset.taskId;
  const projectId = route.params.projectId as string;
  if (!taskId || !newStatus || !originalStatus || newStatus === originalStatus) {
    return;
  }
  taskStore.updateTask(taskId, projectId, { status: newStatus });
};

const getInitials = (fullName: string | undefined): string => {
  if (!fullName) return '';
  const names = fullName.split(' ');
  if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
  return (names[0][0] + names[names.length - 1][0]).toUpperCase();
};

const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    backlog: 'bg-gray-400',
    todo: 'bg-blue-400',
    in_progress: 'bg-yellow-400',
    review: 'bg-orange-400',
    done: 'bg-green-400'
  };
  return colors[status] || 'bg-gray-400';
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
    projectStore.fetchProject(projectId);
    localStorage.setItem('lastVisitedProjectId', projectId);
  } else {
    console.error('Project ID is missing from the route!');
  }
});
</script>

<style scoped>
/* Scrollbar personalizada usando color accent */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-accent, #8b5cf6);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--color-secondary, #7c3aed);
}

/* Efectos adicionales para las tarjetas manteniendo colores originales */
.group\/task:hover {
  box-shadow: 0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04);
}

/* Estilo para el "fantasma" de la tarjeta que se arrastra */
.ghost-card {
  opacity: 0.5;
  background: #f0f0f0;
  border: 2px dashed var(--color-accent, #8b5cf6);
  border-radius: 0.75rem; /* 12px */
}

/* Estilo para la tarjeta mientras se está arrastrando */
.dragging-card {
  transform: rotate(3deg) scale(1.05);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  cursor: grabbing;
}
</style>