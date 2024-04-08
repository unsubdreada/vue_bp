<script setup>
import DataTable from './DataTable.vue'
import Controls from './Controls.vue'
</script>

<template>
  <div class="grid grid-rows-12 px-2 overflow-auto bg-slate-100">
    <Controls class="row-span-2" />
    <DataTable class="row-span-10" />
  </div>
</template>
