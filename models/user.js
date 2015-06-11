var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var valuesSchema = mongoose.Schema({
  interests: [String]
});

var mechanicsSchema = mongoose.Schema({
  cleanliness: Number,
  noise: Number,
  pets: Boolean,
  sleepStart: Number,
  sleepEnd: Number
});

var userSchema = mongoose.Schema({
  name: String,
  email: String,
  about: String,
  values: valuesSchema,
  mechanics: mechanicsSchema 
});

module.exports.user = mongoose.model('user',userSchema);
