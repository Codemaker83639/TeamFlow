<template>
  <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow min-w-0 h-full flex flex-col">
    <h3 class="text-xl font-bold text-dark-purple dark:text-light mb-4">💡 Tips-Flow</h3>
    <div class="flex-1 flex items-center justify-center">
      <Transition name="fade" mode="out-in">
        <p :key="currentTip" class="text-center text-lg text-accent dark:text-gray-300 italic px-4">
          "{{ currentTip }}"
        </p>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 1. La lista de consejos que nos diste
const tips = ref([
  "Hola amigo/a, recuerda actualizar la página si sientes el sistema lento, puede ser caché😖",
  "Hola amigo/a, recuerda iniciar el temporizador cuando vayas a trabajar con tus tareas y detenerlo al finalizar😉",
  "Hola amigo/a, recuerda mover las tareas entre las columnas para que los demás estén al pendiente de tus avances🤩",
  "Hola amigo/a, recuerda revisar tu buzón de notificaciones, puede que haya algo nuevo🧐",
  "Hola amigo/a, siempre comenta las tareas de tus compañeros, pueden necesitar alguna guía extra o archivo también🙌",
  "Hola amigo/a, recuerda marcar los proyectos como completados una vez se hayan culminado todas sus tareas pendientes, esto es muy importante🥳",
  "Hola amigo/a, recuerda que puedes cambiar al modo oscuro si te sientes mejor así, lo encontrarás en los ajustes😎",
]);

const currentTip = ref('');
let intervalId: number | null = null;

// 2. Función para seleccionar y mostrar un nuevo tip
const showRandomTip = () => {
  const randomIndex = Math.floor(Math.random() * tips.value.length);
  currentTip.value = tips.value[randomIndex];
};

// 3. Cuando el componente se monta, mostramos el primer tip y empezamos el temporizador
onMounted(() => {
  showRandomTip(); // Mostramos uno inmediatamente
  intervalId = window.setInterval(showRandomTip, 90000); // 90,000 ms = 1.5 minutos
});

// 4. Cuando el componente se destruye, limpiamos el temporizador para evitar problemas
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<style scoped>
/* Transición suave para el cambio de texto */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>