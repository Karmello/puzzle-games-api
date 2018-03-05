const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const stringValidators = require('./../validators/string.validator.js');


const UserSchema = new mongoose.Schema({
  registeredAt: { 
    type: Date,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: 'already taken',
    validate: [stringValidators.noSpecialChars, stringValidators.noMultipleWords, stringValidators.length(4, 25)]
  },
  password: {
    type: String,
    required: true,
    validate: [stringValidators.noMultipleWords, stringValidators.length(8, 25)]
  }
}, { versionKey: false });

UserSchema.plugin(beautifyUnique);

module.exports = mongoose.model('User', UserSchema);