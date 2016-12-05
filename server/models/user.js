var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  fbid: String,
  home: {
    city: String,
    code: String
  },
  dream: {
    city: String,
    code: String
  }
});

module.exports = mongoose.model('User', userSchema);
