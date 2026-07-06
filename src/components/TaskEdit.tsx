import { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { ICONS } from '../assets/icons/index';
import type { Task, TaskData } from '../types/index';

type TaskEditProps = TaskData;

const TaskEdit = ({ id, title, completed }: TaskEditProps) => {
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => inputElement.current?.focus(), []);

  return (
    <form className='task d-flex align-items-center gap-3 mb-4 p-1' data-task-id={id}>
      <input
        type='checkbox'
        checked={completed}
        className='checkbox-task flex-shrink-0'
      />
      <input
        type='text'
        ref={inputElement}
        className='m-0 w-100 task-title form-control task-edit-input'
        autoComplete='off'
      />
      <Button type='submit' className='btn-confirm-edit' aria-label='confirm edit'>
        <img src={ICONS.confirm} alt='' className='icon' />
      </Button>
      <Button className='btn-cancel-edit' aria-label='cancel edit'>
        <img src={ICONS.cancel} alt='' className='icon' />
      </Button>
    </form>
  );
};

export default TaskEdit;
