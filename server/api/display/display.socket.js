/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Display = require('./display.model');

exports.register = function(socket) {
  Display.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Display.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('display:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('display:remove', doc);
}