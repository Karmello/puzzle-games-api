const express = require('express');

const { User, Game } = require('./models');


const router = express.Router();

router.get('/user', (req, res, next) => {
  User.findOne(req.query, (err, user) => {
    if (err) return next(err);
    if (user) {
      res.send(user);
    } else {
      res.status(404);
      res.send();
    }
  });
});

router.post('/user', (req, res, next) => {
  const user = new User(req.body);
  user.save(err => {
    if (err) return next(err);
    res.send(user);
  });
});

router.get('/games', (req, res, next) => {
  Game.find({}, (err, games) => {
    if (err) return next(err);
    if (games) { res.send(games); }
  });
});

module.exports = router;