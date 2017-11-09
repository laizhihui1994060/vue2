<template>
    <div>
        <div id="message" @click.stop.prevent="">
            <span class="messageNum" v-if="messageNum" v-text="messageNum"></span>
            <img class="jingl" status="message_usual_right" src="../../assets/message_usual_right.png" height="52" width="42" alt="">
            <div class="notification">
                <i class="img delete"></i>
                <span></span>
            </div>
            <div class="Details_wrap">
                <ul>
                    <li><a href="javascript:;" @click='type="JOB"'  :style="{color:type=='JOB' ? '#39B6E5' : '#333'}" >任务反馈</a></li>
                    <li><a href="javascript:;" @click='shareList'  :style="{color:type=='shareMessage' ? '#39B6E5' : '#333'}">分享通知</a><span v-show="shareMessageListNum" v-text="shareMessageListNum"></span></li>
                    <li><a href="javascript:;" @click='timeout'  :style="{color:type=='TIMEOUT_NOT_ACCEPTED' ? '#39B6E5' : '#333'}">超时未接收</a><span v-show="timeoutListNum" v-text="timeoutListNum"></span></li>
                    <li><a href="javascript:;" @click='tagProvider'  :style="{color:type=='PROVIDER_ORDER' ? '#39B6E5' : '#333'}">服务商订单</a><span v-show="providerListNum" v-text="providerListNum"></span></li>
                    <li  style="border-width:0"><a href="javascript:;" @click='orderImport'  :style="{color:type=='ORDER_IMPORT' ? '#39B6E5' : '#333'}">订单导入</a><span v-show="orderImportListNum" v-text="orderImportListNum"></span></li>
                    <li><a href="javascript:;" @click='type="OTHER"'  :style="{color:type=='OTHER' ? '#39B6E5' : '#333'}" v-if="false">其他通知</a></li>
                </ul>
                <div class="pull-left Details">
                    <ul class="Details_list">
                        
                        <li v-if="type=='JOB'"   v-for='(item,index) in jobMessages'>
                            <div>
                                <a href="javascript:;" :order-id='item.orderId' :job-id='item.jobId' @click='read_msg(item,index,index)'>{{item.title}}</a>
                                <span :msg-status='item.status' :class="{msgRead:item.status == 'read',msgReceived:item.status=='received'}"></span>
                                <button type="button" class="close li_delete" @click='delete_item(jobMessages,item,index)'><b aria-hidden="true">&times;</b></button>
                            </div>
                        </li>
                        <li v-if="type=='JOB' && !jobMessages.length">
                            <h4 class="text-center" href="javascript:;">你暂无任务反馈</h4>
                        </li>


                        <li v-if="type=='shareMessage'"   v-for='(item,index) in shareMessageList'>
                            <div>
                                <a v-if="item.approveStatus == 'BID_APPROVING' " href="javascript:;" @click='shareClick(item,index)' v-text="'你有新订单('+ item.orderCode +')未审核'"></a>
                                <a v-if="item.approveStatus == 'BID_APPROVED' " href="javascript:;" @click='getShareMan(item,index)' v-text="'你有一个分享订单('+ item.orderCode +')被接收'"></a>
                            </div>
                        </li>
                        <li v-if="type=='shareMessage' && !shareMessageList.length">
                            <h4 class="text-center" href="javascript:;">你暂无分享通知</h4>
                        </li>



                        <li v-if="type=='TIMEOUT_NOT_ACCEPTED'" v-for='(item,index) in timeoutList' >
                            <div>
                                <a href="javascript:;" @click='timeoutClick(item,index)' v-text="(item.driverName ? item.driverName : '' )+ '（人）超时未接受' +(item.shareActionType ? '分享': '新任务' ) +'订单：' + item.orderCode"></a>
                            </div>
                        </li>
                        <li v-if="type=='TIMEOUT_NOT_ACCEPTED' && !timeoutList.length">
                            <h4 class="text-center" href="javascript:;">你暂无超时未接受订单</h4>
                        </li>


                        <li v-if="type=='PROVIDER_ORDER'" v-for='(item,index) in providerList' >
                            <div>
                                <a href="javascript:;" @click='providerClick(item,index)' v-text="item.partnerCompany + '（公司）' + item.createByName + '（人）给你派了新订单:' + item.orderCode"></a>
                            </div>
                        </li>
                        <li v-if="type=='PROVIDER_ORDER' && !providerList.length">
                            <h4 class="text-center" href="javascript:;">你暂无服务商订单</h4>
                        </li>


                        <li v-if="type=='ORDER_IMPORT'" v-for='(item,index) in orderImportList' >
                            <div>
                                <a href="javascript:;" @click='orderImportClick(item,index)' v-text="'你有新订单（' + item.orderCode + '）需要审核'"></a>
                            </div>
                        </li>
                        <li v-if="type=='ORDER_IMPORT' && !orderImportList.length">
                            <h4 class="text-center" href="javascript:;">你暂无订单导入信息</h4>
                        </li>

                        <li v-if="type=='OTHER'">
                            <div v-for='(item,index) in calendarMessages'>
                                <a href="javascript:;" :calendar-id='item.calendarId' @click='read_msg(item,index)'>{{item.title}}</a>
                                <span :msg-status='item.status' :class="{msgRead:item.status == 'read',msgReceived:item.status=='received'}"></span>
                                <button type="button" class="close li_delete" @click='delete_item(calendarMessages,item,index)'><b aria-hidden="true">&times;</b></button>
                            </div>
                        </li>
                        <li v-if="type=='OTHER' && !calendarMessages.length">
                            <h4 class="text-center" href="javascript:;">你暂无其他通知</h4>
                        </li>
                    </ul>
                    <div class="moreInformation">
                       
                    </div>
                </div>

            </div>
           

        </div>

        <select-share ref="selectShare" @delectMsg="delectMsg"/>
        <share-order-check :orderItem="orderItem" :orderId="orderId" :bidId="bidId" @complete="shareComplete" @delectMsg="delectMsg"/>
        
        <audio id="new_task">
            <source src="../new_task.wav" type="audio/mp3"/>
            <source src="../new_task.wav" type="audio/ogg"/>
        </audio>
        <audio id="wshuttleNewsCancel">
            <source src="../wshuttleNewsCancel.mp3" type="audio/mp3"/>
            <source src="../wshuttleNewsCancel.mp3" type="audio/ogg"/>
        </audio>
    </div>
            
