<template>
  <nav class="bg-primary shadow-lg overflow-hidden">
    <div class="container mx-auto px-6 py-3 flex justify-between items-center">
      <!-- Logo y título con animación de entrada -->
      <div class="flex items-center group cursor-pointer">
        <img 
          :src="logo" 
          alt="TeamFlow Logo" 
          class="h-16 w-22 rounded-full mr-3 transform transition-all duration-500 hover:scale-110 hover:rotate-12 animate-slide-in-left"
          :class="{ 'animate-bounce': isLogoHovered }"
          @mouseenter="isLogoHovered = true"
          @mouseleave="isLogoHovered = false"
        >
        <h1 class="text-2xl font-bold text-white transition-all duration-300 hover:text-purple-200 animate-fade-in-up group-hover:transform group-hover:scale-105">
          TeamFlow
        </h1>
      </div>
      
      <!-- Botón con animaciones mejoradas -->
      <RouterLink to="/about">
        <button 
          class="bg-secondary text-white font-semibold py-2 px-4 rounded-lg hover:bg-accent transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-slide-in-right relative overflow-hidden"
          @mouseenter="startButtonAnimation"
          @mouseleave="stopButtonAnimation"
        >
          <span class="relative z-10">Sobre Nosotros</span>
          <!-- Efecto de ondas en el botón -->
          <div 
            v-if="isButtonHovered"
            class="absolute inset-0 bg-white opacity-20 rounded-lg animate-pulse"
          ></div>
        </button>
      </RouterLink>
    </div>
    
    <!-- Barra de carga animada -->
    <div class="h-1 bg-purple-800">
      <div class="h-full bg-gradient-to-r from-purple-400 to-pink-400 animate-loading-bar"></div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import logo from '@/assets/logo-teamflow.png';

// Variables reactivas para las animaciones
const isLogoHovered = ref(false);
const isButtonHovered = ref(false);

const startButtonAnimation = () => {
  isButtonHovered.value = true;
};

const stopButtonAnimation = () => {
  isButtonHovered.value = false;
};
</script>

<style scoped>
/* Animaciones de entrada */
@keyframes slide-in-left {
  from {
    transform: translateX(-100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-in-right {
  from {
    transform: translateX(100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fade-in-up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes loading-bar {
  0% {
    width: 0%;
  }
  50% {
    width: 70%;
  }
  100% {
    width: 100%;
  }
}

/* Clases de animación */
.animate-slide-in-left {
  animation: slide-in-left 0.8s ease-out;
}

.animate-slide-in-right {
  animation: slide-in-right 0.8s ease-out 0.2s both;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out 0.1s both;
}

.animate-loading-bar {
  animation: loading-bar 3s ease-in-out infinite;
}
</style>