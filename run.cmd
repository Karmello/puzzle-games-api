@echo off

if "%1" == "recreate-db" (

  if "%2" == "-dev" (
    cmd /k "mongo localhost:27017/puzzle-games < db/recreate.js"
    echo. & echo Done
  )
)