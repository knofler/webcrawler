'use strict';

var _ = require('lodash');
var Social = require('./social.model');

// Get list of socials
exports.index = function(req, res) {
  Social.find(function (err, socials) {
    if(err) { return handleError(res, err); }
    return res.json(200, socials);
  });
};

// Get a single social
exports.show = function(req, res) {
  Social.findById(req.params.id, function (err, social) {
    if(err) { return handleError(res, err); }
    if(!social) { return res.send(404); }
    return res.json(social);
  });
};

// Creates a new social in the DB.
exports.create = function(req, res) {
  Social.create(req.body, function(err, social) {
    if(err) { return handleError(res, err); }
    return res.json(201, social);
  });
};

// Updates an existing social in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Social.findById(req.params.id, function (err, social) {
    if (err) { return handleError(res, err); }
    if(!social) { return res.send(404); }
    var updated = _.merge(social, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, social);
    });
  });
};

// Deletes a social from the DB.
exports.destroy = function(req, res) {
  Social.findById(req.params.id, function (err, social) {
    if(err) { return handleError(res, err); }
    if(!social) { return res.send(404); }
    social.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}