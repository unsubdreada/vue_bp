<script setup>
import { onMounted, ref, provide } from 'vue'
import axiosApiInstance from '@/api'
import Tabs from './Tabs.vue'
import Grid from './Grid.vue'
import Table from './Table.vue'

const currentComponent = ref('Table')
const info = ref([])
const trans = ref([])

const takeInfo = async () => {
  const storedTokens = JSON.parse(localStorage.getItem('userTokens'))
  const uid = storedTokens.uid
  try {
    const { data } = await axiosApiInstance.get(
      `https://budgetplanner-54498-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`
    )
    info.value = data
    const transactions = data.transactions
      ? Object.entries(data.transactions)
          .map(([key, value]) => ({
            id: key,
            date: value.date,
            time: value.time,
            category: value.category,
            type: value.type,
            amount: value.amount,
            reason: value.reason,
            planned: value.planned
          }))
          .reverse()
      : []

    trans.value = transactions

    //console.log(info.value)
    //console.log(trans.value)
  } catch (error) {
    console.log(error)
  }
}

provide('info', info) // Массив с информацией о пользователе
provide('trans', trans) // Массив с транзакциями
provide('takeInfo', takeInfo) // Функция для получения данных с БД

onMounted(async () => {
  await takeInfo()
})
</script>

<template>
  <div class="flex-grow h-full overflow-hidden grid grid-cols-12">
    <Tabs @showGrid="currentComponent = 'Grid'" @showTable="currentComponent = 'Table'" />
    <Grid v-if="currentComponent === 'Grid'" class="col-span-11 border-l-2 borderl-gray-300" />
    <Table v-if="currentComponent === 'Table'" class="col-span-11 border-l-2 borderl-gray-300" />
  </div>
</template>
