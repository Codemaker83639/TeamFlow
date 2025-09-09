<template>
  <MainLayout>
    <header class="bg-white dark:bg-gray-800 p-6 flex justify-between items-center shadow">
      <h2 class="text-2xl font-bold text-dark-purple dark:text-light">Reportes de Productividad</h2>
      <button @click="exportToPDF" :disabled="isGeneratingPDF" class="bg-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
        <span v-if="isGeneratingPDF">Generando PDF...</span>
        <span v-else>Exportar PDF</span>
      </button>
    </header>

    <main class="flex-1 overflow-y-auto bg-light dark:bg-dark-purple p-6">
      <!-- SECCIÓN DE FILTROS -->
      <div class="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex flex-wrap gap-4 items-center">
        <!-- Filtro de Usuarios -->
        <div class="flex-1 min-w-[150px]">
          <label for="user-filter" class="block text-sm font-medium text-accent dark:text-gray-400 mb-1">Usuario</label>
          <select id="user-filter" v-model="selectedUser" @change="handleUserSelect" class="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-dark-purple dark:text-light rounded-md shadow-sm focus:ring-accent focus:border-accent">
            <option value="">Todos</option>
            <option v-for="user in users" :key="user.id" :value="user.id">{{ user.full_name }}</option>
          </select>
        </div>

        <!-- Filtro de Equipos -->
        <div class="flex-1 min-w-[150px]">
          <label for="team-filter" class="block text-sm font-medium text-accent dark:text-gray-400 mb-1">Equipo</label>
          <select id="team-filter" v-model="selectedTeam" @change="handleTeamSelect" class="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-dark-purple dark:text-light rounded-md shadow-sm focus:ring-accent focus:border-accent">
            <option value="">Todos</option>
            <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.name }}</option>
          </select>
        </div>

        <!-- Filtro de Tiempo -->
        <div class="flex flex-col">
           <span class="block text-sm font-medium text-accent dark:text-gray-400 mb-1">Rango</span>
          <div class="flex items-center space-x-2">
            <button @click="handleTimeRangeChange('daily')" :class="['px-3 py-2 rounded-md text-sm font-semibold transition-colors', appliedFilters?.timeRange === 'daily' ? 'bg-accent text-white' : 'bg-gray-200 dark:bg-gray-700 text-dark-purple dark:text-light hover:bg-gray-300']">Diario</button>
            <button @click="handleTimeRangeChange('weekly')" :class="['px-3 py-2 rounded-md text-sm font-semibold transition-colors', appliedFilters?.timeRange === 'weekly' ? 'bg-accent text-white' : 'bg-gray-200 dark:bg-gray-700 text-dark-purple dark:text-light hover:bg-gray-300']">Semanal</button>
            <button @click="handleTimeRangeChange('monthly')" :class="['px-3 py-2 rounded-md text-sm font-semibold transition-colors', appliedFilters?.timeRange === 'monthly' ? 'bg-accent text-white' : 'bg-gray-200 dark:bg-gray-700 text-dark-purple dark:text-light hover:bg-gray-300']">Mensual</button>
          </div>
        </div>
      </div>
      
      <!-- CONTENEDOR PRINCIPAL CON ESTADO DE CARGA -->
      <div v-if="isLoading" class="flex justify-center items-center h-64">
        <Spinner />
      </div>

      <div v-else-if="metrics" class="space-y-6">
        <!-- MÉTRICAS -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p class="text-sm text-accent dark:text-gray-400">Tareas Completadas ({{ timeRangeText }})</p>
            <p class="text-3xl font-bold text-dark-purple dark:text-light">{{ metrics.completedTasks }}</p>
          </div>
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p class="text-sm text-accent dark:text-gray-400">Horas Registradas ({{ timeRangeText }})</p>
            <p class="text-3xl font-bold text-dark-purple dark:text-light">{{ formatHoursDecimal(metrics.loggedHours) }}</p>
          </div>
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p class="text-sm text-accent dark:text-gray-400">Proyectos Completados ({{ timeRangeText }})</p>
            <p class="text-3xl font-bold text-dark-purple dark:text-light">{{ metrics.completedProjects }}</p>
          </div>
        </div>

        <!-- GRÁFICOS -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow min-h-[400px] flex flex-col">
            <h3 class="text-xl font-bold text-dark-purple dark:text-light mb-4">Estado General de Tareas</h3>
             <div v-if="charts && charts.taskStatusDistribution && charts.taskStatusDistribution.length > 0" class="flex-grow flex flex-col">
                <div class="h-64 relative mb-4">
                    <DoughnutChart ref="doughnutChartRef" :chart-data="taskStatusChartData" :chart-options="doughnutChartOptions"/>
                </div>
                <div class="border-t dark:border-gray-700 pt-2 flex-grow overflow-y-auto">
                    <h4 class="text-md font-semibold text-dark-purple dark:text-light mb-2">Leyenda de Tareas</h4>
                    <div class="max-h-24 overflow-y-auto">
                        <div v-for="statusGroup in charts.taskStatusDistribution" :key="statusGroup.status">
                            <p class="text-sm font-bold text-accent dark:text-gray-400 capitalize">{{ statusTranslations[statusGroup.status] || statusGroup.status }} ({{ statusGroup.count }})</p>
                            <ul class="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300">
                                <li v-for="task in getUniqueTasks(statusGroup.tasks)" :key="task.id">{{ task.title }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="flex-grow flex items-center justify-center">
              <p class="text-accent dark:text-gray-400 text-center">No hay datos de estado de tareas para mostrar.</p>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow min-h-[400px] flex flex-col">
            <h3 class="text-xl font-bold text-dark-purple dark:text-light mb-4">Esfuerzo por Proyecto</h3>
            <div v-if="charts && charts.effortByProject && charts.effortByProject.length > 0" class="flex-grow flex flex-col">
              <div class="h-64 relative">
                <BarChart ref="barChartRef" :chart-data="effortByProjectChartData" :chart-options="barChartOptions" />
              </div>
              <div class="border-t dark:border-gray-700 pt-2 mt-4 flex-grow overflow-y-auto">
                  <h4 class="text-md font-semibold text-dark-purple dark:text-light mb-2">Leyenda de Horas</h4>
                    <div class="max-h-24 overflow-y-auto">
                        <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                            <li v-for="project in charts.effortByProject" :key="project.projectName" class="flex justify-between">
                              <span>{{ project.projectName }}</span>
                              <span class="font-semibold">{{ formatHoursDecimal(project.hours) }}</span>
                          </li>
                      </ul>
                  </div>
              </div>
            </div>
            <div v-else class="flex-grow flex items-center justify-center">
              <p class="text-accent dark:text-gray-400 text-center">No hay horas registradas para mostrar en el gráfico.</p>
            </div>
          </div>
        </div>
      </div>
       <div v-else class="text-center p-10 bg-white dark:bg-gray-800 rounded-lg shadow">
         <p class="text-accent dark:text-gray-400">No se encontraron datos para los filtros seleccionados.</p>
      </div>
    </main>
  </MainLayout>
</template>

<script setup>
import { onMounted, computed, ref, nextTick } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { useReportStore } from '@/store/reportStore';
import { useUsersStore } from '@/store/users'; 
import { useTeamsStore } from '@/store/teams';
import BarChart from '@/components/charts/BarChart.vue';
import DoughnutChart from '@/components/charts/DoughnutChart.vue';

const Spinner = {
  template: `<svg class="animate-spin -ml-1 mr-3 h-10 w-10 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`
};

const reportStore = useReportStore();
const usersStore = useUsersStore();
const teamStore = useTeamsStore(); 

const metrics = computed(() => reportStore.metrics);
const charts = computed(() => reportStore.charts);
const isLoading = computed(() => reportStore.isLoading);
const appliedFilters = computed(() => reportStore.appliedFilters);
const users = computed(() => usersStore.users);
const teams = computed(() => teamStore.teams);

const selectedUser = ref('');
const selectedTeam = ref('');
const isGeneratingPDF = ref(false);

const barChartRef = ref(null);
const doughnutChartRef = ref(null);

// --- FUNCIÓN AUXILIAR PARA FORMATEAR HORAS ---
const formatHoursDecimal = (decimalHours) => {
  if (decimalHours === null || decimalHours === undefined) {
    return '0 h 0 min';
  }
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  return `${hours} h ${minutes} min`;
};
// ---------------------------------------------

// Diccionario para traducir los estados de las tareas
const statusTranslations = {
  backlog: 'En Espera',
  todo: 'Por Hacer',
  in_progress: 'En Progreso',
  review: 'En Revisión',
  done: 'Completado'
};

const baseChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
};

