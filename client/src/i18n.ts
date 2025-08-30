import { createI18n } from 'vue-i18n'
import es from './locales/es.json'
import en from './locales/en.json'

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('lang') || 'es',
    fallbackLocale: 'en',
    messages: {
        es,
        en
    }
})

export { i18n }