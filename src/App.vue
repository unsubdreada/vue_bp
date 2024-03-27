<script setup>
import TopHeader from './components/TopHeader.vue'
import { useRegistrationStore } from '@/engine/authentication'

const authStore = useRegistrationStore()

const checkUser = () => {
  const tokens = JSON.parse(localStorage.getItem('userTokens'))
  if (tokens) {
    authStore.userInfo.token = tokens.token
    authStore.userInfo.refreshToken = tokens.refreshToken
  }
}

checkUser()
</script>

<template>
  <div
    class="h-screen overflow-hidden bg-white w-4/5 mx-auto selection:bg-blue-100 selection:text-slate-900 shadow-2xl rounded-lg"
  >
    <div class="px-10">
      <TopHeader />
      <router-view></router-view>
    </div>
  </div>
</template>
