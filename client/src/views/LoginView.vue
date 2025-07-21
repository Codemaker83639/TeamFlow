<template>
  <div class="flex items-center justify-center min-h-screen bg-dark-purple">
    <div class="w-full max-w-md p-8 space-y-8 bg-primary rounded-2xl shadow-2xl">
      <div class="text-center">
        <div class="mx-auto h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
          <svg class="h-6 w-6 text-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 class="mt-6 text-3xl font-bold text-light">Bienvenido de Vuelta</h2>
        <p class="mt-2 text-sm text-light-accent">Inicia sesión para continuar con TeamFlow</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <input v-model="email" type="email" placeholder="Email" required 
                 class="w-full px-4 py-3 bg-secondary text-light border-accent border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent">
        </div>
        
        <div>
          <input v-model="password" type="password" placeholder="Contraseña" required
                 class="w-full px-4 py-3 bg-secondary text-light border-accent border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent">
        </div>
        
        <button type="submit" 
                class="w-full py-3 font-semibold text-white bg-accent rounded-lg hover:bg-opacity-80 transition-colors duration-300">
          Entrar
        </button>
      </form>

      <div v-if="message" :class="isError ? 'text-red-400' : 'text-green-400'" class="mt-4 text-center text-sm">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const email = ref('');
const password = ref('');
const message = ref('');
const isError = ref(false);

const handleLogin = async () => {
  message.value = '';
  isError.value = false;
  
  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      email: email.value,
      password: password.value,
    });

    const token = response.data.accessToken;
    localStorage.setItem('accessToken', token);
    
    isError.value = false;
    message.value = '¡Login exitoso! Redirigiendo...';
    
    // Redirigir al dashboard después de un login exitoso
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);

  } catch (error) {
    isError.value = true;
    message.value = 'Credenciales inválidas. Por favor, inténtalo de nuevo.';
    console.error('Error en el login:', error);
  }
};
</script>