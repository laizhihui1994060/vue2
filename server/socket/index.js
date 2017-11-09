var io = require('socket.io');

module.exports = function (app, server) {

    var http = server || require('../../build/dev-server.js').server;
    io.listen(http).on('connection', function (socket) {
        require('../message/client-tcp/client-tcp')(socket) //client tcp连接;
        require('../message/callCenter/callCenter')(socket) //呼叫中心连接;
       
    });
};
