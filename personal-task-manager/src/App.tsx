import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { TaskCreatePage } from './routes/TaskCreatePage'
import { TaskDetailPage } from './routes/TaskDetailPage'
import { TaskEditPage } from './routes/TaskEditPage'
import { TaskListPage } from './routes/TaskListPage'

function App() {
  return (
    <>
      <a className="skipLink" href="#main-content">
        Skip to main content
      </a>
      <div className="appShell">
        <Routes>
          <Route path="/" element={<TaskListPage />} />
          <Route path="/tasks/new" element={<TaskCreatePage />} />
          <Route path="/tasks/:taskId/edit" element={<TaskEditPage />} />
          <Route path="/tasks/:taskId" element={<TaskDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  )
}

export default App
