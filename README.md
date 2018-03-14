### Technologies
* [NodeJs](https://nodejs.org) | [Express](https://expressjs.com) | [MongoDB](https://www.mongodb.com) |
[mongoose](http://mongoosejs.com) | [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) |
[bcrypt](https://www.npmjs.com/package/bcrypt-nodejs) | [Swagger](https://swagger.io) | [Mocha](https://mochajs.org) |
[Chai](http://chaijs.com)
### Local setup
* make sure you have `Node.js` and `MongoDB` installed on your system
* create `mongod` instance
* `git clone` repo and `npm install` from root
* `run recreate-db -dev` to create and populate database
* `nodemon server.js` & navigate to `localhost:3001`
* `npm test` to run tests
### Remote environments
* STAGING - [https://staging-puzzle-games-api.herokuapp.com](https://staging-puzzle-games-api.herokuapp.com)
* TEST - [https://test-puzzle-games-api.herokuapp.com](https://test-puzzle-games-api.herokuapp.com)

### Remote databases
* names - `staging-puzzle-games`, `test-puzzle-games`, `puzzle-games`
* host - `ds155218.mlab.com`
* port - `55218`
* export PRODUCTION database with <br/>`mongodump -h ds155218.mlab.com:55218 -d puzzle-games -u <username> -p <password> -o C:/Workspace/mongodump`

### Other links
* ZenHub - [https://app.zenhub.com/workspace/o/karmello/puzzle-games-api](https://app.zenhub.com/workspace/o/karmello/puzzle-games-api)
* Jenkins - [http://ec2-35-158-121-12.eu-central-1.compute.amazonaws.com](http://ec2-35-158-121-12.eu-central-1.compute.amazonaws.com)
