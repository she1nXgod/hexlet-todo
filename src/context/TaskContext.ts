import { createContext } from 'react';
import type { UseTasksReturn } from '../hooks/useTasks';

export interface TasksContextType extends UseTasksReturn {}

export const TaskContext = createContext<TasksContextType | null>(null);
