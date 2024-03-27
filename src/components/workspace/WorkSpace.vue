<script setup>
// import axiosApiInstance from '@/api'
import WorkSpaceControls from './WorkSpaceControls.vue'
import WorkSpaceField from './WorkSpaceField.vue'
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden w-full text-center mt-2 cursor-default">
    <div class="grid grid-cols-5">
      <WorkSpaceControls />
      <WorkSpaceField />
    </div>
  </div>
</template>
