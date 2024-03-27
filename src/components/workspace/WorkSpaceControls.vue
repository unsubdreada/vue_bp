<script setup>
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'
import axiosApiInstance from '@/api'

const currentDate = ref(new Date().toISOString().substr(0, 10))

const date = ref(currentDate.value)
const categories = ref([])
const selectedCategory = ref()
const typeTransaction = ref('false')
const reason = ref('')
const amount = ref(0)

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
  const formatAmount = typeTransaction.value === 'true' ? amount.value : -amount.value
  const categoryId = selectedCategory.value
  const categoryObject = categories.value.find((category) => category.id === categoryId)
  const categoryName = categoryObject ? categoryObject.category : ''
  const arrayData = {
    type: typeTransactionText.value,
    category: categoryName,
    reason: reason.value,
    amount: formatAmount,
    date: date.value
  }
  return arrayData
}

const sendDataToDB = async (arrayData) => {
  const storedTokens = JSON.parse(localStorage.getItem('userTokens'))
  const uid = storedTokens.uid
  try {
    const response = await axiosApiInstance.post(
      `https://budgetplanner-54498-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/transactions.json`,
      arrayData
    )
    console.log(response)
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
  <div class="text-center border-r">
    <div class="bg-slate-100 py-3 border-b border-slate-200 mb-3">
      <h1 class="text-xl font-bold">Инструменты</h1>
    </div>
    <div class="flex flex-col w-8/12 m-auto">
      <input
        class="text-sm text-center border border-slate-200 outline-none mb-2 p-2"
        type="date"
        v-model="date"
        placeholder="Дата"
        value="currentDate"
      />
      <select
        v-model="typeTransaction"
        class="text-sm text-center border border-slate-200 outline-none mb-2 p-2"
        @change="fetchCategories"
      >
        <option value="true">Доход</option>
        <option value="false">Расход</option>
      </select>
      <p class="text-xs text-left text-slate-400">Выберите категорию</p>
      <select
        v-model="selectedCategory"
        class="text-sm text-left border border-slate-200 outline-none mb-2 p-2"
      >
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.category }}
        </option>
      </select>
      <input
        class="text-sm text-center border border-slate-200 outline-none mb-2 p-2"
        type="text"
        v-model="reason"
        placeholder="Причина"
      />
      <input
        type="number"
        min="1"
        class="text-sm text-center border border-slate-200 outline-none mb-2 p-2"
        v-model="amount"
        placeholder="Сумма"
      />
      <button
        class="bg-slate-100 text-sm text-center border border-slate-200 outline-none mb-2 p-2 hover:bg-slate-200 hover:border-slate-300 transition ease-in-out"
        @click="getDataAndSendToDB"
      >
        Добавить
      </button>
      <p class="text-sm bg-pink-100">{{ notification }}</p>
    </div>
  </div>
</template>
