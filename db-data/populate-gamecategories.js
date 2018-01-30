const conn = new Mongo();
const db = conn.getDB('puzzle-games');
const gamecategories = db.getCollection('gamecategories');

gamecategories.remove({});

gamecategories.insert([
  {
    id: 'sliding',
    name: 'Sliding'
  },
  {
    id: 'chess',
    name: 'Chess'
  }
]);