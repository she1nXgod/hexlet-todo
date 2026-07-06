import { useState, useRef } from 'react';
import TaskFilter from './TaskFilter';
import toast from 'react-hot-toast';
import Button from './Button';
import { ICONS } from '../assets/icons/index';
import { useTasksContext } from '../hooks/useTasksContext';
import type { Task } from '../types';

const TodoForm = () => {
  const [title, setTitle] = useState<Task['title']>('');
  const inputElement = useRef<HTMLInputElement>(null);
  const { addTask } = useTasksContext();

  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Please enter a task title');
      setTitle('');
      inputElement.current?.focus();
      return;
    }

    addTask(title);
    setTitle('');
    inputElement.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  return (
    <form id='task-form' className='row pb-3 pb-lg-4' onSubmit={handleFormSubmit}>
      <TaskFilter />
      <div className='col'>
        <input
          type='text'
          value={title}
          ref={inputElement}
          className='form-control task-entry-form'
          placeholder='Add new task'
          aria-label='add task title'
          autoComplete='off'
          onChange={handleChange}
        />
      </div>
      <div className='col-auto'>
        <Button type='submit' className='task-add-btn' aria-label='add task'>
          <img src={ICONS.addTask} alt='' className='icon' />
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;
