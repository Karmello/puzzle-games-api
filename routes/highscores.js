const { Highscore } = require('./../models');
const checkAuthorization = require('./../middleware/checkAuthorization');

const SORT_CONFIG = { 'details.seconds': 1, 'details.moves': 1, date: 1 };

const shouldSaveNewHighscore = (nhsDetails, hsDetails) => {
  return nhsDetails.seconds < hsDetails.seconds || (nhsDetails.seconds === hsDetails.seconds && nhsDetails.moves < hsDetails.moves);
}


module.exports = function(router) {

  router.post('/highscore', checkAuthorization, (req, res, next) => {

    const newHighscore = new Highscore(req.body);
    
    newHighscore.validate(err => {

      if (err) {
        res.status(400);
        res.send(err);
        
      } else {

        const query = { gameId: newHighscore.gameId };
        for (const key in newHighscore.options) { query[`options.${key}`] = newHighscore.options[key]; }

        Highscore.find(query).sort(SORT_CONFIG).exec((err, highscores) => {
          
          if (err) return next(err);

          highscores.count({ username: newHighscore.username }).then(count => console.log(count));

          new Promise((resolve, reject) => {
            if (highscores.length < process.env.HIGHSCORES_LIMIT) {
              resolve();
            } else {
              for (const highscore of highscores) {
                if (shouldSaveNewHighscore(newHighscore.details, highscore.details)) {
                  highscores[highscores.length - 1].remove().then(resolve);
                  return;
                }
              }
              reject();
            }

          }).then(() => {
            newHighscore.save({ validateBeforeSave: false }, err => {
              if (err) return next(err);
              res.send(newHighscore);
            });
          }, () => {
            res.status(204);
            res.send();
          });
        });
      }
    });
  });

  router.get('/highscores/:gameId', checkAuthorization, (req, res, next) => {

    const query = { gameId: req.params.gameId };
    for (const key in req.query) { query[`options.${key}`] = req.query[key]; }

    Highscore.find(query).sort(SORT_CONFIG).exec((err, highscores) => {
      if (err) return next(err);
      if (highscores) { res.send(highscores); }
    });
  });
}