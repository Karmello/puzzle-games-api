const { User } = require('./../models');


module.exports = function(router) {

  router.post('/user/register', (req, res, next) => {
    
    const user = new User(req.body);
    user.registeredAt = Date.now();
    
    user.save(err => {
      if (err) {
        res.status(400);
        res.send(err);
      } else {
        res.send(user);
      }
    });
  });

  router.post('/user/login', (req, res, next) => {
    User.findOne(req.body, (err, user) => {
      if (err) return next(err);
      if (user) {
        res.send(user);
      } else {
        res.status(400);
        res.send({ errors: { credentials: { message: 'Wrong credentials' } } });
      }
    });
  });

  router.get('/users', (req, res, next) => {
    User.find({}, (err, users) => {
      if (err) return next(err);
      if (users) { res.send(users); }
    });
  });
}