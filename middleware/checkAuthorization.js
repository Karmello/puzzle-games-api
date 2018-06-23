const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  new Promise((resolve, reject) => {  
    if (!token) {
      reject();

    } else {
      jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
        if (err || !decoded) { return reject(); }
        resolve(decoded);
      });
    }

  }).then(decoded => {
    req.decoded = decoded;
    next();

  }, () => {
    if (req.route.path === '/user/login') {
      next();
    } else {
      res.status(401);
      res.send('You are not authorized to get the resource you have requested.'); 
    }
  });
}