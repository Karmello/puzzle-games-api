const { GameCategory } = require('./../models');
const checkAuthorization = require('./../middleware/checkAuthorization');


module.exports = function(router) {

  router.get('/game-categories', checkAuthorization, (req, res, next) => {
    GameCategory.find({}, (err, gameCategories) => {
      if (err) return next(err);
      if (gameCategories) { res.send(gameCategories); }
    });
  });
}