<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
      <h3 class="text-2xl font-bold text-dark-purple dark:text-[#FBE4D8] mb-6">{{ modalTitle }}</h3>
      
      <form id="teamForm" @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <input 
            v-model="teamData.name" 
            type="text" 
            placeholder="Nombre del Equipo" 
            required 
            class="w-full p-3 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-[#FBE4D8] placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-accent focus:outline-none"
          >
          <textarea 
            v-model="teamData.description" 
            placeholder="Descripción del Equipo" 
            required 
            rows="3"
            class="w-full p-3 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-[#FBE4D8] placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-accent focus:outline-none"
          ></textarea>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-[#FBE4D8] mb-2">Miembros del Equipo</label>
            <div class="max-h-40 overflow-y-auto border rounded-md p-3 space-y-2 bg-gray-50 dark:bg-gray-900/50 border-gray-300 dark:border-gray-600">
              <div v-if="allUsers.length === 0" class="text-sm text-gray-500 dark:text-[#FBE4D8]">No hay usuarios para añadir.</div>
              <div v-for="user in allUsers" :key="user.id" class="flex items-center">
                <input 
                  :id="'user-' + user.id"
                  :value="user.id"
                  v-model="teamData.memberIds"
                  type="checkbox" 
                  class="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                >
                <label :for="'user-' + user.id" class="ml-3 block text-sm text-gray-900 dark:text-[#FBE4D8]">
                  {{ user.full_name }}
                </label>
              </div>
            </div>
          </div>
          
        </div>
      </form>

      <div class="flex justify-end space-x-4 mt-8">
          <button 
            type="button" 
            @click="$emit('close')" 
            class="px-6 py-2 rounded bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-[#FBE4D8] font-semibold"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            form="teamForm"
            class="px-6 py-2 rounded bg-accent text-white font-semibold"
          >
            {{ submitButtonText }}
          </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useTeamsStore } from '@/store/teams.ts';
import { useUsersStore } from '@/store/users.ts';

// 1. Definimos la prop para recibir el equipo a editar
const props = defineProps({
  teamToEdit: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close']);
const teamsStore = useTeamsStore();
const usersStore = useUsersStore();

// Obtenemos la lista completa de usuarios para mostrarlos en los checkboxes
const allUsers = computed(() => usersStore.users);

const teamData = ref({
  name: '',
  description: '',
  memberIds: []
});

// 2. Determinamos si estamos en modo edición
const isEditMode = computed(() => !!props.teamToEdit);

// 3. Textos dinámicos
const modalTitle = computed(() => isEditMode.value ? 'Editar Equipo' : 'Crear Nuevo Equipo');
const submitButtonText = computed(() => isEditMode.value ? 'Guardar Cambios' : 'Crear Equipo');

onMounted(() => {
  // Siempre necesitamos la lista de usuarios para el selector
  usersStore.fetchUsers();

  // 4. Si es modo edición, rellenamos los campos
  if (isEditMode.value) {
    teamData.value.name = props.teamToEdit.name;
    teamData.value.description = props.teamToEdit.description;
    // Pre-seleccionamos los checkboxes de los miembros actuales
    teamData.value.memberIds = props.teamToEdit.members.map(member => member.user.id);
  }
});

// 5. El submit ahora maneja ambos casos
const handleSubmit = async () => {
  try {
    if (isEditMode.value) {
      await teamsStore.updateTeam(props.teamToEdit.id, teamData.value);
      alert('¡Equipo actualizado exitosamente!');
    } else {
      await teamsStore.createTeam(teamData.value);
      alert('¡Equipo creado exitosamente!');
    }
    emit('close');
  } catch (error) {
    alert('No se pudo guardar el equipo. Revisa la consola para más detalles.');
    console.error('Fallo al guardar el equipo:', error);
  }
};
</script>