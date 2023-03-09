<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Cookies from 'js-cookie'
import Chart from 'chart.js/auto';
import generateTransactions from '../transactions/fake_transactions';
import { groupByMonth, sumByMonth } from '../transactions/transactions_utils';
import { simulateMonths, sumTransactions } from '../evolution/evolution_utils';
const transactions = ref(generateTransactions(300));
let chartRef = ref(null);
let chartRef2 = ref(null)
let monthsToSimulate = ref(12)

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
  
  const futureLabels = simulateMonths("2023-03", monthsToSimulate.value);
  const futureData = Array(monthsToSimulate.value).fill(sumTransactions(JSON.parse(Cookies.get("futureTransactions"))))
  let allDataSums = [...data, ...futureData]
  console.log("all", data)
  console.log("allsums", allDataSums)
  allDataSums = allDataSums.reduce((acc, cur) => {
    if (acc.length > 0) {
      acc.push(cur + acc[acc.length - 1]);
    } else {
      acc.push(cur);
    }
    return acc;
  }, []);

  const ctx2 = chartRef2.value.getContext('2d');
new Chart(ctx2, {
  type: 'line',
  data: {
    labels: [...labels, ...futureLabels],
    datasets: [
      {
        label: 'Total des transactions par mois',
        data: allDataSums.slice(0, data.length),
        fill: false,
        borderColor: '#42b883',
        tension: 0.1
      },
      {
        label: 'Valeurs futures',
        data: allDataSums,
        fill: false,
        borderColor: '#f00',
        tension: 0.1
      }
    ]
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
})
});

</script>

<template>
  <div>
    <div>
    <canvas ref="chartRef" style="width: 300px; height: 300px"></canvas>
    </div>
    <div>
    <canvas ref="chartRef2" style="width: 300px; height: 300px"></canvas>
    </div>
  <input v-model="monthsToSimulate" type="number">
  </div>
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