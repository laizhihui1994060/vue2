<template>
    <div id="sahreDateil">
        <article  style="margin-top:0" v-if="article">订单信息</article>
        <div class="clearfix" style="padding:0 10px">
            <div class="row" style='margin-top:10px;'>
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="订单来源" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.sourceType"/>
                </div>   
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="客户名称" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.customerName"/>
                </div>   
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="业务类型" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="matchRescueType(orderItem.jobType)"/>
                </div>   

            </div> 



            <div class="row">
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="救援时间" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="getLocalTime(orderItem.orderScheduleTime)"/>
                </div>   
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="委托人员" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.callPersonName"/>
                </div>   
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="委托电话" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.callPersonContact"/>
                </div>   
            </div>
            
            <div class="row">
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="车主姓名" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.orderVehicles && orderItem.orderVehicles.length ? orderItem.orderVehicles[0].carOwnerName:''"/>
                </div>   
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="车主电话" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.orderVehicles && orderItem.orderVehicles.length ? orderItem.orderVehicles[0].carOwnerPhone:''"/>
                </div>   
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="车辆类型" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.orderVehicles && orderItem.orderVehicles.length ? orderItem.orderVehicles[0].vehicleCategory:''"/>
                </div>   
            </div>

            
            <div class="row">
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="车辆品牌" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.orderVehicles && orderItem.orderVehicles.length ? orderItem.orderVehicles[0].vehicleBrand:''"/>
                </div>   
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="车辆型号" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.orderVehicles && orderItem.orderVehicles.length ? orderItem.orderVehicles[0].vehicleName:''"/>
                </div>   
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="车辆颜色" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.orderVehicles && orderItem.orderVehicles.length ? orderItem.orderVehicles[0].vehicleColor:''"/>
                </div>   
            </div>


            <div class="row">
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="车辆号码" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.orderVehicles && orderItem.orderVehicles.length ? orderItem.orderVehicles[0].vehiclePlateNo:''"/>
                </div>   
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="车架号码" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.orderVehicles && orderItem.orderVehicles.length ? orderItem.orderVehicles[0].vehicleId:''"/>
                </div>   
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="案件号码" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.customerCaseNo"/>
                </div>   
            </div>


            
            <div class="row">
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="具体场景" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.fieldSituation"/>
                </div>   
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="随车人员" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.qtyPassengers"/>
                </div>   
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="托运数量" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.orderVehicles && orderItem.orderVehicles.length ? orderItem.orderVehicles[0].qty:''"/>
                </div>   
                
            </div>


            
            <div class="row" v-if="orderItem.jobType == '03'">
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="接车人员" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.orderVehicles && orderItem.orderVehicles.length ? orderItem.orderVehicles[0].meetPerson:''"/>
                </div>   
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="接车电话" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.orderVehicles && orderItem.orderVehicles.length ? orderItem.orderVehicles[0].meetPersonContact:''"/>
                </div>   
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="交车人员" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.customerCaseNo"/>
                </div>   
            </div>
 
            <div class="row" v-if="orderItem.jobType == '03'">
               
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="交车电话" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.orderVehicles && orderItem.orderVehicles.length ? orderItem.orderVehicles[0].takePersonContact:''"/>
                </div>  
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="秘密运输" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.orderVehicles && orderItem.orderVehicles.length ? orderItem.orderVehicles[0].disclose ? '是':'否':'否'"/>
                </div>
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="添加返程" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.hasBackJob? '是':'否'"/>
                </div>   
            </div>

            <div class="row">
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="是否事故" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.isAccident? '是':'否'"/>
                </div>   
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="是否勘察" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.needInspect? '是':'否'"/>
                </div>  
                <div class="col-xs-4" v-if="rescueType == '0202'">
                    <form-label-input 
                        input-width="108px"
                        label="燃料类型" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.oilType + ' ' + orderItem.oilNo"/>
                </div>    
            </div>

            <div class="row">
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="特殊服务" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.specialServiceRequired? orderItem.specialServiceDesc:'无'"/>
                </div>   
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="开&nbsp;发&nbsp; 票" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.cashInvoiced? '是':'否'"/>
                </div>   
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="付款方式" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.settleMethod == 'CASH' ? '现付':'签单'"/>
                </div>   
            </div>

            <div class="row">
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="是否小轮" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.needAssistWheel? orderItem.numWheels:0"/>
                </div>   
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="报价方式" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.pricingMethod == 'FIXED_PRICE' ? '一口价':'自动报价'"/>
                </div>   
                <div class="col-xs-4">
                    <form-label-input 
                        input-width="108px"
                        label="订单价格" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.price"/>
                </div>   
              
            </div>
            
            
           <!--  <div class="row">
                <div class="col-xs-12" v-if="pricing == 'FORMULA'">
                    <btn-select  
                        width="270px" 
                        padding="0"
                        label="计价公式"
                        name="quotationId"
                        label-right="12px"
                        url="control:/quota/quota/list/querypartnerquotation" 
                        method="post"
                        filterName="sysQuotationId"
                        :params="{sysPartnerId:orderItem.customerId }"
                        filter="pricingFormulaChinese"
                        list-width="298px"
                        :uuid="true"
                        :updata-key="updateNumber"
                        field="sysQuotationId"
                        :value="orderItem.quotationId"/>
                </div>
            </div> -->

            
            <div class="row">
                <div class="col-xs-12">
                    <form-label-input 
                        :input-width="inputWidht"
                        label="救援地址" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.incidentAddrAddress"/>
                </div>   
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <form-label-input 
                        :input-width="inputWidht"
                        label="目的地址" 
                        name="rescueAddress"
                        disabled="disabled"
                        :value="orderItem.destinationAddrAddress"/>
                </div>   
            </div>

             <div class="row">
                <div class="col-xs-12">
                    <label class='pull-left VOICE' style="margin-top:10px">录音备注</label>
                    <template v-for="(it,index) in orderItem.comments" v-if="it.commentType == 'VOICE'">
                        <voice
                            text=""
                            style="float:left;margin-bottom:0"
                            :src="it.comment"/>
                    </template>
                        <label id="notVoice" style="margin-top:10px;margin-left:5px">暂无录音</label>
                </div>
            </div>

            <div class="row" v-for="(it,index) in orderItem.remark">
                <div class="col-xs-12" v-if="it.commentType == 'TEXT'">
                    <input-text
                        :input-width="textInputWidth"
                        :name="'comments:' + index + ':' + 'TEXT'"
                        label="文本备注"
                        disabled="disabled"
                        input-height="60px"
                        margin-top="0"
                        :value="it.comment"/>
                </div>
            </div>
