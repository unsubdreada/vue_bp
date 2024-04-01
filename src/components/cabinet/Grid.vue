<script setup>
import CardPerson from './PersonCard.vue'
import LastTransCard from './LastDeclineCard.vue'
import LastIncomeCard from './LastIncomeCard.vue'
</script>

<template>
  <div class="grid grid-rows-12 grid-cols-12 bg-slate-100 p-4">
    <CardPerson />
    <LastTransCard />
    <LastIncomeCard />
  </div>
</template>
