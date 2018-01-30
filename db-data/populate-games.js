const conn = new Mongo();
const db = conn.getDB('puzzle-games');
const games = db.getCollection('games');

games.remove({});

games.insert([
  {
    id: 'BossPuzzle',
    categoryId: 'sliding',
    name: 'Boss Puzzle',
    description: 'This is a sliding puzzle that consists of a frame of square tiles in random order with one tile missing. Also called Gem Puzzle or Mystic Square.'
  }
]);