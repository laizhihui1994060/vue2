<template>
    <div style="margin-top:80px">
        <component :is="currentView" @current-view="toggleCurrentView" :phone='phone' :ticket='ticket'>
        </component>
    </div>
</template>

<script>
import verifyPhoneNumber from "./forget_pass-subroute/VerifyPhoneNumber.vue";
import resetPassword from "./forget_pass-subroute/resetPassword.vue";
import modifiedSuccessfully from "./forget_pass-subroute/modifiedSuccessfully.vue";
    export default{
        components: {
            verifyPhoneNumber,
            resetPassword,
            modifiedSuccessfully
        },
        data(){
            return {
                currentView: 'verify-phone-number',
                phone: '',
                ticket: ''
            }
        },
        methods:{
            toggleCurrentView(view, phone, ticket){
                this.currentView = view;
                if(phone) this.phone = phone;
                if(ticket) this.ticket = ticket;
            }
        }
    }
</script>
<style>
    body{
       background: #DFF5FD;
    }
    .forgetPassword {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    .forgetPassword h6{
        font-size: 20px;
        color: #999999;
        line-height: 20px;
    }
    .forgetPassword .center{
        display: block;
    }
    .forgetPassword hr{
        width: 100%;
        display: block;
    }
    .forgetPassword .form_wrap{
        width: 380px;
        background: #fff;
    }
    .forgetPassword .form_wrap form{
        background: #fff;
        padding: 18px 24px 0px 24px;
    }
    .forgetPassword .form_wrap label{
        font-size: 14px;
        color: #999999;
        line-height: 14px;
        font-weight: normal;
        margin-bottom: 8px;
    }
    .forgetPassword .form_wrap input{
        width: 332px;
        height: 34px;
        font-size: 14px;
        color: #999999;
        line-height: 14px;
        border-radius: 0;
        background: #FFFFFF;
        border: 1px solid #EEEEEE;
        box-shadow: 0 0 6px rgba(0, 0, 0, .1)
    }
    .forgetPassword .form_wrap .btn{
        padding: 8px 24px;
        background: #FFFFFF;
        border: 1px solid #39B6E5;
        font-size: 14px;
        color: #39B6E5;
        letter-spacing: 0px;
        line-height: 14px;
        box-shadow: 0 0 3px #39B6E5;
        border-radius: 0
    }
    .forgetPassword .form-group{
        position: relative;
        margin-top: 24px;
    }
    .forgetPassword .region ,.forgetPassword .verifyCode ,.forgetPassword .visualPassword{
        position: absolute;
        right: 15px;
        top: 34px;
    }
    .forgetPassword .visualPassword{
        top: 25px;
    }
    .forgetPassword .region{
        font-size: 14px;
        color: #999999;
        line-height: 14px;
    }
    .forgetPassword .verifyCode{
        font-size: 14px;
        color: #39B6E5;
        line-height: 14px;
    }
    .forgetPassword .img_wrap{
        text-align: center;
        margin-bottom: 44px;
        margin-top: 4px;
    }
    .forgetPassword .img_wrap p{
        font-size: 20px;
        color: #39B6E5;
        letter-spacing: 0px;
        line-height: 20px;
        margin-top: 32px;
    }
   
</style>