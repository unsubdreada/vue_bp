<script setup>
// import axiosApiInstance from '@/api'
import WorkSpaceControls from './WorkSpaceControls.vue'
import WorkSpaceField from './WorkSpaceField.vue'
</script>

<template>
  <div class="w-full text-center mt-2 border border-slate-200 cursor-default">
    <div class="grid grid-cols-5">
      <WorkSpaceControls />
      <WorkSpaceField />
    </div>
  </div>
</template>
