load('db-data/gamecategories.js');
load('db-data/games.js');

//db = connect('ds211588.mlab.com:11588/heroku_rpzsr6b5', 'heroku_rpzsr6b5', 'msghahln2bgtfrfb5idd674vv6');
db = connect(process.env.MONGODB_URI);

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