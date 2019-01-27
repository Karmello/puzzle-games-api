const mongoose = require('mongoose');
const Game = require('./Game');

const Mixed = mongoose.Schema.Types.Mixed;

const HighscoreSchema = new mongoose.Schema({
  date: { 
    type: Date,
    default: Date.now,
    required: true
  },
  username: {
    type: String,
    ref: 'User',
    required: true
  },
  gameId: {
    type: String,
    ref: 'Game',
    required: true,
    validate: {
      type: 'invalid',
      validator: function(gameId) {
        return Game.count({ id: gameId }).then(count => count)
      }
    }
  },
  options: {
    type: Mixed,
    required: true,
    validate: {
      type: 'invalid',
      validator: function(options) {
      
        return Game.findOne({ id: this.gameId }).then(game => {

          const requiredKeys = Object.keys(game.options);

          if (Object.keys(options).length !== requiredKeys.length) {
            return false;
          
          } else {
            for (const key of requiredKeys) {
              if (!options[key] || game.options[key].indexOf(options[key]) === -1) {
                return false;
              }
            }
            return true;
          }
        });
      }
    }
  },
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

module.exports = mongoose.model('Highscore', HighscoreSchema);