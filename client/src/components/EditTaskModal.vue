<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="$emit('close')"></div>
  <div class="fixed inset-0 z-50 flex justify-center items-start pt-10 overflow-y-auto">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 mb-10">
      <div class="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <h3 class="text-lg font-semibold text-dark-purple dark:text-[#FBE4D8]">Detalles de la Tarea</h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 dark:text-[#FBE4D8] dark:hover:text-gray-300">&times;</button>
      </div>
      <div class="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 dark:text-[#FBE4D8]">Título de la Tarea</label>
            <input type="text" id="title" v-model="form.title" class="mt-1 block w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-[#FBE4D8]" required>
          </div>
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 dark:text-[#FBE4D8]">Descripción</label>
            <textarea id="description" v-model="form.description" rows="3" class="mt-1 block w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-[#FBE4D8]"></textarea>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="priority" class="block text-sm font-medium text-gray-700 dark:text-[#FBE4D8]">Prioridad</label>
              <select id="priority" v-model="form.priority" class="mt-1 block w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-[#FBE4D8]">
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
                <option value="urgent">Urgente</option>
              </select>
            </div>
            <div>
              <label for="assigned_to_id" class="block text-sm font-medium text-gray-700 dark:text-[#FBE4D8]">Asignar a</label>
              <select id="assigned_to_id" v-model="form.assigned_to_id" class="mt-1 block w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-[#FBE4D8]" required>
                <option v-for="member in teamMembers" :key="member.user.id" :value="member.user.id">
                  {{ member.user.full_name }}
                </option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="due_date" class="block text-sm font-medium text-gray-700 dark:text-[#FBE4D8]">Fecha Límite</label>
                <input type="date" id="due_date" v-model="form.due_date" class="mt-1 block w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-[#FBE4D8]">
              </div>
              <div>
                <label for="estimated_hours" class="block text-sm font-medium text-gray-700 dark:text-[#FBE4D8]">Horas Estimadas</label>
                <input type="number" step="0.5" min="0" id="estimated_hours" v-model="form.estimated_hours" class="mt-1 block w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-[#FBE4D8]">
              </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button type="button" @click="$emit('close')" class="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-[#FBE4D8] py-2 px-4 rounded-lg">Cancelar</button>
            <button type="submit" class="bg-accent text-white py-2 px-4 rounded-lg" :disabled="taskStore.isLoading">
              {{ taskStore.isLoading ? 'Guardando...' : 'Guardar Cambios' }}
            </button>
          </div>
        </form>

        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, type PropType } from 'vue';
import { useTaskStore } from '@/store/taskStore';
import type { TeamMember } from '@/types/Project';
import type { Task, TaskPriority } from '@/types/Task';

const props = defineProps({
  taskToEdit: {
    type: Object as PropType<Task>,
    required: true
  },
  teamMembers: {
    type: Array as PropType<TeamMember[]>,
    required: true
  },
  projectId: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['close']);

const taskStore = useTaskStore();

const form = reactive({
  title: '',
  description: '',
  priority: 'medium' as TaskPriority,
  assigned_to_id: '',
  due_date: '',
  estimated_hours: null as number | null,
});

onMounted(() => {
    form.title = props.taskToEdit.title;
    form.description = props.taskToEdit.description || '';
    form.priority = props.taskToEdit.priority;
    form.assigned_to_id = props.taskToEdit.assigned_to?.id || '';
    form.due_date = props.taskToEdit.due_date ? new Date(props.taskToEdit.due_date).toISOString().split('T')[0] : '';
    form.estimated_hours = props.taskToEdit.estimated_hours || null;
});

const submitForm = async () => {
  try {
    await taskStore.updateTask(props.taskToEdit.id, props.projectId, { ...form });
    emit('close');
  } catch (error) {
    alert('Hubo un error al actualizar la tarea.');
  }
};
</script>

<style scoped>
/* Añadimos el estilo del scrollbar para el contenedor principal del modal */
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