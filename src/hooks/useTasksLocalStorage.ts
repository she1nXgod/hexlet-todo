import { useState } from 'react';
import type { Task } from '../types';

const useTasksLocalStorage = () => {
  const [savedTasks, setSavedTasks] = useState(() => {
    const dataTasks = localStorage.getItem('tasks');
    const parsed: Task[] = dataTasks ? JSON.parse(dataTasks) : [];
    return parsed.map((task) => ({ ...task, editMode: false }));
  });

  const saveTasks = (tasks: Task[]): void => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setSavedTasks(tasks);
  };

  return { savedTasks, saveTasks };
};

export default useTasksLocalStorage;
