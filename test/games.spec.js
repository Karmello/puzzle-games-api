const app = require('./../server');
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);
const Game = mongoose.model('Game');


describe('games', () => {
  
  beforeEach(done => {
    Game.remove({}, err => {
      done();
    });
  });

  describe('/GET games', () => {
    it('it should GET all games', done => {
      chai.request(process.env.BASE_URL)
      .get('/games')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
    });
  });
});