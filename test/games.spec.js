process.env.PORT = 3002;
process.env.MONGODB_URI = 'mongodb://heroku_pfxgz66t:9b2o5lucd8n8u4t9s211qcic1d@ds235388.mlab.com:35388/heroku_pfxgz66t';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./../server');

const should = chai.should();
chai.use(chaiHttp);


describe('games', () => {
  
  beforeEach(done => {
    app.models.Game.remove({}, err => {
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