<template>
  <MainLayout>
    <header class="bg-white p-6 flex justify-between items-center shadow">
      <div>
        <h2 class="text-2xl font-bold text-dark-purple">¡Hola, {{ authStore.user?.full_name }}! 👋</h2>
        <p class="text-accent">Tienes 3 proyectos activos y 12 tareas pendientes</p>
      </div>
      <UserProfile />
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
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import UserProfile from '@/components/UserProfile.vue';
import { useAuthStore } from '@/store/auth.ts'; // <-- Ruta corregida aquí también

const authStore = useAuthStore();
</script>