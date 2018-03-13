const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const stringValidators = require('./../validators/string.validator.js');


const ValidationError = mongoose.Error.ValidationError;
const ValidatorError  = mongoose.Error.ValidatorError;

const UserSchema = new mongoose.Schema({
  registeredAt: { 
    type: Date,
    required: true
  },
  username: {
    type: String,
    required: [true, 'is required'],
    //unique: 'already taken',
    validate: [stringValidators.noSpecialChars, stringValidators.noMultipleWords, stringValidators.length(4, 25)]
  },
  password: {
    type: String,
    required: [true, 'is required'],
    validate: [stringValidators.noMultipleWords, stringValidators.length(8, 25)]
  }
}, { versionKey: false });

UserSchema.methods = {
  toJSON: function() {
    let user = this.toObject();
    delete user.password;
    return user;
  },
  hashPassword: function(next) {

    let SALT_WORK_FACTOR = 10;
    let doc = this;

    if (!doc.isModified('password')) { next(); } else {
      bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(doc.password, salt, undefined, (err, hash) => {
          if (err) {
            next(err);
          } else {
            doc.password = hash;
            next();
          }
        });
      });
    }
  },
  comparePasswords: function(current, cb) {
    bcrypt.compare(current, this.password, (err, isMatch) => {
      if (err) { cb(err); } else { cb(null, isMatch); }
    });
  }
};

UserSchema.pre('save', function(next) {
  this.model('User').count({ username: this.username }).then(count => {
    if (count) {
      const err = new ValidationError(this);
      err.errors.username = new ValidatorError({ type: 'unique' });
      err.errors.username.message = 'already taken';
      return next(err);
    } else {
      this.hashPassword(() => { next(); });
    }
  });
});

module.exports = mongoose.model('User', UserSchema);