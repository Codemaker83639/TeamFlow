import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router' // <-- 1. Importa el router
import { i18n } from './i18n'

import './assets/main.css' // Asumiendo que tienes este archivo para estilos
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
