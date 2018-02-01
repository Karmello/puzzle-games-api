const mongoose = require('mongoose');


const ObjectId = mongoose.Schema.Types.ObjectId;

const GameSchema = new mongoose.Schema({
  id: String,
  category: { type: ObjectId, ref: 'GameCategory' },
  name: String,
  description: String,
  options: {}
}, { versionKey: false });

module.exports = mongoose.model('Game', GameSchema);