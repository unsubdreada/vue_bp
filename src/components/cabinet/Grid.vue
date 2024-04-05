<script setup>
import CardPerson from './PersonCard.vue'
import LastDeclineCard from './LastDeclineCard.vue'
import LastIncomeCard from './LastIncomeCard.vue'
import ChartCard from './ChartCard.vue'
import { inject, computed } from 'vue'

const trans = inject('trans')

const hasTransactions = computed(() => {
  return trans.value.length > 0
})
</script>

<template>
  <div class="grid grid-rows-12 grid-cols-12 bg-slate-100 p-4">
    <LastDeclineCard />
    <CardPerson />
    <LastIncomeCard />
    <ChartCard v-if="hasTransactions" />
  </div>
</template>
