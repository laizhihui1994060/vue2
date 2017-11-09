var config = require("../config/config")
var request = require('request');
var global = require('../config/global.obj');
var message = {};


// 用于注册的验证码
message.sms = function (req, res) {
    var body = req.body;


    var url = config.url.client + '/sms/send';

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

// 用于忘记密码时发送验证码
message.upd_password = function (req, res) {
    var body = req.body;

    var url = config.url.client + '/sms/upd_password';

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

// 忘记密码时验证验证码
message.password_check = function (req, res) {
    var body = req.body;

    var url = config.url.client + '/sms/upd_password/check';

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

// 用于登录时的验证码 
message.getLoginCode = function (req, res) {
    var body = req.body;


    var url = config.url.client + '/sms/verification_code';

    global.token(function(token){
        console.log(url, body, token); 
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
                console.log(body, token);
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

module.exports = message;