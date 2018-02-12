const mongoose = require('mongoose');


const ObjectId = mongoose.Schema.Types.ObjectId;

const GameSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: ObjectId,
    required: true,
    ref: 'GameCategory'
  },
  description: String,
  options: {}
}, { versionKey: false });

module.exports = mongoose.model('Game', GameSchema);