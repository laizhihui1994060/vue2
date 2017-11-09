<template>
    <div id="register">
        <h6>注册企业</h6>
        <hr>
        <div class="register_content">
            <div class="clearfix">
                
                <p class="pull-right goto">已有账号？返回
                    <router-link class="pull-right" to="/">
                          登陆
                    </router-link>
                </p>
            </div>
            <component :is="currentView" @view="toggleCurrentView">
            </component>
        </div>
    </div>
</template>

<script>
    import registerAdmin from "./register/register-admin.vue";
    import registrationSuccess from "./register/registration-success.vue";

    export default{
        components: {
            registerAdmin,
            registrationSuccess
        },
        data(){
            return {
                currentView:'register-admin'
                // currentView:'registration-success'
            }
        },
        methods:{
            toggleCurrentView(bool){
                if(bool)this.currentView = 'registration-success';
            }
           
        },
        mounted(){
            this.$nextTick(function(){
                document.querySelector('body').style.backgroundColor="#DFF5FD"
                $('#register').css('margin-top', '240px');
            })
        }
    }
</script>
<style>
   
    #register p,#register ol{
        margin: 0;
    }
    #register {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin-top: 240px;
    }
    #register .goto{
        font-size: 18px;
        color: #999999;
    }
    #register .goto a{
        color: #39B6E5;
    }
    #register h6{
        font-size: 24px;
        color: #666666;
        line-height: 24px;
        margin-top: 64px;
    }
    #register  hr{
        width: 100%;
        display: block;
        background: rgba(0,0,0,.11);
        height: 1px;
        border-width: 0
    }
    #register .form_wrap{
        width: 948px;
        background: #fff;
    }
    #register1{
        padding: 30px 0;
        margin-top: 18px;
    }
    #register .form-group{
        margin-bottom: 24px;
    }
    #register1 label{
        font-size: 14px;
        color: #666;
        line-height: 14px;
        font-weight: normal;
        margin-bottom: 8px;
    }
    #register1  input{
        font-size: 14px;
        color: #666;
        line-height: 14px;
        border-radius: 0;
        background: #FFFFFF;
        border: 1px solid #EEEEEE;
        box-shadow: 0 0 6px rgba(0, 0, 0, .1);
    }
    #register1  .btn{
        padding: 8px 24px;
        background: #FFFFFF;
        border: 1px solid #39B6E5;
        font-size: 14px;
        color: #39B6E5;
        letter-spacing: 0px;
        line-height: 14px;
        box-shadow: 0 0 3px #39B6E5;
        border-radius: 0;
        margin-top: 16px;
    }
    #register .code{
        font-size: 14px;
        color: #39B6E5;
        line-height: 14px;
        position: absolute;
        right: 24px;
        top: 33px
    }
    #register label[after]:after{
        content: '';
        background: url('../../assets/img.png');
        background-position:0 -20px;
        position: absolute;
        width: 7px;
        height: 7px;
        margin-left: 7px;
        margin-top: 2px;
    }
    .row{
        margin: 0;
    }

   
</style>