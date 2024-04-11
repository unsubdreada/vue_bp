<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import { ref, inject, computed, watchEffect  } from 'vue'

const date = ref(new Date().toISOString().substr(0, 10))

const trans = inject('trans')

const plannedTransactions = computed(() => {
  return trans.value.filter((transaction) => transaction.planned === true)
})

// Функция для преобразования дат из формата ISO
const formatToMarkerDate = (isoDate) => {
  const [year, month, day] = isoDate.split('-')
  return `${year}-${month}-${day}`
}

// Создание массива маркеров на основе дат из массива trans
const markers = ref([])

watchEffect(() => {
  markers.value = plannedTransactions.value.map((transaction) => ({
    date: formatToMarkerDate(transaction.date),
    type: 'line',
    tooltip: [{ text: transaction.reason, color: 'orange' }]
  }))
})
</script>

<template>
  <div
    class="row-span-12 row-start-5 row-end-10 col-start-1 col-end-5 bg-white rounded-lg shadow-lg mt-2"
  >
    <VueDatePicker
      v-model="date"
      inline
      locale="ru"
      :enable-time-picker="false"
      class="justify-center pt-5"
      :markers="markers"
      :action-row="{ showSelect: false, showPreview: false }"
    />
  </div>
</template>
