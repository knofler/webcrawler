/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Social = require('./social.model');

exports.register = function(socket) {
  Social.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Social.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('social:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('social:remove', doc);
}