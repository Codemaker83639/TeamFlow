<template>
  <MainLayout>
    <header class="bg-white dark:bg-gray-800 p-6 flex justify-between items-center shadow">
      <h2 class="text-2xl font-bold text-dark-purple dark:text-light">Gestión de Equipos y Miembros</h2>
    </header>

    <main class="flex-1 overflow-y-auto bg-light dark:bg-dark-purple p-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div class="lg:col-span-2 space-y-6">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-bold text-dark-purple dark:text-light">Equipos Existentes</h3>
            <button v-if="authStore.user?.role === 'Administrator'" @click="showCreateTeamModal = true" class="bg-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-secondary text-sm">
              Crear Equipo
            </button>
          </div>

          <div v-for="team in teamsStore.teams" :key="team.id" class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h4 class="font-bold text-dark-purple dark:text-light">{{ team.name }}</h4>
            <p class="text-sm text-accent dark:text-gray-400">{{ team.description }}</p>
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
import { ref, onMounted } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import CreateUserForm from '@/components/CreateUserForm.vue';
import { useAuthStore } from '@/store/auth.ts';
import { useTeamsStore } from '@/store/teams.ts';
import axios from 'axios';

const authStore = useAuthStore();
const teamsStore = useTeamsStore();

const showCreateTeamModal = ref(false);
const showCreateUserModal = ref(false);
const users = ref([]);

const fetchUsers = async () => {
  try {
    const api = axios.create({
      baseURL: 'http://localhost:3000',
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    });
    const response = await api.get('/users');
    users.value = response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

onMounted(() => {
  teamsStore.fetchTeams();
  if (authStore.user?.role === 'Administrator') {
    fetchUsers();
  }
});
</script>