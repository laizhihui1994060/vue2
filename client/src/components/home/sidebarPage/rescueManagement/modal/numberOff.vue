<template>

<!-- Modal -->
    <div class="modal fade" id="numberOff" tabindex="-1" role="dialog" aria-labelledby="cancel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title text-center baoshu" id="myModalLabel">任务报数</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-xs-6">
                            <form-label-input 
                                @updata="integrationDate" 
                                input-width="112px" 
                                name="carOwnerName"
                                :value="offParam.vehiclesInfoEntity.carOwnerName"
                                placeholder="车主姓名" 
                                label="车主姓名"/>
                        </div>
                        <div class="col-xs-6">
                            <form-label-input 
                                @updata="integrationDate" 
                                input-width="112px" 
                                name="carOwnerPhone"
                                :value="offParam.vehiclesInfoEntity.carOwnerPhone" 
                                type='number' 
                                placeholder="车主电话" 
                                label="车主电话"/>
                        </div>
                    </div>
                    <div class="row setPading">
                        <div class="col-xs-6">
                            <form-label-input 
                                @updata="integrationDate" 
                                input-width="112px" 
                                name="vehicleCategory"
                                :value="offParam.vehiclesInfoEntity.vehicleBrand" 
                                placeholder="车辆型号" 
                                label="车辆型号"/>
                        </div>
                        <div class="col-xs-6">
                            <form-label-input 
                                @updata="integrationDate" 
                                input-width="112px" 
                                name="vehiclePlateNo"
                                :value="offParam.vehiclesInfoEntity.vehiclePlateNo"  
                                placeholder="车牌号码" 
                                label="车牌号码"/>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-2" style="padding-right:0">
                            <label style="margin-right:0;margin-top:8px">救援结果</label>
                        </div>
                        <div class="col-xs-4">
                            <radio 
                                text="救援成功" 
                                value="SUCCESS"
                                name="jobResult"
                                @updata="integrationDate"
                                textDirection="right"
                                rightMarginLeft="5px"
                                :checked="true"/>

                            <radio 
                                text="取消救援" 
                                value="CANCEL_CHARGABLE"
                                rightMarginLeft="5px"
                                name="jobResult"
                                @updata="integrationDate"
                                textDirection="right"/>
                        </div>
                        <div class="col-xs-4 col-xs-offset-2">
                            <radio 
                                text="救援失败" 
                                rightMarginLeft="5px"
                                value="FAILED"
                                name="jobResult"
                                @updata="integrationDate"
                                textDirection="right"/>
                            <radio 
                                text="取消无费" 
                                rightMarginLeft="5px"
                                value="CANCEL_NOFEE"
                                name="jobResult"
                                @updata="integrationDate"
                                textDirection="right"
                                :checked="true"/>
                        </div>
                    </div>
                    
                    <div v-if="fee_enable" class="row">
                        <div class="col-xs-6">
                            <form-label-input 
                                @updata="integrationDate" 
                                input-width="112px" 
                                name="arriveMileage" 
                                type='number'
                                :value="offParam.jobStatusEntity.param.report.arriveMileage"
                                min="0" 
                                placeholder="到达里程" 
                                label="到达里程"/>
                        </div>
                        <div class="col-xs-6">
                            <form-label-input 
                                @updata="integrationDate" 
                                input-width="112px" 
                                name="towMileage" 
                                type='number'
                                :value="offParam.jobStatusEntity.param.report.towMileage"
                                min="0" 
                                placeholder="拖车里程" 
                                label="拖车里程"/>
                        </div>
                    </div>
                    <div v-if="fee_enable" class="row setPading">
                        <div class="col-xs-6">
                            <form-label-input 
                                @updata="integrationDate" 
                                input-width="112px" 
                                name="backMileage" 
                                type='number'
                                :value="offParam.jobStatusEntity.param.report.backMileage"
                                min="0" 
                                placeholder="返回里程" 
                                label="返回里程"/>
                        </div>
                    </div>

                    <div v-if="fee_enable" class="row">
                        <div class="col-xs-6">
                            <!-- <btn-select  
                                width="90px"
                                label='报价公式'
                                url="client:/helper/partner" 
                                method='post'
                                :params="{isCustomer:true,cooperationStatus :'UNDER_CONTRACT'}"
                                padding="0"
                                filter="name" 
                                title="报价公式"
                                name="customerId"
                                @updata="integrationDate"
                                label-right="12px"
                                verify="1"
                                list-width="96px"
                                :uuid="true"
                                field="partnerId"/> -->
                                <btn-select  
                                    width="112px"
                                    label='报价公式'
                                    url="control:/quota/quota/list/querypartnerquotation" 
                                    method='post'
                                    :params="{sysPartnerId:customerId}"
                                    padding="0"
                                    filter="name" 
                                    title="报价公式"
                                    name="quotationFormat"
                                    @updata="integrationDate"
                                    label-right="12px"
                                    verify="1"
                                    :uuid="true"
                                    field="partnerId"/>
                                <button id="btn_caculation" type="button" style="background:rgb(23, 134, 247);font-size: 10px;border-radius:25px;line-height: 22px;" class="btn" @click='quotationCalulate'>计算</button>
                        </div>
                        <div v-if="fee_enable" class="col-xs-6">
                            <form-label-input @updata="integrationDate" input-width="112px" name="charge" 
                                :value='offParam.jobStatusEntity.param.report.charge' type='number' placeholder="救援费用" label="救援费用"/>
                        </div>
                    </div>
                    <div v-if="fee_enable" class="row">
                        <div class="col-xs-6">
                            <form-label-input @updata="integrationDate" input-width="112px" name="cashReceived" 
                                :value='offParam.jobStatusEntity.param.report.cashReceived' type='number' placeholder="收现金额" label="收现金额"/>
                        </div>
                        <div class="col-xs-6">
                            <form-label-input @updata="integrationDate" input-width="112px" name="performanceAmount" 
                                :value='offParam.jobStatusEntity.param.report.performanceAmount' type='number' placeholder="业绩金额" label="业绩金额"/>
                        </div>
                    </div>

                    <!-- 动态报数类型:去程 -->
                    <div class="row" v-if="costTypeDriveRoute[0] > 0 && fee_enable">
                        <div class="">
                            <span class="drive_routeTitle">去程</span>
                        </div>
                        <div class="col-xs-6" v-for="(item,index) in offParam.jobStatusEntity.param.costType"  v-if="item.driveRoute === 'AB'">
                                <form-label-input 
                                    class="fee_type_input"
                                    :min="0"
                                    v-if="item.amountCash!==undefined"
                                    @updata="integrationDate" 
                                    input-width="70px" 
                                    label-right='2px'
                                    :labelWidth="'107px'" 
                                    :name="item.costIndex + '_CASH'" 
                                    :value='item.amountCash' 
                                    type='number' 
                                    :placeholder="item.feeName" 
                                    :label="item.feeName + '(现金)'"   />
                            
                                <form-label-input 
                                    class="fee_type_input"
                                    :min="0"
                                    v-if="item.amountSign!==undefined"
                                    @updata="integrationDate" 
                                    input-width="70px" 
                                    label-right='2px'
                                    :labelWidth="'107px'" 
                                    :name="item.costIndex + '_SIGN'" 
                                    :value='item.amountSign' 
                                    type='number' 
                                    :placeholder="item.feeName" 
                                    :label="item.feeName + '(签单)'"   />
                            
                        </div>

                    </div>
                    
                    
                    <div class="row" v-if="costTypeDriveRoute[1] > 0 && fee_enable">
                        <div class="">
                            <span class="drive_routeTitle">返程</span>
                        </div>
                    
                    
                        <!-- 动态报数类型:返程 -->
                        <div class="col-xs-6"  v-for="(item,index) in offParam.jobStatusEntity.param.costType" v-if="item.driveRoute === 'CD'" >
                            
                                <form-label-input 
                                    class="fee_type_input"
                                    :min="0"
                                    v-if="item.amountCash!==undefined"
                                    @updata="integrationDate" 
                                    input-width="70px" 
                                    label-right='2px'
                                    :labelWidth="'107px'" 
                                    :name="item.costIndex + '_CASH'" 
                                    :value='item.amountCash' 
                                    type='number' 
                                    :placeholder="item.feeName" 
                                    :label="item.feeName + '(现金)'"   />
                            
                                <form-label-input 
                                    class="fee_type_input"
                                    :min="0"
                                    v-if="item.amountSign!==undefined"
                                    @updata="integrationDate" 
                                    input-width="70px" 
                                    label-right='2px'
                                    :labelWidth="'107px'" 
                                    :name="item.costIndex + '_SIGN'" 
                                    :value='item.amountSign' 
                                    type='number' 
                                    :placeholder="item.feeName" 
                                    :label="item.feeName + '(签单)'"   />
                                
                        </div>
                    </div>

                    <div v-if="fee_enable" class="row">
                        <div class="col-xs-12">
                           <input-text
                                input-width="76%"
                                placeholder="请填写报数原因"
                                input-height="58px"
                                label="报数原因"
                                name="cancelReason"
                                :value="offParam.cancelReason"
                                margin-top="0"
                                @updata="integrationDate"/>
                        </div>
                    </div>



                </div >
                <div class="modal-footer">
                    <div class="btns">
                        <button type="button" class="btn" data-loading-text="处理中..." @click="numberOffIt($event)">确认报数</button>
                        <button type="button" class="btn" @click="clearModalData" data-dismiss="modal">关闭窗口</button><!--  -->
                    </div>
                </div>
                <location-map style="display: none"></location-map>
                <span id="towOrderId" style="display:none"></span>
                <div style="display: none"></div>
            </div>
        </div>
    </div>
