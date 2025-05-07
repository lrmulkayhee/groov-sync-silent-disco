export interface SubTask {
    id: string;
    title: string;
    completed: boolean;
}

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    dueDate: string;
    priority: Priority;
    category: string;
    estimatedTime: number | string;
    subtasks: SubTask[];
}

export interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    priority: Priority;
    completed: boolean;
}