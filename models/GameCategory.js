const mongoose = require('mongoose');


const GameCategorySchema = new mongoose.Schema({
  id: String,
  name: String
}, { versionKey: false });

module.exports = mongoose.model('GameCategory', GameCategorySchema);