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

                <div v-for="team in teamsStore.teams" :key="team.id" class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow min-h-[150px]">
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
            <button v-if="authStore.user?.role === 'Administrator'" @click="showCreateUserModal = true" class="bg-secondary text-white font-semibold py-1 px-3 rounded-lg text-sm">
              Añadir Usuario
            </button>
          </div>
          
          <ul class="space-y-3">
            <li v-for="user in users" :key="user.id" class="flex items-center justify-between">
              <div>
                <p class="font-semibold text-dark-purple dark:text-light">{{ user.full_name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ user.email }}</p>
              </div>
              <span class="px-2 py-1 text-xs text-secondary bg-light-accent rounded-full capitalize">{{ user.role }}</span>
            </li>
          </ul>
        </div>

      </div>
    </main>
    
    <CreateUserForm v-if="showCreateUserModal" @close="showCreateUserModal = false" />

  </MainLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import CreateUserForm from '@/components/CreateUserForm.vue';
// ELIMINAMOS LA IMPORTACIÓN DE CreateTeamForm
import { useAuthStore } from '@/store/auth.ts';
import { useTeamsStore } from '@/store/teams.ts';
import { useUsersStore } from '@/store/users.ts';

const authStore = useAuthStore();
const teamsStore = useTeamsStore();
const usersStore = useUsersStore();

const showCreateTeamModal = ref(false); // Mantenemos esta variable para el futuro
const showCreateUserModal = ref(false);

const users = computed(() => usersStore.users);

onMounted(() => {
  teamsStore.fetchTeams();
  if (authStore.user?.role === 'Administrator') {
    usersStore.fetchUsers();
  }
});
</script>