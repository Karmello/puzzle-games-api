const { Highscore } = require('./../models');

const HIGHSCORES_LIMIT = 5;
const SORT_CONFIG = { 'details.seconds': 1, 'details.moves': 1, date: 1 };

const shouldSaveNewHighscore = (nhsDetails, hsDetails) => {
  return nhsDetails.seconds < hsDetails.seconds || (nhsDetails.seconds === hsDetails.seconds && nhsDetails.moves < hsDetails.moves);
}


module.exports = function(router) {

  router.post('/highscore', (req, res, next) => {

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

          new Promise((resolve, reject) => {
            if (highscores.length < HIGHSCORES_LIMIT) {
              resolve();
            } else {
              for (const highscore of highscores) {
                if (shouldSaveNewHighscore(newHighscore.details, highscore.details)) {
                  highscores[highscores.length - 1].remove();
                  return resolve();
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

  router.get('/highscores/:gameId', (req, res, next) => {

    const query = { gameId: req.params.gameId };
    for (const key in req.query) { query[`options.${key}`] = req.query[key]; }

    Highscore.find(query).sort(SORT_CONFIG).exec((err, highscores) => {
      if (err) return next(err);
      if (highscores) { res.send(highscores); }
    });
  });
}