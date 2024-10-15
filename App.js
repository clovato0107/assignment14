import React, { useEffect, useState } from 'react';
import Todo from './Todo';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

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

  const deleteTask = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => setTasks(tasks.filter((task) => task.id !== id)));
  };

  const updateTask = (id, newText) => {
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
      <div>
        {tasks.map((task) => (
          <Todo
            key={task.id}
            todo={task}
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
