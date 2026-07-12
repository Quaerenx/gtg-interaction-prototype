@echo off
cd /d "%~dp0.."
set "NEXT_BASE_PATH=/hero"
echo Starting GTG Next dev server on 127.0.0.1:18150 > server-18150.out.log
"C:\Users\PP\scoop\apps\nodejs-lts\current\node.exe" node_modules\next\dist\bin\next dev -H 127.0.0.1 -p 18150 >> server-18150.out.log 2>> server-18150.err.log
echo Next dev server exited with code %ERRORLEVEL% >> server-18150.err.log
