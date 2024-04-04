<script setup>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
import { ref, onMounted } from 'vue'
import axiosApiInstance from '@/api'
import * as chartConfig from './chartConfig.js'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

const data = ref(chartConfig.data)
const options = chartConfig.options

const fetchData = async () => {
  try {
    const storedTokens = JSON.parse(localStorage.getItem('userTokens'))
    const uid = storedTokens.uid
    const response = await axiosApiInstance.get(
      `https://budgetplanner-54498-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/transactions.json`
    )
    const transactions = response.data

    const categoriesMap = new Map()
    for (const key in transactions) {
      const transaction = transactions[key]
      if (transaction.type === 'Расход') {
        const category = transaction.category
        const amount = transaction.amount
        if (categoriesMap.has(category)) {
          categoriesMap.set(category, categoriesMap.get(category) + amount)
        } else {
          categoriesMap.set(category, amount)
        }
      }
    }
    data.value = {
      labels: Array.from(categoriesMap.keys()),
      datasets: [
        {
          backgroundColor: chartConfig.data.datasets[0].backgroundColor,
          data: Array.from(categoriesMap.values())
        }
      ]
    }
    console.log(data.value)
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await fetchData()
})
</script>

<template>
  <Doughnut :data="data" :options="options" />
</template>
