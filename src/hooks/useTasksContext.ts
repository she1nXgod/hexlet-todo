import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

export const useTasksContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasksContext must be used with in TaskProvider');
  }
  return context;
};
