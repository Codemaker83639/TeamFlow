import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth';

// Definimos la interfaz para un usuario, basándonos en tu esquema de BD
export interface User {
    id: number;
    full_name: string;
    email: string;
    role: 'Administrator' | 'team member' | 'viewer';
}

// Interfaz para los datos de creación de usuario
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
        // Instancia de axios reutilizable
        getApi() {
            const authStore = useAuthStore();
            return axios.create({
                baseURL: 'http://localhost:3000',
                headers: {
                    'Authorization': `Bearer ${authStore.token}`,
                },
            });
        },

        // Acción para obtener todos los usuarios
        async fetchUsers() {
            try {
                const api = this.getApi();
                const response = await api.get('/users');
                this.users = response.data;
            } catch (error) {
                console.error("Error fetching users:", error);
                this.users = []; // Limpiar en caso de error
            }
        },

        // Acción para crear un nuevo usuario
        async createUser(userData: CreateUserData) {
            try {
                const api = this.getApi();

                // --- CORRECCIÓN ---
                // Enviamos el objeto 'userData' directamente. 
                // El DTO del backend ya espera 'fullName', 'username', etc.
                const payload = userData;

                const response = await api.post('/users', payload);

                this.users.push(response.data);
            } catch (error) {
                console.error('Error creating user:', error);
                throw error;
            }
        }
    }
});