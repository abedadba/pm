# Backend guidance

## Purpose

This folder contains the FastAPI backend for the Project Management MVP. It is responsible for local app serving, API routes, and future persistence and AI integration.

## Current state

- The backend is intentionally minimal at this stage.
- It serves a static HTML page at `/` to confirm that the app is running locally.
- It exposes a simple `/api/health` endpoint and a `/api/hello` endpoint for smoke testing.
- This backend will eventually hold the database layer, user-auth logic, Kanban APIs, and OpenAI integration.

## Project rules

- Keep the backend simple and easy to reason about.
- Prefer FastAPI patterns that are easy to test.
- Add database logic only when the project plan reaches that phase.
- Use the current local-only architecture before adding broader complexity.
