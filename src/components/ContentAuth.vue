<script setup>
import { ref } from 'vue'
import { useRegistrationStore } from '@/engine/authentication'
import { useRouter } from 'vue-router'
import { AtSymbolIcon, LockClosedIcon } from '@heroicons/vue/24/outline'
import Message from 'primevue/message'

const email = ref()
const password = ref()

const authenticationStore = useRegistrationStore()
const router = useRouter()

const loginSubmit = async () => {
  await authenticationStore.authentication(
    {
      email: email.value,
      password: password.value
    },
    'signIn'
  )
  router.push('/cabinet')
}
</script>

<template>
  <div
    class="w-2/5 m-auto text-center mt-10 border border-slate-200 rounded-3xl p-10 cursor-default"
  >
    <h1 class="text-2xl font-bold mb-5">Авторизация</h1>
    <div class="flex flex-col w-2/5 text-left m-auto items-center">
      <div class="bg-white p-4 rounded-lg">
        <div class="relative bg-inherit">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="peer bg-transparent h-10 w-72 rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-[#4c46e1] focus:ring-[#939af2] focus:outline-none focus:border-rose-600"
          />
          <label
            class="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-[gray-500] peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-[#939af2] peer-focus:text-sm transition-all"
          >
            <AtSymbolIcon class="h-5 inline pr-1 items-center" />Email</label
          >
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg">
        <div class="relative bg-inherit">
          <input
            v-model="password"
            type="password"
            placeholder="Пароль"
            class="peer bg-transparent h-10 w-72 rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-[#4c46e1] focus:ring-[#939af2] focus:outline-none focus:border-rose-600"
          /><label
            class="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-[gray-500] peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-[#939af2] peer-focus:text-sm transition-all"
            ><LockClosedIcon class="h-5 inline pr-1 items-center" />Пароль</label
          >
        </div>
      </div>

      <div class="flex flex-col w-4/5 text-center">
        <router-link to="/reset">
          <button class="mt-1 text-xs hover:text-slate-400">Забыли пароль?</button>
        </router-link>
        <button
          class="my-3 bg-[#4c46e1] hover:bg-[#676aeb] rounded-xl p-2 text-white"
          @click="loginSubmit"
        >
          Войти
        </button>
      </div>
      <span class="text-sm text-slate-400">или</span>
      <router-link to="/registration">
        <button class="my-3 bg-[#4c46e1] hover:bg-[#676aeb] rounded-xl p-2 text-white">
          Зарегистрироваться
        </button>
      </router-link>
    </div>
    <Message
      v-if="authenticationStore.errorMessage"
      severity="warn"
      @close="authenticationStore.errorMessage = ''"
      class="my-2"
      >{{ authenticationStore.errorMessage }}</Message
    >
  </div>
</template>
