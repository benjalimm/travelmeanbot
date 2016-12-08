var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dealSchema = new Schema({
  location: String,
  price: String
});

module.exports = mongoose.model('Deal', dealSchema);
