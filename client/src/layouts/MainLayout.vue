<template>
  <div class="flex h-screen bg-light dark:bg-dark-purple">
    
    <aside class="w-64 bg-primary dark:bg-gray-900 text-light flex flex-col">
      <div class="px-8 py-6">
        <h1 class="text-2xl font-bold">TeamFlow</h1>
      </div>
      
      <nav class="flex-1 px-6">
        <ul>
          <li class="mb-2"><RouterLink to="/dashboard" class="block py-2 px-4 rounded-lg hover:bg-secondary">⛷️ {{ $t('sidebar.dashboard') }}</RouterLink></li>
          <li class="mb-2"><RouterLink to="/projects" class="block py-2 px-4 rounded-lg hover:bg-secondary">🗂️ {{ $t('sidebar.projects') }}</RouterLink></li>
          <li class="mb-2"><RouterLink to="/boards" class="block py-2 px-4 rounded-lg hover:bg-secondary">📊 {{ $t('sidebar.boards') }}</RouterLink></li>
          <li class="mb-2"><RouterLink to="/teams" class="block py-2 px-4 rounded-lg hover:bg-secondary">👩🏻‍💻 {{ $t('sidebar.teams') }}</RouterLink></li>
          <li class="mb-2"><RouterLink to="/reports" class="block py-2 px-4 rounded-lg hover:bg-secondary">📜 {{ $t('sidebar.reports') }}</RouterLink></li>
          <li class="mb-2"><RouterLink to="/settings" class="block py-2 px-4 rounded-lg hover:bg-secondary">⚙️ {{ $t('sidebar.settings') }}</RouterLink></li>
        </ul>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col overflow-hidden">
      <slot /> 
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
/* Estilos para marcar el enlace activo en ambos modos */
.router-link-exact-active {
  background-color: #522B5B; /* Color 'secondary' */
  color: white;
}
</style>