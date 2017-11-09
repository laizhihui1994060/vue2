var app = require('./config/express.js');
var logger = require('./config/log4.js').logger;
var messageSubscribe = require("./message/redis/message.subscribe");
//初始化token


require('./config/global.obj').token();
//启动呼叫中心消息指令订阅
messageSubscribe.callCenter();
logger.info("服务器已启动....");
