/**
 * Created by Administrator on 2017/4/14 0014.
 */
var request = require('request');
var config = require('../config/config');
var urlencode = require('urlencode');


exports.generateUrl = function login(req, res, next) {
    var body = req.query;

    request({
            method: 'get',
            url: config.shortUrl + urlencode(body.url),
        },
        function (err, response, body) {
            if(err){
                res.send({
                    msg: "生成短链失败!",
                    status: 500,
                });
            }else{
                try{
                    var url = JSON.parse(body).url;

                    res.send({
                        msg: "生成短链成功!",
                        status: 200,
                        url: url
                    });
                }catch(err){
                    res.send({
                        msg: "生成短链失败!",
                        status: 500,
                        url: url
                    });
                }
                
            }
        }
    );
};


