describe('[users]\n', () => {

  describe('POST /user', () => {

    before(done => {
      User.remove({}).then(() => done());
    });

    it('should create new user', done => {
      chai.request(process.env.BASE_URL).post('/user').send(userBody).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.fb.id.should.equal(userBody.fb.id);
        res.body.fb.name.should.equal(userBody.fb.name);
        done();
      });
    });

    it('should not be able to create new user', done => {
      chai.request(process.env.BASE_URL).post('/user').send().end((err, res) => {
        res.should.have.status(400);
        res.body.errors.should.have.property('fb.id');
        res.body.errors.should.have.property('fb.name');
        done();
      });
    });
  });

  describe('GET /users', () => {

    let count;

    before(done => {
      User.count({}).then(_count => {
        count = _count;
        done();
      });
    });

    it('should fetch all users', done => {
      chai.request(process.env.BASE_URL).get('/users').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(count);
        done();
      });
    });
  });

  describe('GET /user/:fbId', () => {

    before(done => {
      Promise.all([User.remove({}), new User(userBody).save()]).then(() => done());
    });

    it('should fetch user by facebook id', done => {
      chai.request(process.env.BASE_URL).get('/user/' + userBody.fb.id).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.fb.id.should.equal(userBody.fb.id);
        res.body.fb.name.should.equal(userBody.fb.name);
        done();
      });
    });

    it('should not be able to find user', done => {
      chai.request(process.env.BASE_URL).get('/user/xyz').end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.empty;
        done();
      });
    });
  });
});