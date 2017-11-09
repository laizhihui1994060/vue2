<template>
    <div class="content" id="fastRepai">
      <div class="body clearfix">
            <p class="prompt pull-left" v-if="orderItem.order.orderCode && isReturn" v-text="'当前订单号为:   ' + orderItem.order.orderCode"></p>        
            <article>基本信息</article>
            <div class="row">
                <div class="col-xs-12">
                    <div class="inline">
                        <label class="aftera">客户信息</label>
                    </div>
                    <div class="inline">
                        <btn-select  
                            width="144px"
                            url="control:/sys/param" 
                            method='post'
                            :params="['/order/book/source_types']"
                            padding="0"
                            title="订单来源"
                            verify="1"
                            name="sourceType"
                            @updata="integrationDate"
                            label-right="12px"
                            list-width="96px"
                            :value="orderItem.order.sourceType"/>
                    </div>
                    <div class="inline">
                        <form-label-input  input-width="144px" @updata="integrationDate" name="customerCaseNo" placeholder="案件号码" :value="orderItem.order.customerCaseNo"/>
                    </div>
                </div>
            </div> 
            <div class="row">
                <btn-select  
                    width="292px"
                    url="client:/helper/partner" 
                    method='post'
                    :params="{isCustomer:true,cooperationStatus :'UNDER_CONTRACT'}"
                    padding="0"
                    filter="name" 
                    label="　　　　　"
                    title="客户名称"
                    name="customerId"
                    :partnerCompany="orderItem.order.partnerCompany"
                    @updata="integrationDate"
                    label-right="12px"
                    verify="1"
                    list-width="96px"
                    :uuid="true"
                    field="partnerId"
                    :value="orderItem.order.customerId"/>
            </div>

            <div class="row">
                <div class="col-xs-12">
                    <btn-select  
                        url="order:/order/job/types?level=2&parent=02" 
                        padding="0"
                        filter="name" 
                        verify="1"
                        width="292px"
                        after="true"
                        label="快修业务"
                        name="jobType"
                        @updata="integrationDate"
                        label-right="12px"
                        :after="true"
                        :uuid="true"
                        field="code"
                        list-width="96px"
                        :value="orderItem.order.jobType"/>
                    
                </div>
            </div>

            <div class="row selectTime">
              <!--   <div class="col-xs-6">
                    <radio 
                        text="即时救援" 
                        value="INSTANT"
                        name="orderType"
                        :checked="orderItem.order.orderType == 'INSTANT' ? true:false "
                        @updata="integrationDate"
                        textDirection="right"/>
                </div>
                <div class="col-xs-6">
                    <radio 
                        text="预约救援" 
                        name="orderType"
                        value="SCHEDULED"
                        :checked="orderItem.order.orderType == 'SCHEDULED' ? true:false "
                        @updata="integrationDate"
                        textDirection="right"/>
                </div> -->
                <div class="col-xs-12">
                    <!-- background from #DFF5FD to rgb(231, 242, 254) -->
                    <datetimepicker
                        label="救援时间"
                        label-right="12px"
                        background="rgb(231, 242, 254)"
                        width="293px"
                        :after="true"
                        verify="1"
                        name="orderScheduleTime"
                        @updata="integrationDate"
                        minView="minute"
                        :startDate="true"
                        :minDate="minDate ? minDate : new Date().getTime()"
                        :value="orderItem.order.orderScheduleTime ?orderItem.order.orderScheduleTime : new Date().getTime() "/>
                    
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12">
                    <form-label-input 
                        label="救援地址" 
                        input-width="293px"
                        placeholder="输入救援地地址或双击地图"
                        name="incidentAddrAddress"
                        id="Autocomplete_rescue"
                        :after="true"
                        verify="1"
                        @updata="integrationDate"
                        :value="orderItem.order.incidentAddrAddress"/>
                </div>


                <!-- <div class="col-xs-12" style="margin-top:6px;">
                    <form-label-input 
                        label="目的地址" 
                        :after="true"
                        placeholder="请在左侧搜索栏检索地址或双击地图"
                        input-width="293px"
                        disabled="disabled"
                        name="address"
                        verify="1"
                        :value="destination.address"
                        @updata="integrationDate"/>
                </div> -->
            </div>
            

            <div class="row">
                <div class="col-xs-12">
                    <div class="inline">
                        <label class="aftera">车主信息</label>
                    </div>
                    <div class="inline">
                        <form-label-input @updata="integrationDate" input-width="145px" name="carOwnerName" placeholder="车主姓名" :value="orderItem.vehicles.carOwnerName"/>
                    </div>
                    <div class="inline">
                        <form-label-input @updata="integrationDate" input-width="145px" name="carOwnerPhone" type="number" placeholder="车主电话" verify="1" :value="orderItem.vehicles.carOwnerPhone"/>
                    </div>
                </div>
            </div> 

            <div class="row">
                <div class="col-xs-12">
                    <div class="inline">
                        <label>委派信息</label>
                    </div>
                    <div class="inline">
                        <form-label-input @updata="integrationDate" input-width="145px" name="callPersonName" placeholder="委派人姓名" :value="orderItem.order.callPersonName"/>
                    </div>
                    <div class="inline">
                        <form-label-input @updata="integrationDate" input-width="145px" name="callPersonContact" type="number" placeholder="委派人电话" :value="orderItem.order.callPersonContact"/>
                    </div>
                </div>
            </div> 

            <div class="row">
                <div class="col-xs-12">
                    <div class="inline">
                        <label>车辆信息</label>
                    </div>
                    <div class="inline">
                        <btn-select  
                            width="144px"
                            padding="0" 
                            title="车辆型号"
                            id="carx"
                            label-right="12px"
                            name="vehicleModelCode"
                            @updata="integrationDate"
                            :url="'client:/helper/vehiclemodel?categoryCode=&vendorCode=&brandCode='" 
                            filter="name"
                            list-width="96px"
                            :inputText="true"
                            :clearQuery="number"
                            :value="orderItem.vehicles.vehicleName"/>
                    </div>
                    <div class="inline">
                        <form-label-input @updata="integrationDate" input-width="145px" name="vehiclePlateNo" :value="orderItem.vehicles.vehiclePlateNo" placeholder="车牌号码" />
                    </div>
                </div>
            </div> 

            <div class="row">
                <div class="col-xs-12">
                    <div class="inline">
                        <label>车辆补充</label>
                    </div>
                    <div class="inline">
                        <btn-select  
                            width="144px" 
                            title="车辆类型"
                            padding="0"

                            url="client:/helper/vehiclecat" 
                            filter="name" 
                            name="vehicleCategory"
                            @updata="integrationDate"
                            label-right="12px"
                            list-width="96px"
                            field="code"
                            :uuid="true"
                            :value="orderItem.vehicles.vehicleCategory"/>
                    </div>
                    <div class="inline">
                        <form-label-input @updata="integrationDate" input-width="145px" name="vehicleColor" placeholder="车辆颜色" :value="orderItem.vehicles.vehicleColor"/>
                    </div>
                </div>
            </div> 

            <div class="row">
                <div class="col-xs-12">
                    <label>施救方式</label>

                    <checkbox 
                        text="拖车" 
                        style="margin-right:0"
                        direction="left"
                        label-left="0"
                        input-left="0"
                        name="rescueType" 
                        value="TOW"
                        @updata="integrationDate"/>
                    <checkbox 
                        text="托吊" 
                        style="margin-right:0"
                        direction="left"
                        label-left="0"
                        input-left="0"
                        name="rescueType" 
                        value="LIFT"
                        @updata="integrationDate"/>
                    <checkbox 
                        text="其他" 
                        style="margin-right:0"
                        direction="left"
                        label-left="0"
                        input-left="0"
                        name="rescueType" 
                        value="OTHER"
                        @updata="integrationDate"/>
                </div>   
            </div>
    
    
            <div class="row">
                <div class="col-xs-9">
                    <label>收款方式</label>
                    <template v-for="it in settleMethod">
                        <radio 
                            :text="it.desc" 
                            name="settleMethod" 
                            rightMarginLeft="0"
                            textDirection="right"
                            :checked="orderItem.order.settleMethod == it.code ? true:false "
                            :value="it.code"
                            @updata="integrationDate"/>
                    </template>

                </div>
                <div class="col-xs-3" style="padding:0">
                    <switch-btn 
                        name="cashInvoiced" 
                        :checked="orderItem.order.cashInvoiced ? 'checked':false " 
                        value="1"
                        labelRight="5px"
                        @updata="integrationDate"
                        text="开票"/>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div style="display:inline-block">
                        <btn-select  
                            width="100px"
                            padding="0" 
                            label="收费标准"
                            :after="true"
                            label-right="12px"
                            name="pricing"
                            @updata="integrationDate"
                            filter="cn"
                            :arr="[{cn:'一口价',en:'FIXED_PRICE'},{cn:'自动报价',en:'FORMULA'}]"
                            list-width="96px"
                            :uuid="true"
                            title="一口价"
                            :clearQuery="number"
                            field="en"
                            :value="orderItem.order.pricingMethod"/>
                    </div>
                    <div style="display:inline-block"  v-if="orderItem.order.pricingMethod == 'FORMULA'">
                        <btn-select  
                            width="128px" 
                            padding="0"
                            name="quotationId"
                            id="gongsi"
                            title="选择报价公式"
                            @updata="integrationDate"
                            label-right="12px"
                            url="control:/quota/quota/list/querypartnerquotation" 
                            method="post"
                            :params="{sysPartnerId:orderItem.order.customerId || result.customerId}"
                            filter="name"
                            list-width="298px"
                            :uuid="true"
                            :after="true"
                            :updata-key="updateNumber"
                            field="sysQuotationId"
                            :value="orderItem.order.quotationId"/>
                    </div>
                    <div style="display:inline-block">
                        <form-label-input 
                            id='baojia'
                            textIndent="3px"
                            @updata="integrationDate" 
                            name="price" 
                            input-width="60px"
                            type="number"
                            unit="元"
                            :disabled="orderItem.order.pricingMethod == 'FORMULA'"
                            :value="orderItem.order.price || result.price"/>
                    </div>
                </div>
            </div>


          

            <div class="row">
                <div class="col-xs-5">
                    <switch-btn 
                        name="specialServiceRequired" 
                        :checked="orderItem.order.specialServiceRequired? true:false " 
                        value="1"
                        @updata="integrationDate"
                        text="特殊服务"/>
                </div>
                <div class="col-xs-6" v-if="orderItem.order.specialServiceRequired">
                    <form-label-input
                        input-width="150px"
                        name="specialServiceDesc"  
                        placeholder="输入服务内容"
                        @updata="integrationDate"
                        :value="orderItem.order.specialServiceDesc"/>
                </div>

            </div>

                
            <div class="row">
                <div class="col-xs-12">
                    <label class='pull-left VOICE' style="margin-top:10px;display:none">录音备注</label>
                    <template v-for="(it,index) in orderItem.comments" v-if="it.commentType == 'VOICE'">
                        <voice
                            text=""
                            style="float:left;margin-bottom:0"
                            :src="it.comment"/>
                    </template>
                </div>
            </div>

            <div class="row" v-for="(it,index) in orderItem.comments">
                <div class="col-xs-12" v-if="it.commentType == 'TEXT'">
                    <input-text
                        input-width="293px"
                        @updata="integrationDate" 
                        :name="'comments:' + index + ':' + 'TEXT'"
                        label="文本备注"
                        input-height="60px"
                        margin-top="0"
                        :value="it.comment"/>
                </div>
            </div>
        </div>

        <div class="footer" v-if="!isReturn">
            <div class="btns">
                <button @click="dispatchCar(true)" class="btn" >保存订单</button>
                <button v-if="auto_dispatchCar" @click="dispatchCar(true,true)" class="btn" >保存并派车</button>
                <button @click="clearInfo" class="btn">清除信息</button>
            </div>
        </div>
        <div class="footer" v-if="isReturn &&  (!messageType || messageType == 'TIME_OUT'  || messageType == 'CHECK_ORDER') ">
            <div class="btns">
                <button class="btn" @click="modify">{{isModify ? '保存订单' : '修改订单'}}</button>
                <button class="btn" @click="cancel">取消订单</button>
                <button class="btn" @click="dispatchCar(false)">立即派车</button>
            </div>
        </div>
        <div class="footer" v-if="messageType == 'NEW_ORDER'">
            <div class="btns">
                <button class="btn" @click="accept(false)">接受</button>
                <button class="btn" @click="accept(true)">接受并派车</button>
                <button class="btn" @click="reject">拒绝</button>
            </div>
        </div>
        <div class="footer" v-if="messageType == 'ORDER_IMPORT'">
            <div class="btns">
                <button class="btn" @click="importAudit(false)">审核</button>
                <button class="btn" @click="importAudit(true)">审核并派车</button>
                <button class="btn" @click="importCancel">删除订单</button>
            </div>
        </div>
    </div>
