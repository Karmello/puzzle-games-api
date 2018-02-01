const mongoose = require('mongoose');


const ObjectId = mongoose.Schema.Types.ObjectId;

const ResultSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  gameId: {
    type: ObjectId,
    ref: 'Game',
    required: true
  },
  options: {},
  details: {
    moves: {
      type: Number,
      required: true
    },
    seconds: {
      type: Number,
      required: true
    }
  }
}, { versionKey: false });

module.exports = mongoose.model('Result', ResultSchema);