var redisPublish = require("../redis/redis.publish");

module.exports = function(socket){
     //监听呼叫中心请求指令
     socket.on('CallCenter', function (param) {
        console.log( 'CallCenter收到的参数',param );
        /**
         *判断参数类型
         * */
        if ('dial' == param['type']) {
            //获取用户的基本信息
            var command = {
                type: "dial",
                sys_user_id: param["uid"],
                dest_phoneno: param["phoneNo"]
            };

            redisPublish.publish('call_command', JSON.stringify(command));
        } else if ('login' == param["type"]) {
            var command = {
                type: "login",
                sys_user_id: param["uid"],
                exten: param["exten"]
            };
            redisPublish.publish('call_command', JSON.stringify(command));
        } else if ('logout' == param['type']) {
            var command = {
                type: "logout",
                sys_user_id: param["uid"]
            };
            redisPublish.publish('call_command', JSON.stringify(command));
        }else if ('logout' == param['type']) {
            var command = {
                type: "logout",
                sys_user_id: param["uid"]
            };
            redisPublish.publish('call_command', JSON.stringify(command));
        }else if ('hangup' == param['type']) {
            var command = {
                type: "hangup",
                sys_user_id: param["uid"]
            };
            redisPublish.publish('call_command', JSON.stringify(command));
        }
    });
};