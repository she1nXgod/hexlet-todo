import TaskItem from './TaskItem';
import { useTasksContext } from '../hooks/useTasksContext';

const TaskList = () => {
  const { tasks } = useTasksContext();

  return (
    <main id='tasks' className='tasks-list'>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          id={task.id}
          completed={task.completed}
          editMode={task.editMode}
        />
      ))}
    </main>
  );
};

export default TaskList;
