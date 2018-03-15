## Technologies
* [NodeJs](https://nodejs.org) | [Express](https://expressjs.com)
* [MongoDB](https://www.mongodb.com) | [mongoose](http://mongoosejs.com)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) | [bcrypt](https://www.npmjs.com/package/bcrypt-nodejs)
* [Mocha](https://mochajs.org) | [Chai](http://chaijs.com)
* [Swagger](https://swagger.io)
<br /><br />
## Local setup
* make sure you have `Node.js` and `MongoDB` installed on your system
* create `mongod` instance
* `git clone` repo and `npm install` from root
* `run db-dev-reset` to create and populate database
* `run db-dev-import-prod <username> <password>` if you wanna import production db data to your local db
* `nodemon server.js` & navigate to `localhost:3001`
* `npm test` to run tests
<br /><br />
## Remote environments
* STAGING - [https://staging-puzzle-games-api.herokuapp.com](https://staging-puzzle-games-api.herokuapp.com)
* TEST - [https://test-puzzle-games-api.herokuapp.com](https://test-puzzle-games-api.herokuapp.com)
<br /><br />
## Remote databases
* names - `staging-puzzle-games`, `test-puzzle-games`, `puzzle-games`
* host - `ds155218.mlab.com`
* port - `55218`
<br /><br />
## Other links
* Jenkins - [http://ec2-35-158-121-12.eu-central-1.compute.amazonaws.com](http://ec2-35-158-121-12.eu-central-1.compute.amazonaws.com)
* ZenHub - [https://app.zenhub.com/workspace/o/karmello/puzzle-games](https://app.zenhub.com/workspace/o/karmello/puzzle-games)
