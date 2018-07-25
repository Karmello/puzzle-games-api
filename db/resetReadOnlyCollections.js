/* eslint no-undef: 0 */

load('db/data/gamecategories.js');
load('db/data/games.js');

const gamecategories = db.getCollection('gamecategories');
gamecategories.remove({});
gamecategories.insert(gamecategoriesData);

const games = db.getCollection('games');
games.remove({});
games.insert(gamesData);