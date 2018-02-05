const { Result } = require('./../models');


module.exports = function(router) {

  router.post('/results', (req, res, next) => {

    const result = new Result(req.body);
    
    result.save(err => {
      if (err) return next(err);
      res.send(result);
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