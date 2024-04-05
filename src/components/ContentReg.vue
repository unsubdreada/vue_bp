<script setup>
import { ref } from 'vue'
import { useRegistrationStore } from '@/engine/authentication'
import { useRouter } from 'vue-router'
import Message from 'primevue/message'
import { AtSymbolIcon, LockClosedIcon } from '@heroicons/vue/24/outline'

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
    router.push('/cabinet')
  } catch (error) {
    console.log('Ошибка регистрации: ', error)
    registrationStore.errorMessage = error
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
        <div class="bg-white p-4 rounded-lg">
          <div class="relative bg-inherit">
            <input
              v-model="login"
              type="text"
              placeholder="Логин"
              class="peer bg-transparent h-10 w-72 rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-[#4c46e1] focus:ring-[#939af2] focus:outline-none focus:border-rose-600"
            />
            <label
              class="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-[gray-500] peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-[#939af2] peer-focus:text-sm transition-all"
            >
              <AtSymbolIcon class="h-5 inline pr-1 items-center" />Логин</label
            >
          </div>
        </div>

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
            />
            <label
              class="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-[gray-500] peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-[#939af2] peer-focus:text-sm transition-all"
            >
              <LockClosedIcon class="h-5 inline pr-1 items-center" />Пароль</label
            >
          </div>
        </div>

        <div class="bg-white p-4 rounded-lg">
          <div class="relative bg-inherit">
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Подтвердите пароль"
              class="peer bg-transparent h-10 w-72 rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-[#4c46e1] focus:ring-[#939af2] focus:outline-none focus:border-rose-600"
            />
            <label
              class="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-[gray-500] peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-[#939af2] peer-focus:text-sm transition-all"
            >
              <AtSymbolIcon class="h-5 inline pr-1 items-center" />Подтвердите пароль</label
            >
          </div>
        </div>

        <button
          @click.prevent="regSubmit"
          class="my-3 bg-[#4c46e1] hover:bg-[#676aeb] rounded-xl p-2 px-4 text-white"
        >
          Отправить
        </button>
        <span
          >Уже есть аккаунт?
          <router-link to="/authentication" class="text-teal-950">Войти!</router-link>
        </span>
      </div>
    </div>
    <Message
      v-if="registrationStore.errorMessage"
      severity="warn"
      @close="registrationStore.errorMessage = ''"
      class="my-2"
      >{{ registrationStore.errorMessage }}</Message
    >
  </div>
</template>
