import { CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

const TaskItem = ({ task, deleteTask, toggleTask }) => {

    const [ isChecked, setIsChecked] = useState(task.checked);

    const handleCheckboxChange = (e) => {
        setIsChecked(!isChecked);
        toggleTask(task.id);
    }

  return (
    <li className="flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
            <input
                type="checkbox"
                id={task.id}
                name={task.name}
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="peer"
            />
            <label
                htmlFor={task.id}
                className="text-white cursor-pointer peer-checked:line-through"
            >
                {task.name}
            </label>
        </div>
        <div>
            <button 
                className="bg-[#433D8B] p-2 rounded"
                // onClick={}
            >
                <PencilIcon className='size-6' stroke='#C8ACD6' fill='#C8ACD6'/>
            </button>
            <button
                className="bg-[#B52022] p-2 rounded"
                onClick={() => deleteTask(task.id)}
            >
                <TrashIcon className='size-6' stroke='none' fill='#ffffff'></TrashIcon>
            </button>
        </div>
    </li>
  )
}

export default TaskItem