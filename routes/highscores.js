const { Highscore } = require('./../models');


module.exports = function(router) {

  router.post('/highscores', (req, res, next) => {

    const highscore = new Highscore(req.body);
    
    highscore.save(err => {
      if (err) return next(err);
      res.send(highscore);
    });
  });

  router.get('/highscores/:gameId', (req, res, next) => {

    const query = { gameId: req.params.gameId };
    for (const key in req.query) { query[`options.${key}`] = req.query[key]; }

    Highscore.find(query, (err, highscores) => {
      if (err) return next(err);
      if (highscores) { res.send(highscores); }
    });
  });
}