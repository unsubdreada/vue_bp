<template>
  <div
    class="border border-indigo-300 rounded-xl p-3 flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition"
  >
    <div class="m-3">
      <img class="rounded-full mb-4 transition" :src="photo" alt="" />
    </div>
    <div class="mt-auto">
      <div class="flex flex-col text-center mb-3">
        <b>{{ name }}</b>
        <label for="">{{ label }}</label>
      </div>
      <div class="flex gap-10 justify-center">
        <a :href="telegramLink"
          ><img class="w-8 hover:animate-spin" src="/telegram.svg" alt="Telegram"
        /></a>
        <a :href="githubLink"
          ><img class="w-8 hover:animate-spin" src="/github.svg" alt="Github"
        /></a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: Number,
  name: String,
  label: String,
  telegramLink: String,
  githubLink: String,
  photo: String
})
</script>
