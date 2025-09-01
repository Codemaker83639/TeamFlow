<template>
  <MainLayout>
    <header class="bg-white p-6 shadow-lg dark:bg-gray-800 dark:text-light transition-all duration-300 border-b border-gray-100 dark:border-gray-700">
      <h2 class="text-2xl font-bold text-dark-purple dark:text-light">Configuración de la Cuenta</h2>
    </header>

    <main class="flex-1 overflow-y-auto bg-light dark:bg-dark-purple p-8 transition-colors duration-300">
      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
        
        <div class="lg:w-1/3 space-y-6">
          <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-50 dark:border-gray-700 group">
            <div class="flex flex-col items-center text-center space-y-4">
              <div class="relative">
                <div class="w-20 h-20 rounded-2xl bg-accent text-white flex items-center justify-center text-2xl font-bold shadow-lg group-hover:scale-105 transition-transform duration-300">
                  {{ userInitials }}
                </div>
                <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white dark:border-gray-800 shadow-md">
                  <div class="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <div class="space-y-2">
                <h3 class="text-xl font-bold text-dark-purple dark:text-light">{{ authStore.user?.full_name }}</h3>
                <p class="text-gray-500 dark:text-gray-400 text-sm flex items-center justify-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>{{ authStore.user?.email }}</span>
                </p>
                <div class="flex justify-center">
                  <span class="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-secondary bg-light-accent rounded-full capitalize shadow-sm">
                    <div class="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                    {{ authStore.user?.role }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-50 dark:border-gray-700 group">
            <div class="flex items-start space-x-3 mb-4">
              <div class="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-dark-purple dark:text-light">Ayuda</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Soporte y recursos</p>
              </div>
            </div>
            
            <div class="space-y-3">
              <a :href="documentationUrl" target="_blank" rel="noopener noreferrer" class="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 group/help">
                <div class="flex items-center space-x-3">
                  <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                  <span class="text-sm text-gray-600 dark:text-gray-300">Documentación</span>
                </div>
                <svg class="w-4 h-4 text-gray-400 group-hover/help:text-accent group-hover/help:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
              
              <a :href="faqUrl" target="_blank" rel="noopener noreferrer" class="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 group/help">
                <div class="flex items-center space-x-3">
                  <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span class="text-sm text-gray-600 dark:text-gray-300">Preguntas Frecuentes</span>
                </div>
                <svg class="w-4 h-4 text-gray-400 group-hover/help:text-accent group-hover/help:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
              
              <a href="https://wa.me/18298143826" target="_blank" rel="noopener noreferrer" class="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 group/help">
                <div class="flex items-center space-x-3">
                  <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span class="text-sm text-gray-600 dark:text-gray-300">Contactar Soporte</span>
                </div>
                <svg class="w-4 h-4 text-gray-400 group-hover/help:text-accent group-hover/help:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div class="lg:w-2/3 space-y-6">
          
          <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-50 dark:border-gray-700 group">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-dark-purple dark:text-light mb-3 flex items-center">
                  Editar Perfil
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Haz clic en el botón para actualizar la información de tu perfil, como tu nombre completo, email o contraseña.
                </p>
                <button @click="openEditModal" class="inline-flex items-center px-6 py-3 font-medium text-white bg-accent rounded-xl hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group">
                  <svg class="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  Actualizar mi Información
                </button>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-50 dark:border-gray-700 group">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-dark-purple dark:text-light mb-3">Apariencia</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Personaliza la apariencia de TeamFlow cambiando entre tema claro y oscuro según tu preferencia.
                </p>
                <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-red-500 dark:border-red-700 group relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-1 bg-red-500/20"></div>
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors duration-300">
                <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-red-600 dark:text-red-500 mb-3 flex items-center">
                  Zona de Peligro
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Cerrar tu sesión terminará tu acceso actual a TeamFlow.
                </p>
                <button @click="handleLogout" class="inline-flex items-center px-6 py-3 font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group">
                  <svg class="w-4 h-4 mr-2 group-hover:-rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  Cerrar Sesión
                </button>
              </div>
            </div>
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
import CreateUserForm from '@/components/CreateUserForm.vue';

// --- SE IMPORTAN LOS ARCHIVOS PDF ---
import documentationUrl from '@/assets/Documentación.pdf';
import faqUrl from '@/assets/Preguntas Frecuentes.pdf';


const router = useRouter();
const authStore = useAuthStore();

const isEditModalVisible = ref(false);

const userInitials = computed(() => {
  if (authStore.user && authStore.user.full_name) {
    const names = authStore.user.full_name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  }
  return '';
});

const openEditModal = () => {
  isEditModalVisible.value = true;
};

const closeEditModal = () => {
  isEditModalVisible.value = false;
  // Considera refrescar los datos del usuario aquí si tienes una acción para ello.
  // authStore.fetchCurrentUser(); 
};

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>