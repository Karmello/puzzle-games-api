const { Game } = require('./../models');
const checkAuthorization = require('./../middleware/checkAuthorization');

module.exports = function(router) {
  router.get('/games', checkAuthorization, (req, res, next) => {
    Game.find({}, (err, games) => {
      if (err) return next(err);
      if (games) { res.send(games); }
    });
  });
}