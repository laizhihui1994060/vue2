<template>
    <div class="content" id="commercialVehicle">
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
                            url="control:/sys/param" 
                            width="144px"
                            method='post'
                            :params="['/order/book/source_types']"
                            padding="0"
                            title="订单来源"
                            verify="1"
                            name="sourceType"
                            @updata="integrationDate"
                            label-right="12px"
                            :value="orderItem.order.sourceType"/>
                    </div>
                    <div class="inline">
                        <form-label-input input-width="144px" @updata="integrationDate" name="customerCaseNo" placeholder="案件号码" :value="orderItem.order.customerCaseNo"/>
                    </div>
                </div>
            </div> 
            <div class="row">
                <btn-select  
                    url="client:/helper/partner" 
                    method='post'
                    :params="{isCustomer:true,cooperationStatus :'UNDER_CONTRACT'}"
                    padding="0"
                    width="292px"
                    filter="name" 
                    label="　　　　　"
                    title="客户名称"
                    :partnerCompany="orderItem.order.partnerCompany"
                    name="customerId"
                    @updata="integrationDate"
                    label-right="12px"
                    verify="1"
                    list-width="96px"
                    :uuid="true"
                    field="partnerId"
                    :value="orderItem.order.customerId"/>
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
                        :value="orderItem.order.orderScheduleTime ?orderItem.order.orderScheduleTime : new Date().getTime() " />
                    
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


                <div class="col-xs-12" style="margin-top:6px;">
                    <form-label-input 
                        label="目的地址" 
                        :after="true"
                        input-width="293px"
                        placeholder="输入目的地地址或双击地图"
                        name="destinationAddrAddress"
                        verify="1"
                        id="Autocomplete_destination"
                        :value="orderItem.order.destinationAddrAddress"
                        @updata="integrationDate"/>
                </div>
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
                            field="code"
                            :uuid="true"
                            :value="orderItem.vehicles.vehicleCategory"/>
                    </div>
                    <div class="inline">
                    <form-label-input type="number" input-width="145px" verify="1"  @updata="integrationDate" min="1" name="qtyOfVehicles" :value="orderItem.order.qtyOfVehicles"  placeholder="托运数量"/>
                    </div>
                </div>
            </div> 

            <div class="row">
                <div class="col-xs-12">
                    <div class="inline">
                        <label>接车信息</label>
                    </div>
                    <div class="inline">
                        <form-label-input @updata="integrationDate" input-width="145px" name="meetPerson" placeholder="接车人姓名" :value="orderItem.vehicles.meetPerson"/>
                    </div>
                    <div class="inline">
                        <form-label-input @updata="integrationDate" input-width="145px" name="meetPersonContact" placeholder="接车人电话" :value="orderItem.vehicles.meetPersonContact"/>
                    </div>
                </div>
            </div> 

            <div class="row">
                <div class="col-xs-12">
                    <div class="inline">
                        <label>交车信息</label>
                    </div>
                    <div class="inline">
                        <form-label-input @updata="integrationDate" input-width="145px" name="takePerson" placeholder="交车人姓名" :value="orderItem.vehicles.takePerson"/>
                    </div>
                    <div class="inline">
                        <form-label-input @updata="integrationDate" input-width="145px" name="takePersonContact" placeholder="交车人电话" :value="orderItem.vehicles.takePersonContact"/>
                    </div>
                </div>
            </div> 
        
            
            <div class="row">

                <div class="clearfix">
                    <div class="col-xs-3">
                        <label  class="labelPadding">施救方式</label>
                    </div>
                    <div class="col-xs-3">
                        <checkbox 
                            text="拖车" 
                            style="margin-right:0"
                            direction="left"
                            label-left="0"
                            input-left="0"
                            name="rescueType" 
                            value="TOW"
                            @updata="integrationDate"/>
                    </div>   
                    <div class="col-xs-3">
                        <checkbox 
                            text="托吊" 
                            style="margin-right:0"
                            direction="left"
                            label-left="0"
                            input-left="0"
                            name="rescueType" 
                            value="LIFT"
                            @updata="integrationDate"/>
                    </div>   
                    <div class="col-xs-3">
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

                <div class="clearfix">
                    <div class="col-xs-5">
                        <switch-btn 
                            name="disclose" 
                            :checked="orderItem.vehicles.disclose"
                            value="1"
                            @updata="integrationDate"
                            text="秘密运输"/>
                    </div>
                    <div class="col-xs-6">
                        <switch-btn 
                            name="needInspect"  
                            :checked="orderItem.order.needInspect "
                            value="1"
                            @updata="integrationDate"
                            text="是否勘察"/>
                    </div>
                </div>
            

                <div class="clearfix">
                    <div class="col-xs-12">
                        <switch-btn 
                            name="hasBackJob" 
                            :checked="orderItem.hasBackJob"
                            value="1"
                            @updata="integrationDate"
                            text="添加返程"/>
                    </div>
                    
                </div>


                <div class="clearfix">
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
                        input-height="40px"
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
        <div class="footer" v-if="isReturn &&  (!messageType || messageType == 'TIME_OUT' ||  messageType == 'CHECK_ORDER')">
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
import  inputText from "../../../../../common_component/inputText.vue";
import  inputImg from "../../../../../common_component/inputImg.vue";
import  switchBtn from "../../../../../common_component/switch.vue";

    export default {
        props:['items'],
        components:{
            datetimepicker,
            btnSelect,
            formLabelInput,
            radio,
            checkbox,
            inputText,
            inputImg,
            switchBtn
        },
       
        data () {
            return {
                fieldSituation:[],  //具体场景
                settleMethod:[],
                field:'地面',
                showOpation:false, //显示配置项
                isModify : false ,
                price:0,
                updateNumber:0 ,
                quotation :false,
                flies:[],
                rescue:{
                    address:''
                },
                destination:{
                    address:''
                },
                isReturn:false,
                clearNumber:0,
                result:{},
                orderItem:{},
                messageType:'',
                shareActionId:'',
                number:0,
                auto_dispatchCar:true,

                minDate: '',
            }
        },
        methods:{
            watchImg(name,flies,i){
                this.flies = flies;
                // if(this.orderItem.order.fieldPhotos.length){
                //     this.orderItem.order.fieldPhotos.splice(i,1)
                // }
            },
            integrationDate(name,item){
                console.log(name, item);
                order_operation.metchStatus(this,name,item)
            },
            showOpationToggle(){
                order_operation.showOpationToggle(this,234)
            },
            clearInfo(bool){
                this.clearNumber++;
                this.flies = [];
                order_operation.form_clear(this,bool);

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
</style>