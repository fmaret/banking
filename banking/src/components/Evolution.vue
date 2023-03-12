<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Cookies from 'js-cookie'
import Chart from 'chart.js/auto';
import generateTransactions from '../transactions/fake_transactions';
import { groupByMonth, sumByMonth } from '../transactions/transactions_utils';
import { simulateMonths, sumTransactions } from '../evolution/evolution_utils';
import {computeDataAndFutureData, options} from '../evolution/chart_config.js'
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
import MonthlyTotal from '../../types/MonthlyTotal'

const transactions = ref(generateTransactions(300));
let monthsToSimulate = ref(12)

const labels = ref<string[]>([])
const data = ref<number[]>([])
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
  const groupedData: MonthlyTotal[] = (groupByMonth(transactions.value));
  const formattedData = groupedData.map(({ month, total }) => ({
  date: new Date(month + "-01T00:00:00"),
  value: total.toFixed(2),
})).sort((a: any, b: any) => a.date - b.date);

  labels.value = (formattedData.map(({ date }) => date.toLocaleString('default', { month: 'short', year: 'numeric' })));
  data.value = (Object.values(groupedData).map(item => parseFloat(item.total.toFixed(2))));
});

</script>

<template>
  <div>
  <input v-model="monthsToSimulate" type="number">
  <div>
    <Line :data="computeDataAndFutureData(labels, data, monthsToSimulate)" :options="options" :maxValue="100" style="height:300px, width: 500px" v-if="data.length != 0"/>
  </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
