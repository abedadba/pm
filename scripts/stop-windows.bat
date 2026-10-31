@echo off
setlocal
cd /d "%~dp0.."
docker compose down --remove-orphans
echo Project Management app stopped
