<template>
  <MainLayout>
    <header class="bg-white dark:bg-gray-800 p-6 flex justify-between items-center shadow">
      <h2 class="text-2xl font-bold text-dark-purple dark:text-light">Gestión de Equipos</h2>
      
      <button v-if="authStore.user?.role === 'Administrator'" class="bg-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300">
        Crear Nuevo Equipo
      </button>
    </header>

    <main class="flex-1 overflow-y-auto bg-light dark:bg-dark-purple p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-xl font-bold text-dark-purple dark:text-light">Equipo de Desarrollo</h3>
              <p class="text-sm text-accent dark:text-gray-400">Responsables del backend y frontend.</p>
            </div>
            <button v-if="authStore.user?.role === 'Administrator'" class="text-xs font-semibold text-accent dark:text-light-accent">Administrar</button>
          </div>
          <div class="mt-4 flex items-center -space-x-2">
            <div class="w-8 h-8 rounded-full bg-red-200 text-red-800 flex items-center justify-center font-bold border-2 border-white dark:border-gray-800">TA</div>
            <div class="w-8 h-8 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center font-bold border-2 border-white dark:border-gray-800">MR</div>
            <div class="w-8 h-8 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-bold border-2 border-white dark:border-gray-800">JG</div>
            <div class="w-8 h-8 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center font-bold border-2 border-white dark:border-gray-800">+2</div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
           <div class="flex justify-between items-start">
            <div>
              <h3 class="text-xl font-bold text-dark-purple dark:text-light">Equipo de Diseño UI/UX</h3>
              <p class="text-sm text-accent dark:text-gray-400">Creación de interfaces y experiencia.</p>
            </div>
            <button v-if="authStore.user?.role === 'Administrator'" class="text-xs font-semibold text-accent dark:text-light-accent">Administrar</button>
          </div>
          <div class="mt-4 flex items-center -space-x-2">
            <div class="w-8 h-8 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center font-bold border-2 border-white dark:border-gray-800">LP</div>
            <div class="w-8 h-8 rounded-full bg-yellow-200 text-yellow-800 flex items-center justify-center font-bold border-2 border-white dark:border-gray-800">CS</div>
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