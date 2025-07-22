<script setup>
import { RouterView } from 'vue-router'
import { useThemeStore } from '@/store/theme.ts';
useThemeStore();
</script>

<template>
  <RouterView />
</template>
