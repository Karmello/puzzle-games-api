module.exports = function(chai) {

  describe('GET /highscores/:gameId', () => {

    let gameId, token;

    beforeEach(done => {
      Promise.all([User.remove({}), Highscore.remove({}), Game.findOne({ id: 'BossPuzzle' })]).then(res => {
        gameId = res[2]._id;
        chai.request(global.app).post('/user/register').send({ username: 'AlanWatts', password: 'password' }).end((err, res) => {
          token = res.body.token;
          done();
        });
      });
    });

    it('should not be able to get highscores', done => {
      chai.request(global.app).get('/highscores').end((err, res) => {
        res.should.have.status(404);
        done();
      });
    });

    it('should not be able to get highscores', done => {
      chai.request(global.app).get('/highscores/' + gameId).end((err, res) => {
        res.should.have.status(401);
        res.text.should.equal('You are not authorized to get the resource you have requested.');
        done();
      });
    });

    it('should get highscores by game id', done => {
      chai.request(global.app).get('/highscores/' + gameId).set('x-access-token', token).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
    });
  });
}