<template>
  <MainLayout>
    <header class="bg-white dark:bg-gray-800 p-6 shadow">
      <h2 class="text-2xl font-bold text-dark-purple dark:text-light">Reportes de Productividad</h2>
    </header>
    <main class="flex-1 overflow-y-auto bg-light dark:bg-dark-purple p-6">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 class="text-xl font-bold text-dark-purple dark:text-light mb-4">Análisis de Rendimiento</h3>
        <p class="text-accent dark:text-gray-400">Aquí se mostrarán los gráficos y reportes del equipo...</p>
      </div>
    </main>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
</script>