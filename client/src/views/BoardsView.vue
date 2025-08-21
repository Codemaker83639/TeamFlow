<template>
  <MainLayout>
    <header class="bg-white dark:bg-gray-800 p-6 flex justify-between items-center shadow">
      <h2 class="text-2xl font-bold text-dark-purple dark:text-light">
        Tablero del Proyecto: {{ projectStore.currentProject?.name || 'Cargando...' }}
      </h2>
      <button @click="isCreateModalOpen = true" class="bg-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300">
        Agregar Tarea
      </button>
    </header>

    <main class="flex-1 overflow-x-auto bg-light dark:bg-dark-purple p-6">
      <div v-if="taskStore.isLoading && taskStore.tasks.length === 0" class="text-center text-gray-500">
        Cargando tareas...
      </div>
      <div v-else class="flex space-x-4 h-full">
        <div v-for="(tasks, status) in taskStore.groupedTasks" :key="status" class="flex-shrink-0 w-72 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner board-column" :data-status="status">
          <div class="p-4 border-b border-gray-200 dark:border-gray-600">
            <h3 class="font-semibold text-dark-purple dark:text-light">{{ columnTitles[status as TaskStatus] }} ({{ tasks.length }})</h3>
          </div>
          <draggable :list="tasks" group="tasks" item-key="id" class="p-4 space-y-4 h-full min-h-[100px]" @end="handleDragEnd">
            <template #item="{ element: task }">
              <div :data-task-id="task.id" class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col justify-between min-h-[120px]">
                
                <div class="flex justify-between items-start">
                  <p class="font-semibold text-dark-purple dark:text-light flex-1 pr-2">{{ task.title }}</p>
                  <div class="relative flex-shrink-0">
                    <button @click="toggleTaskMenu(task.id)" class="text-gray-400 hover:text-gray-600">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                    </button>
                    <div v-if="openTaskMenuId === task.id" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                      <div class="py-1" @click.stop>
                        <a href="#" @click.prevent="openEditTaskModal(task)" class="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm">Editar</a>
                        <a href="#" @click.prevent="deleteTask(task.id)" class="text-red-600 dark:text-red-400 block px-4 py-2 text-sm">Eliminar</a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="flex justify-between items-center mt-4">
                  <div class="flex items-center space-x-2">
                     <span v-if="task.priority" :class="priorityClasses[task.priority]" class="px-2 py-1 text-xs font-bold text-white rounded-full">{{ task.priority }}</span>
                     <button class="text-xs text-gray-500 hover:text-dark-purple dark:hover:text-light">Comentar</button>
                  </div>
                  <div v-if="task.assigned_to" class="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs" :title="task.assigned_to.full_name">{{ getInitials(task.assigned_to.full_name) }}</div>
                </div>

              </div>
              </template>
          </draggable>
        </div>
      </div>
    </main>
    <CreateTaskModal v-if="isCreateModalOpen && projectStore.currentProject" :project-id="projectStore.currentProject.id" :team-members="projectStore.currentProject.team.members" @close="isCreateModalOpen = false"/>
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