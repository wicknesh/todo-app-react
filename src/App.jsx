import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {

  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks(prevState => [...prevState, task]);
  }

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(t => t.id !== id))
  }

  const toggleTask = (id) => {
    setTasks(p => p.map(t => (t.id === id ? { ...t, checked: !t.checked } : t)))
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <header>
        <img className="w-[10rem] h-auto mx-auto mt-24" src="../public/images/logo-white.png" alt="ToDoList Logo" />
      </header>
      <TaskForm addTask={addTask} />
      { tasks && (
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
        />
      )}
    </div>
  )
}

export default App
