<template>
  <div class="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 p-6 text-center">
      <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
        <svg class="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-dark-purple dark:text-light mb-2">Cronómetro Activo Detectado</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Dejaste un cronómetro corriendo en la tarea:
        <span class="font-bold">"{{ taskStore.abandonedTimerInfo?.taskTitle }}"</span>.
      </p>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
        Iniciado hace {{ timeAgo }}.
      </p>

      <div class="mt-6 flex justify-center space-x-3">
        <button @click="handleDiscard" class="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm">
          Descartar Tiempo
        </button>
        <button @click="handleStop" class="bg-accent text-white py-2 px-4 rounded-lg text-sm">
          Detener y Guardar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTaskStore } from '@/store/taskStore';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const taskStore = useTaskStore();

const timeAgo = computed(() => {
  if (taskStore.abandonedTimerInfo?.startTime) {
    return formatDistanceToNow(new Date(taskStore.abandonedTimerInfo.startTime), { locale: es });
  }
  return '';
});

const handleStop = () => {
  if (taskStore.abandonedTimerInfo) {
    taskStore.stopTimer(taskStore.abandonedTimerInfo.taskId);
    taskStore.clearAbandonedTimer();
  }
};

// --- FUNCIÓN CORREGIDA ---
const handleDiscard = () => {
  if (taskStore.abandonedTimerInfo) {
    // Llamamos a la nueva acción para descartar el tiempo
    taskStore.discardTimer(taskStore.abandonedTimerInfo.taskId);
    // Limpiamos la info para ocultar el modal
    taskStore.clearAbandonedTimer();
  }
};
</script>