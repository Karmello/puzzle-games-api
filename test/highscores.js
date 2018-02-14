describe('[highscores]\n', () => {

  let highscoreBody;

  beforeEach(done => {
    Promise.all([User.remove({}), Highscore.remove({}), Game.findOne({})]).then(res => {
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

  describe('POST /highscores', () => {

    it('should create new highscore', done => {
      chai.request(process.env.BASE_URL).post('/highscores').send(highscoreBody).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.userId.should.be.eql(highscoreBody.userId.toString());
        res.body.gameId.should.be.eql(highscoreBody.gameId.toString());
        done();
      });
    });

    it('should not be able to create new highscore', done => {
      delete highscoreBody.details.moves;
      chai.request(process.env.BASE_URL).post('/highscores').send(highscoreBody).end((err, res) => {
        res.should.have.status(400);
        res.body.errors.should.have.property('details.moves');
        res.body.errors['details.moves'].properties.type.should.equal('required');
        done();
      });
    });
  });

  describe('GET /highscores/:gameId', () => {

    it('should get highscores by game id', done => {
      new Highscore(highscoreBody).save().then(() => {
        chai.request(process.env.BASE_URL).get('/highscores/' + highscoreBody.gameId).end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          done();
        });
      });
    });
  });
});