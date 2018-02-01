module.exports = function (router) {

  require('./game-categories')(router);
  require('./games')(router);
  require('./results')(router);
  require('./users')(router);
}