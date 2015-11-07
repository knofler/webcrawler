/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/purchase/purchase.socket').register(socket);
  require('../api/group/group.socket').register(socket);
  require('../api/acl/acl.socket').register(socket);
  require('../api/role/role.socket').register(socket);
  require('../api/order/order.socket').register(socket);
  require('../api/cart/cart.socket').register(socket);
  require('../api/social/social.socket').register(socket);
  require('../api/display/display.socket').register(socket);
  require('../api/chart/chart.socket').register(socket);
  require('../api/scroll/scroll.socket').register(socket);
  require('../api/email/email.socket').register(socket);
  require('../api/upload/upload.socket').register(socket);
  require('../api/thing/thing.socket').register(socket);
}

module.exports = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function (socket) {
    socket.address = socket.handshake.address !== null ?
            socket.handshake.address.address + ':' + socket.handshake.address.port :
            process.env.DOMAIN;

    socket.connectedAt = new Date();

   socket.on('chartemit',function(data){
      socket.emit('updateGraph',{data:data});
    });

    socket.on('carted',function(data){
      socket.broadcast.emit('appendCart',data);
      socket.emit('appendCart',data);
    });
    socket.on('saved',function(data){
      socket.broadcast.emit('appendSave',data);
      socket.emit('appendSave',data);
    });
    socket.on('decarted',function(data){
      socket.broadcast.emit('removeCart',data);
      socket.emit('removeCart',data);
    });
    socket.on('unsave',function(data){
      socket.broadcast.emit('removeSave',data);
      socket.emit('removeSave',data);
    });
    socket.on('recarted',function(data){
      socket.broadcast.emit('addbackCart',data);
      socket.emit('addbackCart',data);
    });

    socket.on('datachange',function(data){
      socket.broadcast.emit('modelchange',{data:data});
      socket.emit('modelchange',{data:data});
    });

    socket.connectedAt = new Date();
     socket.on('columnDrop',function(data){
     socket.emit('runChartUpdate',{data:data});
    })

    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);
      console.info('[%s] DISCONNECTED', socket.address);
    });

 

    // Call onConnect.
    onConnect(socket);
    // console.info('[%s] CONNECTED', socket.decoded_token._id);
  });
};