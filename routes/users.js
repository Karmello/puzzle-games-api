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

    new Promise((resolve, reject) => {

      User.findOne({ username: req.body.username }, (err, user) => {
        if (err) { return reject(err); };
        if (user) {
          user.comparePasswords(req.body.password, (err, isMatch) => {
            if (isMatch) { resolve(user); } else { reject(); }
          });
        } else {
          reject();
        }
      });

    }).then(user => res.send(user), err => {
      if (err) {
        next(err);
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