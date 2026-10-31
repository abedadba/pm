# Scripts guidance

## Purpose

This folder contains the local start and stop scripts for the Project Management MVP. The scripts are intentionally simple and are used to bring up the Dockerized app and shut it down cleanly.

## Included scripts

- `start-mac.sh` and `stop-mac.sh` for macOS
- `start-linux.sh` and `stop-linux.sh` for Linux
- `start-windows.bat` and `stop-windows.bat` for Windows

## Behavior

All scripts run `docker compose up --build -d` to start the app and `docker compose down --remove-orphans` to stop it. They are meant to keep local startup simple while the project evolves.
