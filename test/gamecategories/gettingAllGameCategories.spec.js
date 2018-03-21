module.exports = function(chai) {

  describe('GET /game-categories', () => {

    let count, token;

    before(done => {
      Promise.all([GameCategory.count({}), User.remove({})]).then(res => {
        count = res[0];
        chai.request(global.app).post('/user/register').send({ username: 'AlanWatts', password: 'password' }).end((err, res) => {
          token = res.body.token;
          done();
        });
      });
    });

    it('should fetch all game categories', done => {
      chai.request(global.app).get('/game-categories').set('x-access-token', token).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(count);
        done();
      });
    });
  });
};