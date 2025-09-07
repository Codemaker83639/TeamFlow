<template>
  <Bar ref="chartRef" :data="props.chartData" :options="props.chartOptions" />
</template>

<script setup>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { ref, computed } from 'vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  chartData: {
    type: Object,
    required: true
  },
  chartOptions: {
    type: Object,
    default: () => {}
  }
});

// Ref para acceder a la instancia del componente del gráfico
const chartRef = ref(null);

// Exponemos la instancia del gráfico para que el componente padre pueda acceder a ella
defineExpose({
  chartInstance: computed(() => chartRef.value?.chart)
});
</script>

