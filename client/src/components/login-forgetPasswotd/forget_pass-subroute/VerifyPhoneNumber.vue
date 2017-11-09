<template>
    <div class="forgetPassword">
        <h6>找回密码</h6>
        <hr>
        <div class="form_wrap">
            <form class="form" @submit.stop.prevent="Submit_phone_number">
                <div class="form-group">
                    <label class="control-label">手机号</label>
                    <input type="tel" id='phoneNumber' autofocus='autofocus' class="form-control" pattern="^(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$"  v-model='phone' placeholder="输入手机号" required oninvalid='check(this, "请正确输入11位手机号")' :disabled='sendMsgSuccess' />
                    <span class="region">+86</span>
                </div>
                <div class="form-group">
                    <label class="control-label">短信验证码</label>
                    <input type="password" v-model='code' class="form-control" placeholder="输入短信验证码">
                    <a v-if='!sendMsgSuccess' class="verifyCode" href="javascript:;" @click='sendMsg'>发送验证码</a>
                    <span v-else style='cursor:auto' class="verifyCode" href="javascript:;">{{time}}s后重试</span>
                </div>
                <hr>
                <div class="form-group text-center">
                    <input class="btn login" type='submit'  href="javascript:;"  value='提交' />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    window.check = function(i, tip){
        if(i.validity.patternMismatch === true){
            i.setCustomValidity(tip);
        }else{
            i.setCustomValidity('');
        }    
    }

    export default{
        

        data () {
            return {
                phone: '',
                code: '',
                sendMsgSuccess: false,
                time: 60,
            }
        },
        methods:{
            sendMsg(){
                const _this = this;


                // 验证手机号是否正确
                if(!/^(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(_this.phone)){
                    alert('请输入正确手机号!');
                    return;
                }

                let params = {
                    phone: _this.phone
                };
                let timer = null;


                ajax('/message/upd_password', "post", params, function(res){
                    console.log(res);
                    if(res.status == 200){
                        _this.sendMsgSuccess = true;
                        timer = setInterval(function(){
                            --_this.time;
                            if(_this.time == 0){
                                _this.time = 60;
                                _this.sendMsgSuccess = false;
                                clearInterval(timer);
                            }
                        }, 1000); 
                    }else{
                        console.log(res);
                        alert(res.msg ? res.msg : '系统错误，请联系管理员！');
                    }
                });
            },
            Submit_phone_number(){
                const _this = this;
                // 验证手机验证码
                let params = {
                    phone: _this.phone,
                    code: _this.code
                };
                ajax('/message/password_check', "post", params, function(res){
                    console.log(res);
                    if(res.status == 200){
                        _this.$emit('current-view','resetPassword', _this.phone, res.content[0].id);
                    }else{
                        alert(res.msg ? res.msg : '系统错误，请联系管理员！');
                    }
                });
            }
        }
       
    }
</script>
<style> 
    .forgetPassword .form_wrap input[disabled]{
        background: #F6F6F6;
    }
</style>