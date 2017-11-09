module.exports = function(router){
    router.post('/login',require('../controller/login.container.js').login);  //登陆
    router.post('/login_out',require('../controller/login.container.js').login_out);  //登出
    router.get('/verification/:code',require('../controller/login.container.js').verification);  //获取登录的验证码
    router.put('/user/password',require('../controller/login.container.js').changePassword);  // 用户修改密码
};