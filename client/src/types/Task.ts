// client/src/types/Task.ts

// Una interfaz simple para representar los datos del usuario que nos interesan
export interface PartialUser {
    id: string;
    full_name: string;
}

export enum TaskStatus {
    BACKLOG = 'backlog',
    TODO = 'todo',
    IN_PROGRESS = 'in_progress',
    REVIEW = 'review',
    DONE = 'done',
}

export enum TaskPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    URGENT = 'urgent',
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    due_date?: Date | null;
    estimated_hours?: number;
    created_at: string;
    updated_at: string;
    // --- CAMPOS NUEVOS ---
    created_by: PartialUser;
    assigned_to: PartialUser | null; // Puede ser un usuario o nulo si no está asignada
}

export interface Comment {
    id: number;
    content: string;
    created_at: string;
    user: {
        id: string;
        full_name: string;
        avatar_url?: string;
    };
}