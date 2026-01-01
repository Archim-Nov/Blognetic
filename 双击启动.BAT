@echo off
echo Checking environment...

:: Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not found!
    echo Please install Node.js from https://nodejs.org/ first.
    pause
    exit
)

:: Check if dependencies are installed, if not, run npm install
if not exist "node_modules" (
    echo [INFO] First time setup detected.
    echo Installing dependencies... (This may take a few minutes)
    call npm install
)

echo.
echo ========================================================
echo   Starting Project Blognetic...
echo   Once the server starts, open: http://localhost:3000
echo ========================================================
echo.

:: Start the development server
call npm run dev
pause