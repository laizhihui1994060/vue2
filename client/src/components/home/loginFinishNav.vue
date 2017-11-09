<template>
    <div class="container-fluid">
        <div class="row">

            <nav class="nav" role="navigation">
                <div class="col-xs-11 col-xs-offset-1" style="display:flex;justify-content: space-between;">
                    <div class="header" @click='gotoHome'>
                        <a href="javascript:;" style="position: relative;top:8px;float:left">
                            <img :src="config.logo" alt=""  width="38" height='29'>
                        </a>
                        <a class="setHeight" href="javascript:;">
                            <h1 class="title" v-text="config.PlatformName + config.build"></h1>
                        </a>
                    </div>

                    <div class="pull-left currentCall">
                        <p id="callUser"></p>
                        <button @click="call_dial" style="display:none" id="currentCallOperation" class="btn btn-success" :class=" dialStatus != 'success' ? 'btn-success': 'btn-danger' ">
                            {{dialStatus === 'success' ? '挂断':'拨号'}}<img src="../../assets/boda.png" height="16" width="16" >
                        </button>
                    </div>
             
                    <ul class="nav-right">
                        <li class="CallCenter">
                           <!--  <div class="pull-left hujiao">
                                <span class="num_col">2</span>
                            </div> -->
                            <a href="javascript:;" 
                                class="pull-left  dropdown-toggle" 
                                style="padding-top:0" 
                                :data-toggle="callConnectionState != 'error' ? 'dropdown' :''" 
                                :title="callConnectionState == 'error' ? '你还暂无交换机，无法连上呼叫中心' :'点击开始操作呼叫中心'" >
                                    <img :src="callPhoneImg" height="21" width="24">
                            </a>
    
                            <div class="dropdown-menu" style="margin-left:-68px">
                                <component :dialStatus="dialStatus" :is="currentView" :current="currentView" @watchStatus="watchStatus" @changeDialStatus="(val)=> dialStatus=val "  @changeStatus="(img)=>callPhoneImg = img" :userInfo="user_info"></component>
                            </div>
                        </li>
                       
                        <li class="contacts_parent">
                            <a href="javascript:;" class="dropdown-toggle img geren" data-toggle="dropdown">
                            </a>  
                            <div class="dropdown-menu" style="max-height:600px;width:300px;margin-left:-120px;" @click.prev.stop="">
                                <component :dialStatus="dialStatus" :is="currentphoneView" @changeView="changeView" :data="data"  @changeStatus="(img)=>callPhoneImg = img" :callConnectionState="callConnectionState"  :userInfo="user_info"></component>
                            </div>                                            
                        </li>
                        <!-- 日历 -->
                        <li data-toggle="tooltip" data-placement="bottom" title="查看日历">
                            <router-link to="/LoginFinish/calendar" class="img Calendar">
                            </router-link>
                        </li>
                        <!-- '<span class="setWidth" data-toggle="tooltip" data-placement="top" title="' + content +'">'+ content +'</span>' -->
                        <li data-toggle="tooltip" data-placement="left" :title="tooltipContent">
                            <a href="javascript:;" class="userInfo dropdown-toggle clearfix" data-toggle="dropdown"  @click="watchClick">
                                <div class="pull-left setpadding img head">
                                </div>
                                <div  class="pull-left">
                                    <span class="name" v-text="user_name"></span><br>
                                    <span class="ipone" v-text="user_iphone"></span>
                                </div>
                            </a>
                            <ul class="dropdown-menu setWidth"style="width: 129px;" @mouseover.stop.prevent="">
                                <li>
                                    <router-link to="/LoginFinish/PersonalCenter">个人中心</router-link>
                                </li>
                                <li><a href="javascript:;"  data-toggle="modal"  data-target="#push_order_model" >微信接口</a></li>
                                <li><a href="javascript:;"  data-toggle="modal"  data-target="#myCode" >我的编码</a></li>
                                <li>
                                    <a href='javascript:;' @click='exit'>登出</a>
                                </li>
                                <!-- <li><a href="javascript:;">设置</a></li> -->
                            </ul>
                        </li>

                        <li>
                            <router-link to="/LoginFinish/systemSettings" class="img set">
                            </router-link>
                        </li>

                        <li style="border-right:none">
                            <router-link to="/LoginFinish/help" class="img Help" style='top:3px'>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <push-order-model/>
        <myCode/>
    </div>
</template>

<script>

import callCenter from "./contacts/callCenter";
import client from "./contacts/client.vue";
import addclient from "./contacts/add_client.vue";
import pushOrderModel from "./push_order_model.vue";
import myCode from "./myCode.vue";

import disabled_phone from "../../assets/disabled_phone.png";
import success_phone from "../../assets/d_hujiao.png";

