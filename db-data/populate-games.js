const conn = new Mongo();
const db = conn.getDB('puzzle-games');
const games = db.getCollection('games');

games.remove({});

games.insert([
  {
    id: 'BOSS_PUZZLE',
    name: 'The 15-puzzle',
    description: 'Also called Gem Puzzle, Boss Puzzle, Game of Fifteen, Mystic Square.'
  }
]);