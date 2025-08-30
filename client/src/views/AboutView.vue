<template>
  <div class="bg-primary min-h-screen flex flex-col items-center justify-center p-6 text-white">
    <div class="max-w-4xl w-full bg-secondary rounded-2xl shadow-2xl p-8 md:p-12 text-center transform hover:scale-[1.02] transition-transform duration-500">
      
      <div class="flex items-center justify-center mb-6">
        <img src="@/assets/logo-teamflow.png" alt="TeamFlow Logo" class="h-20 w-auto rounded-full mr-4">
        <h1 class="text-5xl font-bold text-white">Sobre TeamFlow</h1>
      </div>

      <p class="text-lg md:text-xl text-purple-200 mb-8 leading-relaxed">
        <strong>TeamFlow</strong> nació como un proyecto de tesis con la misión de resolver los desafíos de la gestión de proyectos en equipos remotos. Entendemos que la falta de visibilidad y las dificultades de coordinación pueden frenar hasta al equipo más talentoso.
      </p>

      <div class="grid md:grid-cols-2 gap-8 mb-10 text-left">
        <div class="bg-primary p-6 rounded-lg border border-accent">
          <h2 class="text-2xl font-semibold mb-3 text-light">Nuestra Misión</h2>
          <p class="text-purple-200">
            Ofrecer una plataforma intuitiva y poderosa que centralice la comunicación, el seguimiento de tareas y la medición de la productividad, permitiendo a los equipos distribuidos alcanzar su máximo potencial.
          </p>
        </div>
        <div class="bg-primary p-6 rounded-lg border border-accent">
          <h2 class="text-2xl font-semibold mb-3 text-light">Los Creadores</h2>
          <p class="text-purple-200">
            Este proyecto es desarrollado por <strong>Francisco Ogando</strong> y <strong>José Luis Galán</strong>, estudiantes de Ingeniería en Sistemas apasionados por la tecnología y la optimización de flujos de trabajo.
          </p>
        </div>
      </div>

      <RouterLink to="/">
        <button class="bg-accent text-white font-semibold py-3 px-8 rounded-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
          Volver al Inicio
        </button>
      </RouterLink>

    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
/* Estilos adicionales si fueran necesarios */
</style>