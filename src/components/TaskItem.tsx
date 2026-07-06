import type { Task } from '../types';
import TaskEdit from './TaskEdit';
import TaskView from './TaskView';

type TaskItemProps = Task;

const TaskItem = ({ id, title, completed, editMode }: TaskItemProps) => {
  return (
    <>
      {editMode ? (
        <TaskEdit id={id} title={title} completed={completed} />
      ) : (
        <TaskView id={id} title={title} completed={completed} />
      )}
    </>
  );
};

export default TaskItem;
