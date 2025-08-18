// client/src/types/Project.ts
import type { PartialUser } from './Task'; // Reutilizamos el tipo de usuario

export enum ProjectStatus {
    ACTIVE = 'active',
    COMPLETED = 'completed',
    ARCHIVED = 'archived',
}

// Definimos cómo se ve un miembro de equipo
export interface TeamMember {
    id: string;
    role: string;
    user: PartialUser;
}

// Definimos cómo se ve un equipo
export interface Team {
    id: string;
    name: string;
    description: string;
    members: TeamMember[];
}

// Finalmente, definimos la estructura completa de un Proyecto
export interface Project {
    id: string;
    name: string;
    description?: string;
    status: ProjectStatus;
    start_date?: string | null;
    end_date?: string | null;
    team: Team;
    progress: number;
    created_at: string;
    updated_at: string;
}