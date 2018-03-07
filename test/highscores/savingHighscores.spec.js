module.exports = function(chai) {

  describe('POST /highscore', () => {

    let token, gameId, highscoreBody;

    before(done => {
      
      process.env.HIGHSCORES_LIMIT = 3;

      Promise.all([User.remove({}), Highscore.remove({}), Game.findOne({ id: 'BossPuzzle' })]).then(res => {
        gameId = res[2]._id;
        chai.request(global.app).post('/user/register').send({ username: 'AlanWatts', password: 'password' }).end((err, res) => {
          token = res.body.token;
          highscoreBody = {
            userId: res.body.user._id,
            gameId,
            options: { mode: 'NUM', dimension: '3' }
          }
          Promise.all([
            chai.request(global.app).post('/highscore').send(Object.assign({}, highscoreBody, { details: { moves: 100, seconds: 40 } })).set('x-access-token', token),
            chai.request(global.app).post('/highscore').send(Object.assign({}, highscoreBody, { details: { moves: 50, seconds: 20 } })).set('x-access-token', token)
          ]).then(() => {
            done();
          });
        });
      });
    });

    it('should get sorted highscores by game id', done => {
      chai.request(global.app).get('/highscores/' + gameId).set('x-access-token', token).end((err, res) => {
        res.should.have.status(200);
        res.body.length.should.be.eql(2);
        res.body[0].details.should.eql({ moves: 50, seconds: 20 });
        res.body[1].details.should.eql({ moves: 100, seconds: 40 });
        done();
      });
    });

    it('should save new highscore', done => {
      highscoreBody.details = { moves: 120, seconds: 40 };
      chai.request(global.app).post('/highscore').send(highscoreBody).set('x-access-token', token).end(() => {
        chai.request(global.app).get('/highscores/' + gameId).set('x-access-token', token).end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.be.eql(3);
          res.body[0].details.should.eql({ moves: 50, seconds: 20 });
          res.body[1].details.should.eql({ moves: 100, seconds: 40 });
          res.body[2].details.should.eql({ moves: 120, seconds: 40 });
          done();
        });
      });
    });

    it('should not save new highscore', done => {
      highscoreBody.details = { moves: 125, seconds: 40 };
      chai.request(global.app).post('/highscore').send(highscoreBody).set('x-access-token', token).end((err, res) => {
        res.should.have.status(204);
        done();
      });
    });

    it('should save new highscore', done => {
      highscoreBody.details = { moves: 110, seconds: 40 };
      chai.request(global.app).post('/highscore').send(highscoreBody).set('x-access-token', token).end(() => {
        chai.request(global.app).get('/highscores/' + gameId).set('x-access-token', token).end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.be.eql(3);
          res.body[0].details.should.eql({ moves: 50, seconds: 20 });
          res.body[1].details.should.eql({ moves: 100, seconds: 40 });
          res.body[2].details.should.eql({ moves: 110, seconds: 40 });
          done();
        });
      });
    });

    it('should save new highscore', done => {
      highscoreBody.details = { moves: 25, seconds: 12 };
      chai.request(global.app).post('/highscore').send(highscoreBody).set('x-access-token', token).end(() => {
        chai.request(global.app).get('/highscores/' + gameId).set('x-access-token', token).end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.be.eql(3);
          res.body[0].details.should.eql({ moves: 25, seconds: 12 });
          res.body[1].details.should.eql({ moves: 50, seconds: 20 });
          res.body[2].details.should.eql({ moves: 100, seconds: 40 });
          done();
        });
      });
    });
  });
}