</template>

<script>
import  datetimepicker from "../../../../../common_component/datetimepicker.vue";
import  btnSelect from "../../../../../common_component/btn_select.vue";
import  formLabelInput from "../../../../../common_component/form-label-input.vue";
import  radio from "../../../../../common_component/radio.vue";
import  checkbox from "../../../../../common_component/checkbox.vue";
import  switchBtn from "../../../../../common_component/switch.vue";
import  inputText from "../../../../../common_component/inputText.vue";
import  voice from "../../../../../common_component/voice.vue";
    export default {
        props:['items'],
        components:{ 
            datetimepicker,
            btnSelect,
            formLabelInput,
            radio,
            checkbox,
            inputText,
            switchBtn,
            voice
        },
       
        data () {
            return {
                isModify : false ,
                settleMethod:[],
                flies:[],
                RL:false,
                quotation:false,
                rescue:{
                    address:''
                },
                destination:{
                    address:''
                },
                isReturn:false,
                result:{},
                orderItem:{},
                 messageType:'',
                shareActionId:'',
                brandCode:'',
                vehicleCategory:'',
                number:0,
                auto_dispatchCar:true,

                minDate: '',
            }
        },
        methods:{
           
            integrationDate(name,item){
                order_operation.metchStatus(this,name,item)
            },
            showOpationToggle(){
                order_operation.showOpationToggle(this,262)
            },
            clearInfo(){
                this.clearNumber++;
                this.flies = [];
                order_operation.form_clear(this);

            },
            saveOrder(){
                order_operation.saveOrder(this);
            },
            dispatchCar(isSave,isDispatch){
               order_operation.dispatchCar(this,isSave,isDispatch);
            },
            modify(){
                order_operation.modify(this);
            },
            cancel(){
                order_operation.cancel(this);
            },
            accept(isDispatch){
                order_operation.accept(this,'BID_APPROVED',isDispatch);
            },
            reject(){
                order_operation.accept(this,'BID_NOTPASSED');
            },
            importAudit(isDispatch){
                order_operation.importAudit(this,isDispatch);
            },
            importCancel(){
                order_operation.delete(this);
            }
        },
        mounted(){

            const self = this;

            this.$nextTick(function(){

                order_operation.watchAddress(self);
                order_operation.watchEl(self);
            })

        },
        created(){
            order_operation.watchEl(this,this.items);
            order_operation.getFieldType(this);
            order_operation.getSettleMethod(this);
            order_operation.resetDate(this);
        },
        watch: {
            orderItem: {
              handler: function (val, oldVal) {},
              deep: true
            },
            result: {
              handler: function (val, oldVal) {},
              deep: true
            },
            items: {
                handler(val, oldVal) {
                    order_operation.watchEl(this,val);
                },
                deep: true
            }
        }
    }

   

</script>

<style scoped>
@import '../../../../../../static/css/orderNo.css';
.modifyOptions{
    height: 30px !important;
}
</style>