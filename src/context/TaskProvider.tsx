import { TaskContext } from './TaskContext.js';
import useTasks from '../hooks/useTasks.js';

type Props = {
  children: React.ReactNode;
};

export const TaskProvider = ({ children }: Props) => {
  const { tasks, addTask } = useTasks();

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
