db = connect('ds211588.mlab.com:11588/heroku_rpzsr6b5', 'heroku_rpzsr6b5', 'msghahln2bgtfrfb5idd674vv6');

const games = db.getCollection('games');
const gamecategories = db.getCollection('gamecategories');

games.remove({});
gamecategories.remove({});