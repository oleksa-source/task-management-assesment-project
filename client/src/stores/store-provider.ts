import { createContext } from 'react';

import { TaskList } from './TaskList';

interface TaskEntity {
    id: string
    title: string;
    description: string;
    due_date: string;
    completed: boolean;
    updated_at: string;
    created_at: string;
}

interface NewTask {
    title: string;
    description: string;
    due_date: string;
    completed: boolean;
}

type Task = TaskEntity | NewTask;

export const StoreContext = createContext({} as TaskList);
export const StoreProvider = StoreContext.Provider;

export type {
    Task,
    NewTask,
    TaskEntity,
}
