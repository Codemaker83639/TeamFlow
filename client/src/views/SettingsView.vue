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
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Haz clic en el botón para actualizar la información de tu perfil, como tu nombre completo, email o contraseña.
            </p>
            <button @click="openEditModal" class="px-4 py-2 font-medium text-white bg-accent rounded-md hover:bg-secondary transition-colors duration-300">
              Actualizar mi Información
            </button>
          </div>
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 class="text-xl font-bold text-dark-purple dark:text-light mb-4">{{ $t('settings.appearance') }}</h3>
            <div class="space-y-4">
              <ThemeToggle />
              <div class="border-t dark:border-gray-700"></div>
              <div>
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ $t('settings.language') }}</p>
                <LanguageSwitcher />
              </div>
            </div>
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

    <CreateUserForm
      v-if="isEditModalVisible"
      :userToEdit="authStore.user"
      @close="closeEditModal"
    />
    </MainLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import { useAuthStore } from '@/store/auth.ts';
import ThemeToggle from '@/components/ThemeToggle.vue';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';

// --- 1. IMPORTAMOS EL MODAL ---
import CreateUserForm from '@/components/CreateUserForm.vue';

const router = useRouter();
const authStore = useAuthStore();

// --- 2. VARIABLE PARA CONTROLAR LA VISIBILIDAD DEL MODAL ---
const isEditModalVisible = ref(false);

const userInitials = computed(() => {
  if (authStore.user && authStore.user.full_name) {
    const names = authStore.user.full_name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  }
  return '';
});

// --- 3. FUNCIONES PARA ABRIR Y CERRAR EL MODAL ---
const openEditModal = () => {
  isEditModalVisible.value = true;
};

const closeEditModal = () => {
  isEditModalVisible.value = false;
  // Opcional pero recomendado: Refrescar los datos del usuario por si se cambió el nombre.
  // Es probable que tengas una acción en tu authStore para esto, como:
  // authStore.fetchCurrentUser(); 
};

// Se elimina la función updateProfile que ya no se usa.

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>