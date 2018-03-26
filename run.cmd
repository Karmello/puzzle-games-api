@echo off
setlocal ENABLEDELAYEDEXPANSION

if %1 == db (

  SET LOCAL_ADDRESS=localhost:27017
  SET REMOTE_ADDRESS=ds155218.mlab.com:55218
  SET LOCAL_DB=puzzle-games
  SET FOLDER=C:/mongodump

  if %3 == local (
    SET remote=no
  )
  if %3 == staging (
    SET REMOTE_DB=staging-puzzle-games
    SET remote=yes
  )
  if %3 == test (
    SET REMOTE_DB=test-puzzle-games
    SET remote=yes
  )
  if %3 == prod (
    SET REMOTE_DB=puzzle-games
    SET remote=yes
  )

  if "%2" == "reset" (
    if !remote! == no (
      cmd /c mongo %LOCAL_ADDRESS%/%LOCAL_DB% < "db/reset.js"
    )
    if !remote! == yes (
      cmd /c mongo %REMOTE_ADDRESS%/!REMOTE_DB! -u %4 -p %5 < "db/reset.js"
    )
  )

  if %2 == dump (
    if !remote! == no (
      echo * dumping from %LOCAL_ADDRESS%/%LOCAL_DB%
      cmd /c mongodump -h %LOCAL_ADDRESS% -d %LOCAL_DB% -o %FOLDER%
    )
    if !remote! == yes (
      echo * dumping from %REMOTE_ADDRESS%/!REMOTE_DB!
      cmd /c mongodump -h %REMOTE_ADDRESS% -d !REMOTE_DB! -u %4 -p %5 -o %FOLDER%
    )
  )

  if %2 == import (
    cmd /c mongodump -h %REMOTE_ADDRESS% -d !REMOTE_DB! -u %4 -p %5 -o %FOLDER%
    cmd /c mongo %LOCAL_DB% --eval "db.dropDatabase()"
    cmd /c mongorestore -h %LOCAL_ADDRESS% -d %LOCAL_DB% %FOLDER%/%LOCAL_DB%
  )

  if %2 == export (
    cmd /c mongodump -h %LOCAL_ADDRESS% -d %LOCAL_DB% -o %FOLDER%
    cmd /c mongo %REMOTE_ADDRESS%/!REMOTE_DB! -u %4 -p %5 --eval "db.dropDatabase()"
    cmd /c mongorestore -h %REMOTE_ADDRESS% -d !REMOTE_DB! -u %4 -p %5 %FOLDER%/%LOCAL_DB%
  )
)
