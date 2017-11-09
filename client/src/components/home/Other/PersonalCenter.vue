<template>
    <div class="container-fluid" style="width100%;">
        <div class="panel panel-default">
            <div class="panel-body personalCenter">
                <div class="thumbnail">
                    <a  class="gotoHome" href="javascript:;" @click="returnHome"> 
                        返回首页
                    </a>
                    <i class="img heard"></i>
                    <div class="caption text-center">
                        <h3 v-if="userInfo.techInfo" v-text="userInfo.techInfo.empName"></h3>
                    </div>
                </div>

                <div>
                    <div class="division">
                        <hr><span>我的分机</span><hr>
                    </div>
                    <div class="extension text-center modifyNum">
                        <div>
                            <form-label-input :disabled='true' value='ip' @updata="integrationDate" name="financialNo" input-width="143px" label="类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别"></form-label-input>
                        </div>
                        <div>
                            <form-label-input v-if="userInfo.techInfo" :value="userInfo.extNum" :disabled='modifyNum.disabled' @updata="integrationDate" name="extNum" input-width="143px" label="分&nbsp;机&nbsp; 号"></form-label-input>
                            <a href="javascript:;"  @click="modifyNum.disabled = false;" :style="{color:betterPass.input_color}" style="margin-right:-61px;">更改分机号</a>
                        </div>

                        <div class="btns" v-show="!(modifyNum.disabled)">
                            <button class="btn radius-btn" @click="modifyNumSave">保存</button>
                            <button class="btn radius-btn" @click="modifyNum.disabled = true">取消</button>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="division">
                        <hr><span>账户管理</span><hr>
                       <!--  <a href="javascript:;" @click="accountManagement">
                            <img :src="accountManage.src" height="12" width="12" alt="">
                        </a> -->
                    </div>
                    <div class="extension text-center accountManage">
                        <div>
                            <form-label-input :disabled='accountManage.disabled' :value="orgName" @updata="integrationDate" name="financialNo" input-width="143px" label="所属公司"></form-label-input>
                        </div>

                        <div>
                            <form-label-input :disabled='accountManage.disabled' v-if="userInfo.techInfo" :value="userInfo.techInfo.empName" @updata="integrationDate" name="financialNo" input-width="143px" label="真实姓名"></form-label-input>
                        </div>
                           
                        <div>
                            <form-label-input :disabled='accountManage.disabled' v-if="userInfo.techInfo" :value="matchPosition(userInfo.techInfo.hrPositionId)" @updata="integrationDate" name="financialNo" input-width="143px" label="职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位"></form-label-input>
                        </div>

                        <div>
                            <form-label-input :disabled='accountManage.disabled' v-if="userInfo.roleInfo" :value="modifyRoleName(userInfo.roleInfo)" @updata="integrationDate" name="financialNo" input-width="143px" label="角&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色"></form-label-input>
                        </div>

                        <div>
                            <form-label-input :disabled='accountManage.disabled' v-if="userInfo.techInfo" :value="userInfo.techInfo.code" @updata="integrationDate" name="financialNo" input-width="143px" label="员工编号"></form-label-input>
                        </div>
                        <div>
                            <form-label-input :disabled='accountManage.disabled' v-if="userInfo.techInfo" :value="userInfo.techInfo.workMobile" @updata="integrationDate" name="financialNo" input-width="143px" label="手机号码"></form-label-input>
                        </div>
                       <!--  <div class="btns" v-show="!(accountManage.disabled)">
                            <button>保存</button>
                            <button @click="cancel(this.accountManage,'accountManage')">取消</button>
                        </div> -->
                    </div>
                </div>
                <div v-if='isAdmin'>
                    <div class="division">
                        <hr><span>安全设置</span><hr>
                    </div>
                    <div class="extension text-center teshu">

                        <div style="padding-left:52px">
                            <form-label-input :disabled='true' :value='userInfo.loginId'  name="userId" input-width="143px" label="登录账号"></form-label-input>
                            <a href="javascript:;" @click="betterPassword"  :style="{color:betterPass.input_color}">更改密码</a>
                        </div>

                        <div v-if='isAdmin && !betterPass.disabled' style="margin-left:-5px">
                            <form-label-input :disabled='betterPass.disabled' type='password' @updata="collectModifyPass" name="oldPass" input-width="143px" label="登录密码"></form-label-input>
                        </div>

                        <div style="margin-left:-5px;" v-show="!betterPass.disabled">
                            <form-label-input :disabled='false' type='password' @updata="collectModifyPass" name="newPass" input-width="143px" label="新&nbsp;密&nbsp;&nbsp;码"></form-label-input>

                            <span v-text="betterPass.text" class="prompt"></span>
                            <p style="padding-left:275px;margin-top:8px;">为保障账户安全，建议密码为字母、数字、符号组合,6个字符以上</p>
                        </div>

                        <div style="margin-bottom:20px;margin-left:-5px" v-show="!(betterPass.disabled)">
                            <form-label-input :disabled='false' type='password' @updata="collectModifyPass" name="confirmPass" input-width="143px" label="确认密码"></form-label-input>
                        </div>
 

                        <template v-if='!isAdmin && !betterPass.disabled'> 
                            <div :style="{paddingLeft: paddingLeft}">
                                <template>
                                    <form-label-input :disabled='betterPass.disabled' @updata="integrationDate" name="confirmCode" input-width="143px" label="验&nbsp;证&nbsp;&nbsp;码"></form-label-input>
                                </template>

                                <a href="javascript:;" v-if='!sendBool' @click='sendMsg'>{{sendTxt}}</a>
                                <span v-else style="font-size: 12px;color:orange"><span style="">{{second}}</span>秒后重试</span>
                            </div>
                        </template>
                        <div class="btns" v-show="!(betterPass.disabled)">
                            <button @click="modifyPassword">保存</button>
                            <button @click="cancel(this.betterPass)">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

