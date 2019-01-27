const mongoose = require('mongoose');

const GameCategorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  }
}, { versionKey: false });

module.exports = mongoose.model('GameCategory', GameCategorySchema);