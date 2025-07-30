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
            <button v-if="authStore.user?.role === 'admin'" @click="showCreateTeamModal = true" class="bg-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-secondary text-sm">
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
             <button v-if="authStore.user?.role === 'admin'" @click="showCreateUserModal = true" class="bg-secondary text-white font-semibold py-1 px-3 rounded-lg text-sm">
               Añadir Usuario
             </button>
          </div>
          <p class="text-accent dark:text-gray-400">Aquí se mostrará la lista de usuarios del sistema...</p>
        </div>

      </div>
    </main>

    <CreateUserForm v-if="showCreateUserModal" @close="showCreateUserModal = false" @createUser="handleUserCreation" />
    </MainLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import CreateUserForm from '@/components/CreateUserForm.vue';
import { useAuthStore } from '@/store/auth.ts';
import { useTeamsStore } from '@/store/teams.ts';

const authStore = useAuthStore();
const teamsStore = useTeamsStore();

const showCreateTeamModal = ref(false);
const showCreateUserModal = ref(false);

onMounted(() => {
  teamsStore.fetchTeams();
});

const handleUserCreation = (userData) => {
  console.log('Datos del nuevo usuario recibidos en la vista:', userData);
  showCreateUserModal.value = false;
};
</script>