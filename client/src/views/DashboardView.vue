<template>
  <MainLayout>
    <!-- Header sin degradados -->
    <header class="relative bg-white dark:bg-gray-800 p-6 flex justify-between items-center shadow-lg border-b border-gray-200 dark:border-gray-700">
      <!-- Sin elemento decorativo de fondo -->
      
      <div class="relative z-10">
        <!-- Eliminé el avatar circular y reorganicé el contenido -->
        <div class="mb-2">
          <h2 class="text-3xl font-bold text-black dark:text-purple-200">
            ¡Hola, {{ authStore.user?.full_name }}! 👋
          </h2>
        </div>
        
        <div class="flex items-center space-x-2">
          <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <p v-if="!dashboardStore.isLoading" class="text-accent dark:text-gray-400 font-medium">
            Tienes <span class="font-bold text-dark-purple dark:text-light">{{ dashboardStore.stats?.activeProjects || 0 }} proyectos activos</span> y 
            <span class="font-bold text-dark-purple dark:text-light">{{ dashboardStore.stats?.completedTasks || 0 }} tareas completadas</span>.
          </p>
          <p v-else class="text-accent dark:text-gray-400 flex items-center space-x-2">
            <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            <span>Cargando tus estadísticas...</span>
          </p>
        </div>
      </div>
      
      <div class="relative z-10">
        <UserProfile />
      </div>
    </header>

    <main class="flex-1 overflow-x-hidden overflow-y-auto p-6" style="background-color: #FBE4D8;">
      <!-- Cards de estadísticas con paleta original -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Proyectos Activos -->
        <div class="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 overflow-hidden hover:scale-105">
          <!-- Fondo decorativo -->
          <div class="absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-6 translate-x-6 group-hover:scale-150 transition-transform duration-300" style="background-color: rgba(133, 79, 108, 0.1);"></div>
          
          <!-- Icono -->
          <div class="flex items-center justify-between mb-4">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style="background-color: #854F6C;">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
          </div>
          
          <p class="text-xs font-semibold text-accent dark:text-gray-400 uppercase tracking-wider mb-2">PROYECTOS ACTIVOS</p>
          <p v-if="!dashboardStore.isLoading" class="text-4xl font-bold text-dark-purple dark:text-light mb-1 transition-colors" style="color: #854F6C;">
            {{ dashboardStore.stats?.activeProjects || 0 }}
          </p>
          <p v-else class="text-4xl font-bold text-gray-400 animate-pulse">...</p>
          <div class="absolute bottom-0 left-0 w-full h-1 group-hover:h-2 transition-all duration-300" style="background-color: #854F6C;"></div>
        </div>

        <!-- Tareas Completadas -->
        <div class="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 overflow-hidden hover:scale-105">
          <div class="absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-6 translate-x-6 group-hover:scale-150 transition-transform duration-300" style="background-color: rgba(133, 79, 108, 0.1);"></div>
          
          <div class="flex items-center justify-between mb-4">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style="background-color: #854F6C;">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          
          <p class="text-xs font-semibold text-accent dark:text-gray-400 uppercase tracking-wider mb-2">TAREAS COMPLETADAS</p>
          <p v-if="!dashboardStore.isLoading" class="text-4xl font-bold text-dark-purple dark:text-light mb-1 transition-colors" style="color: #854F6C;">
            {{ dashboardStore.stats?.completedTasks || 0 }}
          </p>
          <p v-else class="text-4xl font-bold text-gray-400 animate-pulse">...</p>
          <div class="absolute bottom-0 left-0 w-full h-1 group-hover:h-2 transition-all duration-300" style="background-color: #854F6C;"></div>
        </div>

        <!-- Horas Trabajadas -->
        <div class="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 overflow-hidden hover:scale-105">
          <div class="absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-6 translate-x-6 group-hover:scale-150 transition-transform duration-300" style="background-color: rgba(133, 79, 108, 0.1);"></div>
          
          <div class="flex items-center justify-between mb-4">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style="background-color: #854F6C;">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          
          <p class="text-xs font-semibold text-accent dark:text-gray-400 uppercase tracking-wider mb-2">HORAS TRABAJADAS</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">(Últimos 7 días)</p>
          <p v-if="!dashboardStore.isLoading" class="text-4xl font-bold transition-colors" style="color: #854F6C;">
            {{ dashboardStore.stats?.workedHours || 0 }}
          </p>
          <p v-else class="text-4xl font-bold text-gray-400 animate-pulse">...</p>
          <div class="absolute bottom-0 left-0 w-full h-1 group-hover:h-2 transition-all duration-300" style="background-color: #854F6C;"></div>
        </div>

        <!-- Compañeros de Equipo -->
        <div class="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 overflow-hidden hover:scale-105">
          <div class="absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-6 translate-x-6 group-hover:scale-150 transition-transform duration-300" style="background-color: rgba(133, 79, 108, 0.1);"></div>
          
          <div class="flex items-center justify-between mb-4">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style="background-color: #854F6C;">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
          </div>
          
          <p class="text-xs font-semibold text-accent dark:text-gray-400 uppercase tracking-wider mb-2">COMPAÑEROS DE EQUIPO</p>
          <p v-if="!dashboardStore.isLoading" class="text-4xl font-bold transition-colors" style="color: #854F6C;">
            {{ dashboardStore.stats?.teamMembers || 0 }}
          </p>
          <p v-else class="text-4xl font-bold text-gray-400 animate-pulse">...</p>
          <div class="absolute bottom-0 left-0 w-full h-1 group-hover:h-2 transition-all duration-300" style="background-color: #854F6C;"></div>
        </div>
      </div>
      
      <!-- Sección inferior mejorada -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Tips Flow Card mejorada -->
        <div class="lg:col-span-2">
          <div class="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="relative z-10 p-8">
              <TipsFlowCard />
            </div>
          </div>
        </div>

        <!-- Panel de Notificaciones mejorado -->
        <div class="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <!-- Header con color personalizado -->
          <div class="relative p-6" style="background-color: #854F6C;">
            <div class="relative flex items-center space-x-3">
              <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <!-- ÍCONO DE MENSAJE/CHAT PARA NOTIFICACIONES -->
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white">Notificaciones</h3>
            </div>
          </div>

          <!-- Contenido de notificaciones -->
          <div class="p-6 min-h-[300px] flex flex-col">
            <div v-if="notificationStore.isLoadingHistory" class="text-center py-8 flex-1 flex flex-col items-center justify-center">
              <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-accent dark:text-gray-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Cargando notificaciones...</p>
            </div>
            
            <div v-else-if="notificationStore.notificationHistory.length === 0" class="text-center py-8 flex-1 flex flex-col items-center justify-center">
              <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700/50 rounded-full flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-accent dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">¡Todo al día!</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">No tienes notificaciones pendientes.</p>
            </div>
            
            <div v-else class="flex-1 flex flex-col justify-between">
              <ul class="space-y-4">
                <li v-for="notification in notificationStore.recentNotifications" :key="notification.id" 
                    class="group flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200">
                  <div class="w-10 h-10 text-white flex items-center justify-center rounded-full flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform" style="background-color: #854F6C;">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-dark-purple dark:text-light leading-relaxed">{{ notification.message }}</p>
                    <p class="text-xs text-accent dark:text-gray-400 mt-1 flex items-center space-x-1">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>{{ formatDistanceToNow(new Date(notification.created_at), { addSuffix: true, locale: es }) }}</span>
                    </p>
                  </div>
                </li>
              </ul>
              
              <div v-if="notificationStore.hasMoreNotifications" class="mt-6 text-center">
                <RouterLink to="/notifications" 
                           class="inline-flex items-center space-x-2 text-sm font-semibold text-accent hover:text-dark-purple dark:text-gray-400 dark:hover:text-light hover:underline transition-colors group">
                  <span>Ver todas</span>
                  <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </MainLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import UserProfile from '@/components/UserProfile.vue';
import { useAuthStore } from '@/store/auth';
import { useNotificationStore } from '@/store/notificationStore';
import { useDashboardStore } from '@/store/dashboardStore';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
// --- IMPORTAMOS EL NUEVO COMPONENTE ---
import TipsFlowCard from '@/components/TipsFlowCard.vue';

const authStore = useAuthStore();
const notificationStore = useNotificationStore();
const dashboardStore = useDashboardStore();

onMounted(() => {
  notificationStore.fetchNotificationHistory();
  dashboardStore.fetchDashboardStats();
});
</script>