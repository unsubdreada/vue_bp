<script setup>
import {
  HomeIcon,
  PresentationChartBarIcon,
  ChatBubbleBottomCenterIcon,
  UsersIcon,
  TableCellsIcon,
  LifebuoyIcon
} from '@heroicons/vue/24/outline'
import { defineEmits } from 'vue'

const emit = defineEmits(['showGrid', 'showTable'])
</script>

<template>
  <div
    class="grid m-auto gap-2 p-2 text-center rounded-2xl bg-gradient-to-b from-[#4c46e1] to-[#676aeb]"
  >
    <button class="p-1 border-b-2 border-[#676aeb]">
      <HomeIcon
        class="h-7 text-white hover:text-black transition ease-in-out"
        @click="emit('showGrid')"
      />
    </button>
    <button class="p-1">
      <PresentationChartBarIcon class="h-7 text-white hover:text-black transition ease-in-out" />
    </button>
    <button class="p-1">
      <TableCellsIcon
        class="h-7 text-white hover:text-black transition ease-in-out"
        @click="emit('showTable')"
      />
    </button>
    <button class="p-1">
      <UsersIcon class="h-7 text-white hover:text-black transition ease-in-out" />
    </button>
    <button class="p-1">
      <ChatBubbleBottomCenterIcon class="h-7 text-white hover:text-black transition ease-in-out" />
    </button>
    <button class="p-1">
      <LifebuoyIcon class="h-7 text-white hover:text-black transition ease-in-out" />
    </button>
  </div>
</template>
