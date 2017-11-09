//redis连接服务
var redis = require('redis');
var config = require('../../config/config')
var redisPublish = redis.createClient(config.redis.port, config.redis.ip, {
    auth_pass: config.redis.password,
    db: config.redis.db
});
redisPublish.on('ready', function (err) {
    console.log('redis publish ready');
});
redisPublish.on("error", function (err) {
    console.log("redis publish Error " + err);
});
module.exports = redisPublish;