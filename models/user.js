var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({

  // facebook.id: String,
  // facebook.token: String,
  // facebook.name: String,
  // facebook.email: String,
  name: String,
  email: String,
  about: String,
  values: {
    interests: [String]
  },
  mechanics: {
    cleanliness: Number,
    noise: Number,
    pets: Boolean,
    sleep: String
  }
});

module.exports.user = mongoose.model('user',userSchema);
