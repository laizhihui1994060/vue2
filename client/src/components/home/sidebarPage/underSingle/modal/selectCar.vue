<template>

<!-- Modal -->
    <div class="modal fade" id="selectCar" tabindex="-1" role="dialog" aria-labelledby="rescueDilemma" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title text-center" id="myModalLabel"  v-text="this.currentInfo.firstOrderTaker || this.currentInfo.secondOrderTake ? '已选服务商' : '已选派遣车辆'"></h4>
                </div>
                <div class="modal-body">
                    
                    <div class="row">
                        <div class="col-xs-12">
                            <p><span>当前订单</span><span v-text="orderCode"></span></p>
                        </div>
                    </div>
                    <div class="row" v-if="currentInfo.partnerInfo">
                        <div class="col-xs-12">
                            <p><span>当前服务商</span><span v-text="currentInfo.partnerInfo.name"></span></p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6">
                            <p v-if='currentInfo.firstOrderTaker || currentInfo.secondOrderTaker'>
                                <span>联系号码</span>
                                <span  v-text="currentInfo.firstOrderTaker && currentInfo.firstOrderTaker.workMobile ? currentInfo.firstOrderTaker.employeeName : currentInfo.secondOrderTaker.workMobile"></span>
                            </p>
                            <p v-else >
                                <span>施救车辆</span>
                                <span v-if="currentInfo.plateNo" v-text="currentInfo.plateNo ? currentInfo.plateNo:'无车'"></span>
                                <span v-if="currentInfo.towTruck" v-text="currentInfo.towTruck ? currentInfo.towTruck.plateNo : '无车'"></span>
                            </p>
                        </div>
                        <div class="col-xs-6">
                            <p>
                                <span v-if='currentInfo.driver && currentInfo.driver.employeeName || currentInfo.employeeName '>技&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;师</span>

                                <span v-if='currentInfo.firstOrderTaker || currentInfo.secondOrderTaker '>接&nbsp;单&nbsp; 人</span>
                                <span v-if="currentInfo.firstOrderTaker || currentInfo.secondOrderTaker " v-text="currentInfo.firstOrderTaker  ? currentInfo.firstOrderTaker.employeeName : currentInfo.secondOrderTaker.employeeName"></span>
                                <span v-if='currentInfo.employeeName' v-text="currentInfo.employeeName"></span>
                                <span v-if='currentInfo.driver && currentInfo.driver.employeeName' v-text="currentInfo.driver.employeeName"></span>
                            </p>
                        </div>
                    </div>
                    <div class="row" v-if="!currentInfo.firstOrderTaker && !currentInfo.secondOrderTaker">
                        <div class="col-xs-6">
                            <btn-select
                                url="client:/helper/emp"
                                method="post"
                                :params="{isDriver:true,isUser:true}" 
                                filter="empName" 
                                name="assistantId"
                                @updata="integrationDate"
                                padding="0"
                                label="添加助手"
                                width="90px"
                                list-width="113px"
                                max-height="110px"/>
                        </div>
                        <div class="col-xs-6"  v-show="rescueType != 'commercialVehicle'">
                            <btn-select
                                url="control:/sys/param" 
                                method='post'
                                :params="['/order/operation_type']"
                                filter="desc" 
                                name="operation"
                                @updata="integrationDate"
                                padding="0"
                                label="指派操作"
                                width="90px"
                                list-width="113px"
                                max-height="110px"/>
                        </div>
                        <div class="col-xs-6"  v-show="rescueType == 'commercialVehicle'" id="carNum">
                            <form-label-input
                                label="托运数量"
                                type="number" 
                                input-width="64px"
                                name="number"
                                min="1" 
                                :max="number" 
                                placeholder='输入数量'
                                value="1"
                                @updata="integrationDate"/>
                        </div>
                      
                    </div>
                    <div class="row">
                        <div class="col-xs-6" v-if="currentInfo.firstOrderTaker || currentInfo.secondOrderTaker">
                            <datetimepicker
                                label="超时时间"
                                label-right="12px"
                                background="#DFF5FD"
                                width="115px"
                                name="shareDeadline"
                                @updata="integrationDate"
                                minView="minute"
                                :startDate="true"
                                :value="orderDispath.shareDeadline"/>
                        </div>
                        <div class="col-xs-6" v-else>
                            <form-label-input
                                label="超时时间"
                                unit="分钟"
                                type="number" 
                                name="expireTime"
                                min="1" 
                                placeholder='输入超时时间'
                                :value="dispatch.expireTime"
                                @updata="integrationDate"/>
                        </div>
                        <div class="col-xs-6" v-if="!currentInfo.firstOrderTaker && !currentInfo.secondOrderTaker">
                            <btn-select 
                               :arr="[{cn:'网页端',en:'WEB'},{cn:'短信',en:'SMS'},{cn:'app',en:'APP'},{cn:'微信',en:'WECHAT'},{cn:'电话',en:'PHONE'}]"
                                filter="cn" 
                                padding="0"
                                name="dispatchMethod"
                                @updata="integrationDate"
                                label="派遣方式" 
                                title="网页端"
                                width="90px"/>
                        </div>
                        <div class="col-xs-6" v-if='currentInfo.firstOrderTaker || currentInfo.secondOrderTaker'>
                            <form-label-input
                                label="分享佣金"
                                type="number" 
                                name="shareCommission"
                                unit='元'
                                min="1" 
                                placeholder='输入分享金额'
                                value="1"
                                @updata="integrationDate"/>
                        </div>
                    </div>
                   <!--  <div class="row">
                        <div class="col-xs-6">
                            <btn-select 
                                url="client:/insurance/product" 
                                filter="name" 
                                label="保险要求"
                                name="shareInsurancesRequired"
                                @updata="integrationDate"
                                title="选择车险"
                                padding="0" 
                                width="83px"
                                filterName="insuranceProductCode"
                                :multi="true"
                                list-width="115px"/>
                        </div>
                        <div class="col-xs-6">
                            <form-label-input
                                label="范围限制"
                                type="number" 
                                name="shareDistanceScope"
                                min="1" 
                                unit='里'
                                @updata="integrationDate"/>
                            
                        </div>
                        
                    </div> -->
                </div>
                <div class="modal-footer">
                    <div class="btns">
                        <button type="button" class="btn" @click="addcar(false)" v-if="!currentInfo.firstOrderTaker && !currentInfo.secondOrderTaker" :disabled="disabled">加派车辆</button>
                        <button type="button" class="btn"  @click="sendCompleted" :disabled="disabled">派遣</button>
                        <button type="button" class="btn"  data-dismiss="modal" :disabled="disabled">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import  btnSelect from "../../../../../common_component/btn_select.vue";
