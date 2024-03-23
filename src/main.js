import { createApp } from 'vue'

import App from './App.vue'

import router from './router'
import './api'

import { createPinia } from 'pinia'

import './assets/main.css'
import 'primeicons/primeicons.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())

app.mount('#app')
