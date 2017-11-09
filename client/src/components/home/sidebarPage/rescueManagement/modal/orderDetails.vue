<template>

<!-- Modal -->
    <div id="orderDetails" >
        <div class="orderDetails-left">
            <order-details  :order-id="orderId" :job-id="jobId"/>
        </div>
        <div class="orderDetails-right">

            
            <div class="setborder">
                <ul class="nav nav-pills" role="tablist" id="tag" v-if="users && users.length">
                    <li v-for="(user,index) in users" role="presentation"  :class="{'active':oIndex == index}" @click="toggleContent(user,index)" style='width:282px'>
                        <a href="javascript:;">
                            <h5 v-text="user.driverName"></h5>
                            <span v-text="(user.driverPhone ?user.driverPhone :'') + '/' + (user.plateNo ? user.plateNo : '') "></span>
                        </a>
                    </li>
                </ul>
                <ul id="tag" v-else>
                     <li class="active text-center" >
                        <a href="javascript:;">
                            <h5 style="line-height:4px;">暂无技师信息</h5>
                        </a>
                    </li>
                </ul>
                
                <div id="taskNode" class="com-node clearfix">
                    <p v-text="text" class="tishiyu"></p>
                    <h3 v-if="!obj.nodes || !obj.nodes.length" class="text-center tishiyu" style="text-align:center;margin-bottom:50px;font-size:26px;">暂无节点信息</h3>
                    <div class="zhixian pull-left" v-else>
                        <div class="circle_wrap" v-for="(node,index) in obj.nodes" >
                            <div class="circle"></div> 
                            <span v-if="index!==obj.nodes.length-1"></span>
                        </div>
                    </div>
                    <ul class="node pull-right">
                       <li  v-for="node in obj.nodes">
                           <div class="pull-left taskNode-info">
                                <p class="sp" v-text="node.reportedType == 'AGENT' ? match(node.status) + '（调度员完成报数）': match(node.status)"></p>
                                <span class="ss"  v-text="getLocalTime(node.actionTime)"></span>
                           </div>
                           <div class="pull-right fnbtn" v-if="node.reportedType != 'AGENT'">
                                <a href="javascript:;" v-if="node.gpsLocation && node.gpsLocation.x && node.gpsLocation.y"  @click="addMark([node.gpsLocation.x,node.gpsLocation.y],node.address,match(node.status))">
                                    <i class='img poin'></i>
                                </a>
                                <a href="javascript:;" v-else style='position:relative;right:2px;' title='此节点暂无GPS坐标'>
                                    <img width="22" height='22' src = "../../../../../assets/point.png"></img>
                                </a>
                           </div>
                       </li>
                    </ul>
                </div>  

            </div> 

            <template>
                <technician-info :partnerInfo="partnerInfo"  :order-id="orderId" :job-id="jobId" :obj="obj" :oHeight="oHeight"/> 
            </template>
           
        </div>
    </div>
</template>

<script>


    import orderDetails from "../orderDetails-currentView/orderDetails.vue";
    import technicianInfo from "../orderDetails-currentView/technicianInfo.vue";
    import {openInfo} from "../../../../../common_component/map.js";

    export default {
        mounted(){
            console.log(this.$route.params);
            const self = this;
            this.$nextTick(function(){
                $('.container-fluid')[0].style.height="100%";
                document.querySelector('.container-fluid > div').style.height="100%";
                $('#orderDetails').height($('.container-fluid').height() - 46);
                self.oHeight = ($('.orderDetails-right').height() - $('#order_info_footer').height() );
            });
        },
        components: {
            orderDetails,
            technicianInfo,
        
        },
        data () {
            return {
                currentView:'technician-info',
                users:[],
                orderId:'',
                jobId:'' ,
                oIndex:0 ,
                oHeight:0,
                obj:{
                    nodes:[]
                },

                partnerInfo: null
            }
        },
        methods:{
            lunxunAjax(users,num,resolve){
                if(!users.length)return resolve(users);
                console.log( users[num].jobId )
                const self = this;
                send({
                    url:'order:/order/job/nodes/' + users[num].jobId,
                    type:'get'
                },function(err,res){
                    if(err)return console.log(res);
                    if(res.status == 200 || res.status == 404 ){
                        console.log(res)
                        var newArr = [];
                        var nodes = res.content;
                        nodes.forEach(function(it,index){
                            nodes[index].photo = [];
                            newArr.push(it.towDriverActionId);
                        });
                        console.log("newArr",newArr)
                        send({
                            type:'post',
                            url:'control:/tow/driver/photo/list',
                            param:newArr
                        },function(err,res){
                            if(err)return alert('服务器出错，请联系管理员');
                            if(res.status == 200){
                                console.log('~~~~~~~~~~',res)

                                if(res.content && res.content.length)nodes[0].photo = res.content;

                                users[num].nodes = nodes;
                                num + 1 === users.length ? resolve(users) : self.lunxunAjax(users,++num,resolve);
                            }else{
                                users[num].nodes = nodes;
                                num + 1 === users.length ? resolve(users) : self.lunxunAjax(users,++num,resolve);

                            }
                        });


                    }else{
                        console.log(res);
                        alert(res.msg);
                    }
                });
            },
            toggleContent(item,index){
                this.obj = item;
                this.oIndex  = index;
            },
            getLocalTime(ns){
                return util.getLocalTime(ns);
            },
            match(status){
                return util.matchTackNode(status);
            },
            addMark(point,address,status){

                let info = `<div style="font-size:18px;color:#FF6B0E">${status}</div>
                            <div><b>当前地址:</b>${address}</div>
                            <div><b>当前坐标:</b>${point[0].toFixed(6) + ',' + point[1].toFixed(6)}</div>;`

                openInfo(info,point)
            },
            getData(){
                const self = this;

                let promise = new Promise( (resolve, reject) => {
                    send({
                        type:'get',
                        url:'order:/order/job/drivers/' + this.orderId
                    },function(err,res){
                        if(err)return console.log(err);
                        if(res.status == 200 || res.status == 404){
                            const users = res.content ? res.content : [];
                            console.log(res)
                            resolve(users);
                        }else{
                            console.log(res)
                            alert(res.msg);
                        }
                    })
                }).then(function(users){
                    return new Promise(function(resolve, reject){
                        self.lunxunAjax(users,0,resolve);
                    });
                }).then(function(res){
                    self.users = res;
                    self.obj = self.users && self.users.length ? self.users[0] : { nodes:[] };

                    console.log(self.users);
                });
            },
            parentFn(){
                this.getData();
            }
        },
        created(){
            this.orderId = this.$route.params.orderNumber;
            this.jobId = this.$route.params.jobId;

            if(this.orderId)this.getData();

            bus.$on('updateDateils',()=>{
                this.getData();
            });

        }


    };



