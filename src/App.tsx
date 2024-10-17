import React, { useEffect, useState } from 'react';
import TaskList from '../TaskList';

interface Task {
  id: number;
  text: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState('');
// json server
  useEffect(() => {
    console.log("fetch Triggered")
    fetch('http://localhost:5000/tasks')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setTasks(data)});
  }, []);
// create function
  const addTask = () => {
    if (taskText.trim() === '') return;

    const newTask = { text: taskText };

    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then(response => response.json())
      .then(data => setTasks([...tasks, data]));

    setTaskText('');
  };
// delete function
  const deleteTask = (id: number) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => setTasks(tasks.filter((task) => task.id !== id)));
  };

  const updateTask = (id: number, newText: string) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newText }),
    })
      .then(response => response.json())
      .then(updatedTask => {
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      });
  };

  return (
    <div>
      <h1>To-Do App</h1>
      <input
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>
      <TaskList tasks={tasks} onDelete={deleteTask} onUpdate={updateTask} />
    </div>
  );
};

export default App;

