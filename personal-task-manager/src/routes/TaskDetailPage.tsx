import { Link, useNavigate, useParams } from 'react-router-dom'
import { useTasks } from '../hooks/useTasks'

/**
 * Displays the full details for a single task. If the id from the URL cannot be
 * found, a friendly error is shown with a link back to the list.
 */
export function TaskDetailPage() {
  const { taskId } = useParams<{ taskId: string }>()
  const navigate = useNavigate()
  const { deleteTask, getTaskById } = useTasks()

  if (!taskId) {
    return (
      <section className="page">
        <header className="pageHeader">
          <h1>Task not found</h1>
        </header>
        <p>
          Missing task identifier. <Link to="/">Return to the task list.</Link>
        </p>
      </section>
    )
  }

  const task = getTaskById(taskId)

  if (!task) {
    return (
      <section className="page">
        <header className="pageHeader">
          <h1>Task not found</h1>
        </header>
        <p>
          We could not locate a task with id <code>{taskId}</code>.{' '}
          <Link to="/">Go back to your tasks.</Link>
        </p>
      </section>
    )
  }

  return (
    <section className="page" id="main-content">
      <header className="pageHeader">
        <h1>{task.title}</h1>
        <span className={`badge badge--${task.status}`}>{task.status}</span>
      </header>
      <p className="taskDetailDescription">{task.description}</p>
      <dl className="taskMeta">
        <div>
          <dt>Created</dt>
          <dd>{new Date(task.createdAt).toLocaleString()}</dd>
        </div>
        <div>
          <dt>Last updated</dt>
          <dd>{new Date(task.updatedAt).toLocaleString()}</dd>
        </div>
      </dl>
      <nav className="taskDetailNav">
        <Link to="/" className="taskDetailBackLink">
          ← Back to tasks
        </Link>
        <div className="taskDetailActions">
          <Link
            to={`/tasks/${task.id}/edit`}
            className="secondaryButton"
            aria-label={`Edit task ${task.title}`}
          >
            Edit
          </Link>
          <button
            type="button"
            className="dangerButton"
            onClick={() => {
              const confirmed = window.confirm(
                'Delete this task? This action cannot be undone.',
              )
              if (!confirmed) return
              deleteTask(task.id)
              navigate('/')
            }}
          >
            Delete
          </button>
        </div>
      </nav>
    </section>
  )
}
