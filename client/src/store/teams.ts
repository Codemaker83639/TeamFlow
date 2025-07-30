import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from './auth';

// 1. Define la interfaz para un objeto de Equipo
interface Team {
    id: string;
    name: string;
    description: string;
    // Añade aquí otras propiedades que esperes del backend
}

export const useTeamsStore = defineStore('teams', () => {
    // 2. Especifica que 'teams' es un array de objetos 'Team'
    const teams = ref<Team[]>([]);
    const authStore = useAuthStore();

    const api = axios.create({
        baseURL: 'http://localhost:3000',
        headers: {
            'Authorization': `Bearer ${authStore.token}`
        }
    });

    async function fetchTeams() {
        try {
            const response = await api.get('/teams');
            teams.value = response.data;
        } catch (error) {
            console.error("Error fetching teams:", error);
        }
    }

    // 3. Añade el tipo al parámetro 'teamData'
    async function createTeam(teamData: { name: string; description: string }) {
        try {
            const response = await api.post('/teams', teamData);
            teams.value.push(response.data);
        } catch (error) {
            console.error("Error creating team:", error);
        }
    }

    return { teams, fetchTeams, createTeam };
});