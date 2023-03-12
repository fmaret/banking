<script setup lang="ts">
import { ref } from 'vue'
import generateTransactions from '../transactions/fake_transactions'
import TransactionLine from './TransactionLine.vue'

// defineProps<{ msg: string }>()

const transactions = ref(generateTransactions(20))


</script>

<template>
<div class="w-80">
  <div class="flex flex-col">
    <h1 class="text-xl">Transactions</h1>
    <div v-for="transaction in transactions" :key="transaction.label">
      <TransactionLine :transaction="transaction"/>
    </div>
  </div>
</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
