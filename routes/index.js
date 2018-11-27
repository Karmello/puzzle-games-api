module.exports = function (router) {
  require('./game-categories')(router);
  require('./games')(router);
  require('./highscores')(router);
  require('./users')(router);
}