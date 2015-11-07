'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PurchaseSchema = new Schema({
  faculty_ref: String,
  entry_date: Date,
  dept: String,	
  account: String,	
  supplier: String,	
  description : String,	
  value_excluding_GST :String,	
  userName : String,  
  user : String,	
  requisition_number : String,	
  purchase_order: String,	
  invoice_number: String,	
  delivery_date : Date,	
  notes : String,
  created:Date,
  created_by:String,
  edited:Date,
  edited_by:String,
  active: Boolean
});

module.exports = mongoose.model('Purchase', PurchaseSchema);