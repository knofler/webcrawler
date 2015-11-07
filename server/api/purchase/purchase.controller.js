'use strict';

var _ = require('lodash');
var Purchase = require('./purchase.model');

// Get list of purchases
exports.index = function(req, res) {
  Purchase.find(function (err, purchases) {
    if(err) { return handleError(res, err); }
    return res.json(200, purchases);
  });
};

// // Get last entry
exports.lastEntry = function(req, res) {
  var singleEntry = '';
  Purchase.find(function (err, purchases) {
    if(err) { return handleError(res, err); }
      purchases = purchases.sort({_id : -1});
      singleEntry = purchases[purchases.length-1];
      });
  setTimeout(function(){
    return res.json(200,singleEntry);
  },100);
   
};

// Get a single purchase
exports.show = function(req, res) {
  Purchase.findById(req.params.id, function (err, purchase) {
    if(err) { return handleError(res, err); }
    if(!purchase) { return res.send(404); }
    return res.json(purchase);
  });
};

// Get purchase by specific name
exports.name = function(req, res) {
   var pur_req=req.params.pur_req;
  Purchase.findOne({"faculty_ref":pur_req},function (err, purchase) {
        if(err) { return handleError(res, err); }
    return res.json(purchase);
  });
};

// Get list of applications by Name
exports.purchaseData = function(req, res) {
  var oneid= req.params.oneid;
  Purchase.find(
    {"user":oneid},function (err, purchases) {
    if(err) { return handleError(res, err); }
    return res.json(purchases);
  });
};

// Creates a new purchase in the DB.
exports.create = function(req, res) {
  Purchase.create(req.body, function(err, purchase) {
    if(err) { return handleError(res, err); }
    return res.json(201, purchase);
  });
};

// Updates an existing purchase in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Purchase.findById(req.params.id, function (err, purchase) {
    if (err) { return handleError(res, err); }
    if(!purchase) { return res.send(404); }
    var updated = _.merge(purchase, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, purchase);
    });
  });
};

// Deletes a purchase from the DB.
exports.destroy = function(req, res) {
  Purchase.findById(req.params.id, function (err, purchase) {
    if(err) { return handleError(res, err); }
    if(!purchase) { return res.send(404); }
    purchase.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}