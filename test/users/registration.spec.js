module.exports = function(chai) {

  describe('POST /user/register', () => {

    before(done => {
      User.remove({}).then(() => done());
    });

    it('should not be able to register', done => {
      const credentials = { username: '', password: '' };
      chai.request(global.app).post('/user/register').send(credentials).end((err, res) => {
        res.should.have.status(400);
        res.body.errors.username.properties.type.should.equal('required');
        res.body.errors.password.properties.type.should.equal('required');
        done();
      });
    });

    it('should not be able to register', done => {
      const credentials = { username: '!@#$%^&*()', password: '!@#$%^&*()' };
      chai.request(global.app).post('/user/register').send(credentials).end((err, res) => {
        res.should.have.status(400);
        res.body.errors.username.properties.type.should.equal('special_chars_found');
        res.body.errors.should.not.have.property('password');
        done();
      });
    });

    it('should not be able to register', done => {
      const credentials = { username: 'multiple words', password: 'multiple words' };
      chai.request(global.app).post('/user/register').send(credentials).end((err, res) => {
        res.should.have.status(400);
        res.body.errors.username.properties.type.should.equal('multiple_words_found');
        res.body.errors.password.properties.type.should.equal('multiple_words_found');
        done();
      });
    });

    it('should not be able to register', done => {
      const credentials = { username: 'abc', password: 'abc' };
      chai.request(global.app).post('/user/register').send(credentials).end((err, res) => {
        res.should.have.status(400);
        res.body.errors.username.properties.type.should.equal('wrong_length');
        res.body.errors.password.properties.type.should.equal('wrong_length');
        done();
      });
    });

    it('should register new user', done => {
      const credentials = { username: 'AlanWatts', password: 'password' };
      chai.request(global.app).post('/user/register').send(credentials).end((err, res) => {
        res.should.have.status(200);
        res.body.token.should.exist;
        res.body.user.username.should.equal(credentials.username);
        res.body.user.should.have.property('_id');
        res.body.user.should.have.property('registeredAt');
        res.body.user.should.not.have.property('password');
        done();
      });
    });

    it('should not be able to register', done => {
      const credentials = { username: 'AlanWatts', password: 'password' };
      chai.request(global.app).post('/user/register').send(credentials).end((err, res) => {
        res.should.have.status(400);
        res.body.errors.username.message.should.equal('already taken');
        res.body.errors.username.properties.type.should.equal('unique');
        res.body.errors.should.not.have.property('password');
        done();
      });
    });
  });
}