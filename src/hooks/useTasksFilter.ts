import { useState } from 'react';
import type { Task } from '../types';

type FilterValue = 'All' | 'Active' | 'Completed';

type TaskFilterMap = Record<FilterValue, Task[]>;

export type UseTasksFilterReturn = {
  currentFilter: FilterValue;
  setFilter: (value: FilterValue) => void;
  filteredTasks: Task[];
};

const useTasksFilter = (tasks: Task[]): UseTasksFilterReturn => {
  const [currentFilter, setFilter] = useState<FilterValue>('All');

  const taskFilterMap: TaskFilterMap = {
    All: tasks,
    Active: tasks.filter(({ completed }) => !completed),
    Completed: tasks.filter(({ completed }) => completed),
  };

  const filteredTasks: Task[] = taskFilterMap[currentFilter];

  return { currentFilter, setFilter, filteredTasks };
};

export default useTasksFilter;
