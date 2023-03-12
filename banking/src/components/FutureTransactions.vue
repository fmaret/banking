<script setup lang="ts">
import { ref, onMounted } from 'vue';
import generateTransactions from '../transactions/fake_transactions';
import Cookies from 'js-cookie'
import FutureTransactionLine from './FutureTransactionLine.vue'
import { loadFutureTransactions } from '../evolution/future_transactions_utils'
import FutureTransaction from '@/types/FutureTransaction';
let transactions = ref(generateTransactions(1))
let futureTransactions = ref(loadFutureTransactions());
let editingLabel = ref(false)
const addFutureTransaction = (futureTransactions: Array<FutureTransaction>) => {
  const next_index = (futureTransactions.length != 0) ? (Math.max(...futureTransactions.map(x=> x.id))) + 1 : 1;
  futureTransactions.push({"id": next_index, "label": "Test", "amount": 10, "date": null})
  Cookies.set("futureTransactions", JSON.stringify(futureTransactions))
}
</script>

<template>
  <div>
    <FutureTransactionLine v-for="transaction in futureTransactions" :key="transaction.id" :transaction="transaction" :futureTransactions="futureTransactions"/>
    <div class="flex items-center py-4 justify-between border-b border-gray-300">
      <div class="flex items-center space-x-4">
        <div class="flex-shrink-0 bg-gray-200 rounded-full w-12 h-12"></div>
        <div class="flex flex-col items-center">
          <div v-if="!editingLabel" class="text-sm font-medium text-white-900 w-48 text-center" @click="addFutureTransaction(futureTransactions)">
            Ajouter
          </div>
          <div class="text-xs text-gray-500">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
