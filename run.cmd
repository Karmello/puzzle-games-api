@echo off

if "%1" == "db" (

  SET LOCAL_ADDRESS="localhost:27017"
  SET REMOTE_ADDRESS="ds155218.mlab.com:55218"
  SET LOCAL_DB="puzzle-games"
  SET FOLDER="C:/mongodump"

  if "%3" == "staging" SET REMOTE_DB="staging-puzzle-games"
  if "%3" == "test" SET REMOTE_DB="test-puzzle-games"
  if "%3" == "prod" SET REMOTE_DB="puzzle-games"

  if "%2" == "import" (
    SET FROM=%REMOTE_ADDRESS%
    SET TO=%LOCAL_ADDRESS%
    cmd /c mongodump -h %FROM% -d %REMOTE_DB% -u %4 -p %5 -o %FOLDER%
    cmd /c mongo %LOCAL_DB% --eval "db.dropDatabase()"
    cmd /c mongorestore -h %TO% -d %LOCAL_DB% %FOLDER%/%LOCAL_DB%
  )

  if "%2" == "export" (
    SET FROM=%LOCAL_ADDRESS%
    SET TO=%REMOTE_ADDRESS%
    cmd /c mongodump -h %FROM% -d %LOCAL_DB% -o %FOLDER%
    cmd /c mongo %TO%/%REMOTE_DB% -u %4 -p %5 --eval "db.dropDatabase()"
    cmd /c mongorestore -h %TO% -d %REMOTE_DB% -u %4 -p %5 %FOLDER%/%DB%
  )

  if "%2" == "reset" (
    
    if "%3" == "local" (
      cmd /c mongo %LOCAL_ADDRESS%/%LOCAL_DB% < "db/reset.js"
    )

    if "%3" == "staging" SET remote=1
    if "%3" == "test" SET remote=1
    if "%3" == "prod" SET remote=1
    
    if %remote% == 1 (
      cmd /c mongo %REMOTE_ADDRESS%/%REMOTE_DB% -u %4 -p %5 < "db/reset.js"
    )
  )
)
