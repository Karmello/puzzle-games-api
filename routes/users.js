const jwt = require('jsonwebtoken');

const { User } = require('./../models');
const checkAuthorization = require('./../middleware/checkAuthorization');


module.exports = function(router) {

  router.post('/user/register', (req, res) => {
    
    const user = new User(req.body);
    user.registeredAt = Date.now();
    
    user.save(err => {
      if (err) {
        res.status(400);
        res.send(err);
      } else {
        res.send({
          token: jwt.sign({ userId: user._id }, process.env.AUTH_SECRET, { expiresIn: 86400 }),
          user: user
        });
      }
    });
  });

  router.post('/user/login', checkAuthorization, (req, res, next) => {

    new Promise((resolve, reject) => {

      if (req.decoded) {
        User.findOne({ _id: req.decoded.userId }, (err, user) => {
          if (err) { return reject(err); }
          if (user) { resolve({ user, doNotSendToken: true }); } else { reject(); }
        });

      } else {
        User.findOne({ username: req.body.username }, (err, user) => {
          if (err) { return reject(err); }
          if (user) {
            user.comparePasswords(req.body.password, (err, isMatch) => {
              if (isMatch) { resolve({ user }); } else { reject(); }
            });
          } else {
            reject();
          }
        });
      }
    }).then(data => {
      res.send({
        token: !data.doNotSendToken ? jwt.sign({ userId: data.user._id }, process.env.AUTH_SECRET, { expiresIn: 86400 }) : undefined,
        user: data.user
      });
    }, err => {
      if (err) {
        next(err);
      } else {
        res.status(400);
        res.send({ errors: { credentials: { message: 'Wrong credentials' } } });
      }
    });
  });

  router.post('/user/:username', checkAuthorization, (req, res) => {
    const findQuery = { username: req.params.username };
    User.update(findQuery, req.body).then(() => {
      User.findOne(findQuery).then(user => {
        if (user) {
          res.send(user);
        } else {
          res.status(400);
          res.send('No user object');
        }
      });
    });
  });

  router.get('/users', checkAuthorization, (req, res, next) => {
    User.find({}, (err, users) => {
      if (err) return next(err);
      if (users) {
        res.send(users);
      } else {
        res.status(400);
        res.send('No users array');
      }
    });
  });
}