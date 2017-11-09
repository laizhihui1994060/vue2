var config = require("../config/config");
var request = require("request");


var access_token = {
    access_token: undefined,
    token_type: "",
    refresh_token: "",
    expires_in: 0,
    updateTime: 0,
    isInit: false
};

/**
 * 全局数据
 * */
var global = {
    token: function (cd,bool) {
        if (!access_token["isInit"] || undefined == access_token["access_token"]) {
            console.log("初始化TOKEN");
            _access_token(cd);
            access_token["isInit"] = true;
        }else if (new Date().getTime() - access_token["updateTime"] > ((access_token["expires_in"])*1000)-30000 ) {
            console.log("token过期,刷新token了",new Date().getTime() - access_token["updateTime"],(access_token["expires_in"]*1000)-30000);
            refresh_token(cd);
        }else if(bool){
            refresh_token(cd);
        }else{
            cd(access_token["token_type"] + access_token["access_token"]);
        }
        /**
         * 验证token有效性
         * */
    },//全局access_token
    refresh_token:refresh_token,
    messageSave:[],
    socketUser: []//全局socket对象存储管理
};

module.exports = global;


/**
 * 获取token
 * */


function _access_token(cd) {
    request.post(config.oauth.access_token_url + "?username=" + config.oauth.username + "&password=" + config.oauth.password + "&grant_type=password", {
        auth: {
            'user': config.oauth.clientId,
            'pass': config.oauth.clientPassword
        },
        json: true
    }, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            console.log( body)
            //更换本地Token数据
            access_token["access_token"] = body["access_token"];
            access_token["token_type"] = body["token_type"];
            access_token["refresh_token"] = body["refresh_token"];
            access_token["expires_in"] = body["expires_in"];
            access_token["updateTime"] = new Date().getTime();
            if(cd)cd(access_token["token_type"] + access_token["access_token"]);
        }
    });
}

function refresh_token(cd) {
    request.post(config.oauth.access_token_url + "?grant_type=refresh_token&refresh_token=" + access_token["refresh_token"], {
        auth: {
            'user': config.oauth.clientId,
            'pass': config.oauth.clientPassword
        },
        json: true
    }, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            //更换本地Token数据
            access_token["access_token"] = body["access_token"];
            access_token["token_type"] = body["token_type"];
            access_token["refresh_token"] = body["refresh_token"];
            access_token["expires_in"] = body["expires_in"];
            access_token["updateTime"] = new Date().getTime();
            if(!cd)console.log('token不合法，刷新token拉');
            if(cd)cd(access_token["token_type"] + access_token["access_token"]);

        } else {
            _access_token();
        }
    });
}


// function _check_token() {
//     request.post(config.oauth.access_token_check_url + "?token=666edb8d-7844-4769-94df-867390acbc91" , {
//         auth: {
//             'user': config.oauth.clientId,
//             'pass': config.oauth.clientPassword
//         },
//         json: true
//     }, function (err, response, body) {
//         console.log(body)
//         if (!err && response.statusCode == 200) {
//             console.log(body);
//             //更换本地Token数据
//             access_token["access_token"] = body["access_token"];
//             access_token["token_type"] = body["token_type"];
//             access_token["refresh_token"] = body["refresh_token"];
//             access_token["expires_in"] = body["expires_in"];
//             access_token["updateTime"] = new Date().getTime();
//         } else {
//             _access_token();
//         }
//     });
// }
// _check_token();
_access_token();