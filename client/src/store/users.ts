import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth';

export interface User {
    id: string;
    full_name: string;
    email: string;
    role: 'Administrator' | 'team member' | 'viewer';
}

interface UserData {
    [key: string]: any;
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

        async createUser(userData: UserData) {
            try {
                const api = this.getApi();
                const response = await api.post('/users', userData);
                this.users.push(response.data);
            } catch (error) {
                console.error('Error creating user:', error);
                throw error;
            }
        },

        // --- NUEVA ACCIÓN PARA ACTUALIZAR ---
        async updateUser(userId: string, userData: UserData) {
            try {
                const api = this.getApi();
                const response = await api.patch(`/users/${userId}`, userData);

                // Busca el índice del usuario actualizado en la lista y reemplázalo
                // para que la interfaz se actualice automáticamente.
                const index = this.users.findIndex(user => user.id === userId);
                if (index !== -1) {
                    this.users[index] = response.data;
                }
            } catch (error) {
                console.error('Error updating user:', error);
                throw error;
            }
        },

        async deleteUser(userId: string) {
            try {
                const api = this.getApi();
                await api.delete(`/users/${userId}`);
                this.users = this.users.filter(user => user.id !== userId);
            } catch (error) {
                console.error('Error deleting user:', error);
                throw error;
            }
        }
    }
});