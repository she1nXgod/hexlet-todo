export interface Task {
  id: string;
  title: string;
  completed: boolean;
  editMode: boolean;
}

export type TaskData = Omit<Task, 'editMode'>;