// Opciones para el gráfico de barras para ocultar etiquetas del eje X
const barChartOptions = computed(() => ({
    ...baseChartOptions,
    animation: isGeneratingPDF.value ? false : {},
    scales: {
        x: {
            display: false // Esto oculta las etiquetas
        },
        y: {
            ticks: {
                callback: function(value) {
                    return value + ' h';
                }
            }
        }
    },
    plugins: {
        legend: {
            display: false
        }
    }
}));

// Opciones para el gráfico de dona
const doughnutChartOptions = computed(() => ({
    ...baseChartOptions,
    animation: isGeneratingPDF.value ? false : {},
}));


// Datos para el gráfico de barras
const effortByProjectChartData = computed(() => {
  if (!charts.value || !charts.value.effortByProject) {
    return { labels: [], datasets: [] };
  }
  
  const labels = charts.value.effortByProject.map(p => p.projectName);
  const data = charts.value.effortByProject.map(p => p.hours);

  return {
    labels,
    datasets: [
      {
        label: 'Horas Registradas',
        backgroundColor: '#8B5CF6',
        borderColor: '#7C3AED',
        borderWidth: 1,
        borderRadius: 4,
        data,
      }
    ]
  };
});

// Datos para el gráfico de dona (circular)
const taskStatusChartData = computed(() => {
    if (!charts.value || !charts.value.taskStatusDistribution) {
        return { labels: [], datasets: [] };
    }

    const labels = charts.value.taskStatusDistribution.map(s => statusTranslations[s.status] || s.status);
    const data = charts.value.taskStatusDistribution.map(s => s.count);

    return {
        labels,
        datasets: [
            {
                label: 'Estado de Tareas',
                backgroundColor: ['#A78BFA', '#FBBF24', '#3B82F6', '#10B981', '#6B7280'],
                borderColor: '#fff',
                data,
            },
        ],
    };
});

