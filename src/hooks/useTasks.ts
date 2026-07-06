import { useState, useEffect } from 'react';
import type { Task } from '../types';

export type UseTasksReturn = {
  tasks: Task[];
  addTask: (title: Task['title']) => void;
};

const useTasks = (): UseTasksReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: Task['title']): void => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title,
      completed: false,
      editMode: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  return {
    tasks,
    addTask,
  };
};

export default useTasks;
