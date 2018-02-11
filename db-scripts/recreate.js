db = connect('ds211588.mlab.com:11588/heroku_rpzsr6b5', 'heroku_rpzsr6b5', 'msghahln2bgtfrfb5idd674vv6');


const gamecategories = db.getCollection('gamecategories');
gamecategories.remove({});
gamecategories.insert(load('./../db-data/gamecategories'));

const games = db.getCollection('games');
games.remove({});
games.insert(load('./../db-data/games'));

const users = db.getCollection('users');
users.remove({});

const highscores = db.getCollection('highscores');
highscores.remove({});