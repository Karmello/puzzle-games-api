const { GameCategory } = require('./../models');


module.exports = function(router) {

  router.get('/game-categories', (req, res, next) => {
    GameCategory.find({}, (err, gameCategories) => {
      if (err) return next(err);
      if (gameCategories) { res.send(gameCategories); }
    });
  });
}