</script>
<style scoped>
    #orderDetails{
        display: flex;
    }
    .setborder{
        position: absolute;
        z-index: 888;
        overflow:auto;
        max-height: 58%;
        box-shadow: 1px 0px 2px #888;
        border-right:1px solid #888;
        ::-webkit-scrollbar: #888;
    }
    .flex{
        display: flex;
        align-items: stretch;
    }
    .orderDetails-left{
        width: 400px;
        background: #fff;
        padding: 10px;
        box-shadow:0px 0px 15px rgba(0, 0, 0, 0.5) ;
        z-index: 889;
        position: relative;
    }
    #tag{
        flex: 1;
        background: #fff;
        box-shadow: 3px 2px 4px rgba(0,0,0,.4);
        border-radius: 0 0 5px 0;
    }
    #tag >li {
        padding: 20px 35px; 
        cursor: pointer;
        background: url(../../../../../assets/dirver.png) no-repeat 20px center ;
        border-bottom: 1px solid rgba(22, 131, 243, 0.27);
        border-right: 1px solid  rgba(22, 131, 243, 0.27);
    }
    #tag >li:last-child{
        border-right-width:0; 
    }
    #tag >li >a{
        background-color: transparent;
        text-align: center;
        font-size: 14px;
        color: #666;
        line-height: 14px;
        padding: 0;
        font-weight: normal;
        overflow: hidden;
    }
    #tag .active{
        background-color: rgb(231, 242, 254);
    }
    #tag >li >a h5{
        font-size: 14px;
        color: #333333;
        margin: 0;
        float: left;
    }
    #tag >li >a span{
        font-size: 14px;
        color: #333333;
        float: right;
    }
    .orderDetails-right{
        height: 100%;
        flex: 1;
    }
    .orderDetails-photo{
        position: absolute;
        right: 0;
        top: 85px;
        width: 0;
        transition: width .5s;
        overflow: hidden;
    }
    .agotoHome{
        padding: 0 25px;
    }
    .agotoHome a{
        font-size: 12px;
        color: #39B6E5;
        background: url('../../../../../assets/img.png') no-repeat 10px -278px;
        padding-left: 30px;
        display: block;
        margin-top: 15px;
        line-height: 12px;
    }
     #taskNode .returna{
        text-align: right;
        border-bottom: 1px solid #eee;
        margin-bottom: 20px;
    }
    #taskNode .returna a{
        display: inline-block;
        width: 32px;
        height: 32px;
        border-radius: 50% ;
        text-align: center;
        box-sizing: border-box;
        padding: 6px 0;
        box-shadow: 1px 1px 3px rgba(0, 0, 0, .3);
        margin-right: 17px;
        margin-bottom: 10px;
    }
      #taskNode .fnbtn{
        width: 40px;
        padding-top: 6px;
    }
    i{
        display: block;
    }
     #taskNode .fnbtn a{
        display: inline-block;
     }
    #taskNode .fnbtn a:nth-child(1){
        margin-right: 18px;
    }
    .tishiyu{
        color: #FF6B0E;
        text-align: right;
        padding-right: 20px;
        margin: 0;
    }
     .tishi{
        color: #FF6B0E;
        position: absolute;
        left: 0;
        top: 1px;
    }
    .zhixian{
        padding-top: 3px;
        margin: 0 22px;
    }
    .zhixian .circle_wrap{
        text-align: center;
        height: 56px;
        overflow: hidden;
    }
    .zhixian .circle{
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #B9DAFD;
        border: 1px solid #B9DAFD;

    }
    .zhixian span{
        display: inline-block;
        height: 56px;
        width: 1px;
        background: #B9DAFD;
    }
    .sp,.node .Photo-info p{
        margin: 0;
        font-size: 14px;
        color: #333333;
        line-height: 16px;
    }
    .com-node{
        width: 282px;
        background: #fff;
        padding-top: 20px;
        box-shadow: 3px 2px 4px rgba(0,0,0,.4);
        border-radius: 0 0 5px 0;
    }
    .node {
        width: 227px;

    }
    .ss,.node .Photo-info span{
        font-size: 12px;
        color: #666666;
        line-height: 12px;
    }
   
    .node li{
        height: 46px;
        padding-bottom:10px;
        margin-bottom:10px;
    }
  
  
    
</style>