<template>
  <div class="fixed top-5 right-5 z-[100] w-full max-w-sm">
    <div class="relative space-y-3">
      <TransitionGroup name="list" tag="div">
        <div 
          v-for="notification in notificationStore.notifications" 
          :key="notification.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-4 flex items-start space-x-3 border-l-4"
          :class="notificationTypeClass(notification.type)"
        >
          <div class="flex-shrink-0">
            <svg class="w-6 h-6" :class="notificationIconColor(notification.type)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
              {{ notification.message }}
            </p>
          </div>
          <button @click="close(notification.id)" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            &times;
          </button>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore, type Notification } from '@/store/notificationStore';

const notificationStore = useNotificationStore();

const close = (id: number) => {
  notificationStore.removeNotification(id);
};

const notificationTypeClass = (type: Notification['type']) => {
  const baseClass = 'border-';
  switch (type) {
    case 'success': return `${baseClass}green-500`;
    case 'error': return `${baseClass}red-500`;
    case 'warning': return `${baseClass}yellow-500`;
    default: return `${baseClass}accent`;
  }
};

const notificationIconColor = (type: Notification['type']) => {
  const baseClass = 'text-';
  switch (type) {
    case 'success': return `${baseClass}green-500`;
    case 'error': return `${baseClass}red-500`;
    case 'warning': return `${baseClass}yellow-500`;
    default: return `${baseClass}accent`;
  }
};
</script>

<style scoped>
/* Transiciones para que las notificaciones aparezcan y desaparezcan suavemente */
.list-move, /* aplicar transiciones al mover elementos */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* asegurar que los elementos que salen ocupen espacio para que la animación de movimiento funcione */
.list-leave-active {
  position: absolute;
}
</style>