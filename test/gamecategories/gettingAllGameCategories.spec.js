module.exports = function(chai) {

  describe('GET /game-categories', () => {

    let count;

    before(done => {
      GameCategory.count({}).then(_count => {
        count = _count;
        done();
      });
    });

    it('should fetch all game categories', done => {
      chai.request(global.app).get('/game-categories').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(count);
        done();
      });
    });
  });
};