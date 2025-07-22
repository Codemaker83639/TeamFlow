import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
    // ESTADO CORREGIDO Y SEGURO
    const token = ref(localStorage.getItem('accessToken') || null)
    const storedUser = localStorage.getItem('user')
    const user = ref(storedUser ? JSON.parse(storedUser) : null)

    // Getters (valores computados)
    const isAuthenticated = computed(() => !!token.value)

    // Acciones
    async function login(email: string, password: string) {
        const response = await axios.post('http://localhost:3000/auth/login', {
            email,
            password,
        })

        const { accessToken, user: userData } = response.data

        token.value = accessToken
        user.value = userData

        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    function logout() {
        token.value = null
        user.value = null
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
    }

    return { token, user, isAuthenticated, login, logout }
})