import TaskItem from './TaskItem';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useTasksContext } from '../hooks/useTasksContext';

const TaskList = () => {
  const { tasks } = useTasksContext();

  return (
    <main id='tasks' className='tasks-list'>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            id={task.id}
            completed={task.completed}
            editMode={task.editMode}
          />
        ))}
      </SortableContext>
    </main>
  );
};

export default TaskList;
