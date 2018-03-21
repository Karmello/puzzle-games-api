module.exports = function(chai) {

  describe('GET /users', () => {

    let token;
  
    before(done => {
      User.remove({}).then(() => {
        chai.request(global.app).post('/user/register').send({ username: 'AlanWatts', password: 'password' }).end((err, res) => {
          token = res.body.token;
          done();
        });
      });
    });

    it('should return 401', done => {
      chai.request(global.app).get('/users').end((err, res) => {
        res.should.have.status(401);
        res.text.should.equal('You are not authorized to get the resource you have requested.');
        done();
      });
    });

    it('should return 200 and an array of length 1', done => {
      chai.request(global.app).get('/users').set('x-access-token', token).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        done();
      });
    });
  });
}