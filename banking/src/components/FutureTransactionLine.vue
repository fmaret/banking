<template>
  <div class="flex items-center py-4 justify-between border-b border-gray-300">
    <div class="flex items-center space-x-4">
      <div class="flex-shrink-0 bg-gray-200 rounded-full w-12 h-12"></div>
      <div class="flex flex-col items-center">
        <div v-if="!editingLabel" class="text-sm font-medium text-white-900 w-48 text-center" @click="editLabelTrue">
          {{ transaction.label }}
        </div>
        <div v-else>
          <input v-model="transaction.label" @keyup.enter="editLabelFalse(futureTransactions, transaction)" @keyup.esc="editLabelFalse(futureTransactions, transaction)">
        </div>
        <div class="text-xs text-gray-500">
          {{ transaction.date }}
        </div>
      </div>
    </div>
    <div v-if="!editingAmount" class="text-sm font-medium text-red-500 w-20" @click="editAmountTrue">
      {{ transaction.amount }}
    </div>
    <div v-else>
      <input v-model.number="transaction.amount" type="number" @keyup.enter="editAmountFalse(futureTransactions, transaction)" @keyup.esc="editAmountFalse(futureTransactions, transaction)">
    </div>
    <span class="text-red-500 cursor-pointer" @click="removeTransaction(futureTransactions, transaction)">X</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { FutureTransaction } from '@/types'
import { ref } from 'vue';
import Cookies from 'js-cookie'


defineProps<{
  transaction: FutureTransaction
  futureTransactions: Array<FutureTransaction>
}>()

let editingLabel = ref(false)
let editingAmount = ref(false)

const editLabelTrue = () => {
  editingLabel.value = true
}
const editAmountTrue = () => {
  editingAmount.value = true
}
const editLabelFalse = (futureTransactions, transaction: JSON) => {
  editingLabel.value = false
  updateFutureTransaction(futureTransactions, transaction);
}
const editAmountFalse = (futureTransactions, transaction: JSON) => {
  editingAmount.value = false
  updateFutureTransaction(futureTransactions, transaction)
}

const updateFutureTransaction = (futureTransactions, futureTransaction: FutureTransaction | null) => {
  let found = false;
  for (let key in futureTransactions) {
    if (futureTransactions[key].id === futureTransaction.id) {
      futureTransactions[key] = futureTransaction;
      found = true;
      }
  }
  Cookies.set("futureTransactions", JSON.stringify(futureTransactions))
}

const removeTransaction = (futureTransactions, futureTransaction) => {
  let found = false;
  for (let i=0; i<futureTransactions.length; i++) {
    if (futureTransactions[i].id === futureTransaction.id) {
      futureTransactions.splice(i, 1);
      }
  Cookies.set("futureTransactions", JSON.stringify(futureTransactions))
}}


</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>