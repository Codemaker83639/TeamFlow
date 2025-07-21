<template>
  <div class="bg-dark-purple min-h-screen text-light">
    <LandingNavbar />
    <main class="container mx-auto px-6 py-20 text-center">
      <h2 class="text-5xl font-extrabold mb-4">Optimiza tu Flujo de Trabajo Remoto</h2>
      <p class="text-xl text-light-accent mb-8 max-w-2xl mx-auto">
        TeamFlow es la plataforma definitiva para la gestión de proyectos, diseñada para equipos que buscan eficiencia, colaboración y resultados excepcionales sin importar la distancia.
      </p>
      <RouterLink to="/login">
        <button class="bg-accent text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-secondary transition-colors duration-300">
          Comienza Ahora
        </button>
      </RouterLink>
    </main>
  </div>
</template>

<script setup>
import LandingNavbar from '@/components/LandingNavbar.vue';
import { RouterLink } from 'vue-router';
</script>