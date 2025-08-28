<template>
  <MainLayout>
    <header class="bg-white dark:bg-gray-800 p-6 shadow">
      <h2 class="text-2xl font-bold text-dark-purple dark:text-light">Historial de Notificaciones</h2>
    </header>

    <main class="flex-1 overflow-y-auto bg-light dark:bg-dark-purple p-6">
      <div class="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div v-if="notificationStore.isLoadingHistory" class="text-center py-10">
          <p class="text-gray-500">Cargando historial...</p>
        </div>
        <div v-else-if="notificationStore.notificationHistory.length === 0" class="text-center py-10">
          <p class="text-gray-500">No tienes notificaciones.</p>
        </div>
        <ul v-else class="space-y-4">
          <li v-for="notification in notificationStore.notificationHistory" :key="notification.id" class="flex items-start space-x-4 p-4 rounded-lg" :class="notification.is_read ? '' : 'bg-blue-50 dark:bg-gray-700/50'">
            <div class="w-8 h-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full flex-shrink-0 mt-1">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </div>
            <div>
              <p class="text-sm text-gray-800 dark:text-gray-200">{{ notification.message }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ formatDistanceToNow(new Date(notification.created_at), { addSuffix: true, locale: es }) }}</p>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </MainLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { useNotificationStore } from '@/store/notificationStore';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const notificationStore = useNotificationStore();

onMounted(() => {
  // Si el historial no está cargado, lo cargamos.
  if (notificationStore.notificationHistory.length === 0) {
    notificationStore.fetchNotificationHistory();
  }
});
</script>