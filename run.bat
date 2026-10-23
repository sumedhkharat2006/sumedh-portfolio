@echo off
title Sumedh Portfolio
cd /d "%~dp0"

echo ==========================================================
echo   SUMEDH PORTFOLIO - RUN STEPS
echo ==========================================================
echo   1. Checks that Node.js is installed
echo   2. Installs packages (first run only)
echo   3. Starts the dev server and opens http://localhost:5173
echo   4. Press Ctrl + C in this window to stop the server
echo.
echo   Other commands (run in this folder):
echo     npm run build    - production build into dist\
echo     npm run preview  - serve the build at http://localhost:4173
echo     npm run media    - re-encode videos from media-src\
echo ==========================================================
echo.

rem Step 1: Node.js
where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js is not installed. Download it from https://nodejs.org and run this file again.
  pause
  exit /b 1
)
for /f "delims=" %%v in ('node -v') do echo [1/3] Node.js %%v found

rem Step 2: packages
if not exist "node_modules" (
  echo [2/3] Installing packages, please wait...
  call npm install
  if errorlevel 1 (
    echo [ERROR] npm install failed. Check your internet connection and try again.
    pause
    exit /b 1
  )
) else (
  echo [2/3] Packages already installed
)

rem Step 3: dev server + browser
echo [3/3] Starting the site at http://localhost:5173 ...
echo.
call npm run dev -- --open

pause
