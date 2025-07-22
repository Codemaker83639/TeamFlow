<template>
  <MainLayout>
    <header class="bg-white p-6 shadow">
      <h2 class="text-2xl font-bold text-dark-purple">Gestión de Equipos</h2>
    </header>
    <main class="flex-1 overflow-y-auto bg-light p-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-xl font-bold text-dark-purple mb-4">Miembros del Equipo</h3>
        <p class="text-accent">Aquí se mostrará la lista de equipos y sus miembros...</p>
      </div>
    </main>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
</script>