import btnSelect from "../../../common_component/btn_select.vue";
import formLabelInput from "../../../common_component/form-label-input.vue";
import '../../../../static/js/md5.js'

    export default {
        components:{
            btnSelect,
            formLabelInput
        },
        data(){
            return {
                modifyNum:{
                    disabled:true,
                },
                accountManage:{
                    disabled:true,
                },
                betterPass:{
                    input_background:'#f6f6f6',
                    disabled:true,
                    text:'',
                    input_color:'#39B6E5',
                    oldPass:'',
                    confirmPass:'',
                    newPass:'',
                    inpu_width:'0',
                    confirmCode: ''
                },
                isAdmin: global.isAdmin,
                userInfo:{
                    techInfo:{},
                },
                orgName: '',
                extNum:'',
                sendTxt: '发送',
                second: 60,
                paddingLeft: '30px',
                sendBool: false,
            }
        },
        created(){
            const self = this;
            let timer = null;

            if(!global.user_info){
                timer = setInterval(function() {
                    if(global.user_info){
                        self.userInfo = global.user_info;
                        self.isAdmin = global.isAdmin;
                        self.orgName = global.ourOrgName;
                        clearInterval(timer);
                    }
                }, 100);
            }else{
                self.userInfo = global.user_info;
                self.isAdmin = global.isAdmin;
                self.orgName = global.ourOrgName;
            }

        },
        methods:{
            integrationDate(name,value){
                if(name == 'extNum')this.extNum = value;
                else if(name == 'confirmCode')this.betterPass.confirmCode = value;
                console.log(name,value)
            },

            collectModifyPass(name, value){
                this.betterPass[name] = value;
            },
            accountManagement(){
                // this.accountManage.disabled = !this.accountManage.disabled ;
                // this.accountManage.src = this.accountManage.src == hu ? gr : hu;

            },
            matchPosition(status){
               return util.matchPosition(status)
            },
            modifyRoleName(item){
                //判断角色信息是否有多个
                let roleList = []
                let i = 0;
                while(i<item.length){
                    roleList.push(item[i].roleName)
                    i++;
                }

                return roleList.join(",")
            },
            betterPassword(){
                this.betterPass.disabled = !this.betterPass.disabled;
            },
            modifyPassword(){
                const _this = this;
                if(this.betterPass.confirmPass != this.betterPass.newPass ){
                    this.betterPass.text = '两次密码输入不一致';
                    this.betterPass.inpu_width = '112px';
                }else{
                    this.betterPass.text = '';
                    if(this.isAdmin){  // 管理员改密码
                        const userId = cookie.getCookie('uid');
                        send({
                            url: 'client:/user/password/admin',
                            type: 'put',
                            param: {
                                userId: userId,
                                newPassword: hex_md5(_this.betterPass.newPass),
                                oldPassword: hex_md5(_this.betterPass.oldPass)
                            }
                        }, function(err, res){
                            console.log(res);

                            
                            if(res.status == 200){
                                alert(res.msg, 'success');
                                setTimeout(function(){
                                    window.location = window.location.origin;
                                }, 1500);
                            }else{
                                alert(res.msg);
                            }
                        })
                    }else{
                        // 普通用户修改密码

                        // 验证验证码
                        send({
                            url: 'client:/sms/upd_password/check',
                            type: 'post',
                            param: {
                                phone: _this.userInfo.loginId,
                                code: _this.betterPass.confirmCode
                            }
                        }, function(err, res){
                            if(res.status == 200){
                                const ticket = res.content[0].id;
                                // 修改密码
                                send({
                                    url: 'client:/user/password',
                                    type: 'put',
                                    param: {
                                        ticket: ticket,
                                        phone: _this.userInfo.loginId,
                                        newPassword: hex_md5(_this.betterPass.newPass)
                                    }
                                }, function(err, res){
                                    
                                    if(res.status == 200){
                                        alert(res.msg, 'success');
                                        setTimeout(function(){
                                            window.location = window.location.origin;
                                        }, 1500)
                                    }else{
                                        alert(res.msg);
                                    }
                                });
                            }else{
                                alert(res.msg);
                            }
                        })
                    }
                }
            },
            sendMsg(){
                const _this = this;
                let timer = null;
                // 发送短信
                send({
                    url: 'client:/sms/upd_password',
                    type: 'post',
                    param: {
                        phone: _this.userInfo.loginId
                    }
                }, function(err, res){
                    if(res.status == 200){
                        _this.sendBool = true;
                        _this.paddingLeft = '62px';
                        timer = setInterval(function(){
                            _this.second--;
                            if(_this.second <= 0 ){
                                _this.paddingLeft = '30px';
                                _this.second = 30;
                                _this.sendBool = false;
                                clearInterval(timer);
                            }
                        }, 1000);
                    }else{
                        alert(res.msg);
                    }
                    console.log(err, res);
                });
            },
            modifyNumSave(){
                const self = this;
                send({
                    type:'put',
                    url:'client:/user/ext?extNum=' + this.extNum
                },function(err,res){
                    if(err)return console.log(err);
                    if(res.status == 200){
                        console.log(res);
                        alert(res.msg, 'success');
                        self.modifyNum.disabled = true;
                        self.userInfo.extNum = self.extNum
                    }else{
                        console.log(res);
                        alert(res.msg);
                    }
                });
            },
            cancel(){
                this.betterPass.disabled = !this.betterPass.disabled;
            },
            returnHome(){
                this.$router.push('/LoginFinish/' + ConfigPage.returnHome());
            }
        }
    }

