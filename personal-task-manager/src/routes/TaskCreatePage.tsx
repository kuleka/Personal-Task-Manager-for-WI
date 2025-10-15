import { useNavigate } from 'react-router-dom'
import { TaskForm } from '../components/TaskForm'
import { useTasks } from '../hooks/useTasks'

/**
 * Page responsible for creating a new task. After saving we navigate back to
 * the list so users see their newly added item at the top.
 */
export function TaskCreatePage() {
  const navigate = useNavigate()
  const { addTask } = useTasks()

  return (
    <section className="page" id="main-content">
      <header className="pageHeader">
        <h1>Create task</h1>
      </header>
      <TaskForm
        submitLabel="Create task"
        onSubmit={(draft) => {
          addTask(draft)
          navigate('/')
        }}
      />
    </section>
  )
}
