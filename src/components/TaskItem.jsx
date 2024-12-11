import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

const TaskItem = ({ task, deleteTask, toggleTask, editMode }) => {

    const [ isChecked, setIsChecked] = useState(task.checked);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        toggleTask(task.id);
    }

  return (
    <li className={`flex items-center justify-between gap-2.5 border-2 border-solid ${task.important ? 'border-red-500' : 'border-[#433D8B]'} rounded-lg p-2.5 w-full`}>
        <div className="flex items-center gap-2">
            <div className="flex items-center shrink-0">
                <input
                    type="checkbox"
                    id={task.id}
                    name={task.name}
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="appearance-none w-5 h-5 cursor-pointer bg-gray-100 border-[#C8ACD6] border-2 rounded focus:ring-[#b069d3]  checked:bg-[#C8ACD6]"
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor={task.id}
                    // className="text-white text-left cursor-pointer peer-checked:line-through font-bold text-[1.25rem]"
                    className={`text-white text-left cursor-pointer ${isChecked ? 'line-through' : ''} font-bold text-[1.25rem]`}
                >
                    {task.name}
                </label>
                <label
                    htmlFor={task.id}
                    // className="text-slate-400 text-left text-sm italic cursor-pointer peer-checked:line-through"
                    className={`text-slate-400 text-left text-sm italic ${isChecked ? 'line-through' : ''} cursor-pointer`}
                >
                    {task.description}
                </label>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <button 
                className="bg-[#433D8B] p-2 rounded"
                onClick={() => editMode(task)}
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