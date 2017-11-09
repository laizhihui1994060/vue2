module.exports = function(router){
    router.post('/message/sms',require('../controller/message.container.js').sms);  // 用于注册的验证码
    router.post('/message/upd_password',require('../controller/message.container.js').upd_password);  // 用于忘记密码时发送验证码
    router.post('/message/password_check',require('../controller/message.container.js').password_check);  // 忘记密码时验证验证码
    router.post('/user/getLoginCode',require('../controller/message.container.js').getLoginCode);  // 获取用户登录时的验证码
};