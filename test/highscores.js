module.exports = function(chai) {

  describe('[highscores]', () => {

    let highscoreBody;

    beforeEach(done => {
      Promise.all([User.remove({}), Highscore.remove({}), Game.findOne({ id: 'BossPuzzle' })]).then(res => {
        const user = new User(userBody);
        user.save().then(() => {
          highscoreBody = {
            userId: user._id,
            gameId: res[2]._id,
            options: { mode: 'NUM', dimension: '3' },
            details: { moves: 120, seconds: 30 }
          }
          done();
        });
      });
    });

    describe('POST /highscore', () => {

      it('should create new highscore', done => {
        chai.request(global.app).post('/highscore').send(highscoreBody).end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.userId.should.be.eql(highscoreBody.userId.toString());
          res.body.gameId.should.be.eql(highscoreBody.gameId.toString());
          done();
        });
      });

      it('should not be able to create new highscore', done => {
        highscoreBody.gameId = '999999999999999999999999';
        chai.request(global.app).post('/highscore').send(highscoreBody).end((err, res) => {
          res.should.have.status(400);
          res.body.errors.gameId.properties.type.should.equal('invalid');
          done();
        });
      });

      it('should not be able to create new highscore', done => {
        delete highscoreBody.details.moves;
        chai.request(global.app).post('/highscore').send(highscoreBody).end((err, res) => {
          res.should.have.status(400);
          res.body.errors.should.have.property('details.moves');
          res.body.errors['details.moves'].properties.type.should.equal('required');
          done();
        });
      });

      it('should not be able to create new highscore', done => {
        delete highscoreBody.options;
        chai.request(global.app).post('/highscore').send(highscoreBody).end((err, res) => {
          res.should.have.status(400);
          res.body.errors.options.properties.type.should.equal('required');
          done();
        });
      });

      it('should not be able to create new highscore', done => {
        delete highscoreBody.options.mode;
        chai.request(global.app).post('/highscore').send(highscoreBody).end((err, res) => {
          res.should.have.status(400);
          res.body.errors.options.properties.type.should.equal('invalid');
          done();
        });
      });

      it('should not be able to create new highscore', done => {
        highscoreBody.options.dimension = 6;
        chai.request(global.app).post('/highscore').send(highscoreBody).end((err, res) => {
          res.should.have.status(200);
          res.body.errors.options.properties.type.should.equal('invalid');
          done();
        });
      });
    });

    describe('GET /highscores/:gameId', () => {

      it('should get highscores by game id', done => {
        new Highscore(highscoreBody).save().then(() => {
          chai.request(global.app).get('/highscores/' + highscoreBody.gameId).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            done();
          });
        });
      });
    });
  });
}