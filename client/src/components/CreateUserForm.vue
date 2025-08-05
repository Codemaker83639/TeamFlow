<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
      <h3 class="text-2xl font-bold text-dark-purple dark:text-light mb-4">Crear Nuevo Usuario</h3>
      <form @submit.prevent="handleCreateUser">
        <div class="space-y-4">
          <input v-model="userData.fullName" type="text" placeholder="Nombre Completo" required class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
          <input v-model="userData.username" type="text" placeholder="Nombre de Usuario" required class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
          <input v-model="userData.email" type="email" placeholder="Email" required class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
          <input v-model="userData.password" type="password" placeholder="Contraseña" required class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
        </div>
        <div class="flex justify-end space-x-4 mt-6">
          <button type="button" @click="$emit('close')" class="px-4 py-2 rounded bg-gray-200 dark:bg-gray-600">Cancelar</button>
          <button type="submit" class="px-4 py-2 rounded bg-accent text-white">Crear Usuario</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUsersStore } from '@/store/users.ts'; // Importamos el store

const emit = defineEmits(['close']);
const usersStore = useUsersStore(); // Inicializamos el store

const userData = ref({
  fullName: '',
  username: '',
  email: '',
  password: '',
  role: 'team member' // Rol por defecto según tu documento de tesis [cite: 193]
});

const handleCreateUser = async () => {
  try {
    console.log('Enviando datos de usuario:', userData.value);
    await usersStore.createUser(userData.value);
    alert('¡Usuario creado exitosamente!');
    emit('close'); // Cierra el modal en caso de éxito
  } catch (error) {
    console.error('Fallo al crear usuario:', error);
    alert('No se pudo crear el usuario. Revisa la consola para más detalles.');
  }
};
</script>