const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
 fb: {
  id: String,
  name: String
 }
}, { versionKey: false });

module.exports = mongoose.model('User', UserSchema);