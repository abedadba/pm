@echo off
setlocal
cd /d "%~dp0.."
docker compose up --build -d
echo Project Management app started on http://localhost:8000
