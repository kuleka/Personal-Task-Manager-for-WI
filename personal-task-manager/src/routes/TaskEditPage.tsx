import { Link, useNavigate, useParams } from 'react-router-dom'
import { TaskForm } from '../components/TaskForm'
import { useTasks } from '../hooks/useTasks'

/**
 * Allows editing an existing task. We prefill the shared TaskForm with the
 * current values and push updates back through the TaskProvider.
 */
export function TaskEditPage() {
  const { taskId } = useParams<{ taskId: string }>()
  const navigate = useNavigate()
  const { getTaskById, updateTask } = useTasks()

  if (!taskId) {
    return (
      <section className="page" id="main-content">
        <header className="pageHeader">
          <h1>Task not found</h1>
        </header>
        <p>
          Missing task identifier. <Link to="/">Return to your tasks.</Link>
        </p>
      </section>
    )
  }

  const task = getTaskById(taskId)

  if (!task) {
    return (
      <section className="page" id="main-content">
        <header className="pageHeader">
          <h1>Task not found</h1>
        </header>
        <p>
          We could not locate a task with id <code>{taskId}</code>.{' '}
          <Link to="/">Go back to the task list.</Link>
        </p>
      </section>
    )
  }

  return (
    <section className="page" id="main-content">
      <header className="pageHeader">
        <h1>Edit task</h1>
        <span className={`badge badge--${task.status}`}>{task.status}</span>
      </header>
      <TaskForm
        initialValue={{
          title: task.title,
          description: task.description,
          status: task.status,
        }}
        submitLabel="Update task"
        onSubmit={(draft) => {
          updateTask(task.id, draft)
          navigate(`/tasks/${task.id}`)
        }}
      />
    </section>
  )
}
