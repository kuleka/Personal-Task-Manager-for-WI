import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { TaskDetailPage } from './routes/TaskDetailPage'
import { TaskListPage } from './routes/TaskListPage'

function App() {
  return (
    <div className="appShell">
      <Routes>
        <Route path="/" element={<TaskListPage />} />
        <Route path="/tasks/:taskId" element={<TaskDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
