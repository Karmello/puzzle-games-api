@echo off

if "%1" == "db-dev-reset" (
  cmd /c "mongo localhost:27017/puzzle-games < db/reset.js"
)

if "%1" == "db-test-reset" (
  cmd /c "mongo ds155218.mlab.com:55218/test-puzzle-games -u %2 -p %3 < db/reset.js"
)

if "%1" == "db-dev-export" (
  cmd /c "mongodump -h localhost:27017 -d puzzle-games -o C:/mongodump"
)

if "%1" == "db-dev-import-local" (
  cmd /c "mongo puzzle-games --eval db.dropDatabase()"
  cmd /c "mongorestore -h localhost:27017 -d puzzle-games C:/mongodump/puzzle-games"
)

if "%1" == "db-dev-import-prod" (
  cmd /c "mongo puzzle-games --eval db.dropDatabase()"
  cmd /c "mongodump -h ds155218.mlab.com:55218 -d puzzle-games -u %2 -p %3 -o C:/mongodump"
  cmd /c "mongorestore -h localhost:27017 -d puzzle-games C:/mongodump/puzzle-games"
)

if "%1" == "db-prod-import-local" (
  cmd /c "mongo ds155218.mlab.com:55218/puzzle-games -u %2 -p %3 --eval db.dropDatabase()"
  cmd /c "mongorestore -h ds155218.mlab.com:55218 -d puzzle-games -u %2 -p %3 C:/mongodump/puzzle-games"
)
