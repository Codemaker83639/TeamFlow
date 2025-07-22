<template>
  <MainLayout>
    <header class="bg-white dark:bg-gray-800 p-6 flex justify-between items-center shadow">
      <h2 class="text-2xl font-bold text-dark-purple dark:text-light">Tableros del Proyecto: Rediseño App</h2>
      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-500">Filtrar por:</span>
        <button class="bg-gray-200 dark:bg-gray-700 text-dark-purple dark:text-light text-sm font-semibold py-1 px-3 rounded-lg">Prioridad</button>
      </div>
    </header>

    <main class="flex-1 overflow-x-auto bg-light dark:bg-dark-purple p-6">
      <div class="flex space-x-4 h-full">

        <div class="flex-shrink-0 w-72 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner">
          <div class="p-4 border-b border-gray-200 dark:border-gray-600">
            <h3 class="font-semibold text-dark-purple dark:text-light">Por Hacer (3)</h3>
          </div>
          <div class="p-4 space-y-4">
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow cursor-grab">
              <p class="font-semibold text-dark-purple dark:text-light">Diseñar pantalla de login</p>
              <div class="mt-2 flex justify-between items-center">
                <span class="px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">Urgente</span>
                <div class="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs">TA</div>
              </div>
            </div>
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow cursor-grab">
              <p class="font-semibold text-dark-purple dark:text-light">Crear componentes de UI</p>
            </div>
          </div>
        </div>

        <div class="flex-shrink-0 w-72 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner">
          <div class="p-4 border-b border-gray-200 dark:border-gray-600">
            <h3 class="font-semibold text-dark-purple dark:text-light">En Progreso (2)</h3>
          </div>
          <div class="p-4 space-y-4">
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow cursor-grab">
              <p class="font-semibold text-dark-purple dark:text-light">Implementar autenticación</p>
              <div class="mt-2 flex justify-between items-center">
                <span class="px-2 py-1 text-xs font-bold text-white bg-yellow-500 rounded-full">Alta</span>
                <div class="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs">TA</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex-shrink-0 w-72 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner">
          <div class="p-4 border-b border-gray-200 dark:border-gray-600">
            <h3 class="font-semibold text-dark-purple dark:text-light">En Revisión (1)</h3>
          </div>
           <div class="p-4 space-y-4">
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow cursor-grab">
              <p class="font-semibold text-dark-purple dark:text-light">Maqueta del dashboard</p>
            </div>
          </div>
        </div>

        <div class="flex-shrink-0 w-72 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner">
          <div class="p-4 border-b border-gray-200 dark:border-gray-600">
            <h3 class="font-semibold text-dark-purple dark:text-light">Completado (5)</h3>
          </div>
        </div>

      </div>
    </main>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
</script>