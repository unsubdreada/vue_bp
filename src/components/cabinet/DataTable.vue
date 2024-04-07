<script setup>
import { reactive, inject, ref } from 'vue'
import axiosApiInstance from '@/api'
import { XMarkIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'

const transactions = inject('transactions')

const takeTransactions = inject('takeTransactions')

const planned = ref('Запланировано')

const sortState = reactive({
  key: null,
  direction: null
})

const onRowClick = async (event) => {
  const storedTokens = JSON.parse(localStorage.getItem('userTokens'))
  const uid = storedTokens.uid
  const id = event.target.closest('tr').getAttribute('data-id')
  try {
    await axiosApiInstance.delete(
      `https://budgetplanner-54498-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/transactions/${id}.json`
    )
    console.log(`Транзакция с ID: ${id} удалена из базы данных!`)
    await takeTransactions()
  } catch (error) {
    console.log(`Транзакция с ID: ${id} не удалена из базы данных! Ошибка: ${error}`)
  }
}

const sortData = (key) => {
  const sortedTransactions = [...transactions.value].sort((a, b) => {
    const aValue = a[key]
    const bValue = b[key]

    if (sortState.direction === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  transactions.value = sortedTransactions

  if (sortState.key === key) {
    sortState.direction = sortState.direction === 'asc' ? 'desc' : 'asc'
  } else {
    sortState.key = key
    sortState.direction = 'asc'
  }
}
</script>

<template>
  <div
    class="max-h-[80vh] bg-white overflow-auto rounded-lg border border-[#4c46e1] scroll-smooth scrollbar mb-2"
  >
    <table class="min-w-full">
      <thead class="sticky top-0 bg-[#4c46e1]">
        <tr>
          <th
            class="w-[10%] text-sm font-medium text-white px-6 py-4 text-left border-r border-[#676aeb] cursor-pointer select-none"
            @click="sortData('date')"
          >
            Дата
            <template v-if="sortState.key === 'date'">
              <template v-if="sortState.direction === 'asc'">
                <ChevronDownIcon class="h-4 inline ml-1" />
              </template>
              <template v-else-if="sortState.direction === 'desc'">
                <ChevronUpIcon class="h-4 inline ml-1" />
              </template>
            </template>
          </th>
          <th
            class="w-[10%] text-sm font-medium text-white px-6 py-4 text-left border-r border-[#676aeb] cursor-pointer select-none"
            @click="sortData('time')"
          >
            Время
            <template v-if="sortState.key === 'time'">
              <template v-if="sortState.direction === 'asc'">
                <ChevronDownIcon class="h-4 inline ml-1" />
              </template>
              <template v-else-if="sortState.direction === 'desc'">
                <ChevronUpIcon class="h-4 inline ml-1" />
              </template>
            </template>
          </th>
          <th
            class="w-[15%] text-sm font-medium text-white px-6 py-4 text-left border-r border-[#676aeb] cursor-pointer select-none"
            @click="sortData('category')"
          >
            Категория
            <template v-if="sortState.key === 'category'">
              <template v-if="sortState.direction === 'asc'">
                <ChevronDownIcon class="h-4 inline ml-1" />
              </template>
              <template v-else-if="sortState.direction === 'desc'">
                <ChevronUpIcon class="h-4 inline ml-1" />
              </template>
            </template>
          </th>
          <th
            class="w-[20%] text-sm font-medium text-white px-6 py-4 text-left border-r border-[#676aeb] cursor-pointer select-none"
            @click="sortData('reason')"
          >
            Причина
            <template v-if="sortState.key === 'reason'">
              <template v-if="sortState.direction === 'asc'">
                <ChevronDownIcon class="h-4 inline ml-1" />
              </template>
              <template v-else-if="sortState.direction === 'desc'">
                <ChevronUpIcon class="h-4 inline ml-1" />
              </template>
            </template>
          </th>
          <th
            class="w-[5%] text-sm font-medium text-white px-6 py-4 text-left cursor-pointer select-none"
            @click="sortData('amount')"
          >
            Сумма
            <template v-if="sortState.key === 'amount'">
              <template v-if="sortState.direction === 'asc'">
                <ChevronDownIcon class="h-4 inline ml-1" />
              </template>
              <template v-else-if="sortState.direction === 'desc'">
                <ChevronUpIcon class="h-4 inline ml-1" />
              </template>
            </template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(transaction, id) in transactions"
          :key="id"
          class="border-b border-slate-200 hover:bg-slate-100"
          :data-id="transaction.id"
        >
          <td class="text-sm text-gray-900 font-light px-6 py-2">
            {{ transaction.date }}
          </td>
          <td class="text-sm text-gray-900 font-light px-6 py-2">
            {{ transaction.time }}
          </td>
          <td class="text-sm text-gray-900 font-light px-6 py-2">
            {{ transaction.category }}
          </td>
          <td class="text-sm text-gray-900 font-light px-6 py-2">
            <span v-if="transaction.planned">
              <span class="bg-amber-400 text-slate-500 text-xs font-medium px-2 py-1 rounded">{{
                planned
              }}</span>
              {{ transaction.reason }}
            </span>
            <span v-else>
              {{ transaction.reason }}
            </span>
          </td>
          <td class="text-sm text-gray-900 font-light px-6 py-2 flex items-center justify-between">
            <span
              v-if="transaction.type === 'Расход'"
              class="bg-red-600 text-white text-xs font-medium px-2 py-1 rounded"
              >{{ transaction.amount }}</span
            >
            <span v-else class="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded">{{
              transaction.amount
            }}</span>
            <XMarkIcon
              class="text-slate-300 h-5 inline hover:text-red-600"
              @click="onRowClick($event)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
