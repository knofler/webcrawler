'use strict';

var _ = require('lodash');
var Display = require('./display.model');

// Get list of displays
exports.index = function(req, res) {
  Display.find(function (err, displays) {
    if(err) { return handleError(res, err); }
    return res.json(200, displays);
  });
};

// Get a single display
exports.show = function(req, res) {
  Display.findById(req.params.id, function (err, display) {
    if(err) { return handleError(res, err); }
    if(!display) { return res.send(404); }
    return res.json(display);
  });
};

// Creates a new display in the DB.
exports.create = function(req, res) {
  Display.create(req.body, function(err, display) {
    if(err) { return handleError(res, err); }
    return res.json(201, display);
  });
};

// Updates an existing display in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Display.findById(req.params.id, function (err, display) {
    if (err) { return handleError(res, err); }
    if(!display) { return res.send(404); }
    var updated = _.merge(display, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, display);
    });
  });
};

// Deletes a display from the DB.
exports.destroy = function(req, res) {
  Display.findById(req.params.id, function (err, display) {
    if(err) { return handleError(res, err); }
    if(!display) { return res.send(404); }
    display.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}