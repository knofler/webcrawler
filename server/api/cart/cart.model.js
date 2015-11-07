'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CartSchema = new Schema({
  name:String,
  produced_by:String,
  img:String,
  cost:String,
  shipping:Number,
  available:String,
  added_by:String,
  quantity:Number,
  created_at: Date,
  saved:Boolean,
  saved_at: Date,
  active: Boolean
});

module.exports = mongoose.model('Cart', CartSchema);