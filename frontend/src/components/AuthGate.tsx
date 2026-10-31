"use client";

import { useState } from "react";
import { KanbanBoard } from "@/components/KanbanBoard";

const VALID_USERNAME = "user";
const VALID_PASSWORD = "password";

export const AuthGate = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      setError("");
      setIsAuthenticated(true);
      return;
    }

    setError("Invalid username or password.");
  };

  if (isAuthenticated) {
    return (
      <div>
        <header className="flex items-center justify-between border-b border-[rgba(3,33,71,0.08)] bg-white/80 px-6 py-4 backdrop-blur-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gray-text)]">
              Project Board
            </p>
            <h1 className="mt-1 text-xl font-semibold text-[var(--navy-dark)]">
              Kanban Studio
            </h1>
          </div>
          <button
            type="button"
            onClick={() => setIsAuthenticated(false)}
            className="rounded-full bg-[var(--secondary-purple)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Log out
          </button>
        </header>
        <KanbanBoard />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--surface)] px-6 py-12">
      <div className="w-full max-w-md rounded-[28px] border border-[var(--stroke)] bg-white p-8 shadow-[var(--shadow)]">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--gray-text)]">
            Project Management
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-[var(--navy-dark)]">
            Sign in
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-[var(--navy-dark)]">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-xl border border-[var(--stroke)] bg-[var(--surface)] px-3 py-2.5 text-base text-[var(--navy-dark)] outline-none ring-0 transition focus:border-[var(--primary-blue)]"
              placeholder="user"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-[var(--navy-dark)]">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-[var(--stroke)] bg-[var(--surface)] px-3 py-2.5 text-base text-[var(--navy-dark)] outline-none ring-0 transition focus:border-[var(--primary-blue)]"
              placeholder="password"
            />
          </div>

          {error ? (
            <p aria-live="polite" className="text-sm font-medium text-red-600">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-xl bg-[var(--primary-blue)] px-4 py-3 text-base font-semibold text-white transition hover:opacity-90"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
};
