module.exports = function() {

  describe('[games]', () => {

    describe('GET /games', () => {

      let count;

      before(done => {
        Game.count({}).then(_count => {
          count = _count;
          done();
        });
      });

      it('should fetch all games', done => {
        chai.request(process.env.BASE_URL).get('/games').end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(count);
          done();
        });
      });
    });
  });
}