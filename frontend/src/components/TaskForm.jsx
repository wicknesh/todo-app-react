import { ExclamationTriangleIcon, PlusIcon } from '@heroicons/react/24/solid'
import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../utils/UserProvider';

const TaskForm = ({ addTask }) => {
    const ignoreRef = useRef(false);
    const { user } = useContext(UserContext);
    const [ checked, setChecked ] = useState(false);
    const toggleCheckbox = () => {
      setChecked(!checked);
    }

    const [task, setTask] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try
          {
            const response = await axios.put(`https://todo-app-8x4y.onrender.com/tasks/add-task/`, {
              uid: user?.uid,
              tname: task,
              tdesc: taskDescription,
              tchecked: false,
              timportant: checked
            });

            const tid = response.data.tid;

            addTask({
              id: tid,
              name: task,
              checked: false,
              description: taskDescription,
              important: checked
            });
            
            setTask("");
            setTaskDescription("");
            setChecked(false);
          } catch (error) {
            console.error(`Error adding task:${error}`)
        }  
      }

    // useEffect(() => {
    //   let ignore = false;

    //   async function fetchToDos () {
    //     const res = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
    //     if (!ignore) {
    //       try {
    //         res.data
    //           .slice(0, 5)
    //           .forEach((todo, index) => {
    //             addTask({
    //               id:index,
    //               name: todo.id,
    //               checked: todo.completed,
    //               description: todo.title,
    //               important: Math.floor(Math.random() * 2)
    //             })
    //           })
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }
    //   }

    //   fetchToDos();

    //   return () => {
    //     ignore = true;
    //   }
    // }, []);


    useEffect(() => {
      
      async function fetchTasks () {
        if(!ignoreRef.current) {
          try {
            const uid = user?.uid;
            const res = await axios.get(`https://todo-app-8x4y.onrender.com/tasks/get-tasks/${uid}`);
            if (res.data.task.length) {
              res.data.task.forEach((taskObj) => {
                addTask({
                  id: taskObj.tid,
                  name: taskObj.tname,
                  checked: taskObj.tchecked,
                  description: taskObj.tdesc,
                  important: taskObj.timportant
                })
              });
            }
          } catch (error) {
            console.error(error);
          }
        }  
      }

      fetchTasks();

      return () => {
        ignoreRef.current = true;
      }
    }, [user?.uid, addTask]);

  return (
    <form  onSubmit={handleFormSubmit}>
        <div className='flex md:flex-row flex-col p-10 w-full items-start'>
          <div className='flex flex-col w-80 md:w-96'>
            <input
              type="text"
              id="task"
              className="rounded-lg border-[#C8ACD6] border-solid border-[0.2rem] bg-slate-300 p-1 focus:outline-none focus:border-[#b069d3]"
              value={task}
              onInput={(e) => setTask(e.target.value)}
              required
              autoFocus
              maxLength={60}
              placeholder="Enter task"
            />
            <textarea
              className='mt-4 rounded-lg border-[#C8ACD6] border-solid border-[0.2rem] bg-slate-300 p-1 focus:outline-none focus:border-[#b069d3]'
              placeholder='Enter description...'
              value={taskDescription}
              onInput={(e) => setTaskDescription(e.target.value)}
            ></textarea>
          </div>
          <div className='md:flex mx-2 hidden'>
            <input
              type="checkbox"
              checked={checked}
              onChange={toggleCheckbox}
              className='hidden'
              id='icon-checkbox'
            />
            <label
              htmlFor="icon-checkbox"
              className={`cursor-pointer`}
            >
              <ExclamationTriangleIcon className={`h-12 w-12 ${checked ? 'text-yellow-400' : 'text-gray-500'}`} />
            </label>
          </div>
          <div className='flex md:hidden mt-2 w-full'>
            <input
              type='checkbox'
              checked={checked}
              onChange={toggleCheckbox}
              className='hidden'
              id="icon-checkbox"
            ></input>
            <label
              htmlFor="icon-checkbox"
              className={`select-none cursor-pointer p-2 w-full text-center rounded-md ${checked ? 'bg-yellow-400' : 'bg-gray-500'}`}
            >Mark as important!
            </label>
          </div>
          <div className='flex md:hidden mt-2 w-full'>
            <button
              type='submit'
              className='hidden'
              id="submit-task"
            ></button>
            <label
              htmlFor="submit-task"
              className={`select-none cursor-pointer p-2 w-full text-center rounded-md bg-[#433D8B] text-slate-300`}
            >Add Task
            </label>
          </div>
          <button
            className="bg-[#433D8B] p-1 rounded md:flex hidden"
            type="submit"
            >
              <PlusIcon className='size-8' stroke='#C8ACD6' fill='#C8ACD6' />
          </button>
        </div>
        <div></div>
      </form>
  )
}

export default TaskForm