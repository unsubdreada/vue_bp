import { createApp } from 'vue'

import App from './App.vue'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
//import Lara from '@/presets/lara'

import router from './router'
import './api'

import { createPinia } from 'pinia'

import './assets/main.css'
import 'primeicons/primeicons.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(PrimeVue)

app.mount('#app')
