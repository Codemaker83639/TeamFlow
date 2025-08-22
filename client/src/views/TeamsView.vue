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
              <div v-if="authStore.user?.role === 'Administrator'" @click="openCreateTeamModal" 
                   class="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:shadow-xl hover:scale-[1.02] cursor-pointer transition-all duration-300 min-h-[200px] overflow-hidden">
                <div class="absolute inset-0 bg-[#854F6C]/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div class="absolute -top-10 -right-10 w-32 h-32 bg-[#854F6C]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <div class="text-center relative z-10">
                  <div class="mx-auto h-16 w-16 bg-[#854F6C] rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </div>
                  <p class="font-bold text-lg text-gray-700 dark:text-gray-200 group-hover:text-[#854F6C] dark:group-hover:text-[#DFB6B2] transition-colors duration-300">Crear Nuevo Equipo</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">¡Forma tu próximo equipo!</p>
                </div>
              </div>

              <div v-for="team in teams" :key="team.id" 
                   class="group relative bg-gradient-to-br from-white via-white to-gray-50/50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900/50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[200px] border border-gray-200/50 dark:border-gray-700/50 hover:scale-[1.02] overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-[#854F6C]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <div class="absolute -bottom-10 -left-10 w-24 h-24 bg-[#854F6C]/15 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
                <div class="absolute top-0 left-0 w-full h-1 bg-[#854F6C] rounded-t-2xl"></div>
                
                <div class="relative z-10 h-full flex flex-col">
                  <div class="flex justify-between items-start mb-4">
                    <div class="flex-1">
                      <div class="inline-flex items-center justify-center w-12 h-12 bg-[#854F6C] rounded-xl shadow-lg mb-3 group-hover:rotate-6 transition-transform duration-300">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                      </div>
                      <h4 class="font-bold text-xl text-gray-800 dark:text-white mb-2 group-hover:text-[#854F6C] dark:group-hover:text-[#DFB6B2] transition-colors duration-300">{{ team.name }}</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{{ team.description }}</p>
                    </div>
                    
                    <div v-if="authStore.user?.role === 'Administrator'" class="relative">
                      <button @click.stop="toggleMenu(team.id)" 
                              class="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-[#DFB6B2] dark:hover:bg-[#854F6C] hover:text-[#854F6C] dark:hover:text-white transition-all duration-200 shadow-sm hover:shadow-md">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                        </svg>
                      </button>
                      <div v-if="openMenuId === team.id" 
                           class="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-20 border border-gray-200 dark:border-gray-600 overflow-hidden backdrop-blur-sm">
                        <div class="py-2">
                          <a href="#" @click.prevent="openEditTeamModal(team)" class="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-[#DFB6B2] dark:hover:bg-[#854F6C] hover:text-[#854F6C] dark:hover:text-white transition-all duration-200"><svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z"></path></svg>Editar Equipo</a>
                          <a href="#" @click.prevent="handleDeleteTeam(team.id)" class="flex items-center px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"><svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>Eliminar Equipo</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="mt-auto pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-2">
                        <div class="flex -space-x-2">
                          <div v-for="member in (team.members || []).slice(0, 3)" :key="member.id" 
                               class="w-6 h-6 bg-[#854F6C] rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                            <span class="text-xs text-white font-semibold">{{ getInitials(member.user.full_name) }}</span>
                          </div>
                          <div v-if="team.members && team.members.length > 3" 
                               class="w-6 h-6 bg-[#854F6C]/80 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                            <span class="text-xs text-white font-semibold">+{{ team.members.length - 3 }}</span>
                          </div>
                          <div v-if="!team.members || team.members.length === 0" 
                               class="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                            <span class="text-xs text-gray-500 font-semibold">0</span>
                          </div>
                        </div>
                        <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">
                          {{ team.members ? team.members.length : 0 }} miembro{{ (team.members && team.members.length !== 1) ? 's' : '' }}
                        </span>
                      </div>
                      <div class="flex items-center space-x-1">
                        <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span class="text-xs text-gray-500 dark:text-gray-400">Activo</span>
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
            <button 
              v-if="authStore.user?.role === 'Administrator'" 
              @click="openCreateUserModal" 
              class="bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span class="flex items-center space-x-2">
                <span>+</span>
                <span>Añadir Usuario</span>
              </span>
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
                <div class="w-10 h-10 bg-[#854F6C] rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {{ getInitials(user.full_name) }}
                </div>
                <div class="min-w-0 flex-1">
                  <h4 class="font-semibold text-dark-purple dark:text-light text-sm truncate">{{ user.full_name }}</h4>
                  <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ user.email }}</p>
                </div>
                <div class="ml-auto">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#854F6C]/10 text-[#854F6C] dark:bg-[#DFB6B2]/20 dark:text-[#DFB6B2] border border-[#854F6C]/20 dark:border-[#DFB6B2]/30 whitespace-nowrap">{{ user.role }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
    
    <CreateUserForm v-if="showUserFormModal" :user-to-edit="userToEdit" @close="closeUserFormModal" />
    <CreateTeamForm v-if="showTeamFormModal" :team-to-edit="teamToEdit" @close="closeTeamFormModal" />
  </MainLayout>
</template>

<script setup>
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

const teams = computed(() => teamsStore.teams);
const users = computed(() => usersStore.users);

// Lógica de Usuarios (INTACTA)
const showUserFormModal = ref(false);
const userToEdit = ref(null);
const openCreateUserModal = () => { userToEdit.value = null; showUserFormModal.value = true; };
const openEditUserModal = (user) => { userToEdit.value = user; showUserFormModal.value = true; };
const closeUserFormModal = () => { showUserFormModal.value = false; userToEdit.value = null; };
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
  if (names.length === 1) { return names[0].charAt(0).toUpperCase(); }
  const firstName = names[0].charAt(0).toUpperCase();
  const lastName = names[names.length - 1].charAt(0).toUpperCase();
  return firstName + lastName;
};

// Lógica para Equipos (INTACTA)
const showTeamFormModal = ref(false);
const teamToEdit = ref(null);
const openMenuId = ref(null);
const toggleMenu = (teamId) => { if (openMenuId.value === teamId) { openMenuId.value = null; } else { openMenuId.value = teamId; } };
const closeMenu = () => { openMenuId.value = null; };
const openCreateTeamModal = () => { teamToEdit.value = null; showTeamFormModal.value = true; };
const openEditTeamModal = (team) => { closeMenu(); teamToEdit.value = team; showTeamFormModal.value = true; };
const closeTeamFormModal = () => { showTeamFormModal.value = false; teamToEdit.value = null; };
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

// Hooks de Ciclo de Vida (INTACTO)
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