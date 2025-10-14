import { Link } from 'react-router-dom'
import type { Task } from '../types/task'

type TaskListItemProps = {
  task: Task
}

/**
 * Reusable renderer for a single task row in the list view. Keeping this logic
 * isolated makes it trivial to reuse the same visual layout.
 */
export function TaskListItem({ task }: TaskListItemProps) {
  const detailLink = `/tasks/${task.id}`

  return (
    <li className="taskListItem">
      <div>
        <p className="taskListTitle">{task.title}</p>
        <p className="taskListDescription">{task.description}</p>
        <p className="taskListMeta">
          Status:{' '}
          <span className={`badge badge--${task.status}`}>{task.status}</span>
        </p>
      </div>
      <Link to={detailLink} className="taskListLink">
        View details
      </Link>
    </li>
  )
}
