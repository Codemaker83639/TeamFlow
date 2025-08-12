<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
      <h3 class="text-2xl font-bold text-dark-purple dark:text-light mb-6">Crear Nuevo Equipo</h3>
      
      <form id="teamForm" @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <input 
            v-model="teamData.name" 
            type="text" 
            placeholder="Nombre del Equipo" 
            required 
            class="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-accent focus:outline-none"
          >
          <textarea 
            v-model="teamData.description" 
            placeholder="Descripción del Equipo" 
            required 
            rows="3"
            class="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-accent focus:outline-none"
          ></textarea>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Añadir Miembros</label>
            <div class="max-h-40 overflow-y-auto border rounded-md p-3 space-y-2 bg-gray-50 dark:bg-gray-900/50 dark:border-gray-600">
              <div v-if="users.length === 0" class="text-sm text-gray-500">No hay usuarios disponibles.</div>
              <div v-for="user in users" :key="user.id" class="flex items-center">
                <input 
                  :id="'user-' + user.id"
                  :value="user.id"
                  v-model="teamData.memberIds"
                  type="checkbox" 
                  class="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                >
                <label :for="'user-' + user.id" class="ml-3 block text-sm text-gray-900 dark:text-gray-100">
                  {{ user.full_name }} <span class="text-gray-500">({{ user.email }})</span>
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
            class="px-6 py-2 rounded bg-gray-200 dark:bg-gray-600 font-semibold"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            form="teamForm"
            class="px-6 py-2 rounded bg-accent text-white font-semibold"
          >
            Crear Equipo
          </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useTeamsStore } from '@/store/teams.ts';
import { useUsersStore } from '@/store/users.ts'; // Importamos el store de usuarios

const emit = defineEmits(['close']);
const teamsStore = useTeamsStore();
const usersStore = useUsersStore(); // Inicializamos el store de usuarios

// Obtenemos la lista de usuarios del store
const users = computed(() => usersStore.users);

// Añadimos 'memberIds' a los datos del formulario
const teamData = ref({
  name: '',
  description: '',
  memberIds: []
});

// Al montar el componente, pedimos la lista de todos los usuarios
onMounted(() => {
  usersStore.fetchUsers();
});

const handleSubmit = async () => {
  try {
    await teamsStore.createTeam(teamData.value);
    alert('¡Equipo creado exitosamente!');
    emit('close');
  } catch (error) {
    alert('No se pudo crear el equipo. Revisa la consola para más detalles.');
    console.error('Fallo al crear el equipo:', error);
  }
};
</script>