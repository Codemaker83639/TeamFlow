import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth';

// Definimos la interfaz para un objeto de Equipo
interface Team {
    id: string;
    name: string;
    description: string;
    // Puedes añadir más propiedades aquí si es necesario
}

// Usamos la sintaxis de 'state' y 'actions' para consistencia
export const useTeamsStore = defineStore('teams', {
    state: () => ({
        teams: [] as Team[],
    }),
    actions: {
        // Función auxiliar para obtener una instancia de API con el token más reciente
        getApi() {
            const authStore = useAuthStore();
            return axios.create({
                baseURL: 'http://localhost:3000',
                headers: {
                    'Authorization': `Bearer ${authStore.token}`
                }
            });
        },

        async fetchTeams() {
            try {
                const api = this.getApi();
                const response = await api.get('/teams');
                this.teams = response.data;
            } catch (error) {
                console.error("Error fetching teams:", error);
                this.teams = []; // Limpiamos en caso de error
            }
        },

        async createTeam(teamData: { name: string; description: string }) {
            try {
                const api = this.getApi();
                const response = await api.post('/teams', teamData);
                // Añadimos el nuevo equipo a la lista para actualizar la UI al instante
                this.teams.push(response.data);
            } catch (error) {
                console.error("Error creating team:", error);
                // Propagamos el error para que el componente que llama pueda manejarlo
                throw error;
            }
        }
    }
});