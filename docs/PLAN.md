# Project plan

This document is the execution plan for the Project Management MVP. The work is sequenced so that architecture and baseline validation happen before business features are added. The plan is intentionally explicit to reduce wrong turns and ensure the agent can tick off work in a disciplined way.

## Part 1: Planning, repo-readiness, and approval gate

Goal: confirm the architecture, repository layout, and acceptance criteria before implementation begins.

Checklist

- [ ] Review the repo structure and confirm the frontend, backend, docs, and scripts responsibilities.
- [ ] Confirm the product constraints: single-user, single-board MVP, hardcoded sign-in, local Docker execution, and SQLite persistence.
- [ ] Update the root `AGENTS.md` to capture project-level instructions and operating constraints.
- [ ] Add a frontend-specific `frontend/AGENTS.md` that describes the current frontend implementation and expected future evolution.
- [ ] Review the current frontend demo to understand the existing Kanban UI, drag-and-drop behavior, and test setup.
- [ ] Confirm the implementation order and acceptance gates for Parts 2 through 10.
- [ ] Present the plan to the user for approval before any implementation work begins.

Evidence and tests

- Documentation review: root `AGENTS.md` is present and describes the required project rules.
- Documentation review: `frontend/AGENTS.md` exists and reflects the current code layout.
- Documentation review: `docs/PLAN.md` contains the detailed execution sequence, tests, and acceptance criteria.
- Success criterion: no application code is changed during this planning phase; only planning and repo guidance files are updated.

Success criteria

- The project owner has reviewed the plan and agrees with scope, sequence, and constraints.
- The agent understands the architecture and risks before moving into scaffolding.

## Part 2: Scaffold the local app foundation

Goal: create the local runtime and backend shell so the project can run in Docker and respond to basic health checks.

Checklist

- [ ] Create the Docker configuration for local app execution.
- [ ] Initialize the backend service in `backend/` using FastAPI.
- [ ] Add a basic app entry point that serves a simple health or hello-world response.
- [ ] Add a minimal API route that confirms the backend is reachable.
- [ ] Write local start and stop scripts in `scripts/` for the supported OSes.
- [ ] Validate that the app starts locally and serves a simple response.

Tests

- Backend smoke test: HTTP GET to `/` returns a valid response.
- Backend smoke test: HTTP GET to `/api/health` or equivalent returns success JSON.
- Startup validation: the Docker or local process starts cleanly without stack traces.

Success criteria

- The backend is running locally.
- The project serves a simple example page and responds to an API call.
- The app is ready for the frontend integration step.

## Part 3: Integrate the existing demo Kanban frontend into the app

Goal: make the existing frontend the primary application UI and serve it from the backend at `/`.

Checklist

- [ ] Confirm the frontend build and runtime behavior in the current repo.
- [ ] Configure the Next.js app to build as a static or production bundle compatible with backend serving.
- [ ] Ensure the backend serves the app at `/` using the static build output.
- [ ] Validate that the demo Kanban board renders correctly when the app loads.
- [ ] Run the existing frontend unit and integration tests and fix any incompatibilities introduced by integration.

Tests

- Frontend build test: production build completes successfully.
- Frontend render test: the page loads without client-side runtime errors.
- Integration test: the board loads with columns and cards visible at `/`.

Success criteria

- The user sees the Kanban board at `/` after starting the app.
- The board renders from the integrated app, not only from a standalone dev server.
- Existing frontend tests still pass.

## Part 4: Add the fake sign-in experience

Goal: gate the Kanban behind a simple login flow using the hardcoded credentials `user` / `password`.

Checklist

- [ ] Add a login screen before the board is visible.
- [ ] Accept the hardcoded credentials `user` and `password`.
- [ ] Keep the sign-in flow intentionally simple for the MVP.
- [ ] Add a sign-out flow that returns the user to the login page.
- [ ] Persist the signed-in state in the current user session or equivalent local mechanism.
- [ ] Test unauthenticated access, successful login, and logout behavior.

Tests

- Unauthorized access test: unauthenticated user cannot view the board.
- Auth success test: entering valid credentials grants access.
- Auth failure test: invalid credentials are rejected.
- Logout test: the board becomes inaccessible after logout.

Success criteria

- A user cannot see the Kanban without authenticating.
- A valid login succeeds and unlocks the board.
- A user can log out and return to the login screen.

## Part 5: Database modeling and schema proposal

Goal: define a minimal data model for the board and get user sign-off before backend logic is implemented.

Checklist

- [ ] Define the Kanban board schema and user assumptions for the MVP.
- [ ] Save the schema as JSON in `docs/`.
- [ ] Document the storage strategy for users, boards, columns, and cards.
- [ ] Confirm whether the schema is intentionally designed for future multi-user support while staying single-user in MVP.
- [ ] Present the schema to the user for approval before backend persistence is built.

Tests

- Schema validation: JSON parses successfully.
- Design review: schema covers board columns, cards, and user ownership without overdesigning the MVP.

Success criteria

- The data model is documented and approved.
- The backend implementation can use the schema without redesign.

## Part 6: Backend API for Kanban persistence

