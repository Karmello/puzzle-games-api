const { User } = require('./../models');


module.exports = function(router) {

  router.post('/user', (req, res, next) => {
    const user = new User(req.body);
    user.save(err => {
      if (err) {
        res.status(400);
        res.send(err);
      } else {
        res.send(user);
      }
    });
  });

  router.get('/users', (req, res, next) => {
    User.find({}, (err, users) => {
      if (err) return next(err);
      if (users) { res.send(users); }
    });
  });

  router.get('/user/:fbId', (req, res, next) => {
    User.findOne({ 'fb.id': req.params.fbId }, (err, user) => {
      if (err) return next(err);
      if (user) {
        res.send(user);
      } else {
        res.status(404);
        res.send();
      }
    });
  });
}