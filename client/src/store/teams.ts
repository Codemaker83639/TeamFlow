import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth';

interface Team {
    id: string;
    name: string;
    description: string;
}

// Interfaz para los datos de creación de un equipo
interface CreateTeamData {
    name: string;
    description: string;
    memberIds?: string[]; // Se añade el array opcional de IDs
}

export const useTeamsStore = defineStore('teams', {
    state: () => ({
        teams: [] as Team[],
    }),
    actions: {
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
                this.teams = [];
            }
        },

        // Se actualiza el tipo de 'teamData' para que coincida con la nueva interfaz
        async createTeam(teamData: CreateTeamData) {
            try {
                const api = this.getApi();
                const response = await api.post('/teams', teamData);
                this.teams.push(response.data);
            } catch (error) {
                console.error("Error creating team:", error);
                throw error;
            }
        }
    }
});