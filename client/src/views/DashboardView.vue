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
        <div class="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow min-w-0">
           <h3 class="text-xl font-bold text-dark-purple dark:text-light mb-4">Proyectos Recientes</h3>
           <p class="text-accent dark:text-gray-400">Aquí se mostrarán los proyectos recientes...</p>
        </div>

        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow min-w-0 flex flex-col">
          <h3 class="text-xl font-bold text-dark-purple dark:text-light mb-4">Notificaciones</h3>
          <div v-if="notificationStore.isLoadingHistory" class="text-center py-4 flex-1 flex items-center justify-center">
            <p class="text-sm text-gray-500">Cargando notificaciones...</p>
          </div>
          <div v-else-if="notificationStore.notificationHistory.length === 0" class="text-center py-4 flex-1 flex items-center justify-center">
            <p class="text-sm text-gray-500">¡Todo al día! No tienes notificaciones.</p>
          </div>
          <div v-else class="flex-1 flex flex-col justify-between">
            <ul class="space-y-4">
              <li v-for="notification in notificationStore.recentNotifications" :key="notification.id" class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full flex-shrink-0">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                </div>
                <div>
                  <p class="text-sm text-gray-700 dark:text-gray-300">{{ notification.message }}</p>
                  <p class="text-xs text-gray-400">{{ formatDistanceToNow(new Date(notification.created_at), { addSuffix: true, locale: es }) }}</p>
                </div>
              </li>
            </ul>
            <div v-if="notificationStore.hasMoreNotifications" class="mt-4 text-center">
              <RouterLink to="/notifications" class="text-sm font-semibold text-accent hover:underline">
                Ver todas
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </main>
  </MainLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import UserProfile from '@/components/UserProfile.vue';
import { useAuthStore } from '@/store/auth';
import { useNotificationStore } from '@/store/notificationStore';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const authStore = useAuthStore();
const notificationStore = useNotificationStore();

onMounted(() => {
  notificationStore.fetchNotificationHistory();
});
</script>