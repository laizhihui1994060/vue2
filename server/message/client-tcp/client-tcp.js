var socketServer = require('./socket.server');
var config = require("../../config/config");
var global = require("../../config/global.obj");
var ajax = require('../../pub/request');


module.exports = function(socket){
    socket.on(socket.id, function (info) {
        if (typeof info === 'object') {
            var param = info.param ? info.param : {};
            if (info.type) {
                //整理补充url
                if (undefined != info.url && info.url.split(":").length > 1) {
                    var moduleNameUrl = config.url[info.url.substring(0, info.url.indexOf(":"))] + info.url.substring(info.url.indexOf(":") + 1);
                    ajax[info.type](moduleNameUrl, param, socket.id, function (err, body) {
                        if (err) {
                            console.error(err);
                            body = JSON.stringify({
                                msg: err,
                                status: 500,
                                url: info.url,
                                content: []
                            });
                        }
                        var tBody = null;
                        try {
                            tBody = JSON.parse(body);

                        }catch(err500){
                            console.log(info,tBody,moduleNameUrl,param)
                            tBody = {
                                msg: "系统繁忙!",
                                status: 500,
                                url: info.url,
                                content: err500
                            }
                            console.log(body)
                            console.error("抛出错误：",err500)
                        }

                        if(tBody.error && tBody.error == 'invalid_token'){
                            global.refresh_token();
                        }
                        
                        socket.emit(socket.id + ':' + info._event, err, tBody);


                    }, info.no);
                } else {

                    socket.emit(socket.id + ':' + info._event, "请求路径错误!", JSON.stringify({
                        msg: "请求路径错误!",
                        status: 500,
                        url: info.url,
                        content: [] 
                    }));
                }
            }
        }
    });

    
    socket.on('user_join', function (uid) {
        console.log('udi' , uid);
        socketServer.server(socket, uid);
        socket.emit(socket.id + ':user_adopt', "socket初始化成功!!", {
            msg: "socket信息初始化成功!",
            status: 200,
            content: []
        });
    });
}