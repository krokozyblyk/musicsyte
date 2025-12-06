# Скрипт для запуска фронтенда (Windows PowerShell)
# Кодировка: UTF-8 без BOM

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting Frontend Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Определяем корневую директорию скрипта
$scriptRoot = $PSScriptRoot
if (-not $scriptRoot) {
    $scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
}
if (-not $scriptRoot) {
    $scriptRoot = Get-Location
}

$frontendPath = Join-Path $scriptRoot "frontend"

if (-not (Test-Path $frontendPath)) {
    Write-Host "ERROR: Frontend directory not found: $frontendPath" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path (Join-Path $frontendPath "index.html"))) {
    Write-Host "ERROR: index.html not found in $frontendPath" -ForegroundColor Red
    exit 1
}

Write-Host "Frontend directory: $frontendPath" -ForegroundColor Green
Write-Host ""

# Проверяем доступность порта 3000
$portInUse = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($portInUse) {
    Write-Host "WARNING: Port 3000 is already in use!" -ForegroundColor Yellow
    Write-Host "Stopping existing process..." -ForegroundColor Yellow
    $process = Get-Process -Id ($portInUse.OwningProcess) -ErrorAction SilentlyContinue
    if ($process) {
        Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 2
    }
}

Write-Host "Starting HTTP server on port 3000..." -ForegroundColor Yellow
Write-Host ""

# Пробуем разные способы запуска
$serverStarted = $false

# Способ 1: Python
$pythonCommands = @("python", "python3", "py")
foreach ($pythonCmd in $pythonCommands) {
    try {
        $pythonCheck = Get-Command $pythonCmd -ErrorAction Stop
        Write-Host "Found Python: $pythonCmd" -ForegroundColor Green
        
        $scriptBlock = @"
            `$ErrorActionPreference = 'Continue'
            cd '$frontendPath'
            Write-Host "[Frontend] Starting in: " -ForegroundColor Cyan -NoNewline
            Write-Host (Get-Location) -ForegroundColor Cyan
            Write-Host "[Frontend] Starting HTTP server on port 3000..." -ForegroundColor Cyan
            Write-Host "[Frontend] Open http://localhost:3000 in your browser" -ForegroundColor Green
            Write-Host ""
            $pythonCmd -m http.server 3000
            Write-Host "[Frontend] Server stopped" -ForegroundColor Red
            pause
"@
        
        Start-Process powershell -ArgumentList "-NoExit", "-Command", $scriptBlock
        Write-Host "Frontend server started with $pythonCmd on port 3000" -ForegroundColor Green
        $serverStarted = $true
        break
    } catch {
        continue
    }
}

# Способ 2: Node.js http-server
if (-not $serverStarted) {
    try {
        $httpServerCheck = Get-Command http-server -ErrorAction Stop
        Write-Host "Found http-server" -ForegroundColor Green
        
        $scriptBlock = @"
            `$ErrorActionPreference = 'Continue'
            cd '$frontendPath'
            Write-Host "[Frontend] Starting in: " -ForegroundColor Cyan -NoNewline
            Write-Host (Get-Location) -ForegroundColor Cyan
            Write-Host "[Frontend] Starting HTTP server on port 3000..." -ForegroundColor Cyan
            Write-Host "[Frontend] Open http://localhost:3000 in your browser" -ForegroundColor Green
            Write-Host ""
            http-server -p 3000
            Write-Host "[Frontend] Server stopped" -ForegroundColor Red
            pause
"@
        
        Start-Process powershell -ArgumentList "-NoExit", "-Command", $scriptBlock
        Write-Host "Frontend server started with http-server on port 3000" -ForegroundColor Green
        $serverStarted = $true
    } catch {
        # http-server не найден
    }
}

if (-not $serverStarted) {
    Write-Host ""
    Write-Host "ERROR: No HTTP server found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install one of the following:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Option 1: Python" -ForegroundColor Cyan
    Write-Host "  Download: https://www.python.org/downloads/" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 2: Node.js http-server" -ForegroundColor Cyan
    Write-Host "  npm install -g http-server" -ForegroundColor White
    Write-Host ""
    Write-Host "Or run manually:" -ForegroundColor Yellow
    Write-Host "  cd frontend" -ForegroundColor White
    Write-Host "  python -m http.server 3000" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Frontend server started!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Open in browser: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Close the server window to stop the frontend." -ForegroundColor Gray
Write-Host ""