</template>
<script>
    import {Drag2} from   "../../../static/js/drag.js";
    import selectShare from './selectShare.vue';
    import massage from "./massage.js";
    import shareOrderCheck from "./shareOrderCheck.vue";
    import message_usual_right from "../../assets/message_usual_right.png";
    import messga_special_left from "../../assets/messga_special_left.png";


    export default{
        data () {
            return {
                message: {
                    NEW_ORDER: []
                },
                jobMessages: [],
                calendarMessages:[],
                type:"JOB",
                providerList:[],
                orderImportList:[],
                currentIndex:'',
                timeoutList:[],
                shareMessageList:[],

                jobMessagesNum:0,
                calendarMessagesNum:0,
                timeoutListNum:0,
                providerListNum:0,
                orderImportListNum:0,
                shareMessageListNum:0,

                messageNum:0,

                showShare:true,
                orderItem:{orderVehicles:[{}]},
                bidId:'',
                orderId:'',
                elements:null

            }
        },
        mounted(){

            const self = this;

            self.$nextTick(function(){

                new massage($('#message'),self);  //小精灵连接socket
                this.elements = $('.jingl');


                new Drag2( 'message' ); //小精灵开启拖拽

                document.addEventListener('click',function(){
                    $('.Details_wrap').hide();
                    self.type="JOB";
                });
                // 事件委托
            });

        },
        created(){
            this.timeout('',true);
            this.tagProvider('',true);
            this.orderImport('',true);
            this.shareList('',true);

        },
        methods:{
            delectMsg(type){
                console.log(type)
                if(type == 'NEW_ORDER'){
                    this.tagProvider('',true);
                }else if(type == 'ORDER_IMPORT'){
                    this.orderImport('',true);
                }else if(type == 'TIME_OUT'){
                    this.timeout('',true);
                }else if(type == 'CHECK_ORDER'){
                    this.jobMessages.splice(this.currentIndex,1);
                }else if(type == 'shareMessage'){
                    this.shareList('',true);
                }

            },
            delete_item(messages,item,index){
                console.log(item);
                send({
                    url: 'message:/message/clear',
                    type: 'delete',
                    param: [{
                        id: item.msgId,
                        platform: 'towing_platform_web',
                        time: (new Date()).valueOf(),    // 时间戳
                        remark:"浏览器清楚消息"
                    }]
                }, function(err, res){
                    item.status='read';
                });
                messages.splice(index,1);

            },
            shareComplete(){
                this.shareMessageList.splice(this.currentIndex,1);
                this.shareMessageListNum = this.shareMessageList.length;
            },
            shareClick(item,index){

                const self = this;
                self.currentIndex = index;
                send({
                    type:'get',
                    url:'client:/share/order?shareActionId=&bidId=' + item.bidId
                },function(err,res){
                    if(err)return alert('服务器出错，请联系管理员');
                    if(res.status == 200){
                        self.orderItem = res.content[0];
                        self.bidId = item.bidId;
                        $('#shareOrderCheck').modal('show');
                    }else{
                        console.log(res);
                        alert(res.msg);
                    }
                });
                
            },
            shareList(ev,no){
                if(!no)this.type="shareMessage";
                const self = this;
                send({
                    type:'post',
                    url:'order:/share/notice',
                    param:{
                        pageSize :10000000,
                        pageIndex :1,
                    }
                },function(err,res){
                    if(err)return alert('服务器出错，请联系管理员');
                    if(res.status == 200 || res.status == 404 ){
                        self.shareMessageList = res.content ? res.content :[];
                        self.shareMessageListNum = self.shareMessageList.length;
                    }else{
                        console.log(res);
                    }
                });
            },
            timeout(ev,no){
                if(!no)this.type="TIMEOUT_NOT_ACCEPTED";
                const self = this;
                send({
                    type:'post',
                    url:'order:/order/job/list',
                    param:{
                        pageSize :10000000,
                        pageIndex :1,
                        flag :"EXPIRED_JOB" ,
                        param:{
                        }
                    }
                },function(err,res){
                    if(err)return alert('服务器出错，请联系管理员');
                    if(res.status == 200 || res.status == 404 ){
                        self.timeoutList = res.content ? res.content : [];
                        self.timeoutListNum = self.timeoutList.length;
                    }else{
                        alert(res.msg);
                    }
                });
            },
            tagProvider(ev,no){
                if(!no)this.type="PROVIDER_ORDER";

                const self = this;
                send({
                    type:'post',
                    url:'order:/share/invitations',
                    param:{
                        pageSize :10000000,
                        pageIndex :1,
                        id:'CHECK_SHARE'
                    }
                },function(err,res){
                    if(err)return alert('服务器出错，请联系管理员');
                    if(res.status == 200 || res.status == 404 ){

                        const providerList = res.content ? res.content.map((item,index)=>{
                            return item.shareActionType == 'SHARE_TO_ONE' ?  item : '';
                        }):[];

                        for(let i = 0 ; i < providerList.length;i++){
                            if(providerList[i] == ''){
                                providerList.splice(i,1);
                                --i;
                            }

                        }
                        self.providerList = providerList;
                        self.providerListNum = self.providerList.length;
                    }else{
                        console.log(res.msg);
                    }
                });
            },
            orderImport(ev,no){
                if(!no)this.type="ORDER_IMPORT";
                console.log("import")
                const self = this;
                send({
                    type:'post',
                    url:'order:/order/list',
                    param:{
                        pageSize :10000000,
                        pageIndex :1,
                        flag :'CHECKING_ORDER_LIST' ,
                        param:{}
                    }
                },function(err,res){
                    console.log(res)
                    if(err)return alert('服务器出错，请联系管理员');
                    if(res.status == 200 || res.status == 404 ){
                        self.orderImportList = res.content ? res.content : [];
                        self.orderImportListNum = self.orderImportList.length;
                        
                    }else{
                        console.log(res.msg);
                    }
                });
            },
            providerClick(item,index){
                this.currentIndex = index;
                this.$router.push('/LoginFinish/UnderSingle');
                setTimeout(function() {
                    bus.$emit('NEW_ORDER',item.orderId,item.shareActionId,item.jobType);
                }, 100);
            },
            getShareMan(item,index){
                self.currentIndex = index;

                $('#selectShare').modal('show');
                this.$refs.selectShare.getShareMan(item.shareActionId,{
                    shareActionId:item.shareActionId ? item.shareActionId : '',
                    shareActionType:item.shareActionType ? item.shareActionType : '',
                    orderId:item.orderId ? item.orderId : '',
                    bidId:item.bidId ? item.bidId : ''
                });
            },
            orderImportClick(item,index){
                this.currentIndex = index;
                this.$router.push('/LoginFinish/UnderSingle');
                setTimeout(function() {
                    bus.$emit('ORDER_IMPORT',item.orderId,item.jobType);
                }, 100);

            },
            timeoutClick(item,index){
                this.currentIndex = index;
                this.$router.push('/LoginFinish/UnderSingle');
                setTimeout(function() {
                    console.log(item.orderId,item.jobType)
                    bus.$emit('TIME_OUT',item.orderId,item.jobType);
                }, 100);

            },
            read_msg(item,index){
                console.log(item)
                var self=this;
                 send({
                    url: 'message:/message/read/' + item.msgId,
                    type: 'put',
                    param: {
                        msgId: item.msgId,
                        platform: 'towing_platform_web',
                        time: (new Date()).valueOf(),    // 时间戳
                        remark:"浏览器阅读"
                    }
                }, function(err, res){


                    if(err)return console.log(err);
                    if(res.status == 200){

                        item.status='read';

                        var bool = ConfigPage.isExist(['UnderSingle']) ? true : false;

                        if(bool){
                            if(item.msgType == 'JOB'){
                                if(item.mtId == 'CHECK_ORDER'
                                    ||item.mtId ==  'AUTO_SHARE_NOT_ACCEPT'
                                    ||item.mtId ==  'SHARE_TIMEOUT'
                                    ||item.mtId ==  'REJECT_JOB'
                                    ||item.mtId ==  'TIMEOUT_NOT_ACCEPTED'){
                                    self.currentIndex = index;
                                    self.$router.push('/LoginFinish/UnderSingle');
                                    setTimeout(function() {
                                        bus.$emit('CHECK_ORDER',item.orderId,item.jobType);
                                    }, 100);

                                }else{
                                    self.$router.push({ name: 'orderDetails', params: {orderNumber:item['orderId'],jobId:item['jobId']}});
                                }
                            }else{}


                            switch(self.type){
                                case 'JOB': 
                                    self.jobMessages.splice(index,1);
                                    break;
                                case 'OTHER':
                                    self.calendarMessages.splice(index,1);
                                    break;
                                default: 
                                    break;
                            }
                        }else{
                            return alert('你无权限进行此操作');
                        }
                    }else{

                    }

                });
            },
            CalculateMessageNum(){
                if(!this.elements)return setTimeout(this.CalculateMessageNum, 2000);
                this.messageNum =  parseInt(this.timeoutListNum) + parseInt(this.providerListNum) + parseInt(this.orderImportListNum) + parseInt(this.shareMessageListNum);
                if(this.messageNum && this.elements.attr('status') == 'message_usual_right'){
                    this.elements.attr({
                        src: messga_special_left,
                        status: 'messga_special_left'
                    });
                };

                if(!this.messageNum && this.elements.attr('status') == 'messga_special_left'){
                    this.elements.attr({
                        src: message_usual_right,
                        status: 'message_usual_right'
                    });
                }
            }

        },
        components: {
            shareOrderCheck,
            selectShare
        },
        watch:{
           
            timeoutListNum(){
                this.CalculateMessageNum();
            },
            providerListNum(){
                this.CalculateMessageNum();
            },
            orderImportListNum(){
                this.CalculateMessageNum();
            },
            shareMessageListNum(){
                this.CalculateMessageNum();
            }
        }
    }
