<template>
  <MainLayout>
    <header class="bg-white dark:bg-gray-800 p-6 flex justify-between items-center shadow">
      <h2 class="text-2xl font-bold text-dark-purple dark:text-light">Proyectos</h2>
      
      <button v-if="authStore.user?.role === 'admin'" class="bg-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300">
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

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        
        <div class="bg-white dark:bg-gray-800 p-5 rounded-lg shadow flex flex-col justify-between">
          <div class="space-y-4">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-bold text-lg text-dark-purple dark:text-light">Rediseño de App Móvil</h3>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Equipo de Diseño • 5 miembros</p>
                </div>
                <span class="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">Activo</span>
              </div>
              <div>
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>Progreso</span>
                  <span>73%</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div class="bg-green-500 h-2 rounded-full" style="width: 73%;"></div></div>
              </div>
          </div>
          <div class="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-3 mt-4">
            <div class="flex items-center -space-x-2">
              <div class="w-7 h-7 rounded-full bg-red-200 text-red-800 flex items-center justify-center text-xs font-bold border-2 border-white dark:border-gray-800">TA</div>
              <div class="w-7 h-7 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center text-xs font-bold border-2 border-white dark:border-gray-800">MR</div>
            </div>
            
            <button v-if="authStore.user?.role === 'admin'" class="text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-accent dark:text-light-accent py-1 px-3 rounded-md hover:bg-gray-200">
              Añadir Tarea
            </button>
            
            <p class="text-xs text-gray-500 dark:text-gray-400">Vence en 12 días</p>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-5 rounded-lg shadow flex flex-col justify-between">
          <div class="space-y-4">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-bold text-lg text-dark-purple dark:text-light">Sistema de Gestión CRM</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400">Equipo de Desarrollo • 8 miembros</p>
              </div>
              <span class="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full">En Revisión</span>
            </div>
            <div>
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Progreso</span>
                <span>91%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div class="bg-yellow-500 h-2 rounded-full" style="width: 91%;"></div></div>
            </div>
          </div>
           <div class="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-3 mt-4">
            <div class="flex items-center -space-x-2">
              <div class="w-7 h-7 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center text-xs font-bold border-2 border-white dark:border-gray-800">LP</div>
            </div>

            <button v-if="authStore.user?.role === 'admin'" class="text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-accent dark:text-light-accent py-1 px-3 rounded-md hover:bg-gray-200">
              Añadir Tarea
            </button>
            
            <p class="text-xs text-gray-500 dark:text-gray-400">Vence en 5 días</p>
          </div>
        </div>

      </div>
    </main>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { useAuthStore } from '@/store/auth.ts';

const authStore = useAuthStore();
</script>