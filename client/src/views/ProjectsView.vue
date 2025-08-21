<template>
  <MainLayout>
    <!-- Enhanced Header -->
    <header class="bg-white dark:bg-gray-800 p-6 flex justify-between items-center shadow-xl relative overflow-hidden">
      <!-- Background particles -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute w-2 h-2 bg-purple-400/20 rounded-full animate-pulse" style="left: 20%; top: 30%;"></div>
        <div class="absolute w-1 h-1 bg-indigo-400/30 rounded-full animate-pulse" style="left: 70%; top: 60%; animation-delay: 2s;"></div>
      </div>
      
      <div class="relative z-10">
        <h2 class="text-3xl font-bold text-dark-purple dark:text-white">Proyectos</h2>
        <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">Gestiona todos tus proyectos en un solo lugar</p>
      </div>
      
      <button 
        @click="openCreateModal" 
        v-if="authStore.user?.role === 'Administrator'" 
        class="bg-gradient-to-r from-accent to-secondary text-white font-semibold py-3 px-6 rounded-xl hover:from-secondary hover:to-accent transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        <span class="flex items-center space-x-2">
          <span>✨</span>
          <span>Crear Nuevo Proyecto</span>
        </span>
      </button>
    </header>

    <main class="flex-1 overflow-y-auto bg-light dark:bg-dark-purple p-6">
      <!-- Enhanced Filters -->
      <div class="mb-6 flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-500 dark:text-gray-400">Filtrar por:</span>
          <div class="relative inline-block text-left">
            <div>
              <button @click="statusDropdownOpen = !statusDropdownOpen" type="button" class="inline-flex justify-center w-full rounded-xl border border-purple-200 dark:border-purple-700 shadow-lg px-4 py-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-sm font-medium text-dark-purple dark:text-light hover:bg-purple-50 dark:hover:bg-purple-900/30 focus:outline-none transition-all duration-300">
                {{ projectStore.statusFilter === 'all' ? 'Estado' : statusTitles[projectStore.statusFilter] }}
                <svg class="-mr-1 ml-2 h-5 w-5 transition-transform duration-200" :class="{ 'rotate-180': statusDropdownOpen }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            <div v-if="statusDropdownOpen" @click="statusDropdownOpen = false" class="origin-top-right absolute left-0 mt-2 w-56 rounded-xl shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-black ring-opacity-5 z-10">
              <div class="py-1">
                <a href="#" @click.prevent="projectStore.setStatusFilter('all')" class="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg mx-2">Todos</a>
                <a href="#" @click.prevent="projectStore.setStatusFilter('active')" class="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg mx-2">Activo</a>
                <a href="#" @click.prevent="projectStore.setStatusFilter('completed')" class="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg mx-2">Completado</a>
                <a href="#" @click.prevent="projectStore.setStatusFilter('archived')" class="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-lg mx-2">Archivado</a>
              </div>
            </div>
          </div>
        </div>
        <div class="relative">
          <input v-model="searchQuery" type="text" placeholder="Buscar proyecto..." class="w-64 pl-10 pr-4 py-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-dark-purple dark:text-light border border-purple-200 dark:border-purple-700 rounded-xl shadow-lg focus:ring-2 focus:ring-purple-500 transition-all duration-300">
          <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="projectStore.isLoading" class="text-center text-gray-500 dark:text-gray-400 py-20">
        <div class="inline-flex items-center space-x-3">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span>Cargando proyectos...</span>
        </div>
      </div>
 
      <!-- Empty state -->
      <div v-else-if="projectStore.filteredProjects.length === 0" class="text-center text-gray-500 dark:text-gray-400 py-20">
        <div class="text-4xl mb-4">🔍</div>
        <p>No se encontraron proyectos que coincidan con tus filtros.</p>
      </div>
      
      <!-- Enhanced Projects Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div v-for="project in projectStore.filteredProjects" :key="project.id" class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-purple-100/50 dark:border-gray-700/50 flex flex-col justify-between transition-all duration-300 group relative overflow-hidden hover:shadow-2xl hover:scale-105 hover:-translate-y-1">
          <!-- Shimmer effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-2xl pointer-events-none"></div>
          
          <div class="space-y-4 relative z-10">
            <div class="flex justify-between items-start">
              <div class="flex-1 pr-2">
                <h3 class="font-bold text-lg text-dark-purple dark:text-light group-hover:text-purple-600 transition-colors">{{ project.name }}</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ project.team?.name }} • {{ project.team?.members?.length || 0 }} miembros</p>
              </div>
              
              <div class="flex-shrink-0 flex items-center space-x-2">
                <span :class="statusClasses[project.status]" class="px-3 py-1 text-xs font-semibold rounded-full shadow-sm">{{ statusTitles[project.status] }}</span>
                <div class="relative">
                  <button @click="toggleMenu(project.id)" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 p-1 rounded-full focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                  </button>
                  <div v-if="openMenuId === project.id" class="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm ring-1 ring-black ring-opacity-5 z-50 border border-purple-100 dark:border-purple-800">
                    <div class="py-1" @click.stop>
                      <p class="px-4 py-2 text-xs text-gray-400">Cambiar Estado</p>
                      <a v-if="project.status !== 'active'" href="#" @click.prevent="changeStatus(project.id, 'active')" class="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg mx-2">Marcar como Activo</a>
                      <a v-if="project.status !== 'completed'" href="#" @click.prevent="changeStatus(project.id, 'completed')" class="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg mx-2">Marcar como Completado</a>
                      <a v-if="project.status !== 'archived'" href="#" @click.prevent="changeStatus(project.id, 'archived')" class="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-lg mx-2">Marcar como Archivado</a>
                      <div class="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      <a href="#" @click.prevent="openEditModal(project)" class="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg mx-2">Editar</a>
                      <a href="#" @click.prevent="deleteProject(project.id)" class="text-red-600 dark:text-red-400 block px-4 py-2 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg mx-2">Eliminar Proyecto</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Progreso</span>
                <span class="font-semibold">{{ project.progress }}%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div class="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-500 relative" :style="{ width: `${project.progress}%` }">
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-between items-center border-t border-gray-200/50 dark:border-gray-700/50 pt-3 mt-4">
            <div class="flex items-center -space-x-2">
              <div v-for="member in (project.team?.members || []).slice(0, 3)" :key="member.id" class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-200 to-purple-300 text-purple-800 flex items-center justify-center text-xs font-bold border-2 border-white dark:border-gray-800 shadow-md hover:scale-110 transition-transform cursor-pointer" :title="member.user?.full_name">
                {{ getInitials(member.user?.full_name) }}
              </div>
            </div>
            <button @click="goToBoard(project.id)" class="text-xs font-semibold bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-accent dark:text-light-accent py-2 px-4 rounded-xl hover:from-purple-100 hover:to-indigo-100 dark:hover:from-purple-800 dark:hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 shadow-md">
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
  active: 'text-green-800 bg-gradient-to-r from-green-100 to-green-200',
  completed: 'text-blue-800 bg-gradient-to-r from-blue-100 to-blue-200',
  archived: 'text-gray-800 bg-gradient-to-r from-gray-100 to-gray-200',
};

onMounted(() => {
  projectStore.fetchAllProjects();
});

watch(searchQuery, (newQuery) => {
  projectStore.setSearchQuery(newQuery);
});
</script>