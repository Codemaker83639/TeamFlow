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

const emit = defineEmits(['close', 'createUser']);

const userData = ref({
  fullName: '',
  username: '',
  email: '',
  password: '',
  role: 'member' // Por defecto, creamos miembros
});

const handleCreateUser = () => {
  // En el futuro, aquí se llamará al backend. Por ahora, emitimos el evento.
  console.log('Creando usuario:', userData.value);
  alert('Funcionalidad para crear usuario desde el frontend lista (sin conexión a backend aún).');
  emit('createUser', userData.value);
};
</script>