</script>
<style scoped>

    .container {
        min-width: 1170px !important;
    }
    .thumbnail{
        padding-right: 12px;
        position: relative;
    }
    .thumbnail,.panel{
        background-color: transparent;
        border-width: 0
    }
    .caption h3{
        font-size: 14px;
        color: #333333;
        line-height: 14px;
    }
    .caption p{
        font-size: 12px;
        color: #333333;
        line-height: 12px;
    }
    .caption img{
        cursor: pointer;
    }
    .division {
        overflow: hidden;
        margin: 24px 0 12px 0;
    }
    .division span{
        float: left;
        font-size: 14px;
        color: #333333;
        line-height: 14px;
        padding: 0 4px;
        width: 8%;
        text-align: center;
    }
    .division hr{
        margin: 0;
        float: left;
        width: 46%;
        height: 1px;
        background: #E0E0E0;
        margin-top: 6px;
    }
    .division a{
        display: block;
        clear: both;
        text-align: center;
        margin-top: 20px;
    }
    .extension{
        padding: 24px;
        background-color: #fff
    }
    .extension >div{
        margin-bottom: 8px;
    }
    .extension >div:last-child{
        margin: 0;
    }
    .extension label{
        font-size: 14px;
        color: #333333;
        line-height: 14px;
    }
    .extension a{
        font-size: 12px;
        color: #39B6E5;
        line-height: 12px;
        margin-right: 6px;
    }
    .extension p{
        font-size: 10px;
        color: #999999;
        line-height: 10px;
        margin-bottom: 12px;
    }
    .extension .setbtn_width{
        width: 118px;
        text-align: left;
    }
    .extension input[type="text"]{
        width: 143px;
        background: #F6F6F6;
        border-width: 0 ;
        text-indent: 4px;
        font-size: 12px;
        color: #999;
        line-height: 12px;
        padding: 5px;
    }
    .teshu input[type="text"]{
        margin-bottom: 4px;
    }
    .gotoHome{
        position: absolute;
        right: 0;
        font-size: 12px;
        color: #39B6E5;
        line-height: 12px;
        background: url('../../../assets/img.png') no-repeat 0 -278px;
        padding-left: 30px;
        margin-top: 10px;
    }
    .btns{
        text-align: center;
        margin-top: 30px !important;
    }
    .btns button:nth-child(1) {
        margin-right: 42px;
    }
  
    .prompt{
        position:absolute;
        margin: 7px 0 0 5px;
        font-size: 10px;
        color: #FF6B0E;
        line-height: 10px;
    }
    .btn-group{
        padding: 0;
    }
    .img{
        display: block;
        margin: 0 auto;
    }
</style>
