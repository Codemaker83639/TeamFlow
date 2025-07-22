<template>
  <MainLayout>
    <header class="bg-white p-6 shadow dark:bg-gray-800 dark:text-light">
      <h2 class="text-2xl font-bold text-dark-purple dark:text-light">Configuración de la Cuenta</h2>
    </header>

    <main class="flex-1 overflow-y-auto bg-light dark:bg-dark-purple p-8">
      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
        
        <div class="lg:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow self-start">
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-bold">
              {{ userInitials }}
            </div>
            <div>
              <h3 class="text-xl font-bold text-dark-purple dark:text-light">{{ authStore.user?.full_name }}</h3>
              <p class="text-gray-500 dark:text-gray-400">{{ authStore.user?.email }}</p>
              <span class="mt-1 inline-block px-2 py-1 text-xs font-semibold text-secondary bg-light-accent rounded-full capitalize">
                {{ authStore.user?.role }}
              </span>
            </div>
          </div>
        </div>

        <div class="lg:w-2/3 space-y-8">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 class="text-xl font-bold text-dark-purple dark:text-light mb-4">Editar Perfil</h3>
            <form @submit.prevent="updateProfile" class="space-y-4">
              <div>
                <label for="fullName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre Completo</label>
                <input v-model="fullName" type="text" id="fullName" class="w-full px-3 py-2 mt-1 bg-gray-50 dark:bg-gray-700 dark:text-light border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary">
              </div>
              <button type="submit" class="px-4 py-2 font-medium text-white bg-accent rounded-md hover:bg-secondary transition-colors duration-300">
                Guardar Cambios
              </button>
            </form>
          </div>

          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 class="text-xl font-bold text-dark-purple dark:text-light mb-4">Apariencia</h3>
            <ThemeToggle />
          </div>

          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-t-4 border-red-500 dark:border-red-700">
            <h3 class="text-xl font-bold text-red-600 dark:text-red-500 mb-4">Zona de Peligro</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Cerrar tu sesión terminará tu acceso actual a TeamFlow.
            </p>
            <button @click="handleLogout" class="px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-300">
              Cerrar Sesión
            </button>
          </div>
        </div>

      </div>
    </main>
  </MainLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import { useAuthStore } from '@/store/auth.ts';
import ThemeToggle from '@/components/ThemeToggle.vue'; // <-- SE AÑADIÓ ESTA IMPORTACIÓN

const router = useRouter();
const authStore = useAuthStore();

const fullName = ref(authStore.user?.full_name);

const userInitials = computed(() => {
  if (authStore.user && authStore.user.full_name) {
    const names = authStore.user.full_name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  }
  return '';
});

const updateProfile = () => {
  alert('Funcionalidad para actualizar perfil aún no implementada.');
};

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>