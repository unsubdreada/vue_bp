<script setup>
import { ref } from 'vue'
import { useRegistrationStore } from '@/engine/authentication'
import { useRouter } from 'vue-router'
import ErrorNotification from './ErrorNotification.vue'

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
  router.push('/workspace')
}
</script>

<template>
  <div
    class="w-2/5 m-auto text-center mt-10 border border-slate-200 rounded-3xl p-10 cursor-default"
  >
    <h1 class="text-2xl font-bold mb-5">Авторизация</h1>
    <div class="flex flex-col w-2/5 text-left m-auto items-center">
      <div class="relative mt-3 hover:drop-shadow-sm">
        <img class="w-5 absolute left-2.5 top-2.5" src="/login-auth.svg" alt="EmailAuth" />
        <input
          class="h-10 pl-8 border border-lime-200 rounded-md outline-none text-slate-500 hover:bg-lime-50 hover:border-lime-300 focus:bg-lime-100 focus:border-lime-500 transition ease-in-out selection:bg-lime-300"
          v-model="email"
          type="email"
          placeholder="Email"
        />
      </div>

      <div class="relative mt-3 hover:drop-shadow-sm">
        <div class="flex items-center">
          <img class="w-5 absolute left-2.5 top-2.5" src="/password.svg" alt="PasswordAuth" />
          <input
            class="h-10 pl-8 border border-lime-200 rounded-md outline-none text-slate-500 hover:bg-lime-50 hover:border-lime-300 focus:bg-lime-100 focus:border-lime-500 transition ease-in-out selection:bg-lime-300"
            v-model="password"
            type="password"
            placeholder="Пароль"
          />
        </div>
      </div>

      <div class="flex flex-col w-4/5">
        <button class="mt-1 text-xs hover:text-slate-400">Забыли пароль?</button>
        <button
          class="my-3 border border-lime-500 rounded-xl p-2 bg-lime-300 hover:scale-105 hover:drop-shadow-lg hover:bg-lime-400 active:bg-yellow-200 transition ease-in-out selection:bg-lime-300"
          @click="loginSubmit"
        >
          Войти
        </button>
      </div>
      <span class="text-sm text-slate-400">или</span>
      <router-link to="/registration">
        <button
          class="my-3 border border-emerald-500 rounded-xl p-2 bg-green-100 hover:scale-105 hover:drop-shadow-lg hover:bg-emerald-200"
        >
          Зарегистрироваться
        </button>
      </router-link>
    </div>
    <ErrorNotification
      v-if="authenticationStore.errorMessage"
      :errorMessage="authenticationStore.errorMessage"
    />
  </div>
</template>
