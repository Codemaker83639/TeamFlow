<template>
  <div class="bg-dark-purple min-h-screen relative overflow-hidden flex items-center justify-center" style="color: #FBE4D8;">
    <!-- Grid de fondo sutil -->
    <div class="absolute inset-0 opacity-5">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#8B5CF6" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <!-- Elementos de fondo decorativos -->
    <div class="absolute top-20 left-20 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-pulse"></div>
    <div class="absolute bottom-32 right-20 w-48 h-48 bg-secondary/10 rounded-full blur-2xl animate-pulse animation-delay-400"></div>
    <div class="absolute top-1/2 left-10 w-24 h-24 bg-light-accent/10 rounded-full blur-lg animate-pulse animation-delay-800"></div>

    <!-- Contenedor principal -->
    <div class="relative z-10 w-full max-w-md mx-6">
      <!-- Card de login con glassmorphism -->
      <div class="bg-primary/40 backdrop-blur-xl rounded-3xl p-8 border border-accent/20 shadow-2xl animate-fade-in">
        
        <!-- Header con logo y título -->
        <div class="text-center mb-8">
          <!-- Logo con animación -->
          <div class="mx-auto h-16 w-16 rounded-2xl bg-accent/20 backdrop-blur-sm flex items-center justify-center mb-6 hover:scale-110 transition-transform duration-300">
            <svg class="h-8 w-8 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>



          <h1 class="text-4xl font-black mb-3 animate-slide-up animation-delay-200" style="color: #FBE4D8;">
            Bienvenido de <span style="color: #FBE4D8;">Vuelta</span>
          </h1>
          <p class="text-sm opacity-80 animate-slide-up animation-delay-400" style="color: #FBE4D8;">
            Inicia sesión para continuar con TeamFlow
          </p>
        </div>
        
        <!-- Formulario -->
        <form @submit.prevent="handleLogin" class="space-y-6 animate-slide-up animation-delay-600">
          <!-- Campo Email -->
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 group-focus-within:text-accent transition-colors duration-200" style="color: #FBE4D8;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            <input 
              v-model="email" 
              type="email" 
              placeholder="Correo electrónico" 
              required 
              class="w-full pl-12 pr-4 py-4 bg-dark-purple/60 backdrop-blur-sm text-light border border-accent/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-300 placeholder-light/40"
            >
          </div>
          
          <!-- Campo Password -->
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 group-focus-within:text-accent transition-colors duration-200" style="color: #FBE4D8;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input 
              v-model="password" 
              type="password" 
              placeholder="Contraseña" 
              required
              class="w-full pl-12 pr-4 py-4 bg-dark-purple/60 backdrop-blur-sm text-light border border-accent/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-300 placeholder-light/40"
            >
          </div>
          
          <!-- Botón de login -->
          <button 
            type="submit" 
            :disabled="isLoading"
            class="group relative w-full py-4 font-bold text-white bg-accent hover:bg-accent/90 rounded-2xl text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span v-if="!isLoading" class="flex items-center justify-center gap-3">
              Iniciar Sesión
              <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </div>
            </span>
            <span v-else class="flex items-center justify-center gap-2">
              <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Iniciando sesión...
            </span>
          </button>
        </form>

        <!-- Mensaje de estado -->
        <div v-if="message" class="mt-6 animate-fade-in">
          <div 
            :class="[
              'p-4 rounded-2xl text-center text-sm font-medium transition-all duration-300',
              isError 
                ? 'bg-red-500/10 border border-red-500/30 text-red-300' 
                : 'bg-green-500/10 border border-green-500/30 text-green-300'
            ]"
          >
            <div class="flex items-center justify-center gap-2">
              <!-- Icono de error -->
              <svg v-if="isError" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <!-- Icono de éxito -->
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ message }}
            </div>
          </div>
        </div>

        <!-- Links adicionales -->
        <div class="mt-8 text-center animate-slide-up animation-delay-800">
          <div class="flex items-center justify-center gap-4 text-sm opacity-60" style="color: #FBE4D8;">
            <div class="flex items-center gap-2">
              <div class="w-3 h-0.5 bg-accent/50 rounded-full"></div>
              <span>¿Olvidaste tu contraseña?</span>
              <div class="w-3 h-0.5 bg-accent/50 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth.ts'; 

const router = useRouter();
const authStore = useAuthStore(); 

const email = ref('');
const password = ref('');
const message = ref('');
const isError = ref(false);
const isLoading = ref(false);

const handleLogin = async () => {
  message.value = '';
  isError.value = false;
  isLoading.value = true;

  try {
    await authStore.login(email.value, password.value);

    isError.value = false;
    message.value = '¡Login exitoso! Redirigiendo...';

    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);

  } catch (error) {
    isError.value = true;
    message.value = 'Credenciales inválidas. Por favor, inténtalo de nuevo.';
    console.error('Error en el login:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Animaciones */
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

/* Clases de animación */
.animate-fade-in { 
  animation: fadeIn 0.8s ease-out forwards; 
  opacity: 0;
}

.animate-slide-up { 
  animation: slideUp 0.6s ease-out forwards; 
  opacity: 0;
}

/* Delays */
.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-400 { animation-delay: 0.4s; }
.animation-delay-600 { animation-delay: 0.6s; }
.animation-delay-800 { animation-delay: 0.8s; }
.animation-delay-1000 { animation-delay: 1s; }

/* Efectos glassmorphism mejorados */
.bg-primary\/40 {
  background: rgba(45, 55, 72, 0.4);
}

.bg-dark-purple\/60 {
  background: rgba(35, 25, 65, 0.6);
}

/* Hover effects para inputs */
input:focus {
  transform: translateY(-1px);
}

/* Responsivo */
@media (max-width: 768px) {
  .text-4xl { font-size: 2rem; }
}

@media (max-width: 480px) {
  .rounded-3xl { border-radius: 1.5rem; }
  .p-8 { padding: 1.5rem; }
}
</style>