import { useState, useEffect, useMemo, useCallback } from 'react';
import useTasksLocalStorage from './useTasksLocalStorage';
import toast from 'react-hot-toast';
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

  const addTask = useCallback((title: Task['title']): void => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      editMode: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    toast.success('Task created successfully');
  }, []);

  const updateCompleted = useCallback((id: Task['id']): void => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }, []);

  const deleteTask = useCallback((id: Task['id']): void => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    toast('Task deleted', { icon: '🗑️' });
  }, []);

  const toggleEditMode = useCallback((id: Task['id']): void => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, editMode: !task.editMode } : task)),
    );
  }, []);

  const updateTitle = useCallback((id: Task['id'], newTitle: Task['title']): void => {
    const trimmedTitle = newTitle.trim();

    if (!trimmedTitle) {
      toast.error('Please enter a task title');
      return;
    }

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: trimmedTitle, editMode: false } : task,
      ),
    );
    toast('Task updated', { icon: '✏️' });
  }, []);

  const taskPositionMap = useMemo(() => {
    return new Map<Task['id'], number>(tasks.map((task, index) => [task.id, index]));
  }, [tasks]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent): void => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const activeId = String(active.id);
      const overId = String(over.id);

      setTasks((prevTasks) => {
        const originalPos = taskPositionMap.get(activeId);
        const newPos = taskPositionMap.get(overId);

        if (originalPos === undefined || newPos === undefined) return prevTasks;
        return arrayMove(prevTasks, originalPos, newPos);
      });
    },
    [taskPositionMap],
  );

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
