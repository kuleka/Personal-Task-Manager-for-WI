import { useEffect, useState } from 'react'
import type { TaskDraft } from '../types/task'

type TaskFormProps = {
  initialValue?: TaskDraft
  onSubmit: (draft: TaskDraft) => void
  submitLabel?: string
}

const defaultDraft: TaskDraft = {
  title: '',
  description: '',
  status: 'pending',
}

/**
 * Generic task form used for both creation and editing scenarios. This component
 * keeps local state and surfaces a minimal API so parent pages can decide what
 * to do after submission (e.g. navigate or show a toast).
 */
export function TaskForm({
  initialValue = defaultDraft,
  onSubmit,
  submitLabel = 'Save task',
}: TaskFormProps) {
  const [draft, setDraft] = useState<TaskDraft>(initialValue)
  // Keep local state in sync if parent supplies a new initial value (e.g. edit mode).
  useEffect(() => {
    setDraft(initialValue)
  }, [initialValue])

  function handleChange(
    field: keyof TaskDraft,
    value: string | undefined,
  ): void {
    setDraft((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!draft.title.trim()) {
      return
    }
    onSubmit({ ...draft, title: draft.title.trim() })
    // Reset the form so users can add multiple tasks quickly when creating.
    setDraft(initialValue)
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit}>
      <label className="taskFormRow">
        <span>Title</span>
        <input
          value={draft.title}
          onChange={(event) => handleChange('title', event.target.value)}
          placeholder="Give your task a clear name"
          required
        />
      </label>
      <label className="taskFormRow">
        <span>Description</span>
        <textarea
          value={draft.description}
          onChange={(event) => handleChange('description', event.target.value)}
          placeholder="Add notes or steps to complete this task"
          rows={5}
        />
      </label>
      <label className="taskFormRow">
        <span>Status</span>
        <select
          value={draft.status ?? 'pending'}
          onChange={(event) =>
            handleChange('status', event.target.value as TaskDraft['status'])
          }
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </label>
      <div className="taskFormActions">
        <button type="submit" className="primaryButton">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