</template>

<script>
import  inputText from "../../../../../common_component/inputText.vue";
import  radio from "../../../../../common_component/radio.vue";
import  formLabelInput from "../../../../../common_component/form-label-input.vue";
import  btnSelect from "../../../../../common_component/btn_select.vue";
import {pathPlanning} from "../../../../../common_component/map.js";
import locationMap from "../../../../../common_component/locationMap.vue"


    export default {
        props:{
            isradio:{
                default:true
            },
            customerId:{
                type:String,
            }
        },
        components:{
            inputText,
            radio,
            formLabelInput,
            btnSelect,
            locationMap
        },
        data () {
            return {
                cancelReason:'' ,
                jobResult:'' ,
                num:0,
                offParamDefault:{
                    jobResult: "", //'SUCCESS'-救援成功, 'FAILED'-救援失败, 'CANCEL_CHARGABLE'-取消救援, 'CANCEL_NOFEE'-取消无费
                    cancelBy: "AGENT",    //'CUSTOMER' 'DRIVER' 'AGENT' ?
                    cancelReason: "", //自己填
                    jobStatusEntity: {
                        jobId: "",//有
                        dispatchActionId: "",//有
                        orderId: "",//有
                        // lng: 0,//无
                        // lat: 0,//无
                        towTruckId: "",//vTowturckId
                        time: 0,//操作时间 ,用不用传？
                        status: "", //'JOB_DONE'，'JOB_CANCEL', 'JOB_FAIL'
                        param: {

                            report: {
                                charge: 0,//救援费用
                                cashReceived: 0,//现收金额
                                // signRoute: 0,//路费(签单)
                                // cashRoute: 0,//路费(现金)
                                arriveMileage: 0,
                                towMileage: 0,
                                backMileage :0,
                                cashReceived :0,
                                // cashPaymentMethod :"",
                                cashInvoiced :0,
                                cashInvoiceAmount :0,
                                cashNoInvoices :0,
                                chargeSetOff :0,
                                chargeTowing :0,
                                chargeBack :0,
                                feeDriverPaid :0,
                                performanceAmount :0,//业绩金额
                                commission :0,
                                wheelNum :0,
                                comment :""

                            },
                            costType: [
                                 // {
                                 //     driveRoute: "AB",//driveRoute
                                 //     feeTypeConfigId: "c77011dc-7db2-4679-ab83-72b9923efde8",//feeTypeCfgId
                                //     amountCash: 0,
                                //     amountSign: 0
                                // }
                            ],//org那个接口
                            cancel: {
                                cancelBy: "AGENT",
                                cancelReason: ""
                            }
                        }

                    },
                    vehiclesInfoEntity: {
                        jobId: "",//有
                        orderVehicleId: "",//主键，towOrderVehicleId
                        vehicleId: "",//有
                        vehiclePlateNo: "",//有
                        vehicleColor: "",//有
                        vehicleModelCode: "",//有
                        vehicleName: "",//有
                        vehicleBrand: "",//有
                        vehicleCategory: "",//vehicleCategory
                        vehicleInsuranceDesc: "",//有
                        vehicleCargoWeight: 0,//无
                        carOwnerName: "",//carOwnerName
                        carOwnerPhone: "",//carOwnerPhone
                        qty: 0 //有
                    }
                },
                offParam:{},
                quotaParam:{},
                fee_enable:true,
                costTypeDriveRoute:[0,0],
            }
        },
        methods:{
            integrationDate(name,value){
                console.log("000000name",name)
                console.log("value00000",value)
                //取消无费
                if(name === "jobResult" && value === "CANCEL_NOFEE"){
                    
                    this.fee_enable = false;
                    this.noFeeReset();
                } else if(name === "jobResult" && value !== "CANCEL_NOFEE"){
                    this.fee_enable = true;
                }
                //联动jobStatusEntity.status
                if(name === "jobResult"){
                    switch(value){
                        case "SUCCESS":{
                            this.offParam.jobStatusEntity.status = "JOB_DONE"
                            delete this.quotaParam.rescueResult
                        };break;

                        case "FAILED":{
                            this.offParam.jobStatusEntity.status = "JOB_FAIL";
                            this.quotaParam.rescueResult = "FAILED";
                        };break;

                            default :{
                                this.offParam.jobStatusEntity.status = "JOB_CANCEL"
                                this.quotaParam.rescueResult = value;
                        };break;
                    }
                }
                //选择报价
                if(name === "quotationFormat"){
                    this.quotaParam.sysQuotationId = value.sysQuotationId
                }
                if(name === "towMileage"){
                    this.quotaParam.milageTowing = Number(value);
                }
                //现金签单
                if(name.indexOf("costIndex") !== -1){
                    let index = parseInt(name.split('_')[1])
                    let method = name.split('_')[2]
                    if(method === "SIGN"){
                        this.offParam.jobStatusEntity.param.costType[index].amountSign = Number(value);
                    }else if(method === "CASH"){
                        this.offParam.jobStatusEntity.param.costType[index].amountCash = Number(value);
                    }
                }
                //按需赋值
                if(name in this.offParam){
                    this.offParam[name] = value;
                    if(name === "cancelReason"){
                        this.offParam.jobStatusEntity.param.cancel.cancelReason = value;
                        this.offParam.jobStatusEntity.param.report.comment = value;
                    }
                } 
                else if(name in this.offParam.jobStatusEntity.param.report) {
                    //救援费用等等
                    let needStr = {'cashPaymentMethod':'','comment':''}
                    this.offParam.jobStatusEntity.param.report[name] = (name in needStr)?value : Number(value);

                } 
                else if(name in this.offParam.vehiclesInfoEntity) {
                    this.offParam.vehiclesInfoEntity[name] = value;

                }
            },
            updateParam(key,value){
                this.offParam[key] = value;
            },
            noFeeReset(){
                console.log("取消无费")
                console.log(this.offParam)
                this.offParam.cancelReason = "";
                let tempCostType = this.offParam.jobStatusEntity.param.costType;
                tempCostType.forEach((item,index)=>{
                    if(typeof item.amountSign !== 'undefined'){
                        item.amountSign = 0;
                    }
                    if(typeof item.amountCash !== 'undefined'){
                        item.amountCash = 0;
                    }
                });
                this.quotaParam['sysQuotationId'] = "";
                this.offParam.jobStatusEntity.param = JSON.parse(JSON.stringify(this.offParamDefault.jobStatusEntity.param))
                this.offParam.jobStatusEntity.param.costType = tempCostType;
            },
            //正式报数
            numberOffIt(event){
                const self = this;
                const e = window.event || event;
                
                // const param = {
                //         "orderId": $('#towOrderId').text(),
                //         "cancelBy": "AGENT",
                //         "cancelReason": this.cancelReason,
                //         "jobResult":'CANCEL_NOFEE'
                //     };
                const param = this.offParam;
                $(e.target).button('loading');
                
                console.log(JSON.stringify(param));
                send({
                    type:'post',
                    url:'order:/rescue/report',
                    param:param
                },function(err,res){
                    if(err)return alert('服务器出错，请联系管理员');
                    if(res.status == 200){
                        alert('报数成功','success');
                        console.log(res)
                        $('#numberOff').modal('hide');
                        self.$emit('updatakey',++self.num);
                    }else{  
                        console.log("报数不成功",res)
                        alert(res.msg);
                    }
                    console.log($(e.target).html())

                    $(e.target).button('reset')
                })
            },
            //刷新报价参数
            refreshQuotaParam(item){
                console.log("获取里程ID：：：：",item);
                this.quotaParam = {
                        sysPartnerId: item.customerId,
                        sysQuotationId: "",
                        businessType: util.matchRescueType(item.jobType).cn,
                        carType: "",
                        // rescueResult: "SUCCESS",
                        rescueArea: item.incidentAddrDistrict,
                        destinationArea: item.destinationAddrDistrict,
                        milageGoto: 0,
                        milageTowing: this.milageCaculate(item.incidentAddrGps,item.destinationAddrGps),
                        milageBack: 0

                }
            },
            //计算里程
            milageCaculate(from,to){
                console.log("计算里程");
                console.log(from);
                if(!from) return;
                var result,coord = [[from.x,from.y],[to.x,to.y]];
                pathPlanning(false,coord,(data)=>{
                    result = data.routes[0].distance/1000;
                    this.integrationDate("towMileage",result);
                });
                
                return result;
            },
            //计算费用
            quotationCalulate(){
                console.log("计算报价公式");
                if(this.quotaParam.sysQuotationId === ''){
                    return alert("请先选择一个报价公式")
                }

                console.log(this.quotaParam)
                send({
                    type:'post',
                    url:'order:/quota/quota/getquotabymessage',
                    param:this.quotaParam
                },(err,res)=>{
                    if(err) return console.log("error",err);
                    if(res.status==200){
                        console.log(res);


                        //多重报价结果判断
                        res.content.forEach((item,index)=>{

                            if(item.sysQuotationId === this.quotaParam.sysQuotationId){
                                $('[name="charge"]').val(res.content[0].quota);
                                this.integrationDate("charge",res.content[0].quota)
                            }
                        });
                        
                    } else {
                        alert(res.msg)
                        console.log("请求报价完毕",res);
                    }
                })
                
            },


            updateThis(item){
                console.log("更新报数模态框")
                console.log(item);

                this.offParam = JSON.parse(JSON.stringify(this.offParamDefault))
                this.refreshQuotaParam(item);
                this.offParam.jobStatusEntity.jobId =  item.jobId;
                this.offParam.jobStatusEntity.dispatchActionId =  item.dispatchActionId;
                this.offParam.jobStatusEntity.orderId = item.orderId;
                // 勾选第一项
                $('[name="jobResult"][value="SUCCESS"]').prop('checked','checked');
                this.integrationDate('jobResult','SUCCESS');
                $('[name="quotationFormat"]').html('报价公式').css('color','rgb(153,153,153)')






                //['jobStatusEntity']['param']['costType']
                //获取报数类型
                send({
                    type:'get',
                    url:'order:/fee/type/org',

                },(err,res)=>{
                    if(err) return console.log("error:",err)
                    if(res.status == 200){
                        console.log("请求报数类型功:",res);

                        this.offParam['jobStatusEntity']['param']['costType'] = []
                        res.content.forEach((item,index)=>{
                            var obj = {
                                costIndex:"costIndex_" + index,
                                driveRoute: item.driveRoute,//driveRoute
                                feeTypeConfigId: item.feeTypeCfgId,//feeTypeCfgId
                                feeName: (item.feeName)
                            }
                            if(item.driveRoute === "AB"){
                                this.costTypeDriveRoute[0]++
                            } else if(item.driveRoute === "CD"){
                                this.costTypeDriveRoute[1]++
                            }
                            item.settleMethod.forEach((item,index)=>{
                                switch(item){
                                    case "CASH":{ 
                                        
                                        obj.amountCash = 0;

                                    };break;
                                    case "SIGN":{ 
                                        
                                        obj.amountSign = 0;

                                    };break;
                                    default:{ 
                                        
                                        obj.amountOther = 0;

                                    };
                                }
                            })

                            this.offParam['jobStatusEntity']['param']['costType'].push(obj)
                        });

                        console.log(this.offParam['jobStatusEntity']['param']['costType'])
                        
                    } else {
                        console.log("报数类型请求完毕",res)
                    }
                });

                //vehiclesInfoEntity
                send({
                    type:'get',
                    url:'order:/rescue/vehicles/' + item.dispatchActionId,
                    // param:{}
                },(err,res)=>{
                    if(err) return console.log("error:",err)
                    if(res.status == 200){
                        console.log("请求车辆信息成功:",res);


                        //更新车辆信息
                        this.offParam.vehiclesInfoEntity = {
                            jobId: item.jobId,//有
                            orderVehicleId: res.content[0].towOrderVehicleId,//主键，towOrderVehicleId
                            vehicleId: res.content[0].vehicleId,//有
                            vehiclePlateNo: res.content[0].vehiclePlateNo,//有
                            vehicleColor: res.content[0].vehicleColor,//有
                            vehicleModelCode: res.content[0].vehicleModelCode,//有
                            vehicleName: res.content[0].vehicleName,//有
                            vehicleBrand: res.content[0].vehicleBrand,//有
                            vehicleCategory: res.content[0].vehicleCategory,//vehicleCategory
                            vehicleInsuranceDesc: res.content[0].vehicleInsuranceDesc,//有
                            vehicleCargoWeight: 0,//无
                            carOwnerName: res.content[0].carOwnerName,//carOwnerName
                            carOwnerPhone: res.content[0].carOwnerPhone,//carOwnerPhone
                            qty: res.content[0].qty //有
                        }
                        //补充报价参数：
                        this.quotaParam.carType = res.content[0].vehicleCategory
                        
                    } else {
                        console.log("请求完毕",res)
                    }
                });

            },
            clearModalData(){
                console.log("U click off");
                console.log(this.offParam)
                this.offParam = JSON.parse(JSON.stringify(this.offParamDefault));

            },
            charOffset(val){

                if(typeof val === "string"){
                    if(val.length === 2){
                        return val[0] + "　　" + val[1];
                    } else if( val.length === 3){
                        return val[0] + " " + val[1] + " " + val[2];
                    }
                }
                return val;
            }
            
        },
        
        created(){
            //初始化
            this.offParam = JSON.parse(JSON.stringify(this.offParamDefault));
        }
    }
 

</script>
<style scoped>
    #numberOff .modal-body{
        padding: 28px;
    }
    .modal.in .modal-dialog{
        margin-top: 100px;
        /*width: 475px;*/
        width: 550px;
    }
   .modal-header h4{
        color: #FF6B0E;
   }
   .modal-body{
   }
   .btns button:nth-child(2){
        margin-left: 50px;
   }
   .row{
        margin-bottom: 8px;
   }
   #numberOff .modal-header, #numberOff .modal-footer{
        border-width: 1px;
   }
   .setPading{
    padding-bottom: 10px;
   }
   #numberOff #btn_caculation{
    padding: 0 5px;
    background: #39B6E5;
    color: #fff;
    border-radius: 0;
    border:1px solid #39B6E5;
   }
   #numberOff .fee_type_input{
    margin-bottom: 8px;
   }
   #numberOff .drive_routeTitle{
    margin-left: 15px;
    font-size: 17px;
    color: rgb(102, 102, 102);
   }
   #numberOff .drive_routeTitle:after{
    content: "";
    width: 78%;
    margin-left: 2%;
    margin-bottom: 1%;
    display: inline-block;
    border-bottom:1px solid #ddd;
   }
</style>