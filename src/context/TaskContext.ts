import { createContext } from 'react';
import type { UseTasksFilterReturn } from '../hooks/useTasksFilter';
import type { UseTasksReturn } from '../hooks/useTasks';

export interface TasksContextType extends UseTasksFilterReturn, UseTasksReturn {}

export const TaskContext = createContext<TasksContextType | null>(null);
