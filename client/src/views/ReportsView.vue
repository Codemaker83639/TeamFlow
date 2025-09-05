<template>
  <MainLayout>
    <header class="bg-white dark:bg-gray-800 p-6 flex justify-between items-center shadow">
      <h2 class="text-2xl font-bold text-dark-purple dark:text-light">Reportes de Productividad</h2>
      <button class="bg-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300">
        Exportar PDF
      </button>
    </header>

    <main class="flex-1 overflow-y-auto bg-light dark:bg-dark-purple p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p class="text-sm text-accent dark:text-gray-400">Tareas Completadas (Últimos 7 días)</p>
          <p class="text-3xl font-bold text-dark-purple dark:text-light">28</p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p class="text-sm text-accent dark:text-gray-400">Horas Registradas (Este Mes)</p>
          <p class="text-3xl font-bold text-dark-purple dark:text-light">240.5</p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p class="text-sm text-accent dark:text-gray-400">Proyectos Completados</p>
          <p class="text-3xl font-bold text-dark-purple dark:text-light">2</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 class="text-xl font-bold text-dark-purple dark:text-light mb-4">Estado General de Tareas</h3>
          <p class="text-accent dark:text-gray-400">[Aquí iría un Gráfico Circular]</p>
          </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 class="text-xl font-bold text-dark-purple dark:text-light mb-4">Esfuerzo por Proyecto</h3>
          <p class="text-accent dark:text-gray-400">[Aquí iría un Gráfico de Barras]</p>
          </div>
      </div>
    </main>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
</script>