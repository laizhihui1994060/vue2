var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var ejs = require('ejs');
var log = require('./log4.js');
var socket = require('../socket/index.js');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var errorhandler = require('errorhandler');
var notifier = require('node-notifier');
var app = express();

app.all("*", function (req, res, next) {
    var allowedOrigins = [

        "http://" + getIPAdress() +":8080"

    ];
    // 这里是允许跨域的的domain列表 
    var origin = req.headers.origin;
    if(allowedOrigins[0].indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Credentials', true);// Allow Cookie
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
}); 

//设置cookie，session
log.use(app);//配置日志
app.use(bodyParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cookieParser());
app.use(session({
    secret: 'secret-string',
    saveUninitialized:true,
    resave:false
}));


app.engine('html',ejs.__express);
app.set('views', path.join(__dirname,'../public'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '../public')));

app.use('/files', express.static('files'));

if (process.env.NODE_ENV === 'development')app.use(errorhandler({log: errorNotification}));

function errorNotification(err, str, req) {
  	notifier.notify({
      	title: 'Error in ' + req.method + ' ' + req.url,
      	message: str
  	})
}


var server = app.listen(require('./config.js').server_port, (err)=>  {
  if (err) {
    console.log(err);
    return
  }
  console.log('服务已经启动......')

});

app.use('/', require('../router/index.js'));


require('../socket/index.js')(app,server);

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


module.exports = app;


