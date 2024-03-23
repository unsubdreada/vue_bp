<script setup>
import { ref } from 'vue'
import { useRegistrationStore } from '@/engine/authentication'
import { useRouter } from 'vue-router'
import ErrorNotification from './ErrorNotification.vue'

const login = ref()
const email = ref()
const password = ref()
const confirmPassword = ref()

const registrationStore = useRegistrationStore()
const router = useRouter()

const regSubmit = async () => {
  try {
    await registrationStore.authentication(
      {
        login: login.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value
      },
      'signUp'
    )
    if (registrationStore.errorMessage) {
      return
    }
    router.push('/workspace')
  } catch (error) {
    console.log('Ошибка регистрации: ', error)
  }
}
</script>

<template>
  <div
    class="w-2/5 m-auto text-center mt-10 border border-slate-200 rounded-3xl p-10 cursor-default"
  >
    <h1 class="text-2xl font-bold mb-5">Регистрация</h1>
    <div id="regForm">
      <div class="flex flex-col w-2/5 text-left m-auto items-center">
        <div class="relative mt-3 hover:drop-shadow-sm">
          <img class="w-5 absolute left-2.5 top-2.5" src="/login-reg.svg" alt="EmailReg" />
          <input
            class="h-10 pl-8 border-b border-lime-200 outline-none text-slate-500 hover:bg-lime-50 hover:border-lime-300 focus:bg-lime-50 focus:border-lime-500 transition ease-in-out selection:bg-lime-300"
            v-model="login"
            type="text"
            placeholder="Логин"
          />
        </div>
        <div class="relative mt-3 hover:drop-shadow-sm">
          <img class="w-5 absolute left-2.5 top-2.5" src="/email.svg" alt="EmailReg" />
          <input
            class="h-10 pl-8 border-b border-lime-200 outline-none text-slate-500 hover:bg-lime-50 hover:border-lime-300 focus:bg-lime-50 focus:border-lime-500 transition ease-in-out selection:bg-lime-300"
            v-model="email"
            type="email"
            placeholder="Электронная почта"
          />
        </div>
        <div class="relative mt-3 hover:drop-shadow-sm">
          <img class="w-5 absolute left-2.5 top-2.5" src="/password.svg" alt="PasswordReg" />
          <input
            class="h-10 pl-8 border-b border-lime-200 outline-none text-slate-500 hover:bg-lime-50 hover:border-lime-300 focus:bg-lime-50 focus:border-lime-500 transition ease-in-out selection:bg-lime-300"
            v-model="password"
            type="password"
            placeholder="Пароль"
          />
        </div>
        <div class="relative mt-3 hover:drop-shadow-sm">
          <img class="w-5 absolute left-2.5 top-2.5" src="/password.svg" alt="PasswordReg" />
          <input
            class="h-10 pl-8 border-b border-lime-200 outline-none text-slate-500 hover:bg-lime-50 hover:border-lime-300 focus:bg-lime-50 focus:border-lime-500 transition ease-in-out selection:bg-lime-300"
            v-model="confirmPassword"
            type="password"
            placeholder="Подтвердите пароль"
          />
        </div>
        <button
          @click.prevent="regSubmit"
          class="my-3 w-4/5 border border-lime-500 rounded-xl p-2 bg-lime-300 hover:scale-105 hover:drop-shadow-lg hover:bg-lime-400 active:bg-slate-200 transition ease-in-out"
        >
          Отправить
        </button>
        <span
          >Уже есть аккаунт?
          <router-link to="/authentication" class="text-teal-950">Войти!</router-link>
        </span>
      </div>
      <ErrorNotification
        v-if="registrationStore.errorMessage"
        :errorMessage="registrationStore.errorMessage"
      />
    </div>
  </div>
</template>
