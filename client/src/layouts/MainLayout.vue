<template>
  <div class="flex h-screen bg-light dark:bg-dark-purple">
    
    <aside class="w-64 bg-primary dark:bg-gray-900 text-light flex flex-col">
      <div class="px-8 py-6">
        <div class="flex items-center space-x-3">
          <img src="/src/assets/logo-teamflow.png" alt="TeamFlow Logo" class="w-8 h-8" />
          <h1 class="text-2xl font-bold">TeamFlow</h1>
        </div>
      </div>
      
      <nav class="flex-1 px-6">
        <ul>
          <li class="mb-2">
            <RouterLink 
              to="/dashboard" 
              class="block py-2 px-4 rounded-lg hover:bg-secondary flex items-center transition-colors duration-200"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v4H8V5z" />
              </svg>
              {{ $t('sidebar.dashboard') }}
            </RouterLink>
          </li>
          
          <li class="mb-2">
            <RouterLink 
              to="/projects" 
              class="block py-2 px-4 rounded-lg hover:bg-secondary flex items-center transition-colors duration-200"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {{ $t('sidebar.projects') }}
            </RouterLink>
          </li>
          
          <li class="mb-2">
            <RouterLink 
              :to="boardLink" 
              :class="[
                'block py-2 px-4 rounded-lg flex items-center transition-colors duration-200',
                !lastVisitedProjectId 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-secondary'
              ]"
              :event="lastVisitedProjectId ? 'click' : ''"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {{ $t('sidebar.boards') }}
            </RouterLink>
          </li>
          
          <li class="mb-2">
            <RouterLink 
              to="/teams" 
              class="block py-2 px-4 rounded-lg hover:bg-secondary flex items-center transition-colors duration-200"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {{ $t('sidebar.teams') }}
            </RouterLink>
          </li>
          
          <li class="mb-2">
            <RouterLink 
              to="/reports" 
              class="block py-2 px-4 rounded-lg hover:bg-secondary flex items-center transition-colors duration-200"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {{ $t('sidebar.reports') }}
            </RouterLink>
          </li>
          
          <li class="mb-2">
            <RouterLink 
              to="/settings" 
              class="block py-2 px-4 rounded-lg hover:bg-secondary flex items-center transition-colors duration-200"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ $t('sidebar.settings') }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col overflow-hidden">
      <slot>
        <router-view />
      </slot>
    </div>

    <NotificationsContainer />

    <AbandonedTimerModal v-if="taskStore.abandonedTimerInfo" />

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { socketService } from '@/services/socketService';
import { useAuthStore } from '@/store/auth';
import { useTaskStore } from '@/store/taskStore';
import NotificationsContainer from '@/components/NotificationsContainer.vue';
import AbandonedTimerModal from '@/components/AbandonedTimerModal.vue';

const lastVisitedProjectId = ref<string | null>(null);
const route = useRoute();
const authStore = useAuthStore();
const taskStore = useTaskStore();

const boardLink = computed(() => {
  return lastVisitedProjectId.value 
    ? { name: 'board', params: { projectId: lastVisitedProjectId.value } }
    : {};
});

onMounted(() => {
  lastVisitedProjectId.value = localStorage.getItem('lastVisitedProjectId');
  
  if (authStore.isAuthenticated) {
    socketService.connect();
  }
});

onUnmounted(() => {
  socketService.disconnect();
});

watch(() => route.params, (newParams) => {
    if (newParams.projectId) {
        const newProjectId = newParams.projectId as string;
        lastVisitedProjectId.value = newProjectId;
        localStorage.setItem('lastVisitedProjectId', newProjectId);
    }
}, { immediate: true });
</script>

<style scoped>
/* Estilos para marcar el enlace activo en ambos modos */
.router-link-exact-active {
  background-color: #522B5B; /* Color 'secondary' */
  color: white;
}

/* Efecto hover suave para los iconos */
.router-link-exact-active svg,
a:hover svg {
  transition: transform 0.2s ease-in-out;
}

a:hover svg {
  transform: scale(1.1);
}
</style>