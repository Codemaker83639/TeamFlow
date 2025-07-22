<template>
  <nav class="bg-primary shadow-lg">
    <div class="container mx-auto px-6 py-3 flex justify-between items-center">
      <div class="flex items-center">
        <img :src="logo" alt="TeamFlow Logo" class="h-16 w-22 rounded-full mr-3">
        <h1 class="text-2xl font-bold text-white">TeamFlow</h1>
      </div>
      <RouterLink to="/login">
        <button class="bg-secondary text-white font-semibold py-2 px-4 rounded-lg hover:bg-accent transition-colors duration-300">
          Iniciar Sesión
        </button>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import logo from '@/assets/logo-teamflow.png'; // Se importa la imagen
</script>