<template>
    <div class="chart-container">
      <LineChart v-if="chartData" :chart-data="chartData" :chart-options="chartOptions" />
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { LineChart } from 'vue-chart-3';
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables);
  
  const props = defineProps(['data']); // Get data from parent component
  const chartData = ref(null);
  
  // Watch for changes in data and update the chart
  watch(
    () => props.data,
    (newData) => {
      if (!newData || newData.length === 0) return;
  
      chartData.value = {
        labels: newData.map((item) => new Date(item.DateTime).toLocaleDateString()), // X-axis: Dates
        datasets: [
          {
            label: 'Germany €',
            data: newData.map((item) => item.ENTSOE_DE_DAM_Price),
            borderColor: 'red',
            fill: false,
          },
          {
            label: 'Greece €',
            data: newData.map((item) => item.ENTSOE_GR_DAM_Price),
            borderColor: 'blue',
            fill: false,
          },
          {
            label: 'France €',
            data: newData.map((item) => item.ENTSOE_FR_DAM_Price),
            borderColor: 'green',
            fill: false,
          },
        ],
      };
    },
    { immediate: true }
  );
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  </script>
  
  <style scoped>
  .chart-container {
    width: 100%;
    height: 400px;
  }
  </style>