<template>
    <div id="businessAccounting" >
        <breadcrumb
            :arr="[{path:'/LoginFinish/financialManagement/accounting_order',text:'核算订单'},{path:'',text: informtion.orderCode}]"/>

    
        <div class="main" style='display: flex;margin-bottom:20px;'>
            <div style='flex:1;border:1px solid #999;'> 
                <div style='margin:0 10px;'>
                    <article @click='showDetails'>
                        <span class='img up' style='display: inline-block;position: relative; left:10px;top:-2px;margin-right:15px;'></span>
                        订单信息
                    </article>

                    <div class="details">
                        <orderInformation :informtion='informtion' @updata='updata' :accounting="accounting" :disabled="disabled" ></orderInformation>
                    </div>
                </div> 

                <div style='margin:30px 10px 10px;'>
                    <article @click='showDetails'>
                        <span class='img up' style='display: inline-block;position: relative; left:10px;top:-2px;margin-right:15px;'></span>
                        订单信息记录
                    </article> 
                    
                    <div class="details">
                        <template v-if='records.length > 0'>
                            <record :records='records'></record>
                        </template>
                        <template v-else>
                            <div style="text-align:center">暂无信息记录</div>
                        </template>
                    </div>
                </div>

                <template v-show='informtion.orderJobList.length > 0 && isShowOrderJobRcords' >
                    <div style='margin:30px 10px 10px;'>
                        <article @click='showDetails'>
                            <span class='img up' style='display: inline-block;position: relative; left:10px;top:-2px;margin-right:15px;'></span>
                            任务修改记录
                        </article>
                        <div class="details" >
                            <div class='orderJob' v-for='(orderJob, orderJobIndex) in orderJobRcords' :key='orderJob.jobCode'>   
                                <div class="details" style='padding:2px;margin-bottom:0px'>
                                    <div style='margin:10px'>
                                        <article @click='showDetails' class='orderJobRecord'>
                                            <span class='img up' style='display: inline-block;position: relative; left:10px;top:-2px;margin-right:15px;'></span>
                                            <span style='color:#45bae3;'>任务：</span>
                                            <span style='color:orange'>{{orderJob.jobCode}}</span>
                                        </article>
                                        
                                        <div class="details" >
                                            <template v-if='orderJob.records && orderJob.records.length > 0'>
                                                <record :records='orderJob.records'></record>
                                            </template>
                                            <template v-else>
                                                <div style="text-align:center">暂无任务修改记录</div>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div style='flex:1;border:1px solid #999;margin-left:20px;'>
                <div style='margin:0 10px;'>
                    <article @click='showDetails'>
                        <span class='img up' style='display: inline-block;position: relative; left:10px;top:-2px;margin-right:15px;'></span>
                        任务信息
                    </article>

                    <div class="details">
                        <rescueInformation :accounting='accounting' :informtion='informtion' :disabled='disabled' @updata='updata' @check='check'> </rescueInformation>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>
 
<script>
import formLabelInput from '../.././../../../common_component/form-label-input.vue'
import breadcrumb from "../.././../../../common_component/breadcrumb.vue"
import btnSelect from '../../../../../common_component/btn_select.vue'
import datetimepicker from '../../../../../common_component/datetimepicker.vue'

import orderInformation from './account_order/order_information.vue'
import rescueInformation from './account_order/rescue_information.vue'

