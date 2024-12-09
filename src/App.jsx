import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import EditForm from './components/EditForm';
import useLocalStorage from './hooks/useLocalStorage';

function App() {

  const [tasks, setTasks] = useLocalStorage('todo.tasks', []);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const addTask = (task) => {
    setTasks(prevState => [...prevState, task]);
  }

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(t => t.id !== id))
  }

  const toggleTask = (id) => {
    setTasks(p => p.map(t => (t.id === id ? { ...t, checked: !t.checked } : t)))
  }

  const updateTask = (task) => {
    setTasks(p => p.map(t => (t.id === task.id ? { ...t, name: task.name }
      : t
    )))
    closeEditMode();
  }

  const closeEditMode = () => {
    setIsEditing(false);
    previousFocusEl.focus();
  }

  const editMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <header>
        <img className="w-[15rem] h-auto mx-auto mt-24" src="../public/images/logo-white.png" alt="ToDoList Logo" />
      </header>
      {
        isEditing && (
          <EditForm
            editedTask={editedTask}
            updateTask={updateTask}
            closeEditMode={closeEditMode}
          />
        )
      }
      <TaskForm addTask={addTask} />
      { tasks && (
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          editMode={editMode}
        />
      )}
    </div>
  )
}

export default App
