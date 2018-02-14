const chai = require('chai');
const chaiHttp = require('chai-http');

const delay = 2500;


before(done => {
  
  process.env.NODE_ENV = 'test';
  require('./../server');
  Object.assign(global, require('./../models'));
  
  chai.should();
  global.chai = chai.use(chaiHttp);

  global.userBody = {
    fb: { id: '1234567890', name: 'Alan Watts' }
  };

  setTimeout(() => {
    console.log();
    done();
  }, delay);
});