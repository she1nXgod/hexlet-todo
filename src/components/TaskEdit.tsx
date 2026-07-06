import { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { ICONS } from '../assets/icons/index';
import { useTasksContext } from '../hooks/useTasksContext';
import type { Task, TaskData } from '../types/index';

type TaskEditProps = TaskData;

const TaskEdit = ({ id, title, completed }: TaskEditProps) => {
  const [newTitle, setNewTitle] = useState<Task['title']>(title);
  const { updateCompleted, toggleEditMode, updateTitle } = useTasksContext();
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => inputElement.current?.focus(), []);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    updateTitle(id, newTitle);
  };

  const handleToggle = (): void => updateCompleted(id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setNewTitle(e.target.value);

  const handleCancel = (): void => {
    toggleEditMode(id);
    setNewTitle(title);
  };

  return (
    <form
      className='task d-flex align-items-center gap-3 mb-4 p-1'
      data-task-id={id}
      onSubmit={handleSubmit}
    >
      <input
        type='checkbox'
        checked={completed}
        className='checkbox-task flex-shrink-0'
        onChange={handleToggle}
      />
      <input
        type='text'
        value={newTitle}
        ref={inputElement}
        className='m-0 w-100 task-title form-control task-edit-input'
        autoComplete='off'
        onChange={handleChange}
      />
      <Button type='submit' className='btn-confirm-edit' aria-label='confirm edit'>
        <img src={ICONS.confirm} alt='' className='icon' />
      </Button>
      <Button className='btn-cancel-edit' aria-label='cancel edit' onClick={handleCancel}>
        <img src={ICONS.cancel} alt='' className='icon' />
      </Button>
    </form>
  );
};

export default TaskEdit;
