// client/src/types/Task.ts
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
}