import Button from './Button';
import { ICONS } from '../assets/icons/index';
import type { TaskData } from '../types';

type TaskViewProps = TaskData;

const TaskView = ({ id, title, completed }: TaskViewProps) => {
  return (
    <div className='task d-flex align-items-center gap-3 mb-4' data-task-id={id}>
      <input
        type='checkbox'
        checked={completed}
        className='checkbox-task flex-shrink-0'
        onClick={(e) => e.stopPropagation()}
      />
      <p className='m-0 w-100 text-break task-title'>{title}</p>
      <Button className='btn-edit-task p-2' aria-label='edit task'>
        <img src={ICONS.edit} alt='' className='icon' />
      </Button>
      <Button className='btn-delete-task p-2' aria-label='delete task'>
        <img src={ICONS.trash} alt='' className='icon' />
      </Button>
    </div>
  );
};

export default TaskView;
