<script setup>
import { inject, computed } from 'vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['showGrid', 'showTable'])

const trans = inject('trans')

const filteredTransactions = computed(() => {
  return trans.value.filter((transaction) => transaction.type === 'Расход')
})

const hasTransactions = computed(() => {
  return filteredTransactions.value.length > 0
})
</script>

<template>
  <div class="row-span-4 col-start-1 col-end-5 row-start-1 bg-white rounded-lg shadow-lg">
    <h1 class="text-xl mb-5 text-center">Последние траты:</h1>
    <template v-if="hasTransactions">
      <table class="min-w-full">
        <tbody>
          <tr
            v-for="(transaction, id) in filteredTransactions.reverse().slice(0, 6)"
            :key="id"
            class="text-sm text-gray-900 font-light"
          >
            <td class="px-2 py-2">
              {{ transaction.date }}
            </td>
            <td class="px-2">
              {{ transaction.category }}
            </td>
            <td class="px-2 text-right">
              <span class="bg-red-600 text-white text-xs font-medium px-2 py-1 rounded"
                >{{ transaction.amount }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </template>

    <template v-else>
      <div class="flex items-center justify-center">
        <p class="text-center text-gray-600">К счастью, расходов нет!</p>
        <button class="p-1 hover:text-[#4c46e1]" @click="emit('showTable')">Добавить!</button>
      </div>
    </template>
  </div>
</template>
