'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({
  items:Array,
  shipping:Number,
  subTotal:Number,
  totalCost:Number,
  order_status:String,
  created_by: String,
  created_at: Date,
  active: Boolean
});

module.exports = mongoose.model('Order', OrderSchema);