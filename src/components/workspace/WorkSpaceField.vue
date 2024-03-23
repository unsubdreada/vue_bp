<script setup>
import WorkSpaceTable from './WorkSpaceTable.vue'
</script>

<template>
  <div class="col-span-4 text-center border-r">
    <div class="bg-slate-100 py-3 border-b border-slate-200 mb-3">
      <h1 class="text-xl font-bold">Мониторинг</h1>
    </div>
    <div class="h-full grid grid-rows-2">
      <WorkSpaceTable />
    </div>
  </div>
</template>
