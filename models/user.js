var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
  name: String,
  email: String,
  about: String,
  interests: String,
  cleanliness: Number,
  noise: Number,
  pets: Boolean,
  sleepStart: String,
  sleepEnd: String
});

module.exports.user = mongoose.model('user',userSchema);
