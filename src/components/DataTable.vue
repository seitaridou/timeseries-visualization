<template>
  <div class="table-container">
    <h2>Price Table</h2>
    <table class="styled-table">
      <thead>
        <tr>
          <th>DateTime</th>
          <th>Germany €</th>
          <th>Greece €</th>
          <th>France €</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredData" :key="index">
          <td>{{ formatDate(item.DateTime) }}</td>
          <td>
            <input
              type="number"
              v-model.number="item.ENTSOE_DE_DAM_Price"
              @input="updateChart"
              :class="{'invalid': isInvalid(item.ENTSOE_DE_DAM_Price)}"
            />
          </td>
          <td>
            <input
              type="number"
              v-model.number="item.ENTSOE_GR_DAM_Price"
              @input="updateChart"
              :class="{'invalid': isInvalid(item.ENTSOE_GR_DAM_Price)}"
            />
          </td>
          <td>
            <input
              type="number"
              v-model.number="item.ENTSOE_FR_DAM_Price"
              @input="updateChart"
              :class="{'invalid': isInvalid(item.ENTSOE_FR_DAM_Price)}"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div class="date-filter">
      <label for="startDate">Start Date:</label>
      <input type="date" v-model="startDate" />
      <label for="endDate">End Date:</label>
      <input type="date" v-model="endDate" />
      <button @click="applyDateFilter">Apply Filter</button>
    </div>

    <h2>Price Trend</h2>
    <LineChart :data="filteredData" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import LineChart from '../components/LineChart.vue';

const data = ref([]);
const startDate = ref(null);
const endDate = ref(null);

onMounted(async () => {
  try {
    const response = await fetch('/timeseries.json'); // Ensure it's in `public/`
    data.value = await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

const formatDate = (date) => {
  const newDate = new Date(date);
  return `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}`;
};

const filteredData = computed(() => {
  if (!startDate.value || !endDate.value) {
    return data.value;
  }
  const start = new Date(startDate.value);
  const end = new Date(endDate.value);

  return data.value.filter((item) => {
    const itemDate = new Date(item.DateTime);
    return itemDate >= start && itemDate <= end;
  });
});

const applyDateFilter = () => {
  // Optional: Implement custom filtering logic
};

const isInvalid = (value) => {
  return value < -2000 || value > 2000 || isNaN(value);
};

const updateChart = () => {
  // Trigger chart update after data modification
  // You can use this function to force chart to update, even though Vue's reactivity will handle most of this
  console.log('Chart updated!');
};
</script>

<style scoped>
/* Styling for invalid input */
.invalid {
  border: 2px solid red;
}
</style>