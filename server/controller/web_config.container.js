/**
 * Created by Administrator on 2017/6/7 0007.
 */

var config = require('../config/config');

module.exports = function(req,res){

  var hostname = req.query.hostname;
  var newConfig = {};
  if(hostname.indexOf('scy') != -1 ){
    newConfig = config.syc_web_client_config;
  }else if(hostname.indexOf('saa') != -1){
    newConfig = config.saa_web_client_config;
  }else{
    // newConfig = config.saa_web_client_config;
    newConfig = config.wshuttle_web_client_config;
  }
  res.send(newConfig);
};