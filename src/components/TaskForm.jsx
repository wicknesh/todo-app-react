import { ExclamationTriangleIcon, PlusIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

const TaskForm = ({ addTask }) => {

    const [ checked, setChecked ] = useState(false);
    const toggleCheckbox = () => {
      setChecked(!checked);
    }

    const [task, setTask] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();
        addTask({
          id: Date.now(),
          name: task,
          checked: false,
          description: taskDescription,
          important: checked
        });
        setTask("");
        setTaskDescription("");
        setChecked(false);
      }
  return (
    <form  onSubmit={handleFormSubmit}>
        <div className='flex lg:flex-row flex-col mt-10 p-10 w-full items-start'>
          <div className='flex flex-col w-96 lg:w-80'>
            <input
              type="text"
              id="task"
              className="rounded-lg w-auto border-[#C8ACD6] border-solid border-[0.2rem] bg-slate-300 p-1 focus:outline-none focus:border-[#b069d3]"
              value={task}
              onInput={(e) => setTask(e.target.value)}
              required
              autoFocus
              maxLength={60}
              placeholder="Enter task"
            />
            <textarea
              className='w-auto mt-4 rounded-lg border-[#C8ACD6] border-solid border-[0.2rem] bg-slate-300 p-1 focus:outline-none focus:border-[#b069d3]'
              placeholder='Enter description...'
              value={taskDescription}
              onInput={(e) => setTaskDescription(e.target.value)}
            ></textarea>
          </div>
          <div className='lg:flex mx-2 hidden'>
            <input
              type="checkbox"
              checked={checked}
              onChange={toggleCheckbox}
              className='hidden'
              id='icon-checkbox'
            />
            <label
              htmlFor="icon-checkbox"
              // onClick={toggleCheckbox}
              className={`cursor-pointer`}
            >
              <ExclamationTriangleIcon className={`h-12 w-12 ${checked ? 'text-yellow-400' : 'text-gray-500'}`} />
            </label>
          </div>
          <div className='flex lg:hidden mt-2 w-full'>
            <input
              type='checkbox'
              checked={checked}
              onChange={toggleCheckbox}
              className='hidden'
              id="icon-checkbox"
            ></input>
            <label
              htmlFor="icon-checkbox"
              className={`cursor-pointer p-2 w-full text-center rounded-md ${checked ? 'bg-yellow-400' : 'bg-gray-500'}`}
            >Mark as important!
            </label>
          </div>
          <div className='flex lg:hidden mt-2 w-full'>
            <button
              type='submit'
              className='hidden'
              id="submit-task"
            ></button>
            <label
              htmlFor="submit-task"
              className={`cursor-pointer p-2 w-full text-center rounded-md bg-[#433D8B] text-slate-300`}
            >Add Task
            </label>
          </div>
          <button
            className="bg-[#433D8B] p-1 rounded lg:flex hidden"
            type="submit"
            >
              <PlusIcon className='size-8' stroke='#C8ACD6' fill='#C8ACD6' />
          </button>
        </div>
      </form>
  )
}

export default TaskForm