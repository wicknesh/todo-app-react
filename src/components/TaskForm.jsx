import { ExclamationTriangleIcon, PlusIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

const TaskForm = ({ addTask }) => {

    const [ checked, setChecked ] = useState(false);
    const toggleCheckbox = () => {
      // console.log(!checked);
      setChecked(!checked);
    }

    const [task, setTask] = useState("");
    const handleFormSubmit = (e) => {
        e.preventDefault();
        addTask({
          id: Date.now(),
          name: task,
          checked: false,
          important: checked
        });
        setTask("");
        setChecked(false);
      }
  return (
    <form  onSubmit={handleFormSubmit}>
        <div className='flex mt-10 p-10 w-auto'>
          <input
            type="text"
            id="task"
            className="mr-2 rounded-lg w-96 border-[#C8ACD6] border-solid border-[0.2rem] bg-slate-50 p-1 focus:outline-none focus:border-[#b069d3]"
            value={task}
            onInput={(e) => setTask(e.target.value)}
            required
            autoFocus
            maxLength={60}
            placeholder="Enter task"
          />
          <div className='flex items-center mr-2'>
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
              {/* <ExclamationTriangleIcon className={`h-6 w-6 transition-colors ${checked? 'text-yellow-500' : 'text-gray-400'}`} /> */}
              <ExclamationTriangleIcon className={`h-12 w-12 ${checked ? 'text-yellow-400' : 'text-gray-500'}`} />
            </label>
          </div>

          <button
            className="flex bg-[#433D8B] p-2 rounded"
            type="submit"
            >
              <PlusIcon className='size-8' stroke='#C8ACD6' fill='#C8ACD6' />
          </button>
        </div>
      </form>
  )
}

export default TaskForm