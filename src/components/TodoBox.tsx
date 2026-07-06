import TodoForm from './TodoForm';
import TaskList from './TaskList';
import { Toaster } from 'react-hot-toast';
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import { useTasksContext } from '../hooks/useTasksContext';

const TodoBox = () => {
  const { handleDragEnd } = useTasksContext();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor),
  );

  return (
    <div className='root d-flex justify-content-center align-items-center min-vh-100'>
      <div
        id='app-container'
        className='container todo-container max-w-50 px-3 pt-3 pb-2 px-md-4 pt-md-4 pb-md-2 px-lg-5 pt-lg-5 pb-lg-4'
      >
        <TodoForm />
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <TaskList />
        </DndContext>
      </div>
      <Toaster position='bottom-right' />
    </div>
  );
};

export default TodoBox;