</script>

<style>
    #message .messageNum{
        content: '';
        position: absolute;
        width: 40px;
        height: 24px;
        background: red;
        border-radius: 50%;
        bottom: -2px;
        right: -21px;
        text-align: center;
        color: #fff;
        font-size: 10px;
        transform: scale(0.8);
        line-height: 24px;

    }
    .Details_wrap>ul>li span{
        content: '';
        position: absolute;
        width: 40px;
        height: 24px;
        background: red;
        border-radius: 50%;
        top: -2px;
        right: 2px;
        text-align: center;
        color: #fff;
        font-size: 10px;
        transform: scale(0.8);
        line-height: 24px;
    }
    #message .img{
        display: block;
        margin: 0 auto;
    }
    a:visited {
        text-decoration: none  !important;
    }
    a:hover{
        text-decoration: none;
        color: rgb(57, 182, 229)
    }
    #message .btn{
        font-size:12px;
        padding:1px 3px;
        text-align: center;
        background: #fff;
        color: #39B6E5;
        border: 1px solid #39B6E5;
    }
    #message .choose_btns{
        display: none;
        margin-left: 12px;
    }
    #message{
        position: absolute;
        left: 15px;
        top: 300px;
        z-index: 888888;
        width: 42px;
        height: 52px;
        cursor: pointer;
    }
    .notification{
        width: 242px;
        height: 61px;
        background: url('../../assets/messga_box_usual_left.png') no-repeat;
        clear: both;
        padding: 17px 16px;
        line-height: 14px;
        position: relative;
        top: -8px;
        left: -7px;
        display: none;
        font-size: 12px;
        cursor: pointer;
    }
    .notification span{
        font-size: 12px;
        color: #333333;
        line-height: 12px;
    }
    .Details_wrap{
        position: absolute;
        left: -12px;
        top: 41px;  
        width: 358px;
        display: none;
    }
    .Details_wrap>ul{
        background: url('../../assets/message_bg_left.png') 6px 0px / 143px 209px;
        width: 138px;
        height: 210px;
        float: left;
        padding: 10px 0px 0px 7px;
    }
    .Details_wrap>ul>li{
        text-align: center;
        border-bottom: 1px solid #f6f6f6;
        position: relative;
        margin-left: 10px;
    }
    .Details_wrap>ul>li:last-child{
        border: none
    }
    .Details_wrap>ul>li>a{
        font-size: 12px;
        color: #333333;
        display: block;
        padding: 9px 24px;
    }
    .Details_wrap .Details_list{
        width: 220px;
        height: 184px;
        overflow: auto;
        overflow-x: hidden;
        background: rgb(236, 231, 231);
        margin: 0;
        position: relative;
        z-index: 777;
        padding-top: 3px

    }
    .Details_wrap .Details{
        position: relative;
        border-radius: 5px 0 0 5px;
        padding-top: 10px;
    }
    .Details_wrap .Details_list li{
        padding: 8px 12px;
        border-bottom: 1px solid #fff;
        position: relative;
    }
    .Details_wrap .Details_list .active{
        border-top: 1px solid #c9c9c9;
        border-bottom: 1px solid #c9c9c9;
    }
    .Details_wrap .Details_list .active a{
        color: #39B6E5;
    }
    .Details_wrap .Details_list li a{
        font-size: 12px;
        color: #333333;
        line-height: 14px;
        display: inline-block;
    }
    .Details_wrap .Details_list li a:hover{
        color: rgb(57, 182, 229)
    }
    .Details_wrap .Details_list li span{
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: red;
        position: absolute;
        right: 12px;
        top: 15px;
    }
    .moreInformation{
        width: 212px;
        position: absolute;
        top: 0;
        left: -211px;
        background: #F5F5F5;
        padding: 12px 18px 12px 30px;
        box-sizing: border-box;
        border: 1px solid #c9c9c9;
        overflow: hidden;
        display: none;

    }

    .moreInformation .close{
        position: absolute;
        top: 0;
        opacity: 1;
        border-width: 0;
        opacity: 0.23;
        background: transparent;
        left: 2px;
    }
    .moreInformation h5{
        margin: 0 0 24px  0;
    }
    .moreInformation .splitLine{
        height: 24px;
    }
    .moreInformation label,.moreInformation span{
        color: #333333 !important;
        font-size: 12px;
        line-height: 12px;
    }
    .moreInformation label{
        float: left;
        margin: 0;
    }
    .moreInformation span{
        float: left;
        width: 100px;
        margin-bottom: 12px;
    }
    #message .li_delete{
        position: absolute;
        right: 1px;
        top: -2px;
        font-size: 14px;
    }
    /* 设置滚动条的样式 */
    ::-webkit-scrollbar {    
        width: 8px;
        background: #fff
    }/* 滚动槽 */
    ::-webkit-scrollbar-track {    
        -webkit-box-shadow: inset 0 0 3px #eee;
        border-radius: 3px;
        width: 8px;
    }/* 滚动条滑块 */
    ::-webkit-scrollbar-thumb {    
        border-radius: 3px;    
        width: 8px;
        
        background: rgba(0,0,0,.4);    
        -webkit-box-shadow: inset 0 0 3px #e0e0e0;
    }
    ::-webkit-scrollbar-thumb:window-inactive {    
        background: rgba(0,0,0,1); 
    }
    .Details_wrap li a:hover
    .Details_wrap .Details_list li .msgReceived{
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: red;
        position: absolute;
        right: 30px;
        bottom: 18px;
    }
    .Details_wrap .Details_list li .msgRead{
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #333;
        position: absolute;
        right: 30px;
        bottom: 18px;
    }
    #message .delect{
        position: absolute;
        right: 22px;
        top: 15px;
    }
</style>