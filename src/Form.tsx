

function Form() {
  return (
    <div className="container">
        <h1>To-Do List</h1>
        <input type="text" id="taskInput" placeholder="Add a new task..."/>
        <button id="addTaskButton">Add Task</button>
        <ul id="taskList"></ul>
    </div>
  )
}

export default Form