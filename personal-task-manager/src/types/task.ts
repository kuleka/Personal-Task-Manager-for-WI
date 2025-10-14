export type TaskStatus = 'pending' | 'completed'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  createdAt: string
  updatedAt: string
}

export interface TaskDraft {
  title: string
  description: string
  status?: TaskStatus
}

export interface TaskContextValue {
  tasks: Task[]
  addTask: (draft: TaskDraft) => Task
  updateTask: (id: string, updates: TaskDraft) => Task | undefined
  deleteTask: (id: string) => void
  getTaskById: (id: string) => Task | undefined
}
