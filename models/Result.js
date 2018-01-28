const mongoose = require('mongoose');


const ObjectId = mongoose.Schema.Types.ObjectId;

const ResultSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  userId: { type: ObjectId, ref: 'User' },
  gameId: { type: ObjectId, ref: 'Game' },
  details: {}
}, { versionKey: false });

module.exports = mongoose.model('Result', ResultSchema);