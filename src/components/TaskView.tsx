import Button from './Button';
import { ICONS } from '../assets/icons/index';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { TaskData } from '../types';
import { useTasksContext } from '../hooks/useTasksContext';

type TaskViewProps = TaskData;

const TaskView = ({ id, title, completed }: TaskViewProps) => {
  const { updateCompleted, toggleEditMode, deleteTask } = useTasksContext();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const handleToggle = (): void => updateCompleted(id);

  const handleEdit = (e: React.MouseEvent): void => {
    e.stopPropagation();
    toggleEditMode(id);
  };

  const handleDelete = (e: React.MouseEvent): void => {
    e.stopPropagation();
    deleteTask(id);
  };

  const styleDnd = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={styleDnd}
      className='task d-flex align-items-center gap-3 mb-4'
      data-task-id={id}
      onClick={handleToggle}
    >
      <input
        type='checkbox'
        checked={completed}
        className='checkbox-task flex-shrink-0'
        onChange={handleToggle}
        onClick={(e) => e.stopPropagation()}
      />
      <p className='m-0 w-100 text-break task-title'>{title}</p>
      <Button className='btn-edit-task p-2' aria-label='edit task' onClick={handleEdit}>
        <img src={ICONS.edit} alt='' className='icon' />
      </Button>
      <Button
        className='btn-delete-task p-2'
        aria-label='delete task'
        onClick={handleDelete}
      >
        <img src={ICONS.trash} alt='' className='icon' />
      </Button>
      <div className='drag-handle' onClick={(e) => e.stopPropagation()}>
        <img src={ICONS.dragHandle} alt='' className='icon' />
      </div>
    </div>
  );
};

export default TaskView;
