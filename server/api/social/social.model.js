'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SocialSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Social', SocialSchema);