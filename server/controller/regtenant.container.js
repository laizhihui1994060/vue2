var regtenant = {};
var config = require('../config/config.js');
var global = require("../config/global.obj");
var request = require("request");


regtenant.regtenant = function (req, res) {      //用户注册
    var body = req.body;
    var msg = {
        code: 500,
        msg: '验证码错误',
        content: []
    };
    var url = config.url.client + '/regtenant/register';
    global.token(function(token){
        request({
                url: url,
                method: "post",
                headers: {
                    'Authorization':token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            },
            function (err, response, body) {
                var data = body ? JSON.parse(body) : null;
                if (!err && data && data.status == 200) {
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


module.exports = regtenant;