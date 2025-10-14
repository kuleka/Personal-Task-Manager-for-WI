import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type PropsWithChildren,
} from 'react'
import { mockTasks } from '../data/mockTasks'
import type { Task, TaskContextValue, TaskDraft } from '../types/task'

/**
 * TaskProvider creates a React context that stores the list of tasks and exposes
 * a small API for common mutations (add, update, delete). It is intentionally
 * isolated from UI so every page/component can read and mutate the same state.
 *
 * Later feature branches will call these helpers from forms and buttons.
 * Keeping the data layer here avoids duplicating logic in multiple places.
 */

type TaskAction =
  | { type: 'ADD_TASK'; payload: { task: Task } }
  | { type: 'UPDATE_TASK'; payload: { id: string; updates: TaskDraft } }
  | { type: 'DELETE_TASK'; payload: { id: string } }

/**
 * Pure reducer that receives the current task array and an action,
 * returning the next version. This shape makes it easy to test in isolation.
 */
function tasksReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'ADD_TASK':
      return [action.payload.task, ...state]
    case 'UPDATE_TASK': {
      const { id, updates } = action.payload
      const timestamp = new Date().toISOString()
      return state.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updates,
              status: updates.status ?? task.status,
              updatedAt: timestamp,
            }
          : task,
      )
    }
    case 'DELETE_TASK': {
      return state.filter((task) => task.id !== action.payload.id)
    }
    default:
      return state
  }
}

// Context starts undefined so we can throw if someone forgets to wrap components
const TaskContext = createContext<TaskContextValue | undefined>(undefined)

export function TaskProvider({ children }: PropsWithChildren) {
  /**
   * `useReducer` holds the canonical list of tasks. `mockTasks` seeds the initial
   * state so the list page has something to render before real CRUD is wired up.
   */
  const [tasks, dispatch] = useReducer(tasksReducer, mockTasks)

  const value = useMemo<TaskContextValue>(
    () => ({
      tasks,
      addTask: (draft) => {
        // `crypto.randomUUID` ensures unique IDs without bringing in extra libs.
        const timestamp = new Date().toISOString()
        const newTask: Task = {
          id: crypto.randomUUID(),
          title: draft.title,
          description: draft.description,
          status: draft.status ?? 'pending',
          createdAt: timestamp,
          updatedAt: timestamp,
        }
        // Persist the new task into reducer state
        dispatch({ type: 'ADD_TASK', payload: { task: newTask } })
        return newTask
      },
      updateTask: (id, updates) => {
        const existing = tasks.find((task) => task.id === id)
        if (!existing) return undefined
        // Reducer updates the array, while we return the merged result so callers
        // can immediately read the new values (handy for optimistic UI later).
        dispatch({ type: 'UPDATE_TASK', payload: { id, updates } })
        return {
          ...existing,
          ...updates,
          status: updates.status ?? existing.status,
        }
      },
      deleteTask: (id) => {
        dispatch({ type: 'DELETE_TASK', payload: { id } })
      },
      getTaskById: (id) => tasks.find((task) => task.id === id),
    }),
    [tasks],
  )

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTaskContext(): TaskContextValue {
  /**
   * Convenience hook so components can do `const { tasks } = useTaskContext();`
   * without importing both React's `useContext` and this file separately.
   */
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider')
  }
  return context
}
