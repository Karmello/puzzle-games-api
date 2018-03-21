const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);


before(done => {

  process.env.NODE_ENV = 'testing';
  global.app = require('./../server');
  Object.assign(global, require('./../models'));

  setTimeout(() => {
    console.log();
    done();
  }, 3000);
});

require('./gamecategories/gettingAllGameCategories.spec')(chai);
require('./games/gettingAllGames.spec')(chai);
require('./users/gettingAllUsers.spec')(chai);
require('./users/registration.spec')(chai);
require('./users/logging.spec')(chai);
require('./highscores/gettingHighscoresByGameId.spec')(chai);
require('./highscores/gettingBestHighscore.spec')(chai);
require('./highscores/postingHighscore.spec')(chai);
require('./highscores/savingHighscores.spec')(chai);