<template>
  <div class="flex items-center space-x-2">
    <span class="text-sm text-gray-500 dark:text-gray-400">Claro</span>
    <button
      @click="themeStore.toggleTheme"
      class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"

      :class="themeStore.theme === 'dark' ? 'bg-primary' : 'bg-gray-200'"
    >
      <span
        class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"

        :class="themeStore.theme === 'dark' ? 'translate-x-5' : 'translate-x-0'"
      ></span>
    </button>
    <span class="text-sm text-gray-500 dark:text-gray-400">Oscuro</span>
  </div>
</template>

<script setup>
import { useThemeStore } from '@/store/theme.ts';
const themeStore = useThemeStore();
</script>