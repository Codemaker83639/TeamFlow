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
                  
                  <div v-if="authStore.user?.role === 'Administrator'" class="relative">
                    <button @click.stop="toggleMenu(team.id)" class="text-xs font-semibold text-accent dark:text-light-accent hover:underline">
                      Administrar
                    </button>
                    <div v-if="openMenuId === team.id" 
                         class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                      <div class="py-1">
                        <a href="#" @click.prevent="openEditTeamModal(team)" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Editar Equipo</a>
                        <a href="#" @click.prevent="handleDeleteTeam(team.id)" class="block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">Eliminar Equipo</a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow self-start">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-dark-purple dark:text-light">Usuarios</h3>
            <button v-if="authStore.user?.role === 'Administrator'" @click="openCreateUserModal" class="bg-secondary text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-opacity-90 transition-colors">
              Añadir Usuario
            </button>
          </div>
          <div class="space-y-3">
            <div v-for="user in users" :key="user.id" 
                 class="group relative bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200">
              <div class="flex items-center space-x-3">
                <div v-if="authStore.user?.role === 'Administrator' && user.id !== authStore.user?.id" 
                     class="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click="openEditUserModal(user)" class="p-1.5 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors" title="Editar usuario">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" /></svg>
                  </button>
                  <button @click="handleDeleteUser(user.id)" class="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" title="Eliminar usuario">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
                <div class="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {{ getInitials(user.full_name) }}
                </div>
                <div class="min-w-0 flex-1">
                  <h4 class="font-semibold text-dark-purple dark:text-light text-sm truncate">{{ user.full_name }}</h4>
                  <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ user.email }}</p>
                </div>
                <div class="ml-auto">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-secondary/20 text-secondary/80 dark:bg-secondary/30 dark:text-secondary whitespace-nowrap">{{ user.role }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
    
    <CreateUserForm v-if="showUserFormModal" :user-to-edit="userToEdit" @close="closeUserFormModal" />
    <CreateTeamForm v-if="showCreateTeamModal" @close="showCreateTeamModal = false" />
  </MainLayout>
</template>

<script setup>
// Se añade 'onUnmounted' para la limpieza de listeners
import { ref, onMounted, onUnmounted, computed, watchEffect } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import CreateUserForm from '@/components/CreateUserForm.vue';
import CreateTeamForm from '@/components/CreateTeamForm.vue';
import { useAuthStore } from '@/store/auth.ts';
import { useTeamsStore } from '@/store/teams.ts';
import { useUsersStore } from '@/store/users.ts';

const authStore = useAuthStore();
const teamsStore = useTeamsStore();
const usersStore = useUsersStore();

const showCreateTeamModal = ref(false);
const teams = computed(() => teamsStore.teams);
const users = computed(() => usersStore.users);

// --- LÓGICA DE USUARIOS (INTACTA, TAL COMO LA TENÍAS) ---
const showUserFormModal = ref(false);
const userToEdit = ref(null);

const openCreateUserModal = () => {
  userToEdit.value = null;
  showUserFormModal.value = true;
};

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

const getInitials = (fullName) => {
  if (!fullName) return '';
  const names = fullName.trim().split(' ');
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  const firstName = names[0].charAt(0).toUpperCase();
  const lastName = names[names.length - 1].charAt(0).toUpperCase();
  return firstName + lastName;
};
// --- FIN DE LÓGICA DE USUARIOS ---


// --- LÓGICA AÑADIDA PARA EL MENÚ DE EQUIPOS ---
const openMenuId = ref(null);

const toggleMenu = (teamId) => {
  if (openMenuId.value === teamId) {
    openMenuId.value = null;
  } else {
    openMenuId.value = teamId;
  }
};

const closeMenu = () => {
  openMenuId.value = null;
};

const handleDeleteTeam = async (teamId) => {
  closeMenu();
  if (window.confirm('¿Estás seguro de que deseas eliminar este equipo? Esta acción es permanente.')) {
    try {
      await teamsStore.deleteTeam(teamId);
      alert('Equipo eliminado exitosamente.');
    } catch (error) {
      alert('No se pudo eliminar el equipo.');
    }
  }
};

const openEditTeamModal = (team) => {
  closeMenu();
  alert(`Funcionalidad para editar el equipo: "${team.name}" (se implementará a continuación).`);
};
// --- FIN DE LÓGICA DE EQUIPOS ---


// --- HOOKS DE CICLO DE VIDA ---
onMounted(() => {
  teamsStore.fetchTeams();
  document.addEventListener('click', closeMenu);
});

onUnmounted(() => {
  document.removeEventListener('click', closeMenu);
});

watchEffect(() => {
  if (authStore.user?.role === 'Administrator') {
    usersStore.fetchUsers();
  }
});
</script>