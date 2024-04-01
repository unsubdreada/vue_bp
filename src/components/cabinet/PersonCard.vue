<script setup>
import { inject } from 'vue'
import Chart from './Chart.vue'

const info = inject('info')
</script>

<template>
  <div class="row-span-12 col-start-5 col-end-9 bg-white rounded-lg shadow-lg mx-2">
    <div class="flex flex-col items-center">
      <img src="../../../public/avatar-male.jpg" alt="Avatar" class="my-5 h-32 w-32 rounded-full" />
      <h1 class="text-xl font-bold mb-5">{{ info.login }}</h1>
    </div>
    <div class="grid grid-cols-2">
      <Chart />
    </div>
  </div>
</template>
