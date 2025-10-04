<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="$emit('close')"></div>
  <div class="fixed inset-0 z-50 flex justify-center items-start pt-10 overflow-y-auto">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg mx-4 mb-10">
      <div class="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <h3 class="text-lg font-semibold text-dark-purple dark:text-[#FBE4D8]">Agregar Nueva Tarea</h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 dark:text-[#FBE4D8] dark:hover:text-gray-300">&times;</button>
      </div>
      <div class="p-6">
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
                  <template v-for="member in teamMembers" :key="member.id">
                    <option v-if="member.user" :value="member.user.id">
                      {{ member.user.full_name }}
                    </option>
                  </template>
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
                <input type="number" step="0.5" min="0" max="3" id="estimated_hours" v-model="form.estimated_hours" class="mt-1 block w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-[#FBE4D8]">
              </div>
            </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button type="button" @click="$emit('close')" class="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-[#FBE4D8] py-2 px-4 rounded-lg">Cancelar</button>
            <button type="submit" class="bg-accent text-white py-2 px-4 rounded-lg" :disabled="taskStore.isLoading">
              {{ taskStore.isLoading ? 'Creando...' : 'Crear Tarea' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useTaskStore } from '@/store/taskStore';
import type { TeamMember } from '@/types/Project';
import type { TaskPriority } from '@/types/Task';

const props = defineProps<{
  projectId: string;
  teamMembers: TeamMember[];
}>();

const emit = defineEmits(['close']);

const taskStore = useTaskStore();

// Función para obtener el primer miembro válido del equipo
const getFirstValidMemberId = () => {
  if (props.teamMembers && props.teamMembers.length > 0) {
    const firstMember = props.teamMembers.find(member => member.user);
    return firstMember ? firstMember.user.id : '';
  }
  return '';
};

const form = reactive({
  title: '',
  description: '',
  priority: 'medium' as TaskPriority,
  assigned_to_id: getFirstValidMemberId(),
  due_date: '',
  estimated_hours: null as number | null,
});

const submitForm = async () => {
  // Validación de seguridad para asignación
  if (!form.assigned_to_id) {
    alert('Por favor, asigne la tarea a un miembro del equipo.');
    return;
  }

  // Validación adicional para horas estimadas
  if (form.estimated_hours !== null && form.estimated_hours > 3) {
    alert('Las horas estimadas no pueden exceder 3 horas.');
    return;
  }

  try {
    await taskStore.createTask({
      ...form,
      project_id: props.projectId,
    });
    emit('close');
  } catch (error) {
    alert('Hubo un error al crear la tarea.');
  }
};
</script>