<!-- 
            <div class="row">
                <div class="col-xs-12">
                    <input-text
                        label="备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注"
                        :input-width="textInputWidth"
                        name="remark"
                        disabled="disabled"
                        margin-top="0"
                        :value="orderItem.remark && orderItem.remark.length ? orderItem.remark[0].comment:''"/>
                </div>
            </div> -->

        </div>
    </div>
</template>

<script>
import  formLabelInput from "./form-label-input.vue";
import  inputText from "./inputText.vue";

    export default {
        props:{
            orderItem:{},
            article:{
                default:true
            },
            inputWidht:{
                default:'526px'
            },
            textInputWidth:{
                deafult:'86%'
            }
        },
        components:{
            formLabelInput,
            inputText,
        },
        
        data () {
           return {
               
           }
        },
        methods:{
            matchOrderStatus(stataus){
                return stataus  ? util.matchOrderStatus(stataus,'orderStatus_icon'):'';
            },
            matchRescueType(stataus){
                return stataus  ? util.matchRescueType(stataus).cn:'';
            },
            getLocalTime(ns){
                return util.getLocalTime(ns);
            },
               
        },
        watch:{
            orderItem(newv){
                console.log(newv)
                this.$nextTick(function(){
                    $('#sahreDateil').find('audio').length ? $('#notVoice').hide():$('#notVoice').show();
                });
            }
        }
      
    }
 

</script>
<style scoped>
   
    article{
        margin: 0;
    }
    article:after{
        width: 553px;
    }
    
    .row{
        margin-top: 2px
    }
    .row:nth-child(1){
        margin-top: 0
    }
   
    .resetPadding{
        padding: 0
    }
    .col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12{
        padding-right: 0 ;
    }
  
   
</style>