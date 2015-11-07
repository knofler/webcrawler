/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Purchase = require('./purchase.model');

exports.register = function(socket) {
  Purchase.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Purchase.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('purchase:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('purchase:remove', doc);
}