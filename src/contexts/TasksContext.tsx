import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Task } from '../types';
import { useToast } from '@/hooks/use-toast';

// Mock data for tasks
const mockTasks: Task[] = [
    { 
        id: '1', 
        title: 'Sample Task 1', 
        description: 'This is a sample task', 
        completed: false, 
        dueDate: '2023-12-31', 
        priority: 'high', 
        category: 'Work', 
        estimatedTime: 120, 
        subtasks: [] 
    },
    { 
        id: '2', 
        title: 'Sample Task 2', 
        description: 'This is another sample task', 
        completed: true, 
        dueDate: '2023-11-30', 
        priority: 'medium', 
        category: 'Personal', 
        estimatedTime: 60, 
        subtasks: [] 
    },
];

interface TasksContextType {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    deleteTask: (id: string) => void;
    toggleTaskCompletion: (id: string) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        // Load tasks from localStorage or use mock data
        const savedTasks = localStorage.getItem('vault-tec-tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        } else {
            setTasks(mockTasks);
        }
    }, []);

    useEffect(() => {
        // Save tasks to localStorage whenever they change
        if (tasks.length > 0) {
            localStorage.setItem('vault-tec-tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    const addTask = (newTask: Task) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
        toast({
            title: "Task Created",
            description: "Your new task has been added to the system.",
        });
    };

    const updateTask = (updatedTask: Task) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );
        toast({
            title: "Task Updated",
            description: "Your task has been successfully updated.",
        });
    };

    const deleteTask = (id: string) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        toast({
            title: "Task Deleted",
            description: "The task has been removed from your list.",
        });
    };

    const toggleTaskCompletion = (id: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );

        const task = tasks.find(t => t.id === id);
        const newStatus = task ? !task.completed : false;

        toast({
            title: newStatus ? "Task Completed" : "Task Reopened",
            description: newStatus
                ? "The task has been marked as completed."
                : "The task has been reopened.",
        });
    };

    return (
        <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleTaskCompletion }}>
            {children}
        </TasksContext.Provider>
    );
};

export const useTasksContext = (): TasksContextType => {
    const context = useContext(TasksContext);
    if (context === undefined) {
        throw new Error('useTasksContext must be used within a TasksProvider');
    }
    return context;
};