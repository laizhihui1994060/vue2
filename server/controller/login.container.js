var uuid = require('node-uuid');
var captchapng = require('captchapng');  //验证码
var request = require('request');
var config = require('../config/config.js');
var redisClientPub = require('../message/redis/redis.client');
var global = require('../config/global.obj');
var getmac = require('getmac');
var fs = require('fs');


exports.login = function (req, res) {
    var body = req.body;
    var url = config.url.client + '/user/login';
    body.ipLocation = req.connection.remoteAddress.substr(req.connection.remoteAddress.search(/(\d+)\.(\d+)\.(\d+)\.(\d+)/g));

        global.token(function(token){
            request({
                    url: url,
                    method: "post",
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                },

                function (err, response, body) {

                    var data = body ? JSON.parse(body) : null;
                    if (!err && data && data.status == 200) {
                        data = data.content[0];
                        redisClientPub.add('user_uid:' + data.uid, data, function (err, re) {
                            if (err)return console.log(err);
                        });
                        res.send(JSON.parse(body));
                    } else {
                        res.send(JSON.stringify({
                            msg: data && data.msg ? data.msg : "系统繁忙!",
                            status: 500,
                            content: []
                        }));
                    }
                }
            );
        },true)

};
 

exports.login_out = function (req, res) {
    var body = req.body;
    var url = config.url.client + '/user/login_out';

    body.ipLocation = req.connection.remoteAddress.substr(req.connection.remoteAddress.search(/(\d+)\.(\d+)\.(\d+)\.(\d+)/g));


        var user = null;

        if(body.sid){
            for (var i = 0; i < global.socketUser.length; i++) {
                if (body.sid == global.socketUser[i]["sid"]) {
                    user = {
                        tenantId: global.socketUser[i]["tenant"],
                        orgId: global.socketUser[i]["company"],
                        uid: global.socketUser[i]["uid"]
                    };
                    break;
                }

            }
        }
        if(user != null) {

            global.token(function (token) {
                request({
                        url: url,
                        method: "post",
                        headers: {
                            'Authorization': token,
                            'Content-Type': 'application/json',
                            'opt': '{"orgId":' + user.orgId + ',"tenantId":' + user.tenantId + ',"id":' + user.uid + '}'
                        },
                        body: JSON.stringify(body)
                    },

                    function (err, response, body) {
                        var data = body ? JSON.parse(body) : null;
                        if (!err && data && data.status == 200) {

                            res.send(JSON.parse(body));
                        } else {
                            res.send(JSON.stringify({
                                msg: data && data.msg ? data.msg : "登出成功!",
                                status: 200,
                                content: []
                            }));
                        }
                    }
                );
            }, true)
        }else{
            res.send(JSON.stringify({
                msg:  "登出成功!",
                status: 200,
                content: []
            }));
        }
};

exports.verification = function (req, res) {
    var num = parseInt(req.params.code);
    var p = new captchapng(80, 30, num); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64').toString('base64');
    res.send(imgbase64);
};

// 用户忘记密码，修改密码
exports.changePassword = function (req, res) {
    var body = req.body;

    var url = config.url.client + '/user/password';


    global.token(function(token){
        request({
                url: url,
                method: "put",
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            },
            function (err, response, body) {
                const data = JSON.parse(body);
                if (!err && data && data.status == 200) {
                    res.send(data);
                } else {
                    res.send(JSON.stringify({
                        msg: data && data.msg ? data.msg : "系统繁忙!",
                        status: 500,
                        content: []
                    }));
                }
            }
        );
    });
};



