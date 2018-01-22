const mongoose = require('mongoose');


const ImageSchema = new mongoose.Schema({
  filename: String
}, { versionKey: false });

module.exports = mongoose.model('Image', ImageSchema);