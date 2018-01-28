const { User, Result } = require('./../models');


module.exports = function(router) {

  router.post('/users', (req, res, next) => {
    const user = new User(req.body);
    user.save(err => {
      if (err) return next(err);
      res.send(user);
    });
  });

  router.post('/results', (req, res, next) => {
    const result = new Result(req.body);
    result.save(err => {
      if (err) return next(err);
      res.send(result);
    });
  });
}