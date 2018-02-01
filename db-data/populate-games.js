const conn = new Mongo();
const db = conn.getDB('puzzle-games');
const games = db.getCollection('games');

games.remove({});

games.insert([
  {
    id: 'BossPuzzle',
    categoryId: 'sliding',
    name: 'Boss Puzzle',
    description: 'This is a sliding puzzle that consists of a frame of square tiles in random order with one tile missing. Also called Gem Puzzle or Mystic Square.',
    options: {
      dimension: ['3', '4', '5'],
      style: ['IMG', 'NUM']
    }
  },
  {
    id: 'EightQueens',
    categoryId: 'chess',
    name: 'Eight Queens',
    description: 'The eight queens puzzle is the problem of placing eight chess queens on an 8×8 chessboard so that no two queens threaten each other. Thus, a solution requires that no two queens share the same row, column, or diagonal.',
    options: {}
  }
]);