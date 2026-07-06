import TodoForm from './TodoForm';
import TaskList from './TaskList';

const TodoBox = () => {
  return (
    <div className='root d-flex justify-content-center align-items-center min-vh-100'>
      <div
        id='app-container'
        className='container todo-container max-w-50 px-3 pt-3 pb-2 px-md-4 pt-md-4 pb-md-2 px-lg-5 pt-lg-5 pb-lg-4'
      >
        <TodoForm />
        <TaskList />
      </div>
    </div>
  );
};

export default TodoBox;
