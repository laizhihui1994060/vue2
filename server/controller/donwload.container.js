var request = require('request');
var fs =require("fs");
var path =require('path');
var JSZip = require("jszip");
var async = require('async');
var global = require("../config/global.obj");
var url = require('../config/config.js').url;

var download = {};

download.downloadImages = function(req, res, next) {

    var body = JSON.parse( req.params.body );
    var
         showUrl = body.showUrl,
         arr = body.arr,
         pageName = body.pageName + '_' + new Date().getTime() + '.zip',
         type = body.type;

    const user = global.socketUser[0];

    global.token(function(token){

        request({
                method: 'post',
                url: url.client + '/tow/driver/photo/order',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                    'opt': '{"orgId":' + user.company + ',"tenantId":' + user.tenant + ',"id":' + user.uid + '}'
                },
                body: JSON.stringify(arr)
            },
            function (err, response, body) {
                sendImages(  JSON.parse(body).content);
            }
        );
    });

    function sendImages(params){
        if(params.length > 0){

            // 细分
            var zip = new JSZip();
            var images = [];

            async.mapLimit(params, 10, function(item_obj, callback_obj) {

                
                switch (type) {
                    case 'orderCode': // 订单号
                        var folder = zip.folder ( item_obj.orderCode );
                        break;
                    case 'customerCaseNo':    // 案件号
                        var folder = zip.folder (item_obj.customerCaseNo);
                        break;
                    default :   // 故障车的车票号，可能有多个
                        var folderName = item_obj.vehicle.map( function(obj, index)  {
                            return obj.vehiclePlateNo
                        }).join('、');
                        var folder = zip.folder( folderName );
                }



                var images = item_obj.photo;

                // 获取图片
                async.mapLimit(images, 10, function(item_image, callback_images) {
                    downloadImages( showUrl + item_image.photoId, './files', item_image.photoTime, function(content){
                        folder.file(item_image.photoTime + '.jpg', content);
                        callback_images(null, item_image);
                    });
                }, function(){
                    callback_obj(null, item_obj);
                });

            }, function(err, result){
                // 全部完成
                zip.generateAsync({type:"nodebuffer"})
                .then(function (content) {
                    res.set({
                        'Content-Type': 'application/zip',
                        'Content-Disposition': 'attachment; filename=' + encodeURIComponent(pageName) + '.zip'  
                    });
                    res.send(content);
                });
            }); 
        }else{
            res.send({
                status: 404,
                msg: '没有图片',
                content: []
            })
        }
    }

};



function downloadImages(url, fn){
    request.head(url, function(err, res, body){
        request(
            url,
            {
                encoding: "binary",
                method: "GET"
            },
            function (err, res, body) {
                if (!(err || res.statusCode !== 200)) {
                    fn(new Buffer(body, "binary"));
                } else {
                    fn("压缩失败");
                }
            });
    });
}

module.exports = download;




