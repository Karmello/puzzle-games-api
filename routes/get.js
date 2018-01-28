const { User, Game, Result } = require('./../models');


module.exports = function(router) {

  router.get('/users', (req, res, next) => {
    User.find({}, (err, users) => {
      if (err) return next(err);
      if (users) { res.send(users); }
    });
  });

  router.get('/users/:fbId', (req, res, next) => {
    User.findOne({ 'fb.id': req.params.fbId }, (err, user) => {
      if (err) return next(err);
      if (user) {
        res.send(user);
      } else {
        res.status(404);
        res.send();
      }
    });
  });

  router.get('/games', (req, res, next) => {
    Game.find({}, (err, games) => {
      if (err) return next(err);
      if (games) { res.send(games); }
    });
  });

  router.get('/results', (req, res, next) => {
    Result.find({}, (err, results) => {
      if (err) return next(err);
      if (results) { res.send(results); }
    });
  });
}