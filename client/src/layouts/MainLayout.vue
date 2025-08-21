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
          
          <li class="mb-2">
            <RouterLink 
              :to="boardLink" 
              :class="['block py-2 px-4 rounded-lg', !lastVisitedProjectId ? 'opacity-50 cursor-not-allowed' : 'hover:bg-secondary']"
              :event="lastVisitedProjectId ? 'click' : ''"
            >
              📊 {{ $t('sidebar.boards') }}
            </RouterLink>
          </li>
          <li class="mb-2"><RouterLink to="/teams" class="block py-2 px-4 rounded-lg hover:bg-secondary">👩🏻‍💻 {{ $t('sidebar.teams') }}</RouterLink></li>
          <li class="mb-2"><RouterLink to="/reports" class="block py-2 px-4 rounded-lg hover:bg-secondary">📜 {{ $t('sidebar.reports') }}</RouterLink></li>
          <li class="mb-2"><RouterLink to="/settings" class="block py-2 px-4 rounded-lg hover:bg-secondary">⚙️ {{ $t('sidebar.settings') }}</RouterLink></li>
        </ul>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col overflow-hidden">
      <slot>
        <router-view />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';

// Mantiene el ID del último proyecto visitado
const lastVisitedProjectId = ref<string | null>(null);
const route = useRoute();

// Genera el enlace para el botón "Tableros"
const boardLink = computed(() => {
  // Si tenemos un ID guardado, crea el enlace. Si no, devuelve un objeto vacío para deshabilitarlo.
  return lastVisitedProjectId.value 
    ? { name: 'board', params: { projectId: lastVisitedProjectId.value } }
    : {};
});

// Cuando el componente se monta por primera vez, intentamos leer el ID del localStorage
onMounted(() => {
  lastVisitedProjectId.value = localStorage.getItem('lastVisitedProjectId');
});

// Observamos la ruta. Si navegamos a un tablero nuevo (o a cualquier ruta con projectId),
// actualizamos y guardamos el ID.
watch(() => route.params, (newParams) => {
    if (newParams.projectId) {
        const newProjectId = newParams.projectId as string;
        lastVisitedProjectId.value = newProjectId;
        localStorage.setItem('lastVisitedProjectId', newProjectId);
    }
}, { immediate: true }); // 'immediate: true' corre el watch al cargar el componente
</script>

<style scoped>
/* Estilos para marcar el enlace activo en ambos modos */
.router-link-exact-active {
  background-color: #522B5B; /* Color 'secondary' */
  color: white;
}
</style>