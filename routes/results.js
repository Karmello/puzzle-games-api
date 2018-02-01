const { Game, Result } = require('./../models');


module.exports = function(router) {

  router.post('/results', (req, res, next) => {

    Game.findOne({ _id: req.body.gameId }, (err, game) => {

      if (err) return next(err);
      if (!req.body.options) { return next(new Error('INVALID_BODY')); }
      
      const keys = Object.keys(game.options);

      for (const key of keys) {
        if (!req.body.options[key] || game.options[key].indexOf(req.body.options[key]) === -1) {
          return next(new Error('INVALID_BODY'));
        }
      }

      for (const key in req.body.options) {
        if (keys.indexOf(key) === -1) {
          delete req.body.options[key];
        }
      }

      const result = new Result(req.body);
      
      result.save(err => {
        if (err) return next(err);
        res.send(result);
      });
    });
  });

  router.get('/results/:gameId', (req, res, next) => {

    const query = { gameId: req.params.gameId };
    for (const key in req.query) { query[`options.${key}`] = req.query[key]; }

    Result.find(query, (err, results) => {
      if (err) return next(err);
      if (results) { res.send(results); }
    });
  });
}