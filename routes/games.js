const { Game } = require('./../models');


module.exports = function(router) {

  router.get('/games', (req, res, next) => {
    Game.find({}, (err, games) => {
      if (err) return next(err);
      if (games) { res.send(games); }
    });
  });
}