const users = require('./../_mocks/users.mock');


module.exports = function(chai) {

  describe('POST /highscore', () => {

    const registered = [];
    const newHighscore = {};

    before(done => {
      process.env.HIGHSCORES_LIMIT = 3;
      Promise.all([User.remove({}), Highscore.remove({}), Game.findOne({ id: 'BossPuzzle' })]).then(responses => {
        newHighscore.gameId = responses[2]._id;
        newHighscore.options = { mode: 'NUM', dimension: '3' };
        const tasks = [];
        for (const user of users) { tasks.push(chai.request(global.app).post('/user/register').send(user)); }
        Promise.all(tasks).then(responses => {
          for (const res of responses) { registered.push(res.body); }
          done();
        });
      });
    });

    it('should save', done => {
      newHighscore.userId = registered[0].user._id;
      newHighscore.details = { seconds: 16, moves: 46 };
      chai.request(global.app).post('/highscore').send(newHighscore).set('x-access-token', registered[0].token).end(() => {
        chai.request(global.app).get('/highscores/' + newHighscore.gameId).set('x-access-token', registered[0].token).end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.be.eql(1);
          res.body[0].details.should.eql({ seconds: 16, moves: 46 });
          done();
        });
      });
    });

    it('should not save', done => {
      newHighscore.details = { seconds: 24, moves: 40 };
      chai.request(global.app).post('/highscore').send(newHighscore).set('x-access-token', registered[0].token).end(() => {
        chai.request(global.app).get('/highscores/' + newHighscore.gameId).set('x-access-token', registered[0].token).end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.be.eql(1);
          res.body[0].details.should.eql({ seconds: 16, moves: 46 });
          done();
        });
      });
    });

    it('should save', done => {
      newHighscore.details = { seconds: 12, moves: 50 };
      chai.request(global.app).post('/highscore').send(newHighscore).set('x-access-token', registered[0].token).end(() => {
        chai.request(global.app).get('/highscores/' + newHighscore.gameId).set('x-access-token', registered[0].token).end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.be.eql(1);
          res.body[0].details.should.eql({ seconds: 12, moves: 50 });
          done();
        });
      });
    });

    it('should save', done => {
      newHighscore.userId = registered[1].user._id;
      newHighscore.details = { seconds: 18, moves: 59 };
      chai.request(global.app).post('/highscore').send(newHighscore).set('x-access-token', registered[1].token).end(() => {
        chai.request(global.app).get('/highscores/' + newHighscore.gameId).set('x-access-token', registered[1].token).end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.be.eql(2);
          res.body[0].details.should.eql({ seconds: 12, moves: 50 });
          res.body[1].details.should.eql({ seconds: 18, moves: 59 });
          done();
        });
      });
    });

    it('should save', done => {
      newHighscore.userId = registered[2].user._id;
      newHighscore.details = { seconds: 10, moves: 36 };
      chai.request(global.app).post('/highscore').send(newHighscore).set('x-access-token', registered[2].token).end(() => {
        chai.request(global.app).get('/highscores/' + newHighscore.gameId).set('x-access-token', registered[2].token).end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.be.eql(3);
          res.body[0].details.should.eql({ seconds: 10, moves: 36 });
          res.body[1].details.should.eql({ seconds: 12, moves: 50 });
          res.body[2].details.should.eql({ seconds: 18, moves: 59 });
          done();
        });
      });
    });

    it('should not save', done => {
      newHighscore.userId = registered[1].user._id;
      newHighscore.details = { seconds: 21, moves: 57 };
      chai.request(global.app).post('/highscore').send(newHighscore).set('x-access-token', registered[1].token).end(() => {
        chai.request(global.app).get('/highscores/' + newHighscore.gameId).set('x-access-token', registered[1].token).end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.be.eql(3);
          res.body[0].details.should.eql({ seconds: 10, moves: 36 });
          res.body[1].details.should.eql({ seconds: 12, moves: 50 });
          res.body[2].details.should.eql({ seconds: 18, moves: 59 });
          done();
        });
      });
    });

    it('should save', done => {
      newHighscore.userId = registered[1].user._id;
      newHighscore.details = { seconds: 11, moves: 42 };
      chai.request(global.app).post('/highscore').send(newHighscore).set('x-access-token', registered[1].token).end(() => {
        chai.request(global.app).get('/highscores/' + newHighscore.gameId).set('x-access-token', registered[1].token).end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.be.eql(3);
          res.body[0].details.should.eql({ seconds: 10, moves: 36 });
          res.body[1].details.should.eql({ seconds: 11, moves: 42 });
          res.body[2].details.should.eql({ seconds: 12, moves: 50 });
          done();
        });
      });
    });

    it('should not save', done => {
      newHighscore.userId = registered[3].user._id;
      newHighscore.details = { seconds: 19, moves: 55 };
      chai.request(global.app).post('/highscore').send(newHighscore).set('x-access-token', registered[3].token).end(() => {
        chai.request(global.app).get('/highscores/' + newHighscore.gameId).set('x-access-token', registered[3].token).end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.be.eql(3);
          res.body[0].details.should.eql({ seconds: 10, moves: 36 });
          res.body[1].details.should.eql({ seconds: 11, moves: 42 });
          res.body[2].details.should.eql({ seconds: 12, moves: 50 });
          done();
        });
      });
    });

    it('should save', done => {
      newHighscore.userId = registered[3].user._id;
      newHighscore.details = { seconds: 7, moves: 23 };
      chai.request(global.app).post('/highscore').send(newHighscore).set('x-access-token', registered[3].token).end(() => {
        chai.request(global.app).get('/highscores/' + newHighscore.gameId).set('x-access-token', registered[3].token).end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.be.eql(3);
          res.body[0].details.should.eql({ seconds: 7, moves: 23 });
          res.body[1].details.should.eql({ seconds: 10, moves: 36 });
          res.body[2].details.should.eql({ seconds: 11, moves: 42 });
          done();
        });
      });
    });

    it('should not save', done => {
      newHighscore.userId = registered[3].user._id;
      newHighscore.details = { seconds: 8, moves: 23 };
      chai.request(global.app).post('/highscore').send(newHighscore).set('x-access-token', registered[3].token).end(() => {
        chai.request(global.app).get('/highscores/' + newHighscore.gameId).set('x-access-token', registered[3].token).end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.be.eql(3);
          res.body[0].details.should.eql({ seconds: 7, moves: 23 });
          res.body[1].details.should.eql({ seconds: 10, moves: 36 });
          res.body[2].details.should.eql({ seconds: 11, moves: 42 });
          done();
        });
      });
    });
  });
}