<script setup>
//import axios from 'axios'
import { onMounted, ref } from 'vue'
import axiosApiInstance from '@/api'

const transactions = ref([])

const takeTransactions = async () => {
  const storedTokens = JSON.parse(localStorage.getItem('userTokens'))
  const uid = storedTokens.uid
  try {
    const { data } = await axiosApiInstance.get(
      `https://budgetplanner-54498-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/transactions.json`
    )

    transactions.value = Object.values(data)
    //console.log(transactions.value)
  } catch (error) {
    console.log(error)
  }
}
onMounted(async () => {
  await takeTransactions()
})
</script>

<template>
  <div class="w-full">
    <div class="overflow-x-auto mx-3">
      <table class="min-w-full border-collapse">
        <thead class="text-slate-700 bg-gray-200 border-b border-slate-300">
          <tr>
            <th class="py-1.5 border-r border-slate-300 w-1/12">Дата</th>
            <th class="py-1.5 border-r border-slate-300">Тип</th>
            <th class="py-1.5 border-r border-slate-300">Категория</th>
            <th class="py-1.5 border-r border-slate-300">Причина</th>
            <th class="py-1.5 border-r border-slate-300">Сумма</th>
            <th class="w-20"><button class="bg-slate-100 border border-slate-300 p-1 hover:bg-slate-300 hover:border-slate-400">Удалить</button></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="transaction in transactions"
            :key="transaction"
            class="border-b border-slate-200 hover:bg-slate-50"
          >
            <td class="border-r">{{ transaction.date }}</td>
            <td class="border-r">{{ transaction.type }}</td>
            <td class="border-r">{{ transaction.category }}</td>
            <td class="border-r">{{ transaction.reason }}</td>
            <td class="border-r">{{ transaction.amount }}</td>
            <td><input type="checkbox" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
