<template>
  <MainLayout>
    <header class="bg-white dark:bg-gray-800 p-6 flex justify-between items-center shadow">
      <div>
        <h2 class="text-2xl font-bold text-dark-purple dark:text-light">¡Hola, {{ authStore.user?.full_name }}! 👋</h2>
        <p class="text-accent dark:text-gray-400">Tienes 3 proyectos activos y 12 tareas pendientes</p>
      </div>
      <UserProfile />
    </header>

    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-light dark:bg-dark-purple p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p class="text-sm text-accent dark:text-gray-400">PROYECTOS ACTIVOS</p>
            <p class="text-3xl font-bold text-dark-purple dark:text-light">3</p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p class="text-sm text-accent dark:text-gray-400">TAREAS COMPLETADAS</p>
            <p class="text-3xl font-bold text-dark-purple dark:text-light">47</p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p class="text-sm text-accent dark:text-gray-400">HORAS TRABAJADAS</p>
            <p class="text-3xl font-bold text-dark-purple dark:text-light">156</p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p class="text-sm text-accent dark:text-gray-400">MIEMBROS DEL EQUIPO</p>
            <p class="text-3xl font-bold text-dark-purple dark:text-light">12</p>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
           <h3 class="text-xl font-bold text-dark-purple dark:text-light mb-4">Proyectos Recientes</h3>
           <p class="text-accent dark:text-gray-400">Aquí se mostrarán los proyectos recientes...</p>
        </div>

        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 class="text-xl font-bold text-dark-purple dark:text-light mb-4">Notificaciones</h3>
          <ul class="space-y-4">
            <li class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full flex-shrink-0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
              </div>
              <div>
                <p class="text-sm text-gray-700 dark:text-gray-300">Nueva tarea asignada: <span class="font-bold">"Diseñar logo"</span>.</p>
                <p class="text-xs text-gray-400">hace 5 minutos</p>
              </div>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-green-100 text-green-600 flex items-center justify-center rounded-full flex-shrink-0">
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              </div>
              <div>
                <p class="text-sm text-gray-700 dark:text-gray-300">Ana comentó en <span class="font-bold">"Rediseño App"</span>.</p>
                <p class="text-xs text-gray-400">hace 1 hora</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import UserProfile from '@/components/UserProfile.vue';
import { useAuthStore } from '@/store/auth.ts';

const authStore = useAuthStore();
</script>