Goal: implement backend routes that read and update the Kanban state for a signed-in user.

Checklist

- [ ] Create SQLite database initialization logic if the database is missing.
- [ ] Add backend models and repository or service functions for board persistence.
- [ ] Implement API routes for loading the board, updating card movement, renaming columns, and creating/deleting cards.
- [ ] Add unit tests for the backend logic and API routes.
- [ ] Validate error handling for invalid input and missing data.

Tests

- Database creation test: database is created automatically when missing.
- Load board test: API returns the board for the active user.
- Create card test: API adds a card successfully.
- Move card test: API updates card order and column membership.
- Rename column test: API saves renamed title.
- Delete card test: API removes the card and updates references.

Success criteria

- The backend can persist the Kanban state.
- API behavior is stable and tested.
- The app is no longer relying only on ephemeral frontend state.

## Part 7: Connect the frontend to the backend

Goal: make the frontend use backend-backed data instead of local-only state.

Checklist

- [ ] Replace demo-only in-memory board state with API-backed loading.
- [ ] Send board updates to the backend when cards move, columns rename, or cards are created/deleted.
- [ ] Handle loading and save states gracefully.
- [ ] Keep the UX simple and consistent with the current design.
- [ ] Run end-to-end and API integration tests for board persistence.

Tests

- Load board from backend after sign-in.
- Board mutation writes back to backend.
- Refreshing the page preserves the persisted board state.
- Missing API error states fail clearly without breaking the UI.

Success criteria

- The board is persistent across refreshes.
- Frontend and backend agree on the board state.
- The app behaves like a real project management tool instead of a local demo.

## Part 8: Add AI connectivity

Goal: confirm the backend can successfully call OpenAI and return a result.

Checklist

- [ ] Add the OpenAI client configuration and environment validation.
- [ ] Confirm the API key loads from `.env`.
- [ ] Run a minimal connectivity test using a trivial prompt such as `2 + 2`.
- [ ] Log or inspect the returned result and ensure the service works in the local environment.
- [ ] Keep the output small and explicit to verify connectivity before integrating AI into the board flow.

Tests

- AI connectivity test: a trivial prompt returns a valid result.
- Config validation: a missing or invalid API key fails clearly.

Success criteria

- The backend can successfully call OpenAI from the local environment.
- The team has evidence that AI connectivity is functional before board-aware prompts are added.

## Part 9: Add board-aware AI assistance with structured responses

Goal: give the AI the Kanban board state and user question, then parse a structured output with optional board updates.

Checklist

- [ ] Extend the backend AI call to send the board JSON and recent conversation history.
- [ ] Define the structured output contract: user response plus optional card or board changes.
- [ ] Validate the AI response schema before applying changes.
- [ ] Apply only safe, explicitly allowed board updates.
- [ ] Ensure the backend can return UI-friendly results and store conversation context if needed.
- [ ] Test malformed AI responses and reject invalid updates.

Tests

- AI prompt test: backend includes board JSON and user question in the request payload.
- Structured output test: valid AI response is parsed and applied.
- Rejection test: invalid AI response payload is rejected safely.
- Board update test: AI can recommend a valid card move or edit without corrupting board data.

Success criteria

- The backend is able to combine board state and user conversation in a single AI call.
- The AI response contains a user-facing message and an optional structured board update.
- Invalid AI outputs never break the app.

## Part 10: Add the AI chat sidebar and auto-refresh behavior

Goal: build the user-facing chat experience and connect it to the backend AI workflow.

Checklist

- [ ] Add a sidebar widget to the main board UI for chat interactions.
- [ ] Send the user message to the backend along with current board state and conversation context.
- [ ] Display the AI response in the sidebar.
- [ ] If the structured response includes board updates, refresh the board automatically.
- [ ] Keep the UI polished and aligned with the project color scheme.
- [ ] Run focused UI and API tests for the chat feature.

Tests

- Chat render test: the sidebar renders with the expected controls.
- Send message test: submitting a question calls the backend and shows a result.
- Board refresh test: AI-driven board updates result in an immediate UI refresh.
- Error state test: backend failure shows a safe message without breaking the board.

Success criteria

- Users can communicate with the AI from the app.
- The AI can update the Kanban when appropriate.
- The board refreshes automatically after approved AI updates.

## Overall completion checklist

- [ ] Part 1 approved by user
- [ ] Part 2 scaffold complete
- [ ] Part 3 frontend integrated
- [ ] Part 4 sign-in complete
- [ ] Part 5 schema approved
- [ ] Part 6 backend API complete
- [ ] Part 7 frontend/backend connected
- [ ] Part 8 AI connectivity verified
- [ ] Part 9 structured board-aware AI integrated
- [ ] Part 10 AI chat sidebar shipped

## Notes for execution

- This project should stay intentionally simple and use the current frontend as the starting point instead of rebuilding from scratch.
- The plan is deliberately staged so that the final product grows in a controlled order: foundation, persistence, AI, and then UI polish.
- The agent should update progress only within the current phase and keep the work reviewable with focused tests at each stage.
- At the end of each phase, the user should be able to confirm the next step before the agent continues.
