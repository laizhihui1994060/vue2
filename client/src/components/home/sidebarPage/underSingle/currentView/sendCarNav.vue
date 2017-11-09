<template>
   <div class="btn-group-vertical sendCar_list">
        <div class="fixedHeight">
            <div class="list_sendCar">
                <h3 class="text-center" v-if="!dispatchList.length" style="line-height:80px;">暂无未派订单</h3>    
                <div class="sendCar-parent" v-for="(item,index) in dispatchList" v-else>
                    <a class="sendCar-left" @click="rescueType(item.jobType,item.orderId,index,$event)" :class="{active:index === zindex}">
                        <h6 v-text="matchStatus(item.jobType,1)">快修</h6>
                        <p class="small" v-text="getLocalTime(item.orderScheduleTime)"></p>
                    </a>
                    <div class="sendCar-center">
                        <div class="row" style="margin-bottom:3px;">
                            <div class="col-xs-6">
                                <label>客户名称:</label>
                                <span v-text="item.customerName"></span>
                            </div>
                            <div class="col-xs-6">
                                <label>车主电话:</label>
                                <span v-text="item.orderVehicles && item.orderVehicles.length ? item.orderVehicles[0].carOwnerPhone : ''"></span>
                            </div>
                        </div>
                        <div class="clearfix">
                            <label class="pull-left">救援地址:</label>
                            <span class="pull-left" v-text="item.incidentAddrAddress"></span>
                        </div>
                        <div class="clearfix" v-if="item.jobType && item.jobType.indexOf('02') == -1">
                            <label class="pull-left">目的地址:</label>
                            <span class="pull-left" v-text="item.destinationAddrAddress"></span>
                        </div>
                    </div>
                    <div class="sendCar-right">
                        <button @click="dispatch(item)">立即派单</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>




export default{
    props:['currentView','items','time'],
    mounted(){
      
    },
    components:{
    },
    methods:{
        rescueType(code,orderId,index,ev){
            var ev = ev  || event;
            var el = $(ev.target);

            if(ev.target.tagName == 'P' || ev.target.tagName == 'H6' ) el = el.parent();

            if(el.hasClass('active')){
                this.$emit('shrink');
            }else{
                this.zindex = index;
                this.$emit('rescueType',this.matchStatus(code).en,code,orderId);
            }

        },
        dispatch(item){

            console.log(item);
            const resutle = {
                type:this.matchStatus(item.jobType)['en'],
                jobType:item.jobType,
                faultCar:{
                    number:item.qtyOfVehicles
                },
                rescueLnt:item.incidentAddrGps ? item.incidentAddrGps.x : '',
                rescueLat:item.incidentAddrGps ? item.incidentAddrGps.y : '',
                incidentAddrAddress:item.incidentAddrAddress,
                destinationLnt:item.destinationAddrGps ? item.destinationAddrGps.x :'',
                destinationLat:item.destinationAddrGps ? item.destinationAddrGps.y :'',
                destinationAddrAddress:item.destinationAddrAddress
            }


            this.$emit('completeOrder',resutle,item.orderId,item.orderCode);
        },
        getLocalTime(ns){
            return  util.getLocalTime(ns);
        },
        matchStatus(code){
            var obj = util.matchRescueType(code);
            return arguments.length == 2 ? obj.cn : obj;
        },
        send(){
            const self = this;
            send({
                type:'post',
                url:'order:/order/list',
                param:{
                    "pageSize": 10000000,
                    "pageIndex": self.pageIndex,
                    "flag": "WEB_DISPATCH"
                }
            },function(err,res){
                if(err) return console.log(err);
                if(res.status == 200 || res.status == 404){
                    self.dispatchList = res.content ? res.content : [];
                    let notSendOrder = $('#notSendOrder');
                    if( res.content && res.content.length  ){
                        notSendOrder.text( res.content.length ).show();
                    }else{
                        notSendOrder.hide();
                    }

                    console.log(res);
                }else{
                    console.log(res);
                }
            });
        }
    },
    data(){
        return  {
            dispatchList:[],
            pageIndex:1,
            zindex:''
        }
    },
    created(){
        this.send();
    }
   

}
</script>
<style scoped>
    .sendCar_list{
        background: #fff;
        width: 481px;
        height: 100%
    } 
    .clientInfo{
        overflow: hidden;
        margin-bottom: 3px
    }
    .list_sendCar{
        top: 0;
        transition: top .3s;
        position: relative;
        border: 1px solid rgba(22, 131, 243, 0.27);
        border-left-width: 0;
    }
    .fixedHeight{
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .sendCar_list .sendCar-parent{
        border-bottom: 1px solid rgba(22, 131, 243, 0.27);
        display: flex
    }

    .sendCar_list .sendCar-left{
        width: 63px;
        padding: 8px 0 0 0;
        background: #F6F6F6;
        margin-right: 8px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }   
    .sendCar_list .active,.sendCar_list .sendCar-parent:hover .sendCar-left{
        background: #E7F2FE !important;
    }
    .sendCar_list .active h6,
    .sendCar_list .active p,
    .sendCar_list .sendCar-parent:hover .sendCar-left h6,
    .sendCar_list .sendCar-parent:hover .sendCar-left p{
        color: #39B6E5 !important;
    }
    
    .sendCar_list .sendCar-left h6{
        font-size: 14px;
        color: #333;
        margin-bottom: 8px;
    }
    .sendCar_list .sendCar-left p{
        color: #999;
        margin: 0;
    }   
    .sendCar_list .sendCar-left .small{
        font-size: 10px;
        text-align: center;
        transform:scale(0.875);
        margin-bottom: 10px;
    }   
    .sendCar_list .sendCar-center{
        width: 309px;
        padding-right: 10px;
        margin:10px 0;
        border-right: 1px solid  rgba(22, 131, 243, 0.27);
    }   
  
    .sendCar_list .sendCar-center label{
        font-size: 12px;
        color: #999999;
        margin: 0;
        margin-right: 4px !important;
        font-weight: 100
    }   
    .sendCar_list .sendCar-center span{
        font-size: 12px;
        color: #333333;
    }    
    .sendCar_list .sendCar-center .clearfix span{
        width:242px;
    }
    .sendCar_list .sendCar-right{
        justify-content: center;
        align-items: center;
        display: flex;
        width: 88px;
    }   
    .sendCar_list .sendCar-right button{
        font-size: 12px;
        line-height: 12px;
        color: #39B6E5;
        padding: 5px 12px;
        background: #fff;
        border-radius: 25px;
        color: #fff;
        background: #1785F7;
        border-width: 0
    }   
    .btn:focus, .btn:active:focus, .btn.active:focus, .btn.focus, .btn:active.focus, .btn.active.focus {
        outline-width: 0;
        background-color: #DFF5FD;
        color: #39B6E5 ;  
        box-shadow: none;
    }
   
    .sendCar_list  .btn:active{
        background-color: #DFF5FD !important;
        color: red ;
        outline: none;

    }
    .sendCar_list  .btn:hover{
        background-color: #DFF5FD;
        color: #39B6E5 ;
    }
    .active{
        background-color: #DFF5FD !important;
        color: #39B6E5 !important; 
    }
  

</style>
