const mongoose = require('mongoose');


const GameSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String
}, { versionKey: false });

module.exports = mongoose.model('Game', GameSchema);