var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
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
