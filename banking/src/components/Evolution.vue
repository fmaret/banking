<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Cookies from 'js-cookie'
import Chart from 'chart.js/auto';
import generateTransactions from '../transactions/fake_transactions';
import { groupByMonth, sumByMonth } from '../transactions/transactions_utils';
import { simulateMonths, sumTransactions } from '../evolution/evolution_utils';
import * as chartConfig from '../evolution/chart_config.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line, Bar } from 'vue-chartjs'
const transactions = ref(generateTransactions(300));
let chartRef = ref(null);
let chartRef2 = ref(null)
let monthsToSimulate = ref(12)

const labels = ref([])
const data = ref([])
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

onMounted(() => {
  const groupedData = (groupByMonth(transactions.value));
  const formattedData = groupedData.map(({ month, total }) => ({
  date: new Date(month + "-01T00:00:00"),
  value: total.toFixed(2),
})).sort((a, b) => a.date - b.date);

  labels.value = (formattedData.map(({ date }) => date.toLocaleString('default', { month: 'short', year: 'numeric' })));
  data.value = (Object.values(groupedData).map(item => parseFloat(item.total.toFixed(2))));
  console.log("data", data.value)
});

</script>

<template>
  <div>
  <input v-model="monthsToSimulate" type="number">
  <div>
    <Line :data="computeDataAndFutureData(labels, data, monthsToSimulate)" :options="options" :maxValue="100" style="height:300px, width: 500px"/>
  </div>
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
  },
  components: {
    Line
  },
  data() {
    return chartConfig
  }
}
</script>