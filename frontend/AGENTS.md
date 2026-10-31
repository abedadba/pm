# Frontend agent guidance

## Purpose

This folder contains the existing frontend MVP for the Project Management app. It is a small, working demo that should be treated as the starting point for the final product, not as a throwaway prototype.

## Current implementation

- The frontend is a Next.js app using the App Router.
- The main view is driven by `src/app/page.tsx` and renders the Kanban experience.
- The core board logic lives in `src/components/` and `src/lib/kanban.ts`.
- The app already includes a drag-and-drop Kanban board built with `@dnd-kit`.
- The board is initialized with a static dataset and supports column renaming, card creation, and card deletion.
- Board state is currently local to the UI and does not yet persist to a backend or database.

## Key files

- `src/app/page.tsx` - top-level page entry for the app
- `src/components/KanbanBoard.tsx` - main board layout and drag/drop orchestration
- `src/components/KanbanColumn.tsx` - column rendering and interactions
- `src/components/KanbanCard.tsx` - card display and editing behavior
- `src/components/NewCardForm.tsx` - create-card form for a column
- `src/lib/kanban.ts` - board shape, initial data, and core board helpers such as moving cards
- `src/lib/kanban.test.ts` - logic tests for board behavior
- `src/components/KanbanBoard.test.tsx` - component-level tests
- `tests/kanban.spec.ts` - end-to-end browser tests

## Existing behavior

The demo currently includes:

- A single board with multiple fixed columns
- Card movement between columns and within a column
- Card creation with a title and details
- Card deletion
- Column renaming
- A polished, branded UI using the provided color palette

## Current limitations

- There is no real sign-in flow yet.
- There is no backend integration or persisted database.
- The board state is in-memory only.
- The app is not yet packaged to be served from the FastAPI backend.
- AI chat and backend persistence are still future work.

## Working principles for this folder

1. Keep the existing UI structure and visual style unless the project plan specifically requires a redesign.
2. Prefer the existing component organization and naming conventions over introducing a new architecture.
3. Do not over-engineer the frontend before backend persistence and auth are in place.
4. Add tests for any behavior that is modified in this path.
5. Keep the final app aligned with the project color palette and the MVP scope.

## Validation expectations

- Unit tests should cover board helper logic.
- Component tests should cover rendering and interaction-level behavior.
- Browser-based tests should cover the end-to-end board experience.
- Any new behavior added to this frontend should be validated with the smallest relevant test command.

## Next steps in the project

The next stages of the project will:

- integrate the frontend with the FastAPI backend,
- add the sign-in gate,
- connect the board to SQLite persistence,
- add AI connectivity and board-aware chat,
- and then preserve the current polished UI while adding the required backend-backed features.
