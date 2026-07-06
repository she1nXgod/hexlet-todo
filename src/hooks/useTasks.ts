import { useState, useEffect } from 'react';
import type { Task } from '../types';

export type UseTasksReturn = {
  tasks: Task[];
  addTask: (title: Task['title']) => void;
  updateCompleted: (id: Task['id']) => void;
  deleteTask: (id: Task['id']) => void;
  toggleEditMode: (id: Task['id']) => void;
  updateTitle: (id: Task['id'], newTitle: Task['title']) => void;
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

  const updateCompleted = (id: Task['id']): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id: Task['id']): void => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleEditMode = (id: Task['id']): void =>
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, editMode: !task.editMode } : task,
      ),
    );

  const updateTitle = (id: Task['id'], newTitle: Task['title']): void => {
    if (!newTitle.trim()) {
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, title: newTitle } : task)),
    );
    toggleEditMode(id);
  };

  return {
    tasks,
    addTask,
    updateCompleted,
    deleteTask,
    updateTitle,
    toggleEditMode,
  };
};

export default useTasks;
