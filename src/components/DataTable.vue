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
          <td>{{ item.ENTSOE_DE_DAM_Price }}</td>
          <td>{{ item.ENTSOE_GR_DAM_Price }}</td>
          <td>{{ item.ENTSOE_FR_DAM_Price }}</td>
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
  // Optional: You can implement custom logic here for manual filtering.
};
</script>

<style scoped>
/* General Styling */
.table-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  color: #333;
}

/* Table Styling */
.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.styled-table th,
.styled-table td {
  padding: 12px 20px;
  text-align: left;
}

/* Table Header */
.styled-table thead {
  background-color: #444;
  color: #fff;
}

/* Alternating Row Colors */
.styled-table tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}

.styled-table tbody tr:nth-child(even) {
  background-color: #e2e2e2;
}

/* Hover Effect */
.styled-table tbody tr:hover {
  background-color: #ccc;
}

/* Header Styling */
.styled-table th {
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Cell Styling */
.styled-table td {
  font-size: 14px;
  color: #444;
}

/* Hover Effect on Text */
.styled-table td:hover {
  color: #007bff;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
}

/* Date Filter Section */
.date-filter {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date-filter label {
  margin-right: 10px;
}

.date-filter input {
  padding: 5px;
  margin-right: 15px;
  font-size: 14px;
}

.date-filter button {
  padding: 8px 16px;
  background-color: #444;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.date-filter button:hover {
  background-color: #007bff;
}
</style>