<template>
  <div class="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 h-full flex flex-col">
    <div class="flex items-center space-x-3 mb-6">
      <div class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style="background-color: #854F6C;">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-bold text-dark-purple dark:text-light" style="color: #854F6C;">Progreso General</h3>
    </div>

    <div class="flex-1 flex flex-col md:flex-row items-center justify-around gap-8">
      <div class="relative w-40 h-40 flex items-center justify-center">
        <svg class="w-full h-full" viewBox="0 0 120 120">
          <circle
            class="stroke-current text-gray-200 dark:text-gray-700"
            :cx="60" :cy="60" :r="radius"
            fill="transparent"
            :stroke-width="strokeWidth"
          />
          <circle
            class="stroke-current transition-all duration-1000 ease-in-out -rotate-90 origin-center"
            :style="{ color: '#854F6C' }"
            :cx="60" :cy="60" :r="radius"
            fill="transparent"
            :stroke-width="strokeWidth"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="strokeOffset"
            stroke-linecap="round"
          />
        </svg>
        <div class="absolute flex flex-col items-center justify-center">
          <span class="text-3xl font-bold" style="color: #854F6C;">{{ percentage }}%</span>
          <span class="text-xs text-gray-500">Completado</span>
        </div>
      </div>
      
      <div class="flex flex-col space-y-4 text-center md:text-left">
        <div>
          <div class="flex items-center justify-center md:justify-start space-x-2">
            <div class="w-3 h-3 rounded-full" style="background-color: #854F6C;"></div>
            <p class="text-sm font-medium text-dark-purple dark:text-light">Completados</p>
          </div>
          <p class="text-2xl font-bold text-gray-700 dark:text-gray-300">{{ completed }}</p>
        </div>
        <div>
          <div class="flex items-center justify-center md:justify-start space-x-2">
            <div class="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <p class="text-sm font-medium text-dark-purple dark:text-light">Activos</p>
          </div>
          <p class="text-2xl font-bold text-gray-700 dark:text-gray-300">{{ active }}</p>
        </div>
      </div>
    </div>
    
    <div class="mt-6 text-center">
      <p class="text-sm text-gray-500 dark:text-gray-400">¡Sigue así para alcanzar todos tus objetivos!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Definimos las props que el componente recibirá desde el Dashboard
const props = defineProps<{
  active: number;
  completed: number;
}>();

// --- Lógica para el gráfico de Dona (Donut Chart) ---

const radius = 54; // Radio del círculo SVG
const strokeWidth = 12; // Grosor del borde del círculo

// Calculamos la circunferencia del círculo. Fórmula: 2 * PI * radio
const circumference = 2 * Math.PI * radius;

// Calculamos el total de items.
const total = computed(() => props.active + props.completed);

// Calculamos el porcentaje de completados.
// Se maneja el caso de división por cero si el total es 0.
const percentage = computed(() => {
  if (total.value === 0) {
    return 0;
  }
  return Math.round((props.completed / total.value) * 100);
});

// Calculamos el "offset" del borde. Esta es la "magia" del gráfico.
// Restamos el porcentaje de la circunferencia total para crear el arco.
const strokeOffset = computed(() => {
  return circumference - (percentage.value / 100) * circumference;
});
</script>