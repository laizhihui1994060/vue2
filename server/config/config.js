/**
 *数据库配置文件
 * */

var fs = require('fs');
var weshuttle_logo = 'data:image/png;base64,' + fs.readFileSync('./imags_logo/wshuttle_logo.png').toString('base64');
var saa_logo = 'data:image/png;base64,' + fs.readFileSync('./imags_logo/saa_logo.jpg').toString('base64');
// var saa_logo = 'data:image/png;base64,' + fs.readFileSync('./imags_logo/ass_test.jpg').toString('base64');
var andorid = 'data:image/png;base64,' + fs.readFileSync('./imags_logo/andorid.png').toString('base64');
var ios = 'data:image/png;base64,' + fs.readFileSync('./imags_logo/ios.png').toString('base64');
var scy_andorid = 'data:image/png;base64,' + fs.readFileSync('./imags_logo/scy_andorid.png').toString('base64');
var scy_ios = 'data:image/png;base64,' + fs.readFileSync('./imags_logo/scy_ios.jpg').toString('base64');
var saa_andorid = 'data:image/png;base64,' + fs.readFileSync('./imags_logo/saa_andorid.png').toString('base64');
var version_introduce = require('../version_history');

var capi = {
    client: "http://192.168.8.25:7856/v1",
    order: "http://192.168.8.25:7856/v1",
    finance: "http://192.168.8.25:7856/v1",
    control: "http://192.168.8.25:7856/v1",
    message: "http://192.168.8.25:4576/v1",
    gps: "http://192.168.8.25:4580/v1",
    nodePath:"http://192.168.8.25:8888",
    listEvent:'https://capi-analysis-tcp.kk519.cn',
    xiaozong: 'http://192.168.8.118:8801/v1',
    gpsAnalysis:"https://gps-analysis-tcp.kk519.cn"
};

var capi = {
        client: "http://47.93.43.18:7856/v1",
        order: "http://47.93.43.18:7856/v1",
        finance: "http://47.93.43.18:7856/v1",
        control: "http://47.93.43.18:7856/v1",
       message: "https://capi-message.kk519.cn/v1",
        gps: "https://capi-gps.kk519.cn/v1",
        nodePath:"https://kk519.cn",
       listEvent:'https://capi-analysis-tcp.kk519.cn',
        gpsAnalysis:"https://gps-analysis-tcp.kk519.cn"

}


var server_port =  8888;
var node_path = "http://" + getIPAdress() + ":" + server_port;
console.log('~~~~~~~~~~~~~',node_path,'~~~~~~~~~~~~~~');

// var capi = {
//     client: "https://capi-client.kk519.cn/v1",
//     order: " https://capi-order.kk519.cn/v1",
//     finance: "https://capi-finance.kk519.cn/v1",
//     control: "https://capi-control.kk519.cn/v1",
//     message: "https://capi-message.kk519.cn/v1",
//     gps: "https://capi-gps.kk519.cn/v1",
//     nodePath:"https://kk519.cn",
//     listEvent:'https://capi-analysis-tcp.kk519.cn',
//     gpsAnalysis:"https://gps-analysis-tcp.kk519.cn"
// }



function getIPAdress(){
    var interfaces = require('os').networkInterfaces();
    for(var devName in interfaces){
        var iface = interfaces[devName];
        for(var i=0;i<iface.length;i++){
            var alias = iface[i];
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
}


var config = {
    url: capi,
    shortUrl:"http://suo.im/api.php?format=json&url=",
    redis: {
        ip: "192.168.8.25",
        port: "6379",
        password: "wshuttle*2016",
        db: "0"
    },
    // tow_web_1
    oauth: {
        access_token_url: capi.client + "/oauth/token",
        access_token_check_url: capi.client + "/oauth/check_token",
        username: "zzz",
        password: "user",
        clientId: "wshuttle",
        clientPassword: "pNazBgRInpiKUaBaDsUX"
    },
    // redis: {
    //     ip: "r-2ze54a383c3f11f4.redis.rds.aliyuncs.com",
    //     port: "6379",
    //     password: "WSHuttle2017",
    //     db: "8"
    // },
    // // tow_web_1
    // oauth: {
    //     access_token_url: capi.client + "/oauth/token",
    //     access_token_check_url: capi.client + "/oauth/check_token",
    //     username: "zzz",
    //     password: "user",
    //     clientId: "wshuttle",
    //     clientPassword: "pNazBgRInpiKUaBaDsUX"
    // },
    callCenter: {
        channel: {
            status: "call_status",
            command: "call_command"
        }
    },
    server_port : server_port,
    wshuttle_web_client_config:{
        nodePath: node_path,
        // nodePath: capi.nodePath,
        globalIframeSrc: capi.client,
        mapWebApiKey:'af6900685cd93078a4522707e82326be',
        gpsAnalysis:capi.gpsAnalysis,
        PlatformName:'快快云救援开放平台',
        logo:weshuttle_logo,
        sysPhotoTemplateItemId:"044e155f-42ab-4975-8e69-c061cbe82ec4",
        img_path:capi.control + '/file/q?fileId=',
        wechat_path:'https://wx-dd-test.kk519.cn',
        build:'v1.1.8',
        listEvent:capi.listEvent,
        QR_code:{
            andorid:andorid,
            ios:ios
        },
        version_introduce:version_introduce,
        debug:true
    },
    syc_web_client_config:{
        nodePath: capi.nodePath,
        PlatformName:'深车源云救援开放平台',
        listEvent:capi.listEvent,
        logo:weshuttle_logo,
        gpsAnalysis:capi.gpsAnalysis,
        globalIframeSrc: capi.client,
        img_path:capi.control + '/file/q?fileId=',
        wechat_path:'https://wx.kk519.cn/redirect_order',
        build:'v1.1.8',
        QR_code:{
            andorid:scy_andorid,
            ios:scy_ios
        },
        version_introduce:version_introduce,
        debug:true
    },
    saa_web_client_config:{
        gpsAnalysis:capi.gpsAnalysis,
        nodePath: capi.nodePath,
        globalIframeSrc: capi.client,
        PlatformName:'SAA超级汽车救援',
        logo:saa_logo,
        img_path:capi.control + '/file/q?fileId=',
        wechat_path:'https://wx.kk519.cn/redirect_order',
        build:'v1.1.8',
        listEvent:capi.listEvent,
        QR_code:{
            andorid:saa_andorid
            // ios:ios
        },
        version_introduce:version_introduce,
        debug:true
    }
};

module.exports = config;