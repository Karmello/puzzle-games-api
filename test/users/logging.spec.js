module.exports = function(chai) {

  describe('POST /user/login', () => {

    let token;
  
    before(done => {
      User.remove({}).then(() => {
        chai.request(global.app).post('/user/register').send({ username: 'AlanWatts', password: 'password' }).end((err, res) => {
          token = res.body.token;
          done();
        });
      });
    });
    
    it('should login', done => {
      const credentials = { username: 'AlanWatts', password: 'password' };
      chai.request(global.app).post('/user/login').send(credentials).end((err, res) => {
        res.should.have.status(200);
        res.body.token.should.exist;
        res.body.user.username.should.equal('AlanWatts');
        res.body.user.should.not.have.property('password');
        done();
      });
    });

    it('should login', done => {
      chai.request(global.app).post('/user/login').send({ token }).end((err, res) => {
        res.should.have.status(200);
        res.body.should.not.have.property('token');
        res.body.user.username.should.equal('AlanWatts');
        res.body.user.should.not.have.property('password');
        done();
      });
    });

    it('should not be able to login', done => {
      chai.request(global.app).post('/user/login').send({ username: '', password: '' }).end((err, res) => {
        res.should.have.status(400);
        res.body.errors.credentials.message.should.equal('Wrong credentials');
        done();
      });
    });

    it('should not be able to login', done => {
      chai.request(global.app).post('/user/login').send({ username: 'Karmello', password: 'password' }).end((err, res) => {
        res.should.have.status(400);
        res.body.errors.credentials.message.should.equal('Wrong credentials');
        done();
      });
    });

    it('should not be able to login', done => {
      chai.request(global.app).post('/user/login').send({ token: 'some_invalid_token' }).end((err, res) => {
        res.should.have.status(400);
        res.body.errors.credentials.message.should.equal('Wrong credentials');
        done();
      });
    });
  });
}