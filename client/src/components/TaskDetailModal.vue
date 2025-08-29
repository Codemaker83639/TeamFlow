<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="$emit('close')"></div>
  <div class="fixed inset-0 z-50 flex justify-center items-start pt-10 overflow-y-auto">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 mb-10">
      
      <div class="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <h3 class="text-lg font-semibold text-dark-purple dark:text-light">Detalles de la Tarea</h3>
        
        <div class="flex items-center space-x-3">
          <!-- Botón del cronómetro ahora en el header -->
          <button
            v-if="!isViewOnly"
            @click="toggleTimer"
            class="flex items-center space-x-2 py-1.5 px-3 rounded-lg text-sm font-semibold transition-colors duration-200"
            :class="isTimerActive ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'"
            >
            <svg v-if="!isTimerActive" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clip-rule="evenodd" />
            </svg>
            <span class="hidden sm:inline">{{ isTimerActive ? 'Detener' : 'Iniciar' }}</span>
          </button>
          
          <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl">&times;</button>
        </div>
      </div>

      <div class="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
        
        <div class="space-y-4 mb-6">
          <div>
            <h4 class="text-sm font-medium text-gray-500">Título</h4>
            <p class="text-lg text-gray-900 dark:text-gray-100">{{ task.title }}</p>
          </div>
          <div v-if="task.description">
            <h4 class="text-sm font-medium text-gray-500">Descripción</h4>
            <p class="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{{ task.description }}</p>
          </div>
        </div>

        <AttachmentSection :task-id="task.id" :is-view-only="isViewOnly" />
        <CommentSection :task-id="task.id" :is-view-only="isViewOnly" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, type PropType, computed } from 'vue';
import type { Task } from '@/types/Task';
import { useTaskStore } from '@/store/taskStore';
import CommentSection from './CommentSection.vue';
import AttachmentSection from './AttachmentSection.vue';

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true,
  },
  isViewOnly: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['close']);

const taskStore = useTaskStore();

const isTimerActive = computed(() => {
  return taskStore.isTimerActiveForTask(props.task.id);
});

const toggleTimer = () => {
  if (isTimerActive.value) {
    taskStore.stopTimer(props.task.id);
  } else {
    taskStore.startTimer(props.task.id);
  }
};

onMounted(() => {
  taskStore.fetchCommentsForTask(props.task.id);
  taskStore.fetchAttachmentsForTask(props.task.id);
});
</script>

<style scoped>
/* Estilos para el scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>