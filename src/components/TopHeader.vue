<script setup>
import { useRegistrationStore } from '@/engine/authentication'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  BriefcaseIcon,
  HashtagIcon,
  SparklesIcon,
  ArrowLeftEndOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
  HomeIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useRegistrationStore()
const token = computed(() => authStore.userInfo.token)

const exit = () => {
  authStore.exit()
  localStorage.removeItem('userTokens')
  router.push('/authentication')
}
</script>

<template>
  <header class="flex justify-between border-b border-[#4c46e1] pb-5 py-4">
    <router-link to="/about">
      <div class="flex items-center gap-4 cursor-pointer pl-10">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase">Budget Planner</h2>
          <p class="text-slate-400">Бюджет в гармонии</p>
        </div>
      </div>
    </router-link>
    <ul class="flex items-center gap-5">
      <router-link to="/cabinet" v-if="token">
        <li
          class="flex items-center gap-3 bg-[#4c46e1] text-white rounded-xl p-2 hover:bg-[#676aeb] hover:text-white transition cursor-pointer"
        >
          <HomeIcon class="h-5" />
          <span class="font-medium">Кабинет</span>
        </li>
      </router-link>

      <router-link to="/workspace" v-if="token">
        <li
          class="flex items-center gap-3 bg-[#4c46e1] text-white rounded-xl p-2 hover:bg-[#676aeb] hover:text-white transition cursor-pointer"
        >
          <BriefcaseIcon class="h-5" />
          <span class="font-medium">WorkSpace</span>
        </li>
      </router-link>

      <router-link to="/about">
        <li
          class="flex items-center gap-3 bg-[#4c46e1] text-white rounded-xl p-2 hover:bg-[#676aeb] hover:text-white transition cursor-pointer"
        >
          <HashtagIcon class="h-5" />
          <span class="font-medium">О сайте</span>
        </li>
      </router-link>

      <router-link to="/contacts">
        <li
          class="flex items-center gap-3 bg-[#4c46e1] text-white rounded-xl p-2 hover:bg-[#676aeb] hover:text-white transition cursor-pointer"
        >
          <SparklesIcon class="h-5" />
          <span class="font-medium">Контакты</span>
        </li>
      </router-link>

      <router-link to="/authentication" v-if="!token">
        <li
          class="flex items-center gap-3 bg-[#4c46e1] text-white rounded-xl p-2 hover:bg-[#676aeb] hover:text-white transition cursor-pointer"
        >
          <ArrowLeftEndOnRectangleIcon class="h-5" />
          <span class="font-medium">Войти</span>
        </li>
      </router-link>

      <router-link to="/authentication" v-if="token" @click.prevent="exit">
        <li
          class="flex items-center gap-3 bg-[#4c46e1] text-white rounded-xl p-2 hover:bg-[#676aeb] hover:text-white transition cursor-pointer"
        >
          <ArrowLeftStartOnRectangleIcon class="h-5" />
          <span class="font-medium">Выйти</span>
        </li>
      </router-link>
    </ul>
  </header>
</template>
