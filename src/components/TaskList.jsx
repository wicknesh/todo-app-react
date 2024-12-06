import TaskItem from "./TaskItem"

const TaskList = ({ tasks, deleteTask, toggleTask }) => {
  return (
    <ul className="grid list-none gap-6 text-center">
        {tasks.sort((a, b) => b.id - a.id).map(task => (
            <TaskItem 
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                toggleTask={toggleTask}
            />
        ))}
    </ul>
  )
}

export default TaskList