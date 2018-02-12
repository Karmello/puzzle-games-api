const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
 fb: {
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
 }
}, { versionKey: false });

module.exports = mongoose.model('User', UserSchema);