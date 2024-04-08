<script setup>
import { onMounted, ref, computed, inject } from 'vue'
import axios from 'axios'
import axiosApiInstance from '@/api'

const takeInfo = inject('takeInfo')

const currentDate = ref(new Date().toISOString().substr(0, 10))

const date = ref(currentDate.value)
const categories = ref([])
const selectedCategory = ref()
const typeTransaction = ref('false')
const reason = ref('')
const amount = ref(0)
const planned = ref(false)

const notification = ref('')

const typeTransactionText = computed(() => {
  return typeTransaction.value === 'true' ? 'Доход' : 'Расход'
})

const fetchCategories = async () => {
  try {
    const { data } = await axios.get(
      `https://d30986509723c54d.mokky.dev/categories?type=${typeTransaction.value}`
    )
    categories.value = data
  } catch (error) {
    console.log(error)
  }
}

const getData = () => {
  // Сбор данных с инпутов
  const categoryId = selectedCategory.value
  const categoryObject = categories.value.find((category) => category.id === categoryId)
  const categoryName = categoryObject ? categoryObject.category : ''
  if (date.value > currentDate.value) {
    planned.value = true
  }
  const arrayData = {
    type: typeTransactionText.value,
    category: categoryName,
    reason: reason.value,
    amount: amount.value,
    date: date.value,
    planned: planned.value,
    time: new Date().toLocaleTimeString()
  }
  planned.value = false
  return arrayData
}

const sendDataToDB = async (arrayData) => {
  const storedTokens = JSON.parse(localStorage.getItem('userTokens'))
  const uid = storedTokens.uid
  try {
    await axiosApiInstance.post(
      `https://budgetplanner-54498-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/transactions.json`,
      arrayData
    )
    await takeInfo()
  } catch (error) {
    switch (error.response.status) {
      case 401:
        console.log('Unauthorized')
        break
      case 404:
        console.log('Not found')
        break
      case 500:
        console.log('Internal server error')
        break
      default:
        console.log('Unknown error')
        break
    }
    console.log(error)
  }
}

const getDataAndSendToDB = () => {
  if (!date.value || !selectedCategory.value || !reason.value || !amount.value) {
    notification.value = 'Заполните все поля'
    alert(notification.value)
    return
  }
  const data = getData()
  sendDataToDB(data)
}

onMounted(async () => {
  await fetchCategories()
})
</script>

<template>
  <div class="flex justify-center gap-3 p-2 m-auto">
    <input
      class="text-s text-center ring-1 ring-[#4c46e1] rounded-lg p-2 outline-none"
      type="date"
      v-model="date"
      placeholder="Дата"
      value="currentDate"
    />
    <select
      v-model="typeTransaction"
      class="text-s text-center ring-1 ring-[#4c46e1] rounded-lg p-2 outline-none"
      @change="fetchCategories"
    >
      <option value="true">Доход</option>
      <option value="false">Расход</option>
    </select>
    <select
      v-model="selectedCategory"
      class="w-72 text-s text-center ring-1 ring-[#4c46e1] rounded-lg p-2 outline-none"
    >
      <option v-for="category in categories" :key="category.id" :value="category.id">
        {{ category.category }}
      </option>
    </select>
    <input
      class="text-s text-center ring-1 ring-[#4c46e1] rounded-lg p-2 outline-none"
      type="text"
      v-model="reason"
      placeholder="Причина"
    />
    <input
      type="number"
      min="1"
      class="text-s text-center ring-1 ring-[#4c46e1] rounded-lg p-2 outline-none"
      v-model="amount"
      placeholder="Сумма"
    />
    <button
      class="bg-[#4c46e1] text-white rounded-xl p-2 hover:bg-[#676aeb] hover:text-white transition cursor-pointer"
      @click="getDataAndSendToDB"
    >
      Добавить
    </button>
  </div>
</template>
