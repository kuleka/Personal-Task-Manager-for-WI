# Personal Task Manager (Web)

A lightweight task management web app built with React 19, TypeScript, and Vite. The interface is intentionally simple so the focus stays on core CRUD functionality, routing flows, and clean component structure.

## Features

- View a list of tasks seeded from mock data (and any tasks you add).
- Inspect full task details including status and timestamps.
- Create new tasks through a dedicated form page.
- Edit existing tasks with pre-filled forms.
- Delete tasks with confirmation.
- Persist task state to `localStorage` so data survives refreshes.
- Keyboard-friendly navigation, skip link, and responsive layout tweaks.

## Tech Stack

- React 19 with functional components and hooks
- TypeScript 5 for type safety across components and context
- Vite 7 as the build tool / dev server
- React Router 6 for client-side routing
- pnpm for dependency and script management
- ESLint (typescript-eslint) for static analysis

## Getting Started

```bash
# install dependencies
pnpm install

# start the dev server http://localhost:5173
pnpm dev

# build production assets
pnpm build

# run lint checks
pnpm lint
```

## Project Structure

```
src/
├─ context/
│  └─ TaskProvider.tsx     # Context + reducer powering all task state
├─ components/
│  ├─ TaskForm.tsx         # Reusable form used for create & edit flows
│  └─ TaskListItem.tsx     # Individual task list row rendering
├─ routes/
│  ├─ TaskListPage.tsx     # Landing page showing all tasks
│  ├─ TaskDetailPage.tsx   # Single-task view with edit/delete actions
│  ├─ TaskCreatePage.tsx   # Route for adding a new task
│  └─ TaskEditPage.tsx     # Route for editing an existing task
├─ data/
│  └─ mockTasks.ts         # Initial sample tasks (fallback when storage empty)
├─ hooks/
│  └─ useTasks.ts          # Thin wrapper around the task context
├─ types/
│  └─ task.ts              # Shared Task / TaskDraft / context typings
├─ App.tsx                 # Router definitions + skip link
├─ App.css                 # Global styles, buttons, responsive rules
└─ main.tsx                # App bootstrap, BrowserRouter + TaskProvider
```

The rest of the files (`vite.config.ts`, `tsconfig.*`, etc.) are the standard Vite + TypeScript setup.

## State Management & Data Flow

- All task data lives in `TaskProvider`. It uses a reducer to handle `add`, `update`, and `delete` actions.
- On initial load the provider attempts to hydrate from `localStorage`; if empty/unavailable it falls back to `mockTasks`.
- Any state change is written back to `localStorage`, keeping tasks persistent across reloads.
- Page components consume state via the `useTasks` hook, exposing helper methods so UI logic stays minimal.

## Accessibility & Responsive Design

- Skip-to-content link and `<main>` landmark so keyboard users can jump past navigation.
- Consistent `:focus-visible` styles on buttons/links, descriptive `aria-label`s for screen readers, and polite live region on the task list for updates.
- Responsive adjustments for narrow viewports (reduced padding, stacked action buttons) to keep the layout readable on mobile widths.

## Testing & Verification

Automated tests are not included yet; verification relies on linting/build checks and manual QA:

- `pnpm lint` — ensure code quality constraints pass.
- `pnpm build` — confirm TypeScript compilation & production bundle succeed.
- Manual flows via `pnpm dev`:
  - Create, edit, delete tasks and confirm list updates accordingly (and persists after refresh).
  - Keyboard-only navigation (Tab/Shift+Tab) including skip link behavior.
  - Resize browser to ~360px width to check responsive layout.

## Future Enhancements

- Add filtering or search across tasks.
- Introduce automated tests with Vitest + Testing Library.
- Surface toast messages for CRUD feedback instead of relying solely on page transitions.
