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
    class="min-h-screen bg-white w-4/5 mx-auto shadow-2xl shadow-slate-300 selection:bg-lime-100"
  >
    <div class="py-5 px-10">
      <TopHeader />
      <router-view></router-view>
    </div>
  </div>
</template>
