import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useTasksContext } from '../hooks/useTasksContext';

const TaskFilter = () => {
  const { currentFilter, setFilter } = useTasksContext();
  return (
    <DropdownButton
      id='dropdown-basic-button'
      className='col-auto custom-dropdown'
      title=''
    >
      <Dropdown.Item
        href='#/all'
        active={currentFilter === 'All'}
        onClick={() => setFilter('All')}
      >
        All
      </Dropdown.Item>
      <Dropdown.Item
        href='#/active'
        active={currentFilter === 'Active'}
        onClick={() => setFilter('Active')}
      >
        Active
      </Dropdown.Item>
      <Dropdown.Item
        href='#/completed'
        active={currentFilter === 'Completed'}
        onClick={() => setFilter('Completed')}
      >
        Completed
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default TaskFilter;
