<template>
    <div class="call">
        <div class="header" v-if="type =='login'">
            <!-- <i class="img Contacts"></i> -->
            <input type="number" placeholder="请输入电话号码" v-model='iphone'>

            <button 
                :class="dialStatus === 'error' ? 'status_boda' :'status_guaduan' " 
                class="call_dial"  
                @click.prev.stop=" call_dial  " >
                    {{dialStatus === 'error' ? '拨打' :'挂断'}}<img src="../../../assets/boda.png" height="16" width="16" >
            </button>

            <!-- <button :disabled=" type !='login' ? true:false "   @click.stop.prevent="call_dial"><i class="img Calling" style="cursor: pointer;"></i></button> -->
          <!--   <img src="../../../assets/pause_No.png" height="22" width="22" alt=""> -->
        </div>
        <p v-else v-html="'点击登录网梭呼叫中心<br/><small>当前分机号:' + (userInfo.extNum ? userInfo.extNum :'暂无话机') + '</small>'"></p>   
        <div class="footer">
            <button class="btn " :class="type == 'not_logged_in' ? 'btn-success': 'btn-danger' " @click.stop.prevent="call_login" v-text="text"></button>
        </div>
    </div>
</template>



<script>

import {CallCenterSocket} from "./callPhone.js";

    export default{
        props:['current','userInfo',"dialStatus"],
        data(){
            return {
                text:'登录',
                dial:"error",
                type:'not_logged_in',
                iphone:'',
                extNum:''
            }
        },
        mounted(){

            const self = this;

            this.$nextTick(function(){
               
                let callCenterSocket = new CallCenterSocket(self);
                callCenterSocket.callCenter();

                
            });
           
        },
        methods: {
            call_login(){
                CallCenterSocket.call_login(this);
            },
            //拨打电话
            call_dial(phone){
                console.log( this.dialStatus)
                if(this.dialStatus != 'error'){
                    CallCenterSocket.call_hangup();
                }else{
                    CallCenterSocket.call_dial(this.iphone);
                }
            }
        }
    }
</script>
<style scoped>
    .img{
        display: inline-block;
        vertical-align: bottom;
    }
  
    .call .header {
        padding: 13px;
        width: 200px;
        overflow: hidden;
    }
    .call p{
        color:#FF6B0E;
        margin-top: 10px;
        padding: 0 30px;
        font-size: 14px;
        position: relative;
        margin-bottom: 38px;
    }
    .call p:after{
        content:'☟☟';
        position: absolute;
        bottom: -24px;
        left: 93px;
    }
  
    .call .header input{
        width: 122px;
        font-size: 12px;
        color: #999999;
        line-height: 12px;
        padding: 5px 8px;
        background: rgb(207, 228, 251);
        border-width: 0;
        box-shadow: 0 0 0 transparent;
        border-radius:4px 0 0 4px;
        float: left;
    }
    .call .header input:disabled{
       background: #DBDFE3 !important
    }
    .call .content{
        padding: 24px 0; 
    }

    .call .content button{
        color: #999999;
        border-width: 0;
        background-color: #eee;
    }
    .CallCenter .dropdown-menu{
        padding: 12px 10px !important;
        width: 265px;
        border-width: 0;
        left: -180px;
        height: 115px;
        padding-right: 0;
        margin-left:-20px;
    }
    .call .footer{
        text-align: center;
        margin: 18px 0;
    }
    .call_dial{
        border-width: 0;
        padding:4px 6px;
        color: #fff;
        background: #d8d8d8;
        font-size: 12px;
        line-height: 12px;
        vertical-align:bottom;
        float: left;
        border-radius: 0 4px 4px 0
    }
    .call_dial img{
        vertical-align: bottom;
    }
    .status_boda:hover{
        background: #9fe053;
    }
    .status_boda{
        background: #449d44;
    }
    .status_guaduan:hover{
        background: #ff4741;
    }
    .status_guaduan{
        background: #d9534f;
    }

</style>