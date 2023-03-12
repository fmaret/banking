<script setup lang="ts">
import { ref } from "vue";
import Transaction from '../../types/Transaction'


defineProps<{ transaction: Transaction }>();
</script>

<template>
  <div class="flex items-center py-4 justify-between border-b border-gray-300">
    <div class="flex items-center space-x-4">
      <div class="flex-shrink-0 bg-gray-200 rounded-full w-12 h-12"></div>
      <div class="flex flex-col items-center">
        <div class="text-sm font-medium text-white-900 w-48 text-center">
          {{ transaction.label }}
        </div>
        <div class="text-xs text-gray-500">
          {{ transaction.date }}
        </div>
      </div>
    </div>
    <div class="text-sm font-medium text-red-500 w-20" v-if="transaction.amount < 0">
      {{ transaction.amount }}
    </div>
    <div class="text-sm font-medium text-green-500 w-20" v-else>
      {{ transaction.amount }}
    </div>
  </div>
</template>


<style scoped>
.read-the-docs {
  color: #888;
}
</style>
