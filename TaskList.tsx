import React from 'react';
import Task from './Task';

interface TaskListProps {
  tasks: { id: number; text: string }[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, text: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onUpdate }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          text={task.text}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default TaskList;
