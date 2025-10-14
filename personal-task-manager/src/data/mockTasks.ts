import type { Task } from '../types/task'

export const mockTasks: Task[] = [
  {
    id: 'task-001',
    title: 'Write project brief',
    description:
      'Summarize the scope and requirements for the personal task manager app.',
    status: 'completed',
    createdAt: new Date('2025-01-01T09:00:00Z').toISOString(),
    updatedAt: new Date('2025-01-02T15:30:00Z').toISOString(),
  },
  {
    id: 'task-002',
    title: 'Define UI wireframes',
    description:
      'Sketch the main screens: task list, task details, and create/edit forms.',
    status: 'pending',
    createdAt: new Date('2025-01-03T10:00:00Z').toISOString(),
    updatedAt: new Date('2025-01-03T10:00:00Z').toISOString(),
  },
  {
    id: 'task-003',
    title: 'Set up routing',
    description:
      'Add React Router with routes for the list and details pages (placeholder).',
    status: 'pending',
    createdAt: new Date('2025-01-04T12:45:00Z').toISOString(),
    updatedAt: new Date('2025-01-04T12:45:00Z').toISOString(),
  },
]