import {CallCenterSocket}  from "./contacts/callPhone.js";

  export default {
    
    components:{
        callCenter,
        client,
        addclient,
        pushOrderModel,
        myCode
    },
    data(){
        return {
            currentView:'call-center',
            currentphoneView:'client',
            contacts_status:'',
            user_name:'',
            user_iphone:'',
            data:{},
            isShow:false,
            tooltipContent:'',
            config:config,
            callConnectionState:'error',
            callPhoneImg:disabled_phone,
            user_info:{},
            dialStatus:"error",
            
        }
    },
    methods: {
        watchStatus(status){
            this.callPhoneImg = status == 'error' ? disabled_phone:success_phone;
            this.callConnectionState = status;

        },
        gotoHome(){
            this.$router.push('/LoginFinish/' + ConfigPage.returnHome());
        },
        watchClick(){
            this.isShow = $('object').length ? false : true;
        },
        exit(){
            socket.disconnect();
            window.location = window.location.origin;

            //     var param = {
            //         sourceType : 'WEB',
            //         lng : 0,
            //         lat : 0,
            //         sid : socket.id
            //     }


                // ajax('/login_out', "POST", param, function(res){
                //     console.log(res);
                //     if(res.status === 200){
                //         window.location = window.location.origin;
                //     }else{
                //         alert(res.msg);
                //     }
                // });

        },
        changeView(view,data){
            this.data = data;
            this.currentphoneView = view;
        },
        call_dial(){

            if(this.dialStatus != 'error'){
                this.userInfo = this.user_info;
                CallCenterSocket.call_hangup();
            }else{
                CallCenterSocket.call_dial(null);
            }
        }
    },
    created(){
        const self = this;
        var uid = cookie.getCookie('uid');
        send({
            type:'post',
            url:'client:/user/detail',
            param:{
              "userIdList": [{"id": uid}]
            }
        },function(err,res){
            console.log(err,res)
            if(err)return console.log(err);
            if(res.status == 200){
                console.log(res)
                global.user_info = res.content[0];
                self.user_info =  res.content[0];
                bus.$emit('userInfoAquired',true)
                self.tooltipContent =   `姓名：${user_info.techInfo.empName}<br/>电话：${user_info.techInfo.workMobile}<br/>分机号：${user_info.extNum ? user_info.extNum :''}<br/>职位：${util.matchPosition(user_info.techInfo.hrPositionId)}<br/>用户名：${user_info.loginId}<br/>公司：${user_info.orgInfo.name}`　　    　　　　　

                self.user_name = user_info.techInfo.empName
                self.user_iphone = user_info.techInfo.workMobile;

                global.ourOrgId = res.content[0].orgId;
                global.tenantId = res.content[0].tenantId;
                global.ourOrgName = res.content[0].orgInfo.name;
                global.userId = res.content[0].userId;
                global.isAdmin = res.content[0].isAdmin;
                global.extNum = res.content[0].extNum;

                self.$nextTick(function(){
                    $(".nav [data-toggle='tooltip']").tooltip({
                        html: true
                    });
                })

            }else{
                console.log(res);
                alert(res.msg);
            }
        });
    },
    mounted() {
        this.$nextTick(()=>{

            document.title = this.config.PlatformName;

            $('body').click(function(event) {
                $('#phone-menu-list').hide();
            });

        })
    },
    
  }
</script>

<style scoped>
    .logo{
        float: left;

    }
    #dropdownContacts{
        overflow-x: visible;
        max-width: 77px;
        padding: 0
    }
    .about_contacts{
        position:absolute;  
        margin-left:-301px;                 
        width:300px;
        height:408px;
        display:none;
    }
    
    #dropdownContacts li a {
        padding: 8px 8px;
    }
    .container-fluid > .row{
        margin: 0;
    }
    .title{
        font-size: 20px;
        color: #C9C9C9;
        letter-spacing: 0px;
        margin: 0;
    }
   
    .userInfo .setpadding{
        margin: 6px;
    }
    .navbar-nav > li > a{
        padding-top: 10px; 
        padding-bottom: 10px;
    }
    .userInfo{
        display: block;
        overflow: hidden;
        padding: 2px 8px 0 4px !important; 
        font-size: 12px;
        color: #C9C9C9;
        margin: 0 !important;
    }
    .CallCenter .dropdown-menu{
        min-width: 120px;
    }
    .dropdown-menu{
        left: auto;
    }
    .dropdown-menu .divider{
        margin: 0;
    }
    .dropdown-menu > li > a{
        padding: 8px 20px;
        text-align: center;
        font-size: 12px;
        color: #333333;
        line-height: 12px;
    }
    .setHeight{
        height: 46px;
        float: left;
        padding: 12px 15px;
        font-size: 18px;
        line-height: 20px;
    }
    .setHeight >a {
        color: #fff;
        text-decoration: none;
    }
    .container {
        min-width: 1170px !important;
    }
    nav{
/*        min-width:1200px; */
        min-height: 46px;
        background-color: #222;
        position: relative;
    }
    .header{
        float: left
    }
    .nav-right{
        float: right !important;
        margin: 0;
    }
    .nav-right > li{
        float: left;
        border-right: 1px solid #666;
        height: 46px;
    }
    .nav-right > li >a{
        line-height: 20px;
        position: relative;
        display: block;
        margin: 11px 20px;
    }
    .nav > li > a:hover{
        color: #39B6E5;
        border-bottom: 3px solid #39B6E5;
        border-radius: 0;
        padding: 10px 0;
        background-color: transparent;
    }
  
    .nav .open > a, .nav .open > a:hover, .nav .open > a:focus {
        background-color: #222;
        border-color: #337ab7;
    }
    .setborderBg{
        background-color: #fff;
    }
    .pull-left{
        padding-top: 3px
    }
    .set{
        margin-top: 16px !important;
    }
    .hujiao{
        line-height: 42px;
    }
    .hujiao .num_col{
        font-size: 18px;
        color: #FF6B0E;
        line-height: 14px;
    }
    
    .currentCall{
        margin-top: 9px;
        width: 300px;
        overflow: hidden;
    }
    #callUser{
        color: #fff;
        display: inline-block;
        position: relative;
    }
   
</style>