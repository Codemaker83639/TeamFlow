<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="$emit('close')"></div>
  <div class="fixed inset-0 z-50 flex justify-center items-start pt-10 overflow-y-auto">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg mx-4 mb-10">
      <div class="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <h3 class="text-lg font-semibold text-dark-purple dark:text-light">Editar Tarea</h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">&times;</button>
      </div>
      <div class="p-6">
        <form @submit.prevent="submitForm" class="space-y-4">
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Título de la Tarea</label>
              <input type="text" id="title" v-model="form.title" class="mt-1 block w-full p-2 border rounded-md" required>
            </div>
            <div>
              <label for="description" class="block text-sm font-medium">Descripción</label>
              <textarea id="description" v-model="form.description" rows="3" class="mt-1 block w-full p-2 border rounded-md"></textarea>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="priority" class="block text-sm font-medium">Prioridad</label>
                <select id="priority" v-model="form.priority" class="mt-1 block w-full p-2 border rounded-md">
                  <option value="low">Baja</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>
              <div>
                <label for="assigned_to_id" class="block text-sm font-medium">Asignar a</label>
                <select id="assigned_to_id" v-model="form.assigned_to_id" class="mt-1 block w-full p-2 border rounded-md">
                  <option value="">Nadie</option>
                  <option v-for="member in teamMembers" :key="member.user.id" :value="member.user.id">
                    {{ member.user.full_name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                <label for="due_date" class="block text-sm font-medium">Fecha Límite</label>
                <input type="date" id="due_date" v-model="form.due_date" class="mt-1 block w-full p-2 border rounded-md">
              </div>
              <div>
                <label for="estimated_hours" class="block text-sm font-medium">Horas Estimadas</label>
                <input type="number" step="0.5" min="0" id="estimated_hours" v-model="form.estimated_hours" class="mt-1 block w-full p-2 border rounded-md">
              </div>
            </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button type="button" @click="$emit('close')" class="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg">Cancelar</button>
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
import { reactive, onMounted } from 'vue';
import { useTaskStore } from '@/store/taskStore';
import type { TeamMember } from '@/types/Project';
import type { Task, TaskPriority } from '@/types/Task';

const props = defineProps<{
  taskToEdit: Task;
  teamMembers: TeamMember[];
  projectId: string;
}>();

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

// Al cargar el componente, llenamos el formulario con los datos de la tarea a editar
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
    // Llamamos a la acción de actualizar que ya existe en el store
    await taskStore.updateTask(props.taskToEdit.id, props.projectId, { ...form });
    emit('close');
  } catch (error) {
    alert('Hubo un error al actualizar la tarea.');
  }
};
</script>