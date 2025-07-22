<template>
  <div class="flex h-screen bg-light">
    <aside class="w-64 bg-primary text-light flex flex-col">
      <div class="px-8 py-6"><h1 class="text-2xl font-bold">TeamFlow</h1></div>
      <nav class="flex-1 px-6">
        <ul>
          <li class="mb-2"><RouterLink to="/dashboard" class="block py-2 px-4 rounded-lg hover:bg-secondary">Dashboard</RouterLink></li>
          <li class="mb-2"><RouterLink to="/projects" class="block py-2 px-4 rounded-lg hover:bg-secondary">Proyectos</RouterLink></li>
          <li class="mb-2"><RouterLink to="/boards" class="block py-2 px-4 rounded-lg hover:bg-secondary">Tableros</RouterLink></li>
          <li class="mb-2"><RouterLink to="/teams" class="block py-2 px-4 rounded-lg bg-secondary">Equipos</RouterLink></li>
        </ul>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="bg-white p-6 shadow">
        <h2 class="text-2xl font-bold text-dark-purple">Gestión de Equipos</h2>
      </header>
      <main class="flex-1 overflow-y-auto bg-light p-6">
        <div class="bg-white p-6 rounded-lg shadow">
           <h3 class="text-xl font-bold text-dark-purple mb-4">Miembros del Equipo</h3>
           <p class="text-accent">Aquí se mostrará la lista de equipos y sus miembros...</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>