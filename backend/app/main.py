from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"
FRONTEND_DIR = BASE_DIR.parent.parent / "frontend"
FRONTEND_BUILD_DIR = FRONTEND_DIR / "out"

app = FastAPI(title="Project Management MVP")


if FRONTEND_BUILD_DIR.exists():
    app.mount("/_next", StaticFiles(directory=FRONTEND_BUILD_DIR / "_next"), name="next_static")


def resolve_frontend_path(path: str | None = None) -> Path:
    if FRONTEND_BUILD_DIR.exists():
        candidate = FRONTEND_BUILD_DIR / (path or "index.html") if path else FRONTEND_BUILD_DIR / "index.html"
        if candidate.exists():
            return candidate
    return STATIC_DIR / "index.html"


@app.get("/")
async def serve_root() -> FileResponse:
    return FileResponse(resolve_frontend_path())


@app.get("/api/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "service": "project-management-mvp"}


@app.get("/api/hello")
async def hello() -> dict[str, str]:
    return {"message": "Hello World"}


@app.get("/{path:path}")
async def serve_frontend(path: str) -> FileResponse:
    if path.startswith("api"):
        raise HTTPException(status_code=404)

    candidate = resolve_frontend_path(path)
    if candidate.is_file():
        return FileResponse(candidate)

    return FileResponse(resolve_frontend_path())
