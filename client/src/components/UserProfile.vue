<template>
  <div class="flex items-center space-x-3 cursor-pointer">
    <div class="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg">
      {{ userInitials }}
    </div>
    <div>
      <p class="text-sm font-semibold text-dark-purple dark:text-light">{{ user.full_name }}</p>
      <p class="text-xs text-gray-500 dark:text-gray-400">{{ user.email }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/store/auth.ts';

const authStore = useAuthStore();
const user = authStore.user;

const userInitials = computed(() => {
  if (user && user.full_name) {
    const names = user.full_name.split(' ');
    return names.slice(0, 2).map(n => n[0]).join('').toUpperCase();
  }
  return '';
});
</script>