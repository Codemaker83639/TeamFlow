<template>
  <div class="bg-dark-purple text-light">
    <LandingNavbar />

    <main class="container mx-auto px-6 py-24 text-center">
      <h2 class="text-5xl font-extrabold mb-4 animate-fade-in-down">Optimiza tu Flujo de Trabajo Remoto</h2>
      <p class="text-xl text-light-accent mb-8 max-w-3xl mx-auto animate-fade-in-up">
        TeamFlow es la plataforma definitiva para la gestión de proyectos, diseñada para equipos que buscan eficiencia, colaboración y resultados excepcionales sin importar la distancia.
      </p>
      <RouterLink to="/login">
        <button class="bg-accent text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-secondary transition-transform transform hover:scale-105 duration-300">
          Comienza Ahora
        </button>
      </RouterLink>
    </main>

    <section class="bg-primary py-20">
      <div class="container mx-auto px-6 text-center">
        <h3 class="text-4xl font-bold mb-12">¿Por Qué es Importante Gestionar tus Proyectos?</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-6">
            <p class="text-6xl font-bold text-light-accent">77%</p>
            <p class="mt-2 text-light">De los proyectos de alto rendimiento utilizan un software de gestión de proyectos.</p>
          </div>
          <div class="p-6">
            <p class="text-6xl font-bold text-light-accent">28x</p>
            <p class="mt-2 text-light">Menos dinero desperdician las organizaciones que invierten en prácticas de gestión de proyectos.</p>
          </div>
          <div class="p-6">
            <p class="text-6xl font-bold text-light-accent">+47%</p>
            <p class="mt-2 text-light">Aumenta la productividad de los empleados que trabajan desde casa con las herramientas adecuadas.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20">
       <div class="container mx-auto px-6 text-center">
         <h3 class="text-4xl font-bold mb-4">¿Listo para Transformar tu Equipo?</h3>
         <p class="text-light-accent mb-8">Únete a las organizaciones que ya están alcanzando sus metas más rápido.</p>
         <RouterLink to="/login">
            <button class="bg-accent text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-secondary transition-transform transform hover:scale-105 duration-300">
              Prueba TeamFlow
            </button>
          </RouterLink>
       </div>
    </section>

    <footer class="bg-primary py-6">
      <div class="container mx-auto text-center text-sm text-gray-400">
        <p>&copy; 2025 TeamFlow. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import LandingNavbar from '@/components/LandingNavbar.vue';
import { RouterLink } from 'vue-router';
</script>

<style scoped>
/* Animaciones simples para darle más vida */
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-down {
  animation: fadeInDown 1s ease-out forwards;
}
.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}
</style>