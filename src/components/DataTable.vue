<template>
  <div class="table-container">
    <h2>Price Table</h2>

    <!-- Timeseries visibility checkboxes -->
    <div class="checkbox-group">
      <label>
        <input type="checkbox" v-model="showGermany" /> Germany €
      </label>
      <label>
        <input type="checkbox" v-model="showGreece" /> Greece €
      </label>
      <label>
        <input type="checkbox" v-model="showFrance" /> France €
      </label>
    </div>

    <table class="styled-table">
      <thead>
        <tr>
          <th>DateTime</th>
          <th v-if="showGermany">Germany €</th>
          <th v-if="showGreece">Greece €</th>
          <th v-if="showFrance">France €</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredData" :key="index">
          <td>{{ formatDate(item.DateTime) }}</td>
          <td v-if="showGermany">
            <input
              type="number"
              v-model.number="item.ENTSOE_DE_DAM_Price"
              @input="validateAndUpdate(index, 'ENTSOE_DE_DAM_Price')"
              :class="{'invalid': isInvalid(item.ENTSOE_DE_DAM_Price)}"
            />
          </td>
          <td v-if="showGreece">
            <input
              type="number"
              v-model.number="item.ENTSOE_GR_DAM_Price"
              @input="validateAndUpdate(index, 'ENTSOE_GR_DAM_Price')"
              :class="{'invalid': isInvalid(item.ENTSOE_GR_DAM_Price)}"
            />
          </td>
          <td v-if="showFrance">
            <input
              type="number"
              v-model.number="item.ENTSOE_FR_DAM_Price"
              @input="validateAndUpdate(index, 'ENTSOE_FR_DAM_Price')"
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
    <LineChart :data="filteredData" :showGermany="showGermany" :showGreece="showGreece" :showFrance="showFrance" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import LineChart from './LineChart.vue';

const data = ref([]);
const startDate = ref(null);
const endDate = ref(null);

// States to manage visibility of timeseries
const showGermany = ref(true);
const showGreece = ref(true);
const showFrance = ref(true);

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

// Validation and update function
const validateAndUpdate = (index, field) => {
  const value = data.value[index][field];
  
  // Check if the value is valid
  if (isInvalid(value)) {
    alert(`Invalid value entered for ${field}. Please enter a value between -2000 and 2000.`);
    // Reset the value to prevent invalid input
    data.value[index][field] = null;
  } else {
    // If valid, update chart data
    updateChart();
  }
};

const updateChart = () => {
  console.log('Chart updated!');
};
</script>

<style scoped>
/* Styling for invalid input */
.invalid {
  border: 2px solid red;
  background-color: #f8d7da;
}

.checkbox-group {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.checkbox-group label {
  margin-right: 15px;
}
</style>