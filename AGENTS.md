# Project Management MVP

## Purpose

This repository contains a single-user, local-first Project Management MVP with a Kanban board, a sign-in flow, and an AI-assisted board workflow. The architecture is intentionally simple: a Next.js frontend, a Python FastAPI backend, SQLite persistence, Docker packaging, and local-only execution.

## Business requirements

- A user can sign in using the hardcoded credentials `user` / `password`.
- After sign-in, the user sees a Kanban board representing their project.
- The board has fixed columns that can be renamed.
- Cards can be created, edited, deleted, and moved with drag and drop.
- The UI includes an AI chat sidebar that can create, edit, or move one or more cards.
- The app runs locally in Docker for the MVP.

## Product and technical constraints

- MVP scope is single-user and single-board per signed-in user.
- Database design should support future multi-user extension, but the MVP itself stays local and single-user.
- The backend serves the frontend at `/` and also exposes API routes.
- The Python environment uses `uv` in the Docker container.
- The app stores data in SQLite and creates the database automatically if it does not exist.
- AI calls use the OpenAI SDK with the key from the repo root `.env` and the model `openai/gpt-oss-120b`.
- OS-specific start/stop scripts live in `scripts/`.

## Current repo state

- `frontend/` is a working frontend-only MVP with a Kanban UI and tests already in place.
- `backend/` is the FastAPI backend area that will be implemented as part of the project.
- `docs/PLAN.md` is the source of truth for execution order and acceptance criteria.
- This root `AGENTS.md` is the project-level operating guidance; sub-project instructions should be added only where they add clarity.

## Working rules for the agent

1. Read and follow the approved plan in `docs/PLAN.md` before beginning implementation work.
2. Keep the solution simple: do not over-engineer, do not add features beyond the MVP, and avoid defensive coding that is not needed.
3. Prefer the smallest valid change set over broad refactors.
4. When an issue arises, identify the root cause and validate the fix with focused tests before moving on.
5. Keep README files minimal and avoid unnecessary documentation churn.
6. Use the project color palette and styling decisions consistently when changing the UI.
7. Avoid starting implementation until the plan and project scope have been reviewed and approved.

## Project standards

- Use current, idiomatic library versions and patterns.
- Keep the codebase easy to reason about and easy to test.
- Prefer explicit domain modeling for the Kanban board, user session, and AI request/response shapes.
- Keep tests focused on the feature they validate.
- Use Docker and local scripts as the execution environment for the MVP, not a cloud deployment.

## Files and directories

- `frontend/` - Next.js frontend and front-end tests
- `backend/` - FastAPI backend and API tests
- `docs/` - planning and design docs
- `scripts/` - local start/stop scripts for macOS, Linux, and Windows
- `.env` - local environment values, including the OpenAI API key

## Required workflow

- Review the project plan before editing code.
- Keep work scoped to the current phase in `docs/PLAN.md`.
- After each phase, validate the applicable tests and confirm the acceptance criteria.
- Move to the next phase only after the current phase is complete and the user approves the next step.

## Color palette

- Accent Yellow: `#ecad0a`
- Blue Primary: `#209dd7`
- Purple Secondary: `#753991`
- Dark Navy: `#032147`
- Gray Text: `#888888`
