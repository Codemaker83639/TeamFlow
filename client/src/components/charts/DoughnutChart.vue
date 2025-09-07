<template>
    <Doughnut ref="chartRef" :data="props.chartData" :options="props.chartOptions" />
</template>

<script setup>
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ref, computed } from 'vue';

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps({
    chartData: {
        type: Object,
        required: true
    },
    chartOptions: {
        type: Object,
        default: () => ({})
    }
});

// Ref para acceder a la instancia del componente del gráfico
const chartRef = ref(null);

// Exponemos la instancia del gráfico para que el componente padre pueda acceder a ella
defineExpose({
    chartInstance: computed(() => chartRef.value?.chart)
});
</script>

