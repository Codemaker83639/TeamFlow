<template>
  <div class="mt-6 pt-6 border-t dark:border-gray-700">
    <div class="flex justify-between items-center mb-4">
      <h4 class="text-md font-semibold text-dark-purple dark:text-[#FBE4D8]">Archivos Adjuntos</h4>
      <button 
        v-if="!isViewOnly"
        @click="triggerFileInput" 
        class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-[#FBE4D8] text-xs font-semibold py-1 px-3 rounded-lg"
      >
        + Adjuntar Archivo
      </button>
      <input 
        type="file" 
        ref="fileInput" 
        @change="handleFileSelect" 
        class="hidden" 
      />
    </div>

    <div class="space-y-2">
       <div v-if="taskStore.isLoadingAttachments && taskStore.currentTaskAttachments.length === 0">
        <p class="text-gray-500 dark:text-[#FBE4D8] text-sm">Cargando adjuntos...</p>
      </div>
      <div v-else-if="taskStore.currentTaskAttachments.length === 0">
        <p class="text-gray-500 dark:text-[#FBE4D8] text-sm">No hay archivos adjuntos en esta tarea.</p>
      </div>
      <div 
        v-else 
        v-for="attachment in taskStore.currentTaskAttachments" 
        :key="attachment.id"
        class="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded-lg"
      >
        <div class="flex items-center space-x-3 min-w-0">
          <div class="w-8 h-8 flex-shrink-0 bg-accent text-white rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <div class="min-w-0">
            <p class="text-sm font-semibold text-gray-800 dark:text-[#FBE4D8] truncate">{{ attachment.file_name }}</p>
            <p class="text-xs text-gray-500 dark:text-[#FBE4D8] truncate">
              Subido por {{ attachment.uploaded_by.full_name }} - {{ (attachment.file_size_kb).toFixed(1) }} KB
            </p>
          </div>
        </div>
        <div class="flex items-center flex-shrink-0">
          <a :href="`http://localhost:3000/uploads/${attachment.file_path}`" target="_blank" class="p-2 rounded-lg text-gray-400 dark:text-[#FBE4D8] hover:text-accent hover:bg-gray-200 dark:hover:bg-gray-600" title="Descargar">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          </a>
          <button 
            v-if="!isViewOnly && (authStore.user?.id === attachment.uploaded_by.id || authStore.user?.role === 'Administrator')"
            @click="handleDeleteAttachment(attachment.id)"
            class="p-2 rounded-lg text-gray-400 dark:text-[#FBE4D8] hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30"
            title="Eliminar archivo"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore } from '@/store/taskStore';
import { useAuthStore } from '@/store/auth'; // 1. IMPORTAMOS AUTH STORE

const props = defineProps<{
  taskId: string;
  isViewOnly: boolean;
}>();

const taskStore = useTaskStore();
const authStore = useAuthStore(); // 2. CREAMOS INSTANCIA DE AUTH STORE
const fileInput = ref<HTMLInputElement | null>(null);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  try {
    await taskStore.uploadAttachmentForTask(props.taskId, file);
  } catch (error) {
    // El store ya maneja la alerta de error
  } finally {
    if (target) {
      target.value = '';
    }
  }
};

// 3. AÑADIMOS LA FUNCIÓN PARA MANEJAR LA ELIMINACIÓN
const handleDeleteAttachment = async (attachmentId: number) => {
  if (confirm('¿Estás seguro de que deseas eliminar este archivo? Esta acción no se puede deshacer.')) {
    try {
      await taskStore.deleteAttachment(props.taskId, attachmentId);
    } catch (error) {
      // El store se encarga de notificar al usuario si hay un error
    }
  }
};
</script>