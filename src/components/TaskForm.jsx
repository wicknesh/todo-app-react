import { PlusIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

const TaskForm = ({ addTask }) => {

    const [task, setTask] = useState("");
    const handleFormSubmit = (e) => {
        e.preventDefault();
        addTask({
          id: Date.now(),
          name: task,
          checked: false
        });
        setTask("");
      }
  return (
    <form  onSubmit={handleFormSubmit}>
        <div className='flex mt-10'>
          <input
            type="text"
            id="task"
            className="mr-5 rounded-lg border-[#C8ACD6] border-solid border-[0.2rem] bg-slate-50 p-1 focus:outline-none focus:border-[#b069d3]"
            value={task}
            onInput={(e) => setTask(e.target.value)}
            required
            autoFocus
            maxLength={60}
            placeholder="Enter task"
          />
          <button
            className="flex bg-[#433D8B] p-2 rounded"
            type="submit"
            >
              <PlusIcon className='size-6' stroke='#C8ACD6' fill='#C8ACD6' />
          </button>
        </div>
      </form>
  )
}

export default TaskForm