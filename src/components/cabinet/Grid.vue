<script setup>
import CardPerson from './PersonCard.vue'
import LastDeclineCard from './LastDeclineCard.vue'
import LastIncomeCard from './LastIncomeCard.vue'
import PlannedCard from './PlannedCard.vue'
import ChartCard from './ChartCard.vue'
import { inject, computed } from 'vue'

const trans = inject('trans')

const hasExpenses = computed(() => {
  return trans.value.some((transaction) => transaction.type === 'Расход')
})
</script>

<template>
  <div class="grid grid-rows-12 grid-cols-12 bg-slate-100 p-4">
    <LastDeclineCard />
    <CardPerson />
    <LastIncomeCard />
    <PlannedCard />
    <ChartCard v-if="hasExpenses" />
  </div>
</template>
