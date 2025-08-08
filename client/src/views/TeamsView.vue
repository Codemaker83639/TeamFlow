<template>
  <MainLayout>
    <header class="bg-white dark:bg-gray-800 p-6 flex justify-between items-center shadow">
      <h2 class="text-2xl font-bold text-dark-purple dark:text-light">Gestión de Equipos y Miembros</h2>
    </header>
    <main class="flex-1 overflow-y-auto bg-light dark:bg-dark-purple p-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div class="lg:col-span-2">
            <h3 class="text-xl font-bold text-dark-purple dark:text-light mb-4">Equipos Existentes</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div v-if="authStore.user?.role === 'Administrator'" @click="showCreateTeamModal = true" 
                   class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors min-h-[150px]">
                <div class="text-center">
                  <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                  <p class="mt-2 font-semibold">Crear Nuevo Equipo</p>
                </div>
              </div>
              <div v-for="team in teams" :key="team.id" class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow min-h-[150px]">
                <div class="flex justify-between items-start">
                  <div>
                    <h4 class="font-bold text-dark-purple dark:text-light">{{ team.name }}</h4>
                    <p class="text-sm text-accent dark:text-gray-400 mt-1">{{ team.description }}</p>
                  </div>
                  <button v-if="authStore.user?.role === 'Administrator'" class="text-xs font-semibold text-accent dark:text-light-accent">Administrar</button>
                </div>
              </div>
              </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow self-start">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-dark-purple dark:text-light">Usuarios</h3>
            <button v-if="authStore.user?.role === 'Administrator'" @click="openCreateUserModal" class="bg-secondary text-white font-semibold py-1 px-3 rounded-lg text-sm">
              Añadir Usuario
            </button>
          </div>
          
          <ul>
            <li v-for="user in users" :key="user.id" 
                class="group flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <div class="flex items-baseline gap-4">
                    <div>
                        <p class="font-semibold text-dark-purple dark:text-light">{{ user.full_name }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">{{ user.email }}</p>
                    </div>
                    <span class="px-2 py-1 text-xs text-secondary bg-light-accent rounded-full capitalize">{{ user.role }}</span>
                </div>
                <div class="flex items-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    <template v-if="authStore.user?.role === 'Administrator' && user.id !== authStore.user?.id">
                        <button @click="openEditUserModal(user)" class="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700" title="Editar usuario">
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" /></svg>
                        </button>
                        <button @click="handleDeleteUser(user.id)" class="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700" title="Eliminar usuario">
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </template>
                </div>
            </li>
          </ul>
        </div>

      </div>
    </main>
    
    <CreateUserForm 
      v-if="showUserFormModal" 
      :user-to-edit="userToEdit"
      @close="closeUserFormModal" 
    />
  </MainLayout>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import CreateUserForm from '@/components/CreateUserForm.vue';
import { useAuthStore } from '@/store/auth.ts';
import { useTeamsStore } from '@/store/teams.ts';
import { useUsersStore } from '@/store/users.ts';

const authStore = useAuthStore();
const teamsStore = useTeamsStore();
const usersStore = useUsersStore();

const showCreateTeamModal = ref(false);
const showUserFormModal = ref(false);
const userToEdit = ref(null);

const teams = computed(() => teamsStore.teams);
const users = computed(() => usersStore.users);

const openCreateUserModal = () => {
  userToEdit.value = null;
  showUserFormModal.value = true;
};

// --- Lógica Final para Editar ---
// La reemplazaremos en el siguiente paso
const openEditUserModal = (user) => {
  userToEdit.value = user;
  showUserFormModal.value = true;
};

const closeUserFormModal = () => {
  showUserFormModal.value = false;
  userToEdit.value = null;
};

const handleDeleteUser = async (userId) => {
  if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
    try {
      await usersStore.deleteUser(userId);
      alert('Usuario eliminado exitosamente.');
    } catch (error) {
      alert('No se pudo eliminar el usuario.');
    }
  }
};

onMounted(() => {
  teamsStore.fetchTeams();
});

watchEffect(() => {
  if (authStore.user?.role === 'Administrator') {
    usersStore.fetchUsers();
  }
});
</script>