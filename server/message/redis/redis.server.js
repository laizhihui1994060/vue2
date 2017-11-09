//redis连接服务
var redis = require('redis');
var config = require("../../config/config");
var global = require("../../config/global.obj");
var redisServer = redis.createClient(config.redis.port, config.redis.ip, {
    auth_pass: config.redis.password,
    db: config.redis.db
});

redisServer.on('ready', function (err) {
    console.log('redis server ready');
});
redisServer.on("error", function (err) {
    console.log("redis server Error " + err);
});

//开启消息订阅功能
redisServer.on('message', function (channel, message) {
    console.log("redisfewawefew",channel,message)
    if (config.callCenter.channel.status == channel) {
        /**
         * 分配消息
         * */
        var json = JSON.parse(message);
        if(json['type']=='loginresult' && json['result']=='success' && json['ranson_code'] ){

            global.socketUser.forEach(function (it, index) {

                if (it['uid'] == json['ranson_code']) {
                    console.log('被占用的用户...',it,channel, message);
                    it.io.emit(it.sid + ":phoneIsOccupied",channel, message);
                }
            });

        }


        global.socketUser.forEach(function (it, index) {
            if (it['uid'] == json['sys_user_id']) {
                console.log('收到呼叫中心指令消息...',channel, message);
                it.io.emit(it.sid + ":callCenter",channel, message);
            }
        });

        if(json['site_code'] == 'cctest'){

            global.socketUser.forEach(function (it, index) {
                console.log('收到心跳...',channel, message);
                it.io.emit(it.sid + ":callCenter",channel, message);
            });
        }

    } else {
        /**
         * 解析命令:
         * */
        var channels = channel.split(":");
        if (channels.length == 2) {
            global.socketUser.forEach(function (it, index) {
                if (it[channels[0]] == channels[1]) {
                    it.io.emit(it['sid'] + ":message", channel, message);
                }
            });
        } else if (channels.length = 1 && 'sys' == channels[0]) {
            global.socketUser.forEach(function (it, index) {
                it.io.emit(io['sid'] + ":message", channel, message);
            });
        }
    }
});

exports.redisServer =redisServer;

