var request = require('request');
var config = require('../config/config');
var global = require('../config/global.obj');

var importOrder = {};

importOrder.import = function login(req, res, next) {
    var body = req.body;
    var user = body.userIds;
    delete body.userIds;

    global.token(function(token){
        request({
                method: 'post',
                url: config.url.order + '/import/order',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                    'opt': '{"orgId":' + user.orgId + ',"tenantId":' + user.tenantId + ',"id":' + user.uid + '}'
                },
                body: JSON.stringify(body)
            },
            function (err, response, body) {
                if(err){
                    res.send({
                        msg: "系统繁忙!",
                        status: 500,
                        url: info.url,
                        content: []
                    });
                }else{
                    res.send(body);
                }
            }
        );
    });
};

importOrder.login = function login(req, res, next) {
    var body = req.body;
    var url = config.url.client + '/user/login';


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
    });
    
};

module.exports = importOrder;




