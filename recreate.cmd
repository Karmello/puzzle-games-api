@echo off

if "%1" == "-dev" (
	cmd /k "mongo localhost:27017/puzzle-games < db-scripts/recreate.js"
	echo. & echo Done
)