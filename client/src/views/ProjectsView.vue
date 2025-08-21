<template>
  <MainLayout>
    <header class="bg-white dark:bg-gray-800 p-6 flex justify-between items-center shadow">
      <h2 class="text-2xl font-bold text-dark-purple dark:text-light">Proyectos</h2>
      <button @click="openCreateModal" v-if="authStore.user?.role === 'Administrator'" class="bg-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300">
        Crear Nuevo Proyecto
      </button>
    </header>

    <main class="flex-1 overflow-y-auto bg-light dark:bg-dark-purple p-6">
      <div class="mb-6 flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-500 dark:text-gray-400">Filtrar por:</span>
          <div class="relative inline-block text-left">
            <div>
              <button @click="statusDropdownOpen = !statusDropdownOpen" type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-sm font-medium text-dark-purple dark:text-light hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none">
                {{ projectStore.statusFilter === 'all' ? 'Estado' : statusTitles[projectStore.statusFilter] }}
                <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
              </button>
            </div>
            <div v-if="statusDropdownOpen" @click="statusDropdownOpen = false" class="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
              <div class="py-1">
                <a href="#" @click.prevent="projectStore.setStatusFilter('all')" class="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm">Todos</a>
                <a href="#" @click.prevent="projectStore.setStatusFilter('active')" class="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm">Activo</a>
                <a href="#" @click.prevent="projectStore.setStatusFilter('completed')" class="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm">Completado</a>
                <a href="#" @click.prevent="projectStore.setStatusFilter('archived')" class="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm">Archivado</a>
              </div>
            </div>
          </div>
        </div>
        <input v-model="searchQuery" type="text" placeholder="Buscar proyecto..." class="w-64 px-3 py-2 bg-white dark:bg-gray-700 text-dark-purple dark:text-light border border-gray-300 dark:border-gray-600 rounded-md">
      </div>

      <div v-if="projectStore.isLoading" class="text-center text-gray-500 dark:text-gray-400">
        Cargando proyectos...
      </div>
 
      <div v-else-if="projectStore.filteredProjects.length === 0" class="text-center text-gray-500 dark:text-gray-400">
        No se encontraron proyectos que coincidan con tus filtros.
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div v-for="project in projectStore.filteredProjects" :key="project.id" class="bg-white dark:bg-gray-800 p-5 rounded-lg shadow flex flex-col justify-between">
          <div class="space-y-4">
            <div class="flex justify-between items-start">
              <div class="flex-1 pr-2">
                <h3 class="font-bold text-lg text-dark-purple dark:text-light">{{ project.name }}</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ project.team?.name }} • {{ project.team?.members?.length || 0 }} miembros</p>
              </div>
              
              <div class="flex-shrink-0 flex items-center space-x-2">
                <span :class="statusClasses[project.status]" class="px-2 py-1 text-xs font-semibold rounded-full">{{ statusTitles[project.status] }}</span>
                <div class="relative">
                  <button @click="toggleMenu(project.id)" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 p-1 rounded-full focus:outline-none">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                  </button>
                  <div v-if="openMenuId === project.id" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                    <div class="py-1" @click.stop>
                      <p class="px-4 py-2 text-xs text-gray-400">Cambiar Estado</p>
                      <a v-if="project.status !== 'active'" href="#" @click.prevent="changeStatus(project.id, 'active')" class="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm">Marcar como Activo</a>
                      <a v-if="project.status !== 'completed'" href="#" @click.prevent="changeStatus(project.id, 'completed')" class="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm">Marcar como Completado</a>
                      <a v-if="project.status !== 'archived'" href="#" @click.prevent="changeStatus(project.id, 'archived')" class="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm">Marcar como Archivado</a>
                      <div class="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      <a href="#" @click.prevent="openEditModal(project)" class="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm">Editar</a>
                      <a href="#" @click.prevent="deleteProject(project.id)" class="text-red-600 dark:text-red-400 block px-4 py-2 text-sm">Eliminar Proyecto</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Progreso</span>
                <span>{{ project.progress }}%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div class="bg-green-500 h-2 rounded-full" :style="{ width: `${project.progress}%` }"></div></div>
            </div>
          </div>
          <div class="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-3 mt-4">
            <div class="flex items-center -space-x-2">
              <div v-for="member in (project.team?.members || []).slice(0, 3)" :key="member.id" class="w-7 h-7 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center text-xs font-bold border-2 border-white dark:border-gray-800" :title="member.user?.full_name">
                {{ getInitials(member.user?.full_name) }}
              </div>
            </div>
            <button @click="goToBoard(project.id)" class="text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-accent dark:text-light-accent py-1 px-3 rounded-md hover:bg-gray-200">
              Ver Tablero
            </button>
            <p class="text-xs text-gray-500 dark:text-gray-400"></p>
          </div>
        </div>
      </div>
    </main>

    <CreateProjectModal v-if="isModalOpen" :project-to-edit="projectToEdit" @close="closeModal" />
  </MainLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import CreateProjectModal from '@/components/CreateProjectModal.vue';
import { useAuthStore } from '@/store/auth';
import { useProjectStore } from '@/store/projectStore';
import type { Project, ProjectStatus } from '@/types/Project';

const router = useRouter();
const authStore = useAuthStore();
const projectStore = useProjectStore();

const isModalOpen = ref(false);
const searchQuery = ref('');
const statusDropdownOpen = ref(false);
const openMenuId = ref<string | null>(null);
const projectToEdit = ref<Project | null>(null);

const openCreateModal = () => {
  projectToEdit.value = null;
  isModalOpen.value = true;
};

const openEditModal = (project: Project) => {
  projectToEdit.value = project;
  isModalOpen.value = true;
  openMenuId.value = null;
};

const closeModal = () => {
  isModalOpen.value = false;
  projectToEdit.value = null;
};

const toggleMenu = (projectId: string) => {
  openMenuId.value = openMenuId.value === projectId ? null : projectId;
};

const changeStatus = (projectId: string, status: ProjectStatus) => {
  projectStore.updateProject(projectId, { status });
  openMenuId.value = null; 
};

const deleteProject = (projectId: string) => {
  projectStore.deleteProject(projectId);
  openMenuId.value = null;
}

const goToBoard = (projectId: string) => {
  router.push({ name: 'board', params: { projectId } });
};

const getInitials = (fullName: string | undefined): string => {
  if (!fullName) return '';
  const names = fullName.split(' ');
  if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
  return (names[0][0] + names[names.length - 1][0]).toUpperCase();
};

const statusTitles: Record<ProjectStatus, string> = {
  active: 'Activo',
  completed: 'Completado',
  archived: 'Archivado'
};

const statusClasses: Record<ProjectStatus, string> = {
  active: 'text-green-800 bg-green-200',
  completed: 'text-blue-800 bg-blue-200',
  archived: 'text-gray-800 bg-gray-200',
};

onMounted(() => {
  projectStore.fetchAllProjects();
});

watch(searchQuery, (newQuery) => {
  projectStore.setSearchQuery(newQuery);
});
</script>