import  formLabelInput from "../../../../../common_component/form-label-input.vue";
import  datetimepicker from "../../../../../common_component/datetimepicker.vue";


    export default {
        props:['currentInfo','orderId','rescueType','number','time1','orderCode'],
        components:{
            btnSelect,
            formLabelInput,
            datetimepicker
        },
        mounted(){
            // console.log(this.rescueType)
        },
       
        data () {
            return {
                dispatch:{
                    "id": '',
                    "driverId": "",
                    "assistantId": "",
                    "towTruckId": "",
                    "dispatchMethod": "",
                    "dispatchMethod" : 'WEB',
                    "dispatchActionType": 'DISPATCH_ME',
                    "operation": "",
                    "expireTime":5,
                    "bidId":"",
                    "number":0
                },
                drivers:[],
                driverInfo:{},
                orderDispath:{
                    'shareActionType':'SHARE_TO_ONE',
                    "dispatchMethod" : 'WEB',
                    "shareDeadline":new Date()

                },
                disabled:false
            }
        },
        methods:{
            integrationDate(name,value){
                console.log(name,value)
                if(this.currentInfo.firstOrderTaker || this.currentInfo.secondOrderTake){
                    this.orderDispath[name] = value;                   
                }else{
                    if(name == 'assistantId'){
                        this.dispatch.assistantId = value.empId;
                        this.driverInfo.positionName = value.positionName;
                    };
                    if(name == 'operation'){
                        this.dispatch.operation = value.code;
                        this.driverInfo.resName = value.name;
                    };
                    if(name == 'number'){
                        this.dispatch.number = value;
                        this.driverInfo.number = value;
                    }else if(name == 'expireTime'){
                        this.dispatch['expireTime'] = value;                   
                    }

                    if(name == 'dispatchMethod'){
                        this.dispatch['dispatchMethod'] = value.en;                   
                    }
                }

            },
            temp(type, bool){
                this.driverInfo.plateNo = this.currentInfo.towTruck ? this.currentInfo.towTruck.plateNo :this.currentInfo.plateNo;
                this.driverInfo.towDriver = this.currentInfo.driver ? this.currentInfo.driver.employeeName :this.currentInfo.employeeName;
                console.log(this.driverInfo)
                if(this.rescueType == 'commercialVehicle' && (!this.number || !this.driverInfo.number)){
                    var val = $('#selectCar #carNum').find('input[type="number"]').val();
                    this.dispatch.number = val;
                    this.driverInfo.number = val;
                }
                const self = this;
                this.send(function(){
                    self.$emit('addcar',self.driverInfo);
                }, type);

            },
            addcar(type, bool){
                console.log(this.rescueType,this.number,bool)
                const self = this;
                if(this.rescueType == 'commercialVehicle' && this.number <= 0){
                    confirm('托运车辆已配好，是否继续',function(b){
                        console.log(b)
                        if(b)self.temp(type, bool);
                    });
                }else{
                    this.temp(type, bool)
                }

                
 
            },
            sendCompleted(){
                const self = this;
                if(this.currentInfo.firstOrderTaker || this.currentInfo.secondOrderTake){
                    this.send(function(){
                        self.$emit('completed');
                    });
                }else{
                    if(this.rescueType == 'commercialVehicle'){
                        this.addcar('sendCompleted', true);
                    }else{
                        this.send(function(){
                            self.$emit('completed');
                        });
                    }
                }
                
            },
            send(fn, type){
                this.disabled = true
                const self = this;

                if(this.currentInfo.firstOrderTaker || this.currentInfo.secondOrderTake){
                    this.orderDispath['id'] = this.orderId;
                    this.orderDispath['invitedDriverId'] = this.currentInfo.firstOrderTaker ?  this.currentInfo.firstOrderTaker.userId:this.currentInfo.secondOrderTaker.userId;
                    console.log(this.orderDispath)
                    send({
                        type:'post',
                        url:'order:/share/order',
                        param:this.orderDispath
                    },function(err,res){
                        self.disabled = false
                        if(err)return alert('服务器错误，请联系系统管理员');
                        if(res.status == 200){
                            console.log(res)
                            $('#selectCar').modal('hide');
                            self.$emit('completed');
                        }else{
                            alert(res.msg);
                            
                        }
                    });

                }else{
                    console.log(  this.currentInfo)
                    this.dispatch.driverId = this.currentInfo.userId ?this.currentInfo.userId : this.currentInfo.driver.userId ;
                    this.dispatch.towTruckId = this.currentInfo.towTruck ? this.currentInfo.towTruck.towtruckId :
                                                this.currentInfo.towtruckId ? this.currentInfo.towtruckId : '' ;
                    this.dispatch.id = this.orderId;
                    this.dispatch.remark = '';
                    
                    console.log(self.dispatch)
                    if(this.currentInfo.partnerInfo)this.dispatch.dispatchActionType = 'DISPATCH_PARTNER';
                    send({
                        type:'post',
                        url:'order:/dispatch/dispatch_car',
                        param:self.dispatch
                    },function(err,res){
                        self.disabled = false
                        if(err)return console.log(res);
                        if(res.status == 200 ){
                            fn();
                            if(type == 'sendCompleted'){
                                if(self.number - self.dispatch.number > 0){
                                    $('#sendCompleted').modal('show');
                                }else{
                                    self.$emit('completed');
                                }
                            }
                            
                            $('#selectCar').modal('hide');
                            console.log(res);
                        }else{
                             $('#sendCompleted').modal('hide');
                            alert(res.msg);
                        }
                    })
                }



            },
            clear(){
                this.dispatch ={
                    "id": '',
                    "driverId": "",
                    "assistantId": "",
                    "towTruckId": "",
                    "dispatchMethod": "",
                    "dispatchActionType": 'DISPATCH_ME',
                    "dispatchMethod" : 'WEB',
                    "operation": "",
                    "expireTime":5,
                    "bidId":"",
                    "number":0
                };
                this.drivers = [];
                this.driverInfo = {};
            }
        },
        watch:{
            orderId(newv,oldv){
                if(!newv){
                    this.clear();   
                }
            },
            time1(){
                 this.driverInfo = {};
            },
            currentInfo(newv,oldV){
                if(JSON.stringify(newv) === '{}')return;
                const self = this;
                if(newv.firstOrderTaker || newv.secondOrderTaker){
                    send({
                        type:'post',
                        url:'control:/sys/param/org',
                        param:['/order/share/timeout']
                    },function(err,res){
                        self.orderDispath.shareDeadline = res.content[0] ?  new Date().getTime() + parseInt(res.content[0].orgParam.value.values[0].code) * 60 * 1000 : new Date().getTime() + ( 60 * 1000 * 5);
                    })
                }else{

                    send({
                        type:'post',
                        url:'control:/sys/param/org',
                        param:['/order/timeout_interval']
                    },function(err,res){
                        console.log(res)
                        self.dispatch.expireTime = res.content[0] ?  res.content[0].orgParam.value.values[0].code : 5;
                    })
                }
            }
        }
    }
 

</script>
<style scoped>
    .modal-dialog{
        margin-top: 250px;
        width: 410px;
    }
    .modal-body p span:nth-child(1){
        margin-right: 12px;
    }
    .modal-body{
        padding: 15px;
        padding-bottom: 40px;
    }
    p{
        margin: 0;
    }
    .modal-footer button{
        width: 80px;
    }
    .modal-footer .btns button:nth-child(2){
        margin: 0 15px;
    }
    input[type="number"]{
        width: 51px;
        font-size: 12px;
        /* padding: 5px 12px; */
        background-color: #dcf4fc;
        border-width: 0;
        padding: 4px;
        text-align: center;
    }
  
</style>