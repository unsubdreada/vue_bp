<script setup>
import { useRegistrationStore } from '@/engine/authentication'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useRegistrationStore()
const token = computed(() => authStore.userInfo.token)

const currentDate = ref('')

onMounted(() => {
  setInterval(() => {
    const date = new Date()
    currentDate.value = date.toLocaleString()
  }, 1000)
})

const exit = () => {
  authStore.exit()
  localStorage.removeItem('userTokens')
  router.push('/authentication')
}
</script>

<template>
  <header class="flex justify-between border-b border-slate-200 pb-5 py-4">
    <router-link to="/about">
      <div class="flex items-center gap-4 cursor-pointer pl-10">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase">Budget Planner</h2>
          <p class="text-slate-400">Бюджет в гармонии</p>
        </div>
        <span>{{ currentDate }}</span>
      </div>
    </router-link>
    <ul class="flex items-center gap-5">
      <router-link to="/workspace" v-if="token">
        <li
          class="flex items-center gap-3 bg-violet-100 border border-lime-300 rounded-xl p-2 hover:bg-lime-50 hover:text-lime-600 hover:-translate-y-1 hover:shadow-md transition cursor-pointer"
        >
          <img class="w-5" src="/sign-in.svg" alt="Profile" />
          <span class="text-slate-500 font-bold">WorkSpace</span>
        </li>
      </router-link>

      <router-link to="/about">
        <li
          class="flex items-center gap-3 border border-lime-300 rounded-xl p-2 hover:bg-lime-50 hover:text-lime-600 hover:-translate-y-1 hover:shadow-md transition cursor-pointer"
        >
          <img class="w-5" src="/info.svg" alt="Information" />
          <span>О сайте</span>
        </li>
      </router-link>

      <router-link to="/contacts">
        <li
          class="flex items-center gap-3 border border-lime-300 rounded-xl p-2 hover:bg-lime-50 hover:text-lime-600 hover:-translate-y-1 hover:shadow-md transition cursor-pointer"
        >
          <img class="w-5" src="/contacts.svg" alt="Contacts" />
          <span>Контакты</span>
        </li>
      </router-link>

      <router-link to="/authentication" v-if="!token">
        <li
          class="flex items-center gap-3 border border-lime-300 rounded-xl p-2 hover:bg-lime-50 hover:text-lime-600 hover:-translate-y-1 hover:shadow-md transition cursor-pointer"
        >
          <img class="w-5" src="/sign-in.svg" alt="Profile" />
          <span>Войти</span>
        </li>
      </router-link>

      <router-link to="/authentication" v-if="token" @click.prevent="exit">
        <li
          class="flex items-center gap-3 border border-lime-300 rounded-xl p-2 hover:bg-lime-50 hover:text-lime-600 hover:-translate-y-1 hover:shadow-md transition cursor-pointer"
        >
          <img class="w-5" src="/sign-in.svg" alt="Profile" />
          <span>Выйти</span>
        </li>
      </router-link>
    </ul>
  </header>
</template>
