var redisServer = require("./redis.server").redisServer;
var config = require("../../config/config");
var subscribe = {
    callCenter: function () {
        redisServer.subscribe(config.callCenter.channel.status);
    }
}

module.exports = subscribe;