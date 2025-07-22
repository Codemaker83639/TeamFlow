// En client/src/shims-vue.d.ts

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module 'vue-i18n' {
    import { createI18n, I18nOptions, I18n } from 'vue-i18n'
    export { createI18n, I18nOptions, I18n }
}