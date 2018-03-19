// userId to username
db.highscores.find().forEach(highscore => {
  const user = db.users.findOne({ _id: highscore.userId });
  if (user) {
    highscore.username = user.username;
    delete highscore.userId;
    db.highscores.save(highscore);
  }
});

// gameId: hash to name
db.highscores.find().forEach(highscore => {
  const game = db.games.findOne({ _id: highscore.gameId });
  if (game) {
    highscore.gameId = game.id;
    db.highscores.save(highscore);
  }
});