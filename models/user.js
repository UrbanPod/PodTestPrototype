var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
  name: String,
  email: String
});

module.exports.user = mongoose.model('user',userSchema);
