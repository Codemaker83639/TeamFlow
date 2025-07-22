import { createI18n } from 'vue-i18n'
import es from './locales/es.json'
import en from './locales/en.json'

const i18n = createI18n({
    legacy: false, // Usar la API de Composición de Vue 3
    locale: localStorage.getItem('lang') || 'es', // Idioma por defecto
    fallbackLocale: 'en', // Idioma de respaldo
    messages: {
        es,
        en
    }
})

export { i18n }