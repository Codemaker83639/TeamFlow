import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router' // <-- 1. Importa el router

import './assets/main.css' // Asumiendo que tienes este archivo para estilos
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router) // <-- 2. Le dice a la aplicación que use el router

app.mount('#app')
