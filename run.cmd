@echo off

if "%1" == "db-dev-reset" (
  cmd /c "mongo localhost:27017/puzzle-games < db/reset.js"
)

if "%1" == "db-test-reset" (
  cmd /c "mongo ds155218.mlab.com:55218/test-puzzle-games -u %2 -p %3 < db/reset.js"
)

if "%1" == "db-dev-import-prod" (
  cmd /c "mongo puzzle-games --eval db.dropDatabase()"
  cmd /c "mongodump -h ds155218.mlab.com:55218 -d puzzle-games -u %2 -p %3 -o C:/mongodump"
  cmd /c "mongorestore -h localhost:27017 -d puzzle-games C:/mongodump/puzzle-games"
)