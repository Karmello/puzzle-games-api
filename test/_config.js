const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);


before(done => {

  process.env.NODE_ENV = 'test';
    
  global.app = require('./../server');
  Object.assign(global, require('./../models'));
  global.userBody = { fb: { id: '1234567890', name: 'Alan Watts' } };

  setTimeout(() => {
    console.log();
    done();
  }, 3000);
});

require('./users')(chai);
require('./game-categories')(chai);
require('./games')(chai);
require('./highscores')(chai);