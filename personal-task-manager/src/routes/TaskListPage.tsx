import { TaskListItem } from '../components/TaskListItem'
import { useTasks } from '../hooks/useTasks'

/**
 * List page consumes the shared task context and decides how the collection
 * should be presented. Individual rows are delegated to `TaskListItem` so this
 * component stays focused on data flow and empty-state decisions.
 */
export function TaskListPage() {
  const { tasks } = useTasks()

  return (
    <section className="page">
      <header className="pageHeader">
        <h1>Tasks</h1>
      </header>
      {tasks.length === 0 ? (
        <p className="taskListEmpty">
          You have no tasks yet. Add your first task to keep track of work.
        </p>
      ) : (
        <ul className="taskList">
          {tasks.map((task) => (
            <TaskListItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </section>
  )
}
