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
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-500 dark:text-gray-400">Filtrar por:</span>
          <button class="bg-white dark:bg-gray-700 text-dark-purple dark:text-light text-sm font-semibold py-1 px-3 rounded-lg border dark:border-gray-600">Estado</button>
        </div>
        <input type="text" placeholder="Buscar proyecto..." class="w-64 px-3 py-2 bg-white dark:bg-gray-700 text-dark-purple dark:text-light border border-gray-300 dark:border-gray-600 rounded-md">
      </div>

      <div v-if="projectStore.isLoading" class="text-center text-gray-500 dark:text-gray-400">
        Cargando proyectos...
      </div>
 
      <div v-else-if="!projectStore.projects || projectStore.projects.length === 0" class="text-center text-gray-500 dark:text-gray-400">
        No se encontraron proyectos para este equipo.
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div v-for="project in projectStore.projects" :key="project.id" class="bg-white dark:bg-gray-800 p-5 rounded-lg shadow flex flex-col justify-between">
          <div class="space-y-4">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-bold text-lg text-dark-purple dark:text-light">{{ project.name }}</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ project.team?.name }} • {{ project.team?.members?.length }} miembros</p>
              </div>
              <span 
                :class="statusClasses[project.status]"
                class="px-2 py-1 text-xs font-semibold rounded-full"
              >
                {{ project.status }}
              </span>
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
              <div v-for="member in project.team?.members?.slice(0, 3)" :key="member.id" 
                class="w-7 h-7 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center text-xs font-bold border-2 border-white dark:border-gray-800"
                :title="member.user?.full_name"
              >
                {{ getInitials(member.user?.full_name) }}
              </div>
              </div>
            <button class="text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-accent dark:text-light-accent py-1 px-3 rounded-md hover:bg-gray-200">
              Ver Tablero
            </button>
            <p class="text-xs text-gray-500 dark:text-gray-400"></p>
          </div>
        </div>
      </div>
    </main>
  </MainLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { useAuthStore } from '@/store/auth';
import { useProjectStore } from '@/store/projectStore';
import type { ProjectStatus } from '@/types/Project';

const authStore = useAuthStore();
const projectStore = useProjectStore();

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
  const equipoEjemploId = '11ffb2e1-a7f1-43da-a7bb-b14a22589161'; // <-- CAMBIA ESTE ID POR UNO DE TUS EQUIPOS
  projectStore.fetchProjectsByTeam(equipoEjemploId);
});
</script>