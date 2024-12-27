import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

const EditForm = ({ editedTask, updateTask, closeEditMode }) => {

    const [ updatedTaskName, setUpdatedTaskName ] = useState(editedTask.name);
    const [ updatedTaskDescription, setUpdatedTaskDescription ] = useState(editedTask.description)

    const handleFormSubmit = (e) => {
        e.preventDefault();

        updateTask({id: editedTask.id , name: updatedTaskName, description: updatedTaskDescription, important: checked });
    }
    const [ checked, setChecked ] = useState(editedTask.important);
    const toggleCheckbox = () => {
      setChecked(!checked);
    }
    useEffect(() => {
        const closeModeOnEscape = (e) => {
            e.key === "Escape" && closeEditMode();
        }

        window.addEventListener('keydown', closeModeOnEscape)
        return () => {
            window.removeEventListener('keydown', closeModeOnEscape)
        }
    }, [closeEditMode])
  return (
    <div
        onClick={(e) => {e.target === e.currentTarget && closeEditMode()}}
        className='fixed z-50 inset-0 grid place-items-center bg-black/75'
    >
        <form  onSubmit={handleFormSubmit}>
            <div className='flex md:flex-row flex-col mt-10 items-start w-full'>
              <div className='flex flex-col w-52 xsm:w-96'>
                <input
                  type="text"
                  id="task"
                  className="w-full rounded-lg border-[#C8ACD6] border-solid border-[0.2rem] bg-slate-200 p-1 focus:outline-none focus:border-[#b069d3]"
                  value={updatedTaskName}
                  onInput={(e) => setUpdatedTaskName(e.target.value)}
                  required
                  autoFocus
                  maxLength={60}
                  placeholder="Update task"
                />
                <textarea
                  className='w-full mt-4 mr-5 rounded-lg border-[#C8ACD6] border-solid border-[0.2rem] bg-slate-200 p-1 focus:outline-none focus:border-[#b069d3]'
                  value={updatedTaskDescription}
                  onInput={(e) => setUpdatedTaskDescription(e.target.value)}
                  placeholder='Update / enter description...'
                ></textarea>
              </div>
              <div className="md:flex hidden ml-2">
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
              <div className="md:flex hidden">
                <button
                  className="bg-[#433D8B] p-2 rounded ml-2"
                  type="submit"
                  >
                    <CheckIcon className='size-6' stroke='#C8ACD6' fill='#C8ACD6' />
                </button>
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
              <div className="md:hidden flex w-full mt-4">
                <button
                  className="bg-[#433D8B] text-[#C8ACD6] p-2 rounded w-full"
                  type="submit"
                  >
                    Update
                </button>
              </div>
            </div>
          </form>
    </div>
  )
}

export default EditForm