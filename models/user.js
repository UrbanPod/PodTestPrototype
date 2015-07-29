var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({

  // facebook.id: String,
  // facebook.token: String,
  // facebook.name: String,
  // facebook.email: String,

  username: String,
  about: String,
  interests: String,
  cleanliness: Number,
  noise: Number,
  pets: Boolean,
  sleepStart: String,
  sleepEnd: String
});

module.exports.user = mongoose.model('user',userSchema);
