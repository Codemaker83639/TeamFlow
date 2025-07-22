<template>
  <div class="flex h-screen bg-light">
    <aside class="w-64 bg-primary text-light flex flex-col">
      <div class="px-8 py-6">
        <h1 class="text-2xl font-bold">TeamFlow</h1>
      </div>
      
      <nav class="flex-1 px-6">
        <ul>
          <li class="mb-2"><RouterLink to="/dashboard" class="block py-2 px-4 rounded-lg hover:bg-secondary">Dashboard</RouterLink></li>
          <li class="mb-2"><RouterLink to="/projects" class="block py-2 px-4 rounded-lg hover:bg-secondary">Proyectos</RouterLink></li>
          <li class="mb-2"><RouterLink to="/boards" class="block py-2 px-4 rounded-lg hover:bg-secondary">Tableros</RouterLink></li>
          <li class="mb-2"><RouterLink to="/teams" class="block py-2 px-4 rounded-lg hover:bg-secondary">Equipos</RouterLink></li>
        </ul>
      </nav>

    </aside>

    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="bg-white p-6 flex justify-between items-center shadow">
        <div>
          <h2 class="text-2xl font-bold text-dark-purple">¡Hola, María! 👋</h2>
          <p class="text-accent">Tienes 3 proyectos activos y 12 tareas pendientes</p>
        </div>
        <button class="bg-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-secondary">Nuevo Proyecto</button>
      </header>

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-light p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div class="bg-white p-6 rounded-lg shadow"><p class="text-sm text-accent">PROYECTOS ACTIVOS</p><p class="text-3xl font-bold text-dark-purple">3</p></div>
          <div class="bg-white p-6 rounded-lg shadow"><p class="text-sm text-accent">TAREAS COMPLETADAS</p><p class="text-3xl font-bold text-dark-purple">47</p></div>
          <div class="bg-white p-6 rounded-lg shadow"><p class="text-sm text-accent">HORAS TRABAJADAS</p><p class="text-3xl font-bold text-dark-purple">156</p></div>
          <div class="bg-white p-6 rounded-lg shadow"><p class="text-sm text-accent">MIEMBROS DEL EQUIPO</p><p class="text-3xl font-bold text-dark-purple">12</p></div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
           <h3 class="text-xl font-bold text-dark-purple mb-4">Proyectos Recientes</h3>
           <p class="text-accent">Aquí se mostrarán los proyectos recientes...</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>