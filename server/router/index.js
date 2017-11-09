var express = require('express');
var app = express();
var router = express.Router();


//适配任何路由规则请传递给这个路由器。
router.use(function(req,res,next){
	// ... 一些中间的逻辑操作，就像其他的中间件。
	next();
});



router.get('/',function(req,res){
    res.render('index.html')
});



//登陆操作
router.get('/web_config',require('../controller/web_config.container.js'));  // 获取前台配置

require('./login.js')(router);  // 登陆操作
require('./message.js')(router); // 手机验证码等操作

router.post('/regtenant/register',require('../controller/regtenant.container.js').regtenant);  // 用户注册
router.get('/generateUrl',require('../controller/generateUrl.js').generateUrl);  // 生成短链

router.post('/importOrder/import',require('../controller/import.container').import);  //订单导入
router.post('/importOrder/login',require('../controller/import.container').login);  //  登录

router.get('/download/downloadImages/:body', require('../controller/donwload.container.js').downloadImages);  // 下载图片

module.exports = router;
