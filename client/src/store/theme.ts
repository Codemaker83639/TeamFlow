import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    const theme = ref(localStorage.getItem('theme') || 'light')

    function toggleTheme() {
        theme.value = theme.value === 'light' ? 'dark' : 'light'
        localStorage.setItem('theme', theme.value)
        updateHtmlClass()
    }

    function updateHtmlClass() {
        if (theme.value === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    onMounted(() => {
        updateHtmlClass()
    })

    return { theme, toggleTheme }
})