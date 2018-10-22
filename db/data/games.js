const gamesData = [
  {
    id : 'boss-puzzle',
    categoryId : 'sliding',
    name : 'Boss Puzzle',
    description : 'This is a sliding puzzle that consists of a frame of square tiles in random order with one tile missing. Also called Gem Puzzle or Mystic Square.',
    options : {
      mode : ['NUM', 'IMG'],
      dimension : ['3', '4', '5']
    },
    info : 'The aim of the game is to get all square tiles back in order, either so that the picture is restored or so that the numbers are in numerical order from left to right, top to bottom with the space at the bottom right.'
  },
  {
    id : 'eight-queens',
    categoryId : 'chess',
    name : 'Eight Queens',
    description : 'The eight queens puzzle is the problem of placing eight chess queens on an 8×8 chessboard so that no two queens threaten each other.',
    options : {},
    info : 'The challenge is to place eight queens on the board such that no queen is attacking any of the others. For those not familiar with chess pieces, the queen is able to attack any square on the same row, any square on the same column and also any square on either of the diagonals.'
  },
  {
    id: 'sudoku',
    categoryId: 'logic',
    name: 'Sudoku',
    description: 'Sudoku (originally called Number Place) is a logic-based, combinatorial number-placement puzzle.',
    options: {},
    info: 'The objective is to fill a 9×9 grid with digits so that each column, each row, and each of the nine 3×3 subgrids that compose the grid (also called "boxes", "blocks", or "regions") contains all of the digits from 1 to 9.'
  },
  {
    id: 'knights-tour',
    categoryId: 'chess',
    name: 'Knight\'s Tour',
    description: 'A knight\'s tour is a sequence of moves of a knight on a chessboard such that the knight visits every square only once.',
    options: {
      dimension : ['5', '8']
    },
    info: 'The task is to move a knight across the chess board by standard knight moves. The only restriction is that the knight cannot visit the same square twice. The puzzle is said to be completed if the knight visited all squares on the board.'
  }
];

module.exports = gamesData;