const chai = require('chai');
const chaiHttp = require('chai-http');


describe('', () => {

  before(done => {
  
    chai.should();
    global.chai = chai.use(chaiHttp);

    process.env.NODE_ENV = 'test';
    require('./../server');
    Object.assign(global, require('./../models'));

    global.userBody = {
      fb: { id: '1234567890', name: 'Alan Watts' }
    };

    setTimeout(() => {
      console.log();
      done();
    }, 2500);
  });

  require('./users')();
  require('./game-categories')();
  require('./games')();
  require('./highscores')();
});