import record from './../../../../../common_component/record.vue'
import inputEdit from './../../../../../common_component/inputEdit.vue'


    export default{ 
        components:{
            btnSelect,
            datetimepicker,
            formLabelInput,
            breadcrumb,
            orderInformation,
            rescueInformation,
            record,
            inputEdit
        },
        data(){
            return {
                isShowOrderJobRcords: false,
                orderJobRcords: [],
                value: 'sdfsdfsd',
                // 信息记录
                records : [],

                disabled: true,
                accounting: false,
                status:'',
                informtion: {
                    orderCode: '',
                    quotationId: '',
                    customerInfo:{
                        name: '', 
                    },
                    upstreamConfirmed: false,
                    vehicleOwnerList: [
                        {
                            "carOwnerName": "",
                            "carOwnerPhone": "",
                            "vehicleCategory": "",
                            "vehicleColor": "",
                            "vehicleId": "",
                            "qty": 0,
                            "vehicleBrand": "",
                            "vehicleName": "",
                            "vehiclePlateNo": ""
                        }
                    ],
                    "orderJobList": [
                        {
                            "towJobId": "",
                            "towOrderId": "",
                            "bidId": null,
                            "dispatchActionId": "",
                            "jobCode": "",
                            "towDriverId": "",
                            "jobStatusDetail": "",
                            "jobStatusOverall": "",
                            "jobFinishTime": 0,
                            "resultConfirmed": null,
                            "resultConfirmedBy": null,
                            "resultConfirmedDatetime": null,
                            "jobResultEntity": {
                                "towOrderId": "",
                                "towJobId": "",
                                "jobResultId": "",
                                "chargeSetOff": null,
                                "chargeTowing": null,
                                "chargeBack": null,
                                "performanceAmount": null,
                                "charge": null,
                                "upstreamConfirmedCharge": null,
                                "cashReceived": 0,
                                "cashPaymentMethod": "",
                                "cashInvoiced": false,
                                "cashInvoiceAmount": 0,
                                "cashNoInvoices": 0,
                                "milageToIncidentSpot": 0,
                                "milageTowing": 0,
                                "milageBack": 0,
                                "wheelAmt": 0,
                                "confirmedMilageToIncidentSpot": 0,
                                "confirmedMilageTowing": 0,
                                "confirmedMilageBack": 0,
                                "upstreamConfirmedMilageToIncidentSpot": 0,
                                "upstreamConfirmedMilageTowing": 0,
                                "upstreamConfirmedMilageBack": 0,
                                "comment": null,
                                "feedBack": [
                                    {
                                        "towJobFeedbackId": "",
                                        "jobResultId": "",
                                        "driveRoute": null,
                                        "sysFeeTypeConfigId": "",
                                        "amountCash": 0,
                                        "amountSign": 0,
                                        "confirmedAmountSign": null,
                                        "confirmedAmountCash": null,
                                        "upstreamConfirmedAmountSign": null,
                                        "upstreamConfirmedAmountCash": null,
                                        "feeCode": "",
                                        "feeChinese": ""
                                    }
                                ]
                            },
                            "towJobConfirmedVehicles": [
                                {
                                    "towJobConfirmedVehiclesId": "",
                                    "towJobId": "",
                                    "towOrderVehicleId": "",
                                    "vehicleId": "",
                                    "vehiclePlateNo": "",
                                    "active": true,
                                    "vehicleColor": null,
                                    "vehicleModelCode": null,
                                    "vehicleName": "",
                                    "vehicleBrand": "",
                                    "vehicleCategory": "",
                                    "vehicleInsuranceDesc": null,
                                    "vehicleCargoWeight": "",
                                    "carOwnerName": "",
                                    "carOwnerPhone": "",
                                    "qty": 0
                                }
                            ],
                            "driverActions": null,
                            "dispatchAction": {
                                "dispatchActionId": "",
                                "driverId": "",
                                "assistantDriverId": null,
                                "operation": "",
                                "driverInfo": {
                                    "code": '',
                                    "empName": "",
                                    "workMobile": ""
                                },
                                "assistantDriverInfo": {
                                    "code": '',
                                    "empName": "",
                                    "workMobile": ""
                                },

                            }
                        }
                    ],
                },
                res: [],
                id: '',

                orderInfo: {},
            }
        },
        created(){
            const _this = this;

            bus.$on('modifyRecord',function(){
                _this.modifyRecord();
            });
            
            local.setItem('socket-accounting-id', this.$route.params.id);

            // 监听别人是否改动核算信息
            global.listEvent.sub('accounting-' + this.$route.params.id, function(){
                _this.render(true);
            });

            // 监听别人是否改动订单信息
            console.log('accounting-order-' + this.$route.params.id)
            global.listEvent.sub('accounting-order-' + this.$route.params.id, function(){
                _this.render(true);
            });

            // 初始化
            this.render(true);
        },
        methods:{
            render(isLoading){
                this.id = this.$route.params.id;
                this.status = this.$route.params.status;
                this.res = [];
                if(!this.id) return ;         // 如果没有id，则表示跳转了页面，不再获取
                this.disabled = true;

                const _this = this;
                const $loading = $('#main_loading');
                if(false){
                    $loading.show();
                }

                // send({
                //     url: 'finance:/accounting/query/orderInfo?orderId=' + _this.id,
                //     type: 'post'
                send({
                    url: 'finance:/accounting/orderInfo/' + _this.id,
                    type: 'get' 
                }, function(err, res){
                    console.log(res);
                    if(res.status == 200){
                        _this.informtion = res.content[0];

                        const orderJobList = _this.informtion.orderJobList; 

                        // 整理订单信息
                        _this.orderInfo = {
                            id: _this.id,
                            sourceType: 'xxx'
                        };

                        if(orderJobList.length > 0){

                            orderJobList.forEach( (orderJob, index) => {
                                let obj = {
                                    "towOrderId": orderJob.towOrderId,
                                    "towJobId": orderJob.towJobId,
                                    "jobFinishTime": orderJob.jobFinishTime ? orderJob.jobFinishTime : '',
                                    "operation": orderJob.dispatchAction ? orderJob.dispatchAction.operation : "",
                                    "dispatchActionId": orderJob.dispatchAction ? orderJob.dispatchAction.dispatchActionId : "",
                                    "towDriverId": orderJob.dispatchAction ? orderJob.dispatchAction.driverId : "",
                                    "assistantDriverId": orderJob.dispatchAction ? orderJob.dispatchAction.assistantDriverId : "",
                                    "towTruckId": orderJob.dispatchAction ? orderJob.dispatchAction.towTruckId : "",
                                    "jobResultId": orderJob.jobResultEntity ? orderJob.jobResultEntity.jobResultId : "",
                                    "performanceAmount": orderJob.jobResultEntity ? orderJob.jobResultEntity.performanceAmount : "",
                                    "charge": orderJob.jobResultEntity ? orderJob.jobResultEntity.charge : "",
                                    "wheelAmt": orderJob.jobResultEntity ? orderJob.jobResultEntity.wheelAmt : "",

                                    "confirmedMilageToIncidentSpot": orderJob.jobResultEntity ? orderJob.jobResultEntity.confirmedMilageToIncidentSpot : "",
                                    "confirmedmilageTowing": orderJob.jobResultEntity ? orderJob.jobResultEntity.confirmedMilageTowing : "",
                                    "confirmedmilageBack": orderJob.jobResultEntity ? orderJob.jobResultEntity.confirmedMilageBack : "",

                                    "milageToIncidentSpot": orderJob.jobResultEntity ? orderJob.jobResultEntity.milageToIncidentSpot : "",
                                    "milageTowing": orderJob.jobResultEntity ? orderJob.jobResultEntity.milageTowing : "",
                                    "milageBack":  orderJob.jobResultEntity ? orderJob.jobResultEntity.milageBack : "",

                                    "feedBacks": orderJob.jobResultEntity ? orderJob.jobResultEntity.feedBack : [],
                                    "confirmedVehicles": orderJob.towJobConfirmedVehicles && orderJob.towJobConfirmedVehicles.length > 0 ? orderJob.towJobConfirmedVehicles : [{vehiclePlateNo: ''}],   // 没有的话会添加不了，后台数据问题
                                    "cashPaymentMethod": orderJob.jobResultEntity ? orderJob.jobResultEntity.cashPaymentMethod : "",
                                    "cashReceived": orderJob.jobResultEntity ? orderJob.jobResultEntity.cashReceived : "",
                                    "upstreamConfirmed": _this.informtion.upstreamConfirmed,
                                    "upstreamConfirmedCharge":  orderJob.jobResultEntity ? orderJob.jobResultEntity.upstreamConfirmedCharge : "",
                                    "price": _this.informtion.price
                                };
                                let feedBacks_ab = [], feedBacks_cd = [];
                                if(obj.feedBacks && obj.feedBacks.length > 0){
                                    obj.feedBacks.forEach( (obj, index) => {
                                        obj.isCash = obj.settleMethod.indexOf('CASH') != -1;
                                        obj.isSign = obj.settleMethod.indexOf('SIGN') != -1;

                                        obj.driveRoute == 'AB' ? feedBacks_ab.push(obj) : feedBacks_cd.push(obj);
                                    });
                                }
                                
                                if(orderJob.jobResultEntity ){
                                    orderJob.jobResultEntity.feedBacks_ab = feedBacks_ab;
                                    orderJob.jobResultEntity.feedBacks_cd = feedBacks_cd;
                                }
                                obj.feedBacks_ab = feedBacks_ab;
                                obj.feedBacks_cd = feedBacks_cd;
                                _this.res.push(obj);
                            });
                        }
                        
                        _this.disabled = false;
                        $loading.hide(); 
                    }else{
                        alert('系统错误，获取不到订单信息');
                    }
                    _this.isShowOrderJobRcords = false;
                    _this.modifyRecord();
                });
                
                
               
            },
            modifyRecord(){
                /**
                 * 订单信息记录
                 */
                const _this = this;
                send({
                    url: 'order:/order/update_record/' + _this.id,
                    type: 'get'
                }, function(err, res){
                    if(res.status == 200){
                        // 处理数据
                        console.log(res);  
                        const arr = [];
                        res.content.forEach( (obj, index) => {
                            const time = util.getLocalTime(obj.created);

                            let userName = '';

                            if(obj.user.length > 0){
                                obj.user.some( (user, index) => {
                                    if(user.userId == obj.userId){
                                        userName = user.empName;
                                        return true;
                                    }
                                });
                            }
                            

                            let str;

                            userName = userName ? userName : '';
                            
                            if(obj.status == 'UPDATE' || obj.status == 'DISPATCHED' ){
                                str = obj.status == 'UPDATE' ? userName + '，将' : userName + '，派车 &nbsp;' ;
                                for(let key in obj.oldValue){
                                    if(obj.newValue[key] == 'true'){
                                        obj.newValue[key] = '是'
                                    }else if(obj.newValue[key] == 'false'){
                                        obj.newValue[key] = '否'
                                    }else if(key == '派遣时间'){
                                        const time = obj.newValue[key];
                                        obj.newValue[key] = util.getLocalTime(new Date(time).getTime()); 
                                    }else if(key == '派遣类型'){
                                        const type = obj.newValue[key];
                                        obj.newValue[key] = _this.matchdispatchedType(type);
                                    }else if(key == '收费标准'){
                                        obj.newValue[key] = obj.newValue[key] == 'FIXED_PRICE' ? '一口价':'自动报价';
                                    }

                                    if(obj.oldValue[key] == 'true'){
                                        obj.oldValue[key] = '是'
                                    }else if(obj.oldValue[key] == 'false'){
                                        obj.oldValue[key] = '否'
                                    }else if(key == '派遣时间'){
                                        const time = obj.oldValue[key];
                                        obj.oldValue[key] = util.getLocalTime(new Date(time).getTime()); 
                                    }else if(key == '派遣类型'){
                                        const type = obj.oldValue[key];
                                        obj.oldValue[key] = _this.matchdispatchedType(type);
                                    }else if(key == '收费标准'){
                                        obj.oldValue[key] = obj.oldValue[key] == 'FIXED_PRICE' ? '一口价':'自动报价';
                                    }

                                    if(obj.status == 'UPDATE'){
                                        str += `<span style='color:red'>${key}</span>由&nbsp;&nbsp;"<span style="color:rgb(57, 182, 229)">${obj.oldValue[key]}</span>"&nbsp;&nbsp;修改为&nbsp;&nbsp;"<span style="color:rgb(57, 182, 229)">${obj.newValue[key]}</span>"&nbsp;&nbsp;，`
                                    }else{
                                        str += `<span style='color:red'>${key}</span>&nbsp;&nbsp;&nbsp;<span style="color:rgb(57, 182, 229)">"${obj.newValue[key]}"</span>，`
                                    }
                                }
                                str = str.substring(0, str.length - 1);
                            }else if (obj.status == 'INSERT' ){
                                str = userName + ' ，下了新订单。 ';

                            }else if(obj.status == 'SHARE'){
                                str = userName + ` ，分享了订单。`;
                                for(let key in obj.oldValue){
                                    if(obj.newValue[key] == 'true'){
                                        obj.newValue[key] = '是'
                                    }else if(obj.newValue[key] == 'false'){
                                        obj.newValue[key] = '否'
                                    }else if(key == '派遣时间'){
                                        const time = obj.newValue[key];
                                        obj.newValue[key] = util.getLocalTime(new Date(time).getTime()); 
                                    }else if(key == '派遣类型'){
                                        const type = obj.newValue[key];
                                        obj.newValue[key] = _this.matchdispatchedType(type);
                                    }

                                    if(obj.oldValue[key] == 'true'){
                                        obj.oldValue[key] = '是'
                                    }else if(obj.oldValue[key] == 'false'){
                                        obj.oldValue[key] = '否'
                                    }else if(key == '派遣时间'){
                                        const time = obj.oldValue[key];
                                        obj.oldValue[key] = util.getLocalTime(new Date(time).getTime()); 
                                    }else if(key == '派遣类型'){
                                        const type = obj.oldValue[key];
                                        obj.oldValue[key] = _this.matchdispatchedType(type);
                                    }

                                    if(obj.status == 'UPDATE'){
                                        str += `<span style='color:red'>${key}</span>由&nbsp;&nbsp;"<span style="color:rgb(57, 182, 229)">${obj.oldValue[key]}</span>"&nbsp;&nbsp;修改为&nbsp;&nbsp;"<span style="color:rgb(57, 182, 229)">${obj.newValue[key]}</span>"&nbsp;&nbsp;，`
                                    }else{
                                        str += `<span style='color:red'>${key}</span>&nbsp;&nbsp;&nbsp;<span style="color:rgb(57, 182, 229)">"${obj.newValue[key]}"</span>，`
                                    }
                                }
                            }
                            if(obj.newValue.lastDispatchStatus || obj.newValue.lastDispatchTime || obj.newValue.lastDispatchType || obj.newValue.updated)return true;
                            arr.push({
                                time: time,
                                content: str
                            });
                        });

                        _this.records = arr.reverse();

                    }
                });

                /**
                 * job 的修改记录
                 */
                // _this.orderJobRcords = [];
                _this.informtion.orderJobList.forEach( (orderJob, index) => {
                    send({
                        url: 'finance:/accounting/query/accountingupdaterecord',
                        type: 'post',
                        param: {
                            towOrderId: orderJob.towOrderId,
                            towJobId: orderJob.towJobId
                        }
                    }, function(err, res){
                        console.log(res);
                        
                        if(res.status == 200){
                            let arr = [];
                            res.content.forEach( (obj, index) => {
                                const time = util.getLocalTime(obj.created);
                                const userName = obj.user ? obj.user.empName : '';

                                obj.newValue.value = JSON.parse(obj.newValue.value);
                                obj.oldValue.value = JSON.parse(obj.oldValue.value);
                                let str = `${userName}，`;
                                if(obj.status == 'UPDATE'){
                                    for(let key in obj.oldValue.value){
                                        let oldValue = obj.oldValue.value[key],
                                            newValue = obj.newValue.value[key];
                                        if(key == "任务总体状态"){
                                          key = "救援结果";
                                          console.log(oldValue);
                                          oldValue = toSwitch(oldValue);
                                          newValue = toSwitch(newValue);
                                          function toSwitch(status){
                                            switch(status){
                                              case 'SUCCESS': return "救援成功";
                                              case 'FAILED': return "救援失败";
                                              case 'CANCEL_CHARGABLE': return "取消救援";
                                              case 'CANCEL_NOFEE': return "取消无费";
                                              default: return "";
                                            }
                                          }
                                        }
                                        str += `将<span style='color:red'>${ key }</span>由&nbsp;&nbsp;"<span style="color:rgb(57, 182, 229)">${oldValue}</span>"&nbsp;&nbsp;修改为&nbsp;&nbsp;"<span style="color:rgb(57, 182, 229)">${newValue}</span>"&nbsp;&nbsp;，`;
                                    }
                                    
                                }else if(obj.status == 'ACCOUNTING'){
                                    str += `核算了订单。`
                                }


                                arr.push({
                                    time: time,
                                    created: obj.created,
                                    content: str,
                                    id: obj.orderAccountingRecordId
                                });
                            });
                            _this.orderJobRcords.splice(index, 1, {
                                jobCode: orderJob.jobCode,
                                records: arr.sort( (a,b) => a.created - b.created) 
                            });
                        }
                        if(index == _this.informtion.orderJobList.length - 1){
                            console.log(_this.orderJobRcords)
                            _this.isShowOrderJobRcords = true;
                        }
                    });
                });
                
            },
            integrationDate(name, item){
                this.response[name] = item;
            },
            showDetails(){
                $(event.currentTarget).find('span').toggleClass('down');
                $(event.currentTarget).siblings('.details').eq(0).slideToggle('fast');
            },
            updataOrderInfo(name, item){
                this.orderInfo[name] = item;
                const that = this;
            },
            getLocalTime(ns){
                return util.getLocalTime(ns);
            },
            matchdispatchedType(status){
                if(status == 'DISPATCH_ME'){
                    return '派遣自己的车辆'
                }else if(status == 'DISPATCH_PARTNER'){
                    return '派遣伙伴的车辆'
                }else if(status == 'SHARE_FIXED_PRICE'){
                    return '一口价分享'
                }else if(status == 'SHARE_MAX_PRICE'){
                    return '最高限价分享'
                }else if(status == 'MATCH_ROUTE'){
                    return '匹配行程'
                }else{
                    return status;
                }

            },

            // 修改
            updata(name, item, index, orderJobIndex){
                const that = this;
                that.disabled = true;

                console.log(name, item, index, orderJobIndex);
                if(name == 'towDriverId'){
                    // 技师
                    console.log(that.res)
                    that.res[orderJobIndex][name] = item.userId;
                    if(that.informtion.orderJobList[orderJobIndex].dispatchAction.driverInfo){
                        that.informtion.orderJobList[orderJobIndex].dispatchAction.driverInfo.workMobile = item.workMobile;
                    }else{
                        that.informtion.orderJobList[orderJobIndex].dispatchAction.driverInfo = {
                            workMobile: item.workMobile
                        }
                    }
                    
                }else if(name == 'assistantDriverId'){
                    // 助理
                    this.res[orderJobIndex][name] = item.userId;
                    if(this.informtion.orderJobList[orderJobIndex].dispatchAction.assistantDriverInfo){
                        this.informtion.orderJobList[orderJobIndex].dispatchAction.assistantDriverInfo.workMobile = item.workMobile;
                    }else{
                        this.informtion.orderJobList[orderJobIndex].dispatchAction.assistantDriverInfo = {
                            workMobile: item.workMobile
                        }
                    }
                }else if(name == 'confirmedAmountCash_ab' || name == 'confirmedAmountSign_ab'){
                    // 去程
                    let _name = name == 'confirmedAmountCash_ab' ? 'confirmedAmountCash' : 'confirmedAmountSign';
                    this.res[orderJobIndex]['feedBacks_ab'][index][_name] = item;
                }else if(name == 'confirmedAmountCash_cd' || name == 'confirmedAmountSign_cd'){
                    // 返程
                    let _name = name == 'confirmedAmountCash_cd' ? 'confirmedAmountCash' : 'confirmedAmountSign';
                    this.res[orderJobIndex]['feedBacks_cd'][index][_name] = item;
                }else if(name == 'confirmedMilageToIncidentSpot' || name == 'confirmedmilageTowing' || name == 'confirmedmilageBack'){
                    if(this.informtion.orderJobList.length > 0 && !this.informtion.orderJobList[orderJobIndex].jobResultEntity){
                        this.informtion.orderJobList[orderJobIndex].jobResultEntity = {};
                    }
                    this.informtion.orderJobList[orderJobIndex].jobResultEntity[name] = item;
                    this.res[orderJobIndex][name] = item;
                }else if(name == 'commission'){
                   for(var i=0;i<this.informtion.orderJobList.length;i++){
                        this.res[i][name] = item;
                   }
                }else if(name == 'carOwnerName' || name == 'carOwnerPhone' || name == 'vehiclePlateNo' || name == 'vehicleName'){
                    this.res[orderJobIndex]['confirmedVehicles'][0][name] = item;
                }else{
                    console.log(this.res[orderJobIndex]);
                    this.res[orderJobIndex][name]= item;
                }

                let confirmedTotalSignCharge = 0, confirmedTotalCashCharge = 0, confirmedTotalSignCompanyCharge = 0, confirmedTotalCashCompanyCharge = 0 ;
                that.res.forEach( (obj, index) => {
                    
                    // 处理feedbacks的去程和返程
                    console.log(obj,obj.feedBacks_ab, obj.feedBacks_cd)
                    obj.feedBacks = obj.feedBacks_ab.concat(obj.feedBacks_cd);
                    // 删除feedBacks_ab,feedBacks_cd
                    // delete obj.feedBacks_ab; delete obj.feedBacks_cd;

                    // 现金总费用、 签单总费用 feedBack
                    if(obj.feedBacks && obj.feedBacks.length > 0){
                        obj.feedBacks.forEach( (item, index) => {
                            // 成本
                            if(item.payTarget == 'COMPANY'){
                                
                                confirmedTotalSignCompanyCharge += Number(item.confirmedAmountSign === null ? (item.amountSign > 0 ? item.amountSign : 0) :  (item.confirmedAmountSign > 0 ? item.confirmedAmountSign : 0));
                                confirmedTotalCashCompanyCharge += Number(item.confirmedAmountCash === null ? (item.amountCash > 0 ? item.amountCash : 0) :  (item.confirmedAmountCash > 0 ? item.confirmedAmountCash : 0));
                            }else if(item.payTarget == 'CUSTOMER' ){
                                // 救援费用（客户付款）
                                confirmedTotalSignCharge +=  Number(item.confirmedAmountSign === null ? (item.amountSign > 0 ? item.amountSign : 0) :  (item.confirmedAmountSign > 0 ? item.confirmedAmountSign : 0));
                                confirmedTotalCashCharge += Number(item.confirmedAmountCash === null ? (item.amountCash > 0 ? item.amountCash : 0) :  (item.confirmedAmountCash > 0 ? item.confirmedAmountCash : 0));
                            }
                        })
                    }

                    // 救援费用
                    let charge = obj.upstreamConfirmed ? ( obj.upstreamConfirmedCharge ? Number(obj.upstreamConfirmedCharge) : 0 ) :  (obj.charge ? Number(obj.charge) : 0 )
                    charge = charge ? charge : that.informtion.price;

                    // 如果订单签单：
                    // 总费用(签单) =救援费用+其他签单费用总和
                    // 总费用(现金) = 其他现金费用总和

                    // 如果订单现金：
                    // 总费用(现金) =救援费用+其他现金费用总和
                    // 总费用(现金) =其他签单费用总和

                    // 加上救援费用的总费用
                    if(that.informtion.settleMethod == 'CASH' || that.informtion.settleMethod == 'HELPBUY'){
                        confirmedTotalCashCharge +=  Number(charge);
                    }else if(that.informtion.settleMethod == 'SIGN'){

                        confirmedTotalSignCharge +=  Number(charge);
                    }

                });

                // 总费用
                console.log(confirmedTotalCashCharge, confirmedTotalSignCharge)
                that.res.forEach((obj, index) => {
                    obj.confirmedTotalCashCharge = confirmedTotalCashCharge.toFixed(2);
                    obj.confirmedTotalSignCharge = confirmedTotalSignCharge.toFixed(2);

                    obj.confirmedTotalSignCompanyCharge = confirmedTotalSignCompanyCharge.toFixed(2);
                    obj.confirmedTotalCashCompanyCharge = confirmedTotalCashCompanyCharge.toFixed(2);
                })


                

                console.warn(that.res);
                // return ;
                send({
                    url: 'finance:/accounting/orderjobresult',
                    type: 'put',
                    param: that.res
                }, function(err, res){
                    console.warn(res);
                    if(res.status != 200){
                        alert(res.msg);
                    }else{
                        console.log(global.listEventIsComplete);
                        if(global.listEventIsComplete){
                            global.listEvent.trigger('accounting-' + that.$route.params.id);
                        }else{
                            that.render(true);
                        }
                    }
                });

            },
            check(signAll, cashAll, rescueSignAll, rescueCashAll){
                const _this = this;
                console.log(signAll, cashAll, rescueSignAll, rescueCashAll);

                // 总费用
                let confirmedTotalSignCharge = 0, confirmedTotalCashCharge = 0, confirmedTotalSignCompanyCharge = 0, confirmedTotalCashCompanyCharge = 0;
                signAll.forEach( (value, index) => {
                    confirmedTotalSignCharge += Number(rescueSignAll[index]);
                    confirmedTotalCashCharge += Number(rescueCashAll[index]);

                    // 成本
                    confirmedTotalSignCompanyCharge += Number(signAll[index]);
                    confirmedTotalCashCompanyCharge += Number(cashAll[index]);
                });

                
                _this.res.forEach( (obj, index) => {
                    console.log(obj);
                    if(obj.upstreamConfirmed){
                        obj.upstreamConfirmedCharge = obj.upstreamConfirmedCharge ? obj.upstreamConfirmedCharge : obj.price;
                    }else{
                        obj.charge = obj.charge ? obj.charge : obj.price;
                    }

                     // 如果核算的到达里程、返回里程、拖车里程都为null，则选择技师填写的到达里程、返回里程、拖车里程
                    obj.confirmedTotalSignCharge = confirmedTotalSignCharge;
                    obj.confirmedTotalCashCharge = confirmedTotalCashCharge;
                    obj.confirmedTotalSignCompanyCharge = confirmedTotalSignCompanyCharge;
                    obj.confirmedTotalCashCompanyCharge = confirmedTotalCashCompanyCharge;

                    obj.confirmedMilageToIncidentSpot = Number(obj.confirmedMilageToIncidentSpot === null ?  (obj.milageToIncidentSpot ? obj.milageToIncidentSpot : 0 ) : ( obj.confirmedMilageToIncidentSpot ?  obj.confirmedMilageToIncidentSpot : 0) );

                    obj.confirmedmilageTowing = Number(obj.confirmedmilageTowing === null ?  (obj.milageTowing ? obj.milageTowing : 0 ) : ( obj.confirmedmilageTowing ?  obj.confirmedmilageTowing : 0 ));

                    obj.confirmedmilageBack = Number(obj.confirmedmilageBack === null ?  (obj.milageBack ? obj.milageBack : 0 ) : ( obj.confirmedmilageBack ?  obj.confirmedmilageBack : 0));


                    // 如果核算到feedBack, 默认为司机填写
                    if(obj.feedBacks && obj.feedBacks.length > 0){
                        obj.feedBacks.forEach( (item, index) => {
                            item.confirmedAmountSign =  Number(item.confirmedAmountSign === null ? (item.amountSign > 0 ? item.amountSign : 0) :  (item.confirmedAmountSign > 0 ? item.confirmedAmountSign : 0));
                            item.confirmedAmountCash = Number(item.confirmedAmountCash === null ? (item.amountCash > 0 ? item.amountCash : 0) :  (item.confirmedAmountCash > 0 ? item.confirmedAmountCash : 0));
                        })
                    }
                    
                });

                console.log(JSON.parse(JSON.stringify(_this.res) ));

                send({
                    url: 'finance:/accounting/accountingorder',
                    type: 'put',
                    param: _this.res
                }, function(err, res){
                    if(err)return alert('服务器出错，请联系管理员');

                    if(global.listEventIsComplete){
                        global.listEvent.trigger('accounting-' + _this.$route.params.id);
                    }else{
                        _this.render();
                    }
                    
                    if(res.status == 200){
                        alert(res.msg, 'success');
                        _this.disabled = true;
                    }else{
                        alert(res.msg ? res.msg : '系统错误，请联系管理员！');
                        console.log(res)
                    }
                })


            }
        },
        destroyed(){
            const id = local.getItem("socket-accounting-id");
            global.listEvent.cancel('accounting-' + id);
            global.listEvent.cancel('accounting-order-' + id);
        }
    }
</script>

<style>
#businessAccounting{
    margin-top: 22px;
    position: relative;
}
#businessAccounting article{
    margin-top: 10px;
    margin-bottom: 10px;
}
#businessAccounting .details{
    background: #fff;
    padding: 10px;
    margin-bottom: 10px;
}
#businessAccounting  article{
    cursor: pointer;
    overflow: hidden;
}
#businessAccounting  article:after{
    left:130px;
    width: 100%;
}
#businessAccounting .orderJobRecord:after{
    left: 230px;
}
</style>