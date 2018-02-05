const mongoose = require('mongoose');
const Game = require('./Game');


const ObjectId = mongoose.Schema.Types.ObjectId;

const ResultSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  userId: { type: ObjectId, ref: 'User', required: true },
  gameId: { type: ObjectId, ref: 'Game', required: true },
  options: {},
  details: {
    moves: { type: Number, required: true },
    seconds: { type: Number, required: true }
  }
}, { versionKey: false });

ResultSchema.pre('save', function(next) {
  
  if (!this.options) { return next(new Error('req.body.options required !')); }

  Game.findOne({ _id: this.gameId }, (err, game) => {
    
    if (err) return next(err);
    const keys = Object.keys(game.options);
    
    for (const key of keys) {
      if (!this.options[key] || game.options[key].indexOf(this.options[key]) === -1) {
        return next(new Error('req.body.options invalid !'));
      }
    }
    
    for (const key in this.options) {
      if (keys.indexOf(key) === -1) { delete this.options[key]; }
    }
    
    next();
  });
});

module.exports = mongoose.model('Result', ResultSchema);