import TaskItem from "./TaskItem"

const TaskList = ({ tasks, deleteTask, toggleTask, editMode }) => {
  return (
    <ul className="grid list-none gap-6 text-center w-auto">
        {tasks.sort((a, b) => b.important - a.important || b.id - a.id).map(task => (
            <TaskItem 
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                toggleTask={toggleTask}
                editMode={editMode}
            />
        ))}
    </ul>
  )
}

export default TaskList