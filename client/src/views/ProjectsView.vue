<template>
  <MainLayout>
    <header class="bg-white dark:bg-gray-800 p-6 flex justify-between items-center shadow">
      <h2 class="text-2xl font-bold text-dark-purple dark:text-light">Proyectos</h2>
      
      <button v-if="authStore.user?.role === 'Administrator'" class="bg-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300">
        Crear Nuevo Proyecto
      </button>
    </header>

    <main class="flex-1 overflow-y-auto bg-light dark:bg-dark-purple p-6">
      <div class="mb-6 flex justify-between items-center">
        <div class="flex items-center space-x-2 relative">
          <span class="text-sm text-gray-500 dark:text-gray-400">Filtrar por:</span>
          
          <div class="relative inline-block text-left">
            <div>
              <button @click="statusDropdownOpen = !statusDropdownOpen" type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-sm font-medium text-dark-purple dark:text-light hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none" id="menu-button" aria-expanded="true" aria-haspopup="true">
                {{ projectStore.statusFilter === 'all' ? 'Estado' : projectStore.statusFilter }}
                <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            <div v-if="statusDropdownOpen" @click="statusDropdownOpen = false" class="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
              <div class="py-1" role="none">
                <a href="#" @click.prevent="projectStore.setStatusFilter('all')" class="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Todos</a>
                <a href="#" @click.prevent="projectStore.setStatusFilter('active')" class="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Activo</a>
                <a href="#" @click.prevent="projectStore.setStatusFilter('completed')" class="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Completado</a>
                <a href="#" @click.prevent="projectStore.setStatusFilter('archived')" class="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Archivado</a>
              </div>
            </div>
          </div>
        </div>
        <input v-model="searchQuery" type="text" placeholder="Buscar proyecto..." class="w-64 px-3 py-2 bg-white dark:bg-gray-700 text-dark-purple dark:text-light border border-gray-300 dark:border-gray-600 rounded-md">
      </div>
      <div v-if="projectStore.isLoading" class="text-center text-gray-500 dark:text-gray-400">
        Cargando proyectos...
      </div>
 
      <div v-else-if="!projectStore.filteredProjects || projectStore.filteredProjects.length === 0" class="text-center text-gray-500 dark:text-gray-400">
        No se encontraron proyectos que coincidan con tus filtros.
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div v-for="project in projectStore.filteredProjects" :key="project.id" class="bg-white dark:bg-gray-800 p-5 rounded-lg shadow flex flex-col justify-between">
          <div class="space-y-4">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-bold text-lg text-dark-purple dark:text-light">{{ project.name }}</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ project.team?.name }} • {{ project.team?.members?.length }} miembros</p>
              </div>
              <span :class="statusClasses[project.status]" class="px-2 py-1 text-xs font-semibold rounded-full">{{ project.status }}</span>
            </div>
            <div>
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Progreso</span>
                <span>{{ project.progress }}%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full" :style="{ width: `${project.progress}%` }"></div>
              </div>
            </div>
          </div>
          <div class="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-3 mt-4">
            <div class="flex items-center -space-x-2">
              <div v-for="member in project.team?.members?.slice(0, 3)" :key="member.id" class="w-7 h-7 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center text-xs font-bold border-2 border-white dark:border-gray-800" :title="member.user?.full_name">
                {{ getInitials(member.user?.full_name) }}
              </div>
            </div>
            <button class="text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-accent dark:text-light-accent py-1 px-3 rounded-md hover:bg-gray-200">Ver Tablero</button>
            <p class="text-xs text-gray-500 dark:text-gray-400"></p>
          </div>
        </div>
      </div>
    </main>
  </MainLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'; // Importamos 'ref' y 'watch'
import MainLayout from '@/layouts/MainLayout.vue';
import { useAuthStore } from '@/store/auth';
import { useProjectStore } from '@/store/projectStore';
import type { ProjectStatus } from '@/types/Project';

const authStore = useAuthStore();
const projectStore = useProjectStore();

// --- LÓGICA PARA LA BÚSQUEDA Y EL DROPDOWN ---
const searchQuery = ref('');
const statusDropdownOpen = ref(false);

// Observamos la variable 'searchQuery'. Cada vez que cambia (cuando el usuario escribe),
// llamamos a la acción del store para actualizar el filtro.
watch(searchQuery, (newQuery) => {
  projectStore.setSearchQuery(newQuery);
});
// ---------------------------------------------

const getInitials = (fullName: string | undefined): string => {
  if (!fullName) return '';
  const names = fullName.split(' ');
  if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
  return (names[0][0] + names[names.length - 1][0]).toUpperCase();
};

const statusClasses: Record<ProjectStatus, string> = {
  active: 'text-green-800 bg-green-200',
  completed: 'text-blue-800 bg-blue-200',
  archived: 'text-gray-800 bg-gray-200',
};

onMounted(() => {
  projectStore.fetchAllProjects();
});
</script>