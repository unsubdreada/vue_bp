<script setup>
import axiosApiInstance from '@/api'
import DataTable from './DataTable.vue'
import Controls from './Controls.vue'
import { provide, ref, onMounted } from 'vue'

const transactions = ref([])
const takeTransactions = async () => {
  const storedTokens = JSON.parse(localStorage.getItem('userTokens'))
  const uid = storedTokens.uid
  try {
    const { data } = await axiosApiInstance.get(
      `https://budgetplanner-54498-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/transactions.json`
    )
    //transactions.value = data
    transactions.value = Object.keys(data).map((id) => ({ id, ...data[id] })).reverse()
    //console.log(transactions.value)
  } catch (error) {
    console.log(error)
  }
}

provide('takeTransactions', takeTransactions)
provide('transactions', transactions)

onMounted(async () => {
  await takeTransactions()
})
</script>

<template>
  <div class="grid grid-rows-12 px-2 overflow-auto bg-slate-100">
    <Controls class="row-span-2" />
    <DataTable class="row-span-10" />
  </div>
</template>
