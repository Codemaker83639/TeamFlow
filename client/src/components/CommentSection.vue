<template>
  <div class="mt-6 pt-6 border-t dark:border-gray-700">
    <h4 class="text-md font-semibold mb-4 text-dark-purple dark:text-[#FBE4D8]">Comentarios</h4>

    <div class="space-y-4 max-h-60 overflow-y-auto custom-scrollbar pr-2">
      <div v-if="taskStore.isLoadingComments && taskStore.currentTaskComments.length === 0">
        <p class="text-gray-500 dark:text-[#FBE4D8] text-sm">Cargando comentarios...</p>
      </div>
      <div v-else-if="taskStore.currentTaskComments.length === 0">
        <p class="text-gray-500 dark:text-[#FBE4D8] text-sm">No hay comentarios todavía. ¡Sé el primero en añadir uno!</p>
      </div>
      <div v-else v-for="comment in taskStore.currentTaskComments" :key="comment.id" class="flex items-start space-x-3">
        <div class="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
          {{ getInitials(comment.user.full_name) }}
        </div>
        <div class="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
          <div class="flex items-center justify-between">
            <p class="font-semibold text-sm text-dark-purple dark:text-[#FBE4D8]">{{ comment.user.full_name }}</p>
            <p class="text-xs text-gray-500 dark:text-[#FBE4D8]">{{ formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: es }) }}</p>
          </div>
          <p class="text-sm text-gray-800 dark:text-[#FBE4D8] mt-1 whitespace-pre-wrap">{{ comment.content }}</p>
        </div>
      </div>
    </div>

    <div v-if="!isViewOnly" class="mt-4">
      <form @submit.prevent="handlePostComment">
        <textarea
          v-model="newComment"
          rows="3"
          class="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-[#FBE4D8] focus:ring-accent focus:border-accent placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="Escribe un comentario..."
          required
        ></textarea>
        <div class="flex justify-end mt-2">
          <button
            type="submit"
            class="bg-accent text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-opacity-90"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Publicando...' : 'Publicar Comentario' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore } from '@/store/taskStore';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const props = defineProps<{
  taskId: string;
  isViewOnly: boolean;
}>();

const taskStore = useTaskStore();
const newComment = ref('');
const isSubmitting = ref(false);

const getInitials = (fullName: string): string => {
  if (!fullName) return '';
  const names = fullName.split(' ');
  if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
  return (names[0][0] + names[names.length - 1][0]).toUpperCase();
};

const handlePostComment = async () => {
  if (newComment.value.trim() === '') return;
  isSubmitting.value = true;
  try {
    await taskStore.addCommentToTask(props.taskId, newComment.value);
    newComment.value = '';
  } catch (error) {
    console.error("Failed to post comment:", error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Estilos para el scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #555;
}
</style>