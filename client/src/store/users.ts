import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth';

export interface User {
    id: string; // Asegúrate que el id sea string si usas UUID
    full_name: string;
    email: string;
    role: 'Administrator' | 'team member' | 'viewer';
}

interface CreateUserData {
    fullName: string;
    username: string;
    email: string;
    password: string;
    role: string;
}

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [] as User[],
    }),
    actions: {
        getApi() {
            const authStore = useAuthStore();
            return axios.create({
                baseURL: 'http://localhost:3000',
                headers: {
                    'Authorization': `Bearer ${authStore.token}`,
                },
            });
        },

        async fetchUsers() {
            try {
                const api = this.getApi();
                const response = await api.get('/users');
                this.users = response.data;
            } catch (error) {
                console.error("Error fetching users:", error);
                this.users = [];
            }
        },

        async createUser(userData: CreateUserData) {
            try {
                const api = this.getApi();
                const payload = userData;
                const response = await api.post('/users', payload);
                this.users.push(response.data);
            } catch (error) {
                console.error('Error creating user:', error);
                throw error;
            }
        },

        // --- NUEVA ACCIÓN PARA ELIMINAR ---
        async deleteUser(userId: string) {
            try {
                const api = this.getApi();
                await api.delete(`/users/${userId}`);
                // Actualiza el estado local para reflejar el cambio en la UI al instante
                this.users = this.users.filter(user => user.id !== userId);
            } catch (error) {
                console.error('Error deleting user:', error);
                throw error;
            }
        }
    }
});