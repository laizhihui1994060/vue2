var log4js = require('log4js');

log4js.configure({
    appenders: [
        {
            type: 'console',
            //category: "console"
        }, //控制台输出
        {
            type: 'file',
            filename: 'logs/access.log',
            maxLogSize: 1024000,
            backups: 10,
            //category: 'normal'
        }//日期文件格式
    ],
    replaceConsole: true,   //替换console.log
    "levels": {
        "error": "error",
        "record": "trace"
    }
});

var logger = log4js.getLogger('log4j');
logger.setLevel('TRACE');
exports.logger = logger;
exports.use = function(app) {
    //页面请求日志,用auto的话,默认级别是WARN
    //app.use(log4js.connectLogger(dateFileLog, {level:'auto', format:':method :url'}));
    app.use(log4js.connectLogger(logger, {level:'auto', format:':method :url'}));
};