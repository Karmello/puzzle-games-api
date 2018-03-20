module.exports = function(chai) {

  describe('POST /highscore', () => {

    let token, highscoreBody;

    beforeEach(done => {
      Promise.all([User.remove({}), Highscore.remove({}), Game.findOne({ id: 'BossPuzzle' })]).then(res => {
        const game = res[2];
        chai.request(global.app).post('/user/register').send({ username: 'AlanWatts', password: 'password' }).end((err, res) => {
          token = res.body.token;
          highscoreBody = {
            username: res.body.user.username,
            gameId: game.id,
            options: { mode: 'NUM', dimension: '3' },
            details: { moves: 120, seconds: 30 }
          }
          done();
        });
      });
    });

    it('should create new highscore', done => {
      chai.request(global.app).post('/highscore').send(highscoreBody).set('x-access-token', token).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.username.should.be.eql(highscoreBody.username.toString());
        res.body.gameId.should.be.eql(highscoreBody.gameId.toString());
        done();
      });
    });

    it('should not be able to create new highscore', done => {
      highscoreBody.gameId = 'wrong-game-id';
      chai.request(global.app).post('/highscore').send(highscoreBody).set('x-access-token', token).end((err, res) => {
        res.should.have.status(400);
        res.body.errors.gameId.properties.type.should.equal('invalid');
        done();
      });
    });

    it('should not be able to create new highscore', done => {
      delete highscoreBody.details.moves;
      chai.request(global.app).post('/highscore').send(highscoreBody).set('x-access-token', token).end((err, res) => {
        res.should.have.status(400);
        res.body.errors.should.have.property('details.moves');
        res.body.errors['details.moves'].properties.type.should.equal('required');
        done();
      });
    });

    it('should not be able to create new highscore', done => {
      delete highscoreBody.options;
      chai.request(global.app).post('/highscore').send(highscoreBody).set('x-access-token', token).end((err, res) => {
        res.should.have.status(400);
        res.body.errors.options.properties.type.should.equal('required');
        done();
      });
    });

    it('should not be able to create new highscore', done => {
      delete highscoreBody.options.mode;
      chai.request(global.app).post('/highscore').send(highscoreBody).set('x-access-token', token).end((err, res) => {
        res.should.have.status(400);
        res.body.errors.options.properties.type.should.equal('invalid');
        done();
      });
    });

    it('should not be able to create new highscore', done => {
      highscoreBody.options.dimension = 6;
      chai.request(global.app).post('/highscore').send(highscoreBody).set('x-access-token', token).end((err, res) => {
        res.should.have.status(400);
        res.body.errors.options.properties.type.should.equal('invalid');
        done();
      });
    });
  });
}