// Función para filtrar tareas duplicadas en la leyenda
const getUniqueTasks = (tasks) => {
  if (!tasks || !Array.isArray(tasks)) return [];
  const uniqueTasks = [];
  const seenIds = new Set();
  for (const task of tasks) {
    if (!seenIds.has(task.id)) {
      uniqueTasks.push(task);
      seenIds.add(task.id);
    }
  }
  return uniqueTasks;
};


const handleUserSelect = (event) => {
  const userId = event.target.value;
  if (selectedTeam.value) selectedTeam.value = ''; 
  reportStore.applyFilters({ userId: userId || undefined, teamId: undefined });
};

const handleTeamSelect = (event) => {
  const teamId = event.target.value;
  if (selectedUser.value) selectedUser.value = '';
  reportStore.applyFilters({ teamId: teamId || undefined, userId: undefined });
};

const handleTimeRangeChange = (range) => {
  reportStore.setTimeRange(range);
};

const timeRangeText = computed(() => {
    if (!appliedFilters.value) return '';
    switch (appliedFilters.value.timeRange) {
        case 'daily': return 'Hoy';
        case 'weekly': return 'Últimos 7 días';
        case 'monthly': return 'Este Mes';
        default: return 'Personalizado';
    }
});

const exportToPDF = async () => {
    isGeneratingPDF.value = true;
    await nextTick(); 

    try {
        if (typeof window.html2pdf === 'undefined') {
            console.error("html2pdf.js no está cargado.");
            alert("Error: La función para exportar a PDF no está disponible.");
            return;
        }

        const metricsData = reportStore.metrics;
        const chartsData = reportStore.charts;

        const barChartImg = barChartRef.value?.chartInstance?.toBase64Image();
        const doughnutChartImg = doughnutChartRef.value?.chartInstance?.toBase64Image();
        
        let reportTitleText = 'Reporte de Productividad';
        if (selectedUser.value && users.value) {
            const user = users.value.find(u => u.id === selectedUser.value);
            if (user) reportTitleText += ` para ${user.full_name}`;
        } else if (selectedTeam.value && teams.value) {
            const team = teams.value.find(t => t.id === selectedTeam.value);
            if (team) reportTitleText += ` para el equipo ${team.name}`;
        }

        const createMetricCard = (label, value) => `
            <div style="border: 1px solid #eee; padding: 15px; border-radius: 8px; text-align: center;">
                <p style="font-size: 14px; color: #666; margin: 0 0 5px 0;">${label}</p>
                <p style="font-size: 28px; font-weight: bold; color: #333; margin: 0;">${value}</p>
            </div>
        `;

        const doughnutLegendHTML = chartsData.taskStatusDistribution.length > 0 ?
            chartsData.taskStatusDistribution.map(group => `
                <div style="margin-bottom: 10px;">
                    <p style="font-size: 13px; font-weight: bold; margin-bottom: 5px;">${statusTranslations[group.status] || group.status} (${group.count})</p>
                    <ul style="padding-left: 20px; margin: 0; font-size: 12px;">
                        ${getUniqueTasks(group.tasks).map(task => `<li>${task.title}</li>`).join('')}
                    </ul>
                </div>
            `).join('') : '<p style="font-size: 12px; color: #666;">No hay datos.</p>';

        const barLegendHTML = chartsData.effortByProject.length > 0 ?
            chartsData.effortByProject.map(project => `
                <li style="font-size: 12px; display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #f5f5f5;">
                    <span>${project.projectName}</span>
                    <strong>${formatHoursDecimal(project.hours)}</strong>
                </li>
            `).join('') : '<li>No hay datos.</li>';

        const contentHTML = `
            <div style="font-family: Arial, sans-serif; width: 100%; color: #333;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #eee; padding-bottom: 10px;">
                    <h1 style="font-size: 28px; font-weight: bold; color: #4A1D96; margin: 0;">TeamFlow</h1>
                    <p style="font-size: 12px; color: #666; margin: 0;">${new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <h2 style="font-size: 22px; margin-top: 25px; margin-bottom: 20px; text-align: center;">${reportTitleText}</h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                    ${createMetricCard(`Tareas Completadas (${timeRangeText.value})`, metricsData.completedTasks)}
                    ${createMetricCard(`Horas Registradas (${timeRangeText.value})`, formatHoursDecimal(metricsData.loggedHours))}
                    ${createMetricCard(`Proyectos Completados (${timeRangeText.value})`, metricsData.completedProjects)}
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="border: 1px solid #eee; padding: 15px; border-radius: 8px;">
                        <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 15px; text-align: center;">Estado General de Tareas</h3>
                        <div style="text-align: center; margin-bottom: 15px;"><img src="${doughnutChartImg}" style="max-width: 250px; height: auto; display: inline-block;" /></div>
                        ${doughnutLegendHTML}
                    </div>
                    <div style="border: 1px solid #eee; padding: 15px; border-radius: 8px;">
                        <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 15px; text-align: center;">Esfuerzo por Proyecto</h3>
                        <div style="text-align: center; margin-bottom: 15px;"><img src="${barChartImg}" style="max-width: 100%; height: auto;" /></div>
                        <ul style="list-style-type: none; padding: 0;">${barLegendHTML}</ul>
                    </div>
                </div>
            </div>
        `;

        const element = document.createElement('div');
        element.innerHTML = contentHTML;

        const opt = {
            margin:       0.5,
            filename:     'reporte-productividad.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        
        await window.html2pdf().from(element).set(opt).save();

    } catch (error) {
        console.error("Error al exportar a PDF:", error);
        alert("Ocurrió un error al generar el PDF.");
    } finally {
        isGeneratingPDF.value = false;
    }
};

onMounted(() => {
  reportStore.fetchReports(); 
  usersStore.fetchUsers();
  teamStore.fetchTeams(); 
});
</script>

