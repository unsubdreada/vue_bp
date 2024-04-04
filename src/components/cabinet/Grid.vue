<script setup>
import CardPerson from './PersonCard.vue'
import LastDeclineCard from './LastDeclineCard.vue'
import LastIncomeCard from './LastIncomeCard.vue'
import ChartCard from './ChartCard.vue'
</script>

<template>
  <div class="grid grid-rows-12 grid-cols-12 bg-slate-100 p-4">
    <LastDeclineCard />
    <CardPerson />
    <LastIncomeCard />
    <ChartCard />
  </div>
</template>
