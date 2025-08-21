<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="$emit('close')"></div>
  <div class="fixed inset-0 z-50 flex justify-center items-start pt-10 overflow-y-auto">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg mx-4 mb-10">
      <div class="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <h3 class="text-lg font-semibold text-dark-purple dark:text-light">
          {{ isEditMode ? 'Editar Proyecto' : 'Crear Nuevo Proyecto' }}
        </h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">&times;</button>
      </div>
      <div class="p-6">
        <form @submit.prevent="submitForm">
          <div class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre del Proyecto</label>
              <input type="text" id="name" v-model="form.name" class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md" required>
            </div>
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
              <textarea id="description" v-model="form.description" rows="3" class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"></textarea>
            </div>
            <div>
              <label for="team" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Asignar al Equipo</label>
              <select id="team" v-model="form.team_id" class="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md" required>
                <option disabled value="">Selecciona un equipo</option>
                <option v-for="team in teamsStore.teams" :key="team.id" :value="team.id">
                  {{ team.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button type="button" @click="$emit('close')" class="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg">Cancelar</button>
            <button type="submit" class="bg-accent text-white py-2 px-4 rounded-lg" :disabled="projectStore.isLoading">
              {{ isEditMode ? (projectStore.isLoading ? 'Guardando...' : 'Guardar Cambios') : (projectStore.isLoading ? 'Creando...' : 'Crear Proyecto') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, reactive } from 'vue';
import { useProjectStore } from '@/store/projectStore';
import { useTeamsStore } from '@/store/teams';
import type { Project } from '@/types/Project';

const props = defineProps<{
  projectToEdit: Project | null;
}>();

const emit = defineEmits(['close']);

const projectStore = useProjectStore();
const teamsStore = useTeamsStore();

const isEditMode = computed(() => !!props.projectToEdit);

const form = reactive({
  name: '',
  description: '',
  team_id: '',
});

onMounted(() => {
  teamsStore.fetchTeams();
  if (isEditMode.value && props.projectToEdit) {
    form.name = props.projectToEdit.name;
    form.description = props.projectToEdit.description || '';
    form.team_id = props.projectToEdit.team?.id || '';
  }
});

const submitForm = async () => {
  if (!form.name || !form.team_id) {
    alert('Por favor, completa el nombre y selecciona un equipo.');
    return;
  }
  
  try {
    if (isEditMode.value && props.projectToEdit) {
      await projectStore.updateProject(props.projectToEdit.id, {
        name: form.name,
        description: form.description,
        team_id: form.team_id,
      });
    } else {
      await projectStore.createProject({
        name: form.name,
        description: form.description,
        team_id: form.team_id,
      });
    }
    emit('close');
  } catch (error) {
    alert('Hubo un error al guardar el proyecto.');
  }
};
</script>