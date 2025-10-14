import { useTaskContext } from '../context/TaskProvider'

/**
 * Thin wrapper around `useTaskContext` so components can import `useTasks`
 * (reads nicer and mirrors future domain-specific hooks we might create).
 */
export function useTasks() {
  return useTaskContext()
}
