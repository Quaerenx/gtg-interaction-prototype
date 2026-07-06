@echo off
cd /d C:\Users\PP\Documents\HERO
echo Starting GTG Next dev server on 0.0.0.0:3001 > server-3001.out.log
"C:\Users\PP\scoop\apps\nodejs-lts\current\node.exe" node_modules\next\dist\bin\next dev -H 0.0.0.0 -p 3001 >> server-3001.out.log 2>> server-3001.err.log
echo Next dev server exited with code %ERRORLEVEL% >> server-3001.err.log
