/* eslint no-undef: 0 */

load('db/gamecategories.js');
load('db/games.js');

const gamecategories = db.getCollection('gamecategories');
gamecategories.remove({});
gamecategories.insert(gamecategoriesData);

const games = db.getCollection('games');
games.remove({});
games.insert(gamesData);

const users = db.getCollection('users');
users.remove({});

const highscores = db.getCollection('highscores');
highscores.remove({});