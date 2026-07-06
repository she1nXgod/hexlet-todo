import { TaskContext } from './TaskContext';
import useTasks from '../hooks/useTasks';
import useTasksFilter from '../hooks/useTasksFilter';

type Props = {
  children: React.ReactNode;
};

export const TaskProvider = ({ children }: Props) => {
  const {
    tasks,
    addTask,
    updateCompleted,
    deleteTask,
    updateTitle,
    toggleEditMode,
    handleDragEnd,
  } = useTasks();

  const { currentFilter, setFilter, filteredTasks } = useTasksFilter(tasks);

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        currentFilter,
        setFilter,
        filteredTasks,
        addTask,
        updateCompleted,
        deleteTask,
        updateTitle,
        toggleEditMode,
        handleDragEnd,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
