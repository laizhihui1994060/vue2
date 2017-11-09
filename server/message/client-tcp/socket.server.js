var redisServerPub = require('../redis/redis.server').redisServer;
var redisClientPub = require('../redis/redis.client');
var global = require('../../config/global.obj');
var config = require("../../config/config");
var ajax = require('../../pub/request');

//socket服务仓库

var _webSocketServer = {
    server: function (socket, uid) {
        _server(socket, uid);
    }
};

module.exports = _webSocketServer;

function _server(io, uid) {

    redisClientPub.get('user_uid:' + uid, function (err, data) {
        if (err)return console.log(err, data);
        var obj = {
            company: data.orgId,
            sid: io.id, 
            role: data.roles.length > 0 ? data.roles[0].roleId : "",
            tenant: data.tenantId,
            dept: data.position ? data.position.deptId : "",
            personal: data.uid,
            uid: uid,
            sys: 'sys',
            io:io
        };

        for (var i in obj) {
            if ('company' == i || 'role' == i || 'tenant' == i || 'dept' == i || 'personal' == i || 'sys' == i) {
                redisServerPub.subscribe(i + ':' + obj[i]); //订阅消息
            }
        }

        global.socketUser.push(obj);

    });




    //断开连接
    io.on('disconnect', function () {

        for(let i = 0 ;i<global.socketUser.length;i++ ){
            if (global.socketUser[i].sid == io.id) {
                global.socketUser.splice(i, 1);
                break;
            }
        }
       

    });
};