<template>
    <div class="forgetPassword">
        <h6>重置密码</h6>
        <hr>
        <div class="form_wrap">
            <form class="form" @submit.stop.prevent='Submit_password'>
                <div class="form-group">
                    <label  class="control-label">新密码</label>
                    <input type="password" id='newPass' autofocus='autofocus' class="form-control" v-model='newPass' pattern="^[0-9a-zA-Z]{6,16}$"  placeholder="设置6-16位新密码"  
                    oninvalid='check(this, "请输入由数字和英文字母组合成的6-16位的密码！")' required />
                    <a tabindex='-1' class="visualPassword"  href="javascript:;" isShow="false"><i class="img off"></i></a>
                </div>
                <div class="form-group">
                    <label class="control-label">再次输入新密码</label>
                    <input type="password" id='checkPass' class="form-control" v-model='checkPass' required  placeholder="确认新密码" 
                    />
                    <a tabindex='-1' class="visualPassword" href="javascript:;" isShow="false"><i class="img off"></i></a>
                </div>

                <hr>
                <div class="form-group text-center">
                    <input type='submit' class="btn login" value='提交' />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default{
        props:['currentView', 'phone', 'ticket'],
        mounted(){
            this.$nextTick(function(){
                $('.visualPassword').click(function(){

                    if($(this).attr('isShow') == 'false'){
                        $(this).prev().attr('type','text');
                        $(this).children().toggleClass('no');
                        $(this).attr('isShow','true')
                    }else{ 
                        $(this).prev().attr('type','password');
                        $(this).children().toggleClass('no');
                        $(this).attr('isShow','false')
                    }
                })
                
            })
        },
        mounted(){
            $('#newPass').focus();
        },
        data () { 
            return {
                newPass: '',
                checkPass: ''
            }
        },
        methods:{
            Submit_password(){
                const _this = this;
                if(this.newPass !== this.checkPass){
                    alert('两次的密码不一样，请重新输入!');
                    return ;
                }else{

                    let params = {
                        phone: _this.phone,
                        ticket: _this.ticket,
                        newPassword: hex_md5(_this.newPass),
                    }

                    ajax('/user/password', "put", params, function(res){
                        console.log(res);
                        if(res.status == 200){
                            _this.$emit('current-view','modifiedSuccessfully');
                        }else{
                            alert(res.msg ? res.msg : '系统错误，请联系管理员!');
                        }
                    });
                }
                
            }
        }
       
    }
</script>
<style scoped>
    .img{
        display: block
    }
    .forgetPassword .form-group a{
        display: inline-block;
        padding:13px;
    }
</style>