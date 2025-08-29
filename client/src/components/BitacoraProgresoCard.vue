<template>
  <div class="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 h-full">
    <h3 class="text-xl font-bold text-dark-purple dark:text-light mb-4">🎢 Bitácora del Progreso</h3>
    <div id="chart">
      <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// YA NO NECESITAMOS IMPORTAR NADA DE APEXCHARTS AQUÍ.
// Vue ahora lo reconoce automáticamente en el <template>.

const series = ref([
  {
    name: "Tareas Completadas",
    data: [10, 41, 35, 51, 49, 62, 69]
  }
]);

const chartOptions = ref({
  chart: {
    height: 350,
    type: 'area',
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  colors: ["#854F6C"],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.3,
      stops: [0, 90, 100]
    }
  },
  xaxis: {
    categories: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
  },
  yaxis: {
    labels: {
      formatter: function (val: number) {
        return val.toFixed(0);
      }
    }
  },
  tooltip: {
    theme: 'dark'
  },
});
</script>

<style scoped>
/* Podemos añadir estilos específicos aquí si es necesario */
</style>