@echo off
setlocal
echo ===================================================
echo   Rocket Launch: Deploy w3-website to GitHub
echo ===================================================
echo.
echo This script will connect your local code to GitHub.
echo.

:: Check if git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not in your PATH.
    pause
    exit /b
)

:: Ask for the Repo URL
echo Step 1: We need your GitHub Repository URL.
echo Creates one here: https://github.com/new
echo (Name it 'w3-website', keep it Public or Private)
echo.
set /p REPO_URL="Paste your GitHub Repo URL here: "

if "%REPO_URL%"=="" (
    echo [ERROR] No URL provided. Exiting.
    pause
    exit /b
)

:: Add Remote
echo.
echo [Action] Adding remote origin...
git remote add origin %REPO_URL%
if %errorlevel% neq 0 (
    echo [Info] Remote 'origin' might already exist. Updating it...
    git remote set-url origin %REPO_URL%
)

:: Push
echo.
echo [Action] Pushing code to GitHub...
git branch -M main
git push -u origin main

echo.
if %errorlevel% equ 0 (
    echo [SUCCESS] Code deployed to GitHub!
    echo.
    echo Next Steps:
    echo 1. Go to Vercel Dashboard
    echo 2. Import this repository
    echo 3. Click Deploy
) else (
    echo [ERROR] Push failed. Check your URL and permissions.
)

pause
