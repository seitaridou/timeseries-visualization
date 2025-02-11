<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Germany €</th>
          <th>Greece €</th>
          <th>France €</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>{{ formatDate(item.DateTime) }}</td>
          <td>{{ item.ENTSOE_DE_DAM_Price }}</td>
          <td>{{ item.ENTSOE_GR_DAM_Price }}</td>
          <td>{{ item.ENTSOE_FR_DAM_Price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Reactive state to store the JSON data
const data = ref([]);

// Fetch data from the external JSON file located in the public folder
onMounted(async () => {
  try {
    const response = await fetch('timeseries.json'); // The file is in the public folder
    data.value = await response.json(); // Store the data in the reactive state
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

// Function to format the DateTime
const formatDate = (date) => {
  const newDate = new Date(date);
  return `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}`;
};
</script>