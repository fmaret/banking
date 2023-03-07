<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import generateTransactions from '../transactions/fake_transactions';
import { groupByMonth, sumByMonth } from '../transactions/transactions_utils';

const transactions = ref(generateTransactions(300));
let chartRef = ref(null);

onMounted(() => {
  const groupedData = (groupByMonth(transactions.value));
  
  console.log("aa", groupedData)
  const formattedData = groupedData.map(({ month, total }) => ({
  date: new Date(month + "-01T00:00:00"),
  value: total.toFixed(2),
})).sort((a, b) => a.date - b.date);

  console.log("aze", formattedData)
  const labels = formattedData.map(({ date }) => date.toLocaleString('default', { month: 'short', year: 'numeric' }));
  const data = Object.values(groupedData).map(item => parseFloat(item.total.toFixed(2)));


  const ctx = chartRef.value.getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Total des transactions par mois',
        data,
        fill: false,
        borderColor: '#42b883',
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});
</script>

<template>
  <canvas ref="chartRef" style="width: 300px; height: 300px"></canvas>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

<script lang="ts">
export default {
  setup() {
    return { chartRef, transactions };
  }
}
</script>