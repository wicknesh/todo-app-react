import { useContext, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import EditForm from './components/EditForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import NavBar from './components/NavBar';
import { UserContext, UserProvider } from './utils/UserProvider.jsx';
import axios from 'axios';

function App() {

  const [tasks, setTasks] = useState('');
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useContext(UserContext);

  const addTask = (task) => {
    setTasks(prevState => [...prevState, task]);
  }

  const clearTasks = () => {
    setTasks([]);
  }

  const deleteTask = async (id) => {
    setTasks(prevState => prevState.filter(t => t.id !== id))
    try {
      const response = await axios.delete(`http://localhost:4500/tasks/delete-task/`, {
        data: {uid: user?.uid, tid: id},
    })
    console.log(`Task deleted successfully`, response.data);
    } catch (error) {
      console.error(`Error deleting task:${error}`);
    }
 }

  const toggleTask = async (id) => {
    setTasks(prevState => prevState.map(t => (t.id === id ? { ...t, checked: !t.checked } : t )));
    try {
      const response = await axios.put(`http://localhost:4500/tasks/task-status/`, {
        uid: user?.uid,
        tid: id,
      });
      console.log(response.data.message);
    } catch (error) {
      console.error(`Error updating task: ${error}`);
    }
  }

  const updateTask = async (task) => {
    try {
      const response = await axios.put(`http://localhost:4500/tasks/edit-task`, {
        uid: user?.uid,
        tid: task.id,
        tname: task.name,
        tdesc: task.description,
        timportant: task.important
      });

      console.log(response.data.message);

      setTasks(prevState => prevState.map(t => (t.id === task.id ? { ...t, name: task.name, description: task.description, important: task.important } : t )));
      closeEditMode();
    } catch (error) {
      console.error(`Error updating task:${error}`);
    }
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
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/task' element={
            <div className="flex flex-col items-center justify-center">
              <NavBar clearTasks={clearTasks}/>
              {
                isEditing && (
                  <EditForm
                    editedTask={editedTask}
                    updateTask={updateTask}
                    closeEditMode={closeEditMode}
                  />
                )
              }
              <TaskForm
                addTask={addTask}
              />
              { tasks && (
                <TaskList
                  tasks={tasks}
                  deleteTask={deleteTask}
                  toggleTask={toggleTask}
                  editMode={editMode}
                />
              )}
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
