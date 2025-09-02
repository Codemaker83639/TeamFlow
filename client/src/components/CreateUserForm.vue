<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
      <h3 class="text-2xl font-bold text-dark-purple dark:text-[#FBE4D8] mb-6">{{ modalTitle }}</h3>
      
      <form id="userForm" @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <input 
            v-model="userData.fullName" 
            type="text" 
            placeholder="Nombre Completo" 
            required 
            class="w-full p-3 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-[#FBE4D8] placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-accent focus:outline-none"
          >
          <input 
            v-model="userData.username" 
            type="text" 
            placeholder="Nombre de Usuario" 
            required 
            class="w-full p-3 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-[#FBE4D8] placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-accent focus:outline-none"
          >
          <input 
            v-model="userData.email" 
            type="email" 
            placeholder="Email" 
            required 
            class="w-full p-3 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-[#FBE4D8] placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-accent focus:outline-none"
          >
          
          <input 
            v-model="userData.password" 
            type="password" 
            :placeholder="passwordPlaceholder"
            :required="!isEditMode" 
            class="w-full p-3 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-[#FBE4D8] placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-accent focus:outline-none"
          >
          
          <div v-if="!isSelfProfile">
            <select 
              v-model="userData.role" 
              required 
              class="w-full p-3 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-[#FBE4D8] focus:ring-2 focus:ring-accent focus:outline-none"
            >
              <option value="team member">Team Member</option>
              <option value="viewer">Viewer</option>
              <option value="Administrator">Administrator</option>
            </select>
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
            form="userForm" 
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
import { useUsersStore } from '@/store/users.ts';

// ============================ CAMBIO AQUÍ ============================
// 1. Añadimos la nueva prop 'isSelfProfile'.
const props = defineProps({
  userToEdit: {
    type: Object,
    default: null
  },
  isSelfProfile: {
    type: Boolean,
    default: false
  }
});
// =====================================================================

const emit = defineEmits(['close']);
const usersStore = useUsersStore();

const userData = ref({
  fullName: '',
  username: '',
  email: '',
  password: '',
  role: 'team member'
});

onMounted(() => {
  if (props.userToEdit) {
    userData.value.fullName = props.userToEdit.full_name;
    userData.value.username = props.userToEdit.username || ''; 
    userData.value.email = props.userToEdit.email;
    userData.value.role = props.userToEdit.role;
  }
});

const isEditMode = computed(() => !!props.userToEdit);
const modalTitle = computed(() => isEditMode.value ? 'Editar Usuario' : 'Crear Nuevo Usuario');
const submitButtonText = computed(() => isEditMode.value ? 'Guardar Cambios' : 'Crear Usuario');
const passwordPlaceholder = computed(() => isEditMode.value ? 'Dejar en blanco para no cambiar' : 'Contraseña');

const handleSubmit = async () => {
  try {
    const payload = { ...userData.value };

    if (isEditMode.value) {
      if (!payload.password) {
        delete payload.password;
      }
      // ============================ CAMBIO AQUÍ ============================
      // 2. Medida de seguridad: si es el perfil propio, eliminamos el rol
      //    del payload para que no pueda ser modificado.
      if (props.isSelfProfile) {
        delete payload.role;
      }
      // =====================================================================
      
      await usersStore.updateUser(props.userToEdit.id, payload);
      alert('¡Usuario actualizado exitosamente!');
    } else {
      await usersStore.createUser(payload);
      alert('¡Usuario creado exitosamente!');
    }
    emit('close');
  } catch (error) {
    alert('Ocurrió un error. Revisa la consola para más detalles.');
    console.error('Fallo al guardar usuario:', error);
  }
};
</script>