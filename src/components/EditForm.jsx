import { CheckIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

const EditForm = ({ editedTask, updateTask, closeEditMode }) => {

    const [updatedTaskName, setUpdatedTaskName] = useState(editedTask.name);
    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateTask({...editedTask, name: updatedTaskName});
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
        className='fixed z-50 inset-0 grid place-items-center bg-black/25'
    >
        <form  onSubmit={handleFormSubmit}>
            <div className='flex mt-10'>
              <input
                type="text"
                id="task"
                className="mr-5 rounded-lg border-[#C8ACD6] border-solid border-[0.2rem] bg-slate-50 p-1 focus:outline-none focus:border-[#b069d3]"
                value={updatedTaskName}
                onInput={(e) => setUpdatedTaskName(e.target.value)}
                required
                autoFocus
                maxLength={60}
                placeholder="Update task"
              />
              <button
                className="flex bg-[#433D8B] p-2 rounded"
                type="submit"
                >
                  <CheckIcon className='size-6' stroke='#C8ACD6' fill='#C8ACD6' />
              </button>
            </div>
          </form>
    </div>
  )
}

export default EditForm