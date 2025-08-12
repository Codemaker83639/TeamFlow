import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth';

interface Team {
    id: string;
    name: string;
    description: string;
}

interface CreateTeamData {
    name: string;
    description: string;
    memberIds?: string[];
}

// Interfaz para los datos de actualización (todos los campos son opcionales)
interface UpdateTeamData {
    name?: string;
    description?: string;
    memberIds?: string[];
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

        async createTeam(teamData: CreateTeamData) {
            try {
                const api = this.getApi();
                const response = await api.post('/teams', teamData);
                this.teams.push(response.data);
            } catch (error) {
                console.error("Error creating team:", error);
                throw error;
            }
        },

        // --- NUEVA ACCIÓN PARA ACTUALIZAR EQUIPOS ---
        async updateTeam(teamId: string, teamData: UpdateTeamData) {
            try {
                const api = this.getApi();
                const response = await api.patch(`/teams/${teamId}`, teamData);
                const index = this.teams.findIndex(t => t.id === teamId);
                if (index !== -1) {
                    this.teams[index] = response.data;
                }
            } catch (error) {
                console.error("Error updating team:", error);
                throw error;
            }
        },

        // --- NUEVA ACCIÓN PARA ELIMINAR EQUIPOS ---
        async deleteTeam(teamId: string) {
            try {
                const api = this.getApi();
                await api.delete(`/teams/${teamId}`);
                this.teams = this.teams.filter(t => t.id !== teamId);
            } catch (error) {
                console.error("Error deleting team:", error);
                throw error;
            }
        }
    }
});