import { useState, useEffect } from 'react';
import useTasksLocalStorage from './useTasksLocalStorage';
import { arrayMove } from '@dnd-kit/sortable';
import type { Task } from '../types';
import type { DragEndEvent } from '@dnd-kit/core';

export type UseTasksReturn = {
  tasks: Task[];
  addTask: (title: Task['title']) => void;
  updateCompleted: (id: Task['id']) => void;
  deleteTask: (id: Task['id']) => void;
  toggleEditMode: (id: Task['id']) => void;
  updateTitle: (id: Task['id'], newTitle: Task['title']) => void;
  handleDragEnd: (event: DragEndEvent) => void;
};

const useTasks = (): UseTasksReturn => {
  const { savedTasks, saveTasks } = useTasksLocalStorage();
  const [tasks, setTasks] = useState<Task[]>(savedTasks ?? []);

  useEffect(() => saveTasks(tasks), [tasks, saveTasks]);

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

  const getTaskPos = (id: Task['id']): number =>
    tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(String(active.id));
      const newPos = getTaskPos(String(over.id));

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  return {
    tasks,
    addTask,
    updateCompleted,
    deleteTask,
    updateTitle,
    toggleEditMode,
    handleDragEnd,
  };
};

export default useTasks;
