var config = require('../config/config');
var querystring = require('querystring');
var request = require('request');
var global = require("../config/global.obj");


var setOpt = function (url, params, sid, callback, method, no) {

    var urls = method == 'GET' ? url + querystring.stringify(params) : url;
    var user = null;

    //获取本地用户信息

    if(sid){
        for (var i = 0; i < global.socketUser.length; i++) {
            if (sid == global.socketUser[i]["sid"]) {
                user = {
                    tenantId: global.socketUser[i]["tenant"],
                    orgId: global.socketUser[i]["company"],
                    uid: global.socketUser[i]["uid"]
                };
                break;
            }
        }
    }
    if (null != user) {
        global.token(function(token){
            request({
                    method: method,
                    url: urls,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                        'opt': '{"orgId":' + user.orgId + ',"tenantId":' + user.tenantId + ',"id":' + user.uid + '}'
                    },
                    body: params ? JSON.stringify(params) : ''
                },
                function (err, response, body) {
                    if (err) return console.log('报错了',urls);
                    console.log('token', token)
                    console.log('params:', JSON.stringify(params));
                    isSuccess(err, response, body, callback, url);
                }
            );
        });
    } else {
        isSuccess("socket连接异常", {}, {}, callback, url);
    }
};

var ajax = {
    get: function (url, params, sid, callback, no) {
        setOpt(url, params, sid, callback, 'GET', no);
    },
    post: function (url, params, sid, callback, no) {
        setOpt(url, params, sid, callback, 'POST', no);
    },
    delete: function (url, params, sid, callback, no) {
        setOpt(url, params, sid, callback, 'DELETE', no);
    },
    put: function (url, params, sid, callback, no) {
        setOpt(url, params, sid, callback, 'PUT', no);
    },
    file: function () {
        setOpt(url, true, callback);
    }
};
function isSuccess(err, response, body, callback, url) {
    callback(err, body);
}

module.exports = ajax;
