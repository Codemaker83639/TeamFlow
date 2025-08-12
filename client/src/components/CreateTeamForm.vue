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
            rows="4"
            class="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-accent focus:outline-none"
          ></textarea>
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
import { ref } from 'vue';
import { useTeamsStore } from '@/store/teams.ts';

const emit = defineEmits(['close']);
const teamsStore = useTeamsStore();

const teamData = ref({
  name: '',
  description: ''
});

const handleSubmit = async () => {
  try {
    await teamsStore.createTeam(teamData.value);
    alert('¡Equipo creado exitosamente!');
    emit('close'); // Cierra el modal en caso de éxito
  } catch (error) {
    alert('No se pudo crear el equipo. Revisa la consola para más detalles.');
    console.error('Fallo al crear el equipo:', error);
  }
};
</script>