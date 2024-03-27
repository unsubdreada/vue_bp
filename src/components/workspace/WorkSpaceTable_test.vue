<script setup>
import { onMounted, ref } from 'vue'
import axiosApiInstance from '@/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const transactions = ref([])
const columns = [
  { field: 'date', header: 'Дата' },
  { field: 'type', header: 'Тип' },
  { field: 'category', header: 'Категория' },
  { field: 'amount', header: 'Сумма' }
]

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
  <div class="flex justify-center min-h-screen">
    <div class="min-w-full">
      <DataTable
        :value="transactions"
        scrollable
        scrollHeight="77vh"
        tableStyle="min-width: 100%; height: 70vh"
        removableSort
        :pt="{
          headerRow: { class: 'bg-slate-50 border-b border-slate-300' },
          bodyRow: { class: 'hover:bg-slate-50 cursor-pointer' },
          paginator: { class: '' }
        }"
      >
        <Column
          v-for="col of columns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
          sortable
          style="width: 25%; height: 3vh"
        ></Column>
        <template #footer>
          <div class="bg-slate-100 p-3">
            Количество операций: <b>{{ transactions ? transactions.length : 0 }}</b
            >, на сумму: <b>{{ transactions.reduce((sum, obj) => sum + obj.amount, 0) }}</b>
          </div>
        </template>
      </DataTable>
    </div>
  </div>
</template>
