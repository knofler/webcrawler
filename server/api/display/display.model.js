'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DisplaySchema = new Schema({
  title:String,
  article: String,
  img: String,
  cost:Number,
  quantity:Number,
  created_at:Date,
  created_by:String,
  active: Boolean
});

module.exports = mongoose.model('Display', DisplaySchema);