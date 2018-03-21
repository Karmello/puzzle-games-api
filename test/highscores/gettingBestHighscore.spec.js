module.exports = function(chai) {

  describe('GET /highscore/:gameId', () => {

    let gameId, token;

    beforeEach(done => {
      Promise.all([User.remove({}), Highscore.remove({}), Game.findOne({ id: 'BossPuzzle' })]).then(res => {
        gameId = res[2].id;
        chai.request(global.app).post('/user/register').send({ username: 'AlanWatts', password: 'password' }).end((err, res) => {
          token = res.body.token;
          done();
        });
      });
    });

    it('should return 404', done => {
      chai.request(global.app).get('/highscore').end((err, res) => {
        res.should.have.status(404);
        done();
      });
    });

    it('should return 401', done => {
      chai.request(global.app).get('/highscore/' + gameId).end((err, res) => {
        res.should.have.status(401);
        res.text.should.equal('You are not authorized to get the resource you have requested.');
        done();
      });
    });

    it('should return 204', done => {
      chai.request(global.app).get('/highscore/' + gameId).set('x-access-token', token).end((err, res) => {
        res.should.have.status(204);
        done();
      });
    });

    it('should return 200 and highscore', done => {
      const body = {
        username: 'AlanWatts',
        gameId,
        options: { mode: 'NUM', dimension: '3' },
        details: { moves: 120, seconds: 30 }
      };
      chai.request(global.app).post('/highscore').send(body).set('x-access-token', token).end(() => {
        chai.request(global.app).get('/highscore/' + gameId).set('x-access-token', token).end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.username.should.be.eql(body.username.toString());
          res.body.gameId.should.be.eql(body.gameId.toString());
          done();
        });
      });
    });
  });
}