    <template>
    <div class="content" id="trailer">
        <div class="clearfix trailer-body">
            <p class="prompt" v-text="orderItem.orderCode ? '当前订单号为:   ' + orderItem.orderCode : ''"></p>        
            <p class="prompt" v-html="matchOrderStatus(orderItem.orderStatus) ? '当前任务状态:   ' + matchOrderStatus(orderItem.orderStatus): ''"></p>        
            
            <div class="row" style='margin-top:10px;'>
                <div class="col-xs-6 ">
                    <btn-select  
                        width="98px"
                        url="control:/sys/param" 
                        method='post'
                        :params="['/order/book/source_types']"
                        label="订单来源"
                        verify="1"
                        padding="0"
                        :after="true" 
                        name="sourceType"
                        @updata="integrationDate"
                        label-right="12px"
                        :value="orderItem.sourceType"/>
                </div>
                <div class="col-xs-6">
                        <btn-select  
                            width="98px"
                            url="client:/helper/partner" 
                            method='post'
                            :params="{isCustomer:true,cooperationStatus :'UNDER_CONTRACT'}"
                            padding="0"
                            filter="name" 
                            label="客户名称"
                            verify="1"
                            name="customerId"
                            filterName="partnerId"
                            @updata="integrationDate"
                            label-right="12px"
                            :after="true"
                            :value="orderItem.customerName"/>

                  <!--   <template  v-else>
                        <form-label-input @updata="integrationDate" name="customerCaseNo" label="客户名称" :value="orderItem.customerName"/>
                    </template> -->

                </div>
            </div> 

            <div class="row">
                <div class="col-xs-6">
                    <btn-select  
                        width="98px"
                        url="client:/job/type/grade" 
                        padding="0"
                        filter="name" 
                        label="业务类型"
                        name="jobType"
                        @updata="integrationDate"
                        label-right="12px"
                        filterName="code"
                        :after="true"
                        :uuid="true"
                        field="code"
                        :value="orderItem.jobType"/>
                </div>


                <div class="col-xs-6">
                    <form-label-input list-width="98px" @updata="integrationDate" name="customerCaseNo" label="案&nbsp;&nbsp;件&nbsp; 号" :value="orderItem.customerCaseNo"/>
                </div>
            </div>
            <div class="row" v-if="rescueType == '0202'">
                <div class="col-xs-3">
                    <label class="labelPadding">燃料类型</label>
                </div>
                <div class="col-xs-3 paddingLeft">
                    <radio 
                        text="汽油" 
                        style="margin-right:0"
                        :img-left="true" 
                        textDirection="right"
                        name="oilType" 
                        :checked="orderItem.oilType != '柴油' ? 'checked':false "
                        value="汽油"
                        @updata="integrationDate"/>
                </div>    
                <div class="col-xs-2 paddingLeft">
                    <radio 
                        text="柴油" 
                        textDirection="right"
                        style="margin-left:-20px;margin-right:0"
                        :img-left="true" 
                        name="oilType" 
                        :checked="orderItem.oilType == '柴油' ? 'checked':false "
                        value="柴油"
                        @updata="integrationDate"/>
                </div>     
                <div class="col-xs-4 paddingLeft">
                     <form-label-input
                        input-width="118px"
                        name="oilNo"  
                        :after="true"
                        placeholder="输入汽油或柴油标号"
                        @updata="integrationDate"
                        :value="orderItem.oilNo"/>
                </div>    
            </div>

            <div class="row">
                <div class="col-xs-12">
                    <datetimepicker
                        :after="true"
                        label="救援时间"
                        label-right="12px"
                        background="#DFF5FD"
                        width="160px"
                        verify="1"
                        name="orderScheduleTime"
                        @updata="integrationDate"
                        minView="minute"
                        :startDate="true"
                        :value="orderItem.orderScheduleTime"/>
                </div>
            </div>
               

            <div class="row underSingleInfo">
                <div class="col-xs-6">
                    <form-label-input @updata="integrationDate" name="callPersonName" label="委&nbsp;&nbsp;托&nbsp; 人" :value="orderItem.callPersonName"/>
                </div>
                <div class="col-xs-6">
                    <form-label-input @updata="integrationDate" name="callPersonContact" label="委托电话" :value="orderItem.callPersonContact"/>
                </div>
                <div class="col-xs-6">
                    <form-label-input @updata="integrationDate" name="carOwnerName" label="车主姓名" :value="orderItem.orderVehicles[0].carOwnerName"/>
                </div>
                <div class="col-xs-6">
                    <form-label-input @updata="integrationDate" name="carOwnerPhone" label="车主电话" verify="1"  :after="true" :value="orderItem.orderVehicles[0].carOwnerPhone"/>
                </div>

                <div class="col-xs-6">
                    <btn-select  
                        width="98px"
                        padding="0" 
                        label="车辆型号"
                        label-right="12px"
                        name="vehicleModelCode"
                        @updata="integrationDate"
                        :url="'client:/helper/vehiclemodel?categoryCode=&vendorCode=&brandCode='" 
                        filter="name"
                        :inputText="true"
                        :clearQuery="number"
                        :value="orderItem.orderVehicles[0].vehicleName"/>
                </div>
                

                <div class="col-xs-6">
                    <btn-select  
                        width="98px" 
                        label="车辆类型"
                        padding="0"
                        url="client:/helper/vehiclecat" 
                        filter="name" 
                        name="vehicleCategory"
                        @updata="integrationDate"
                        label-right="12px"
                        field="code"
                        :uuid="true"
                        :value="orderItem.orderVehicles[0].vehicleCategory"/>
                </div>
                
                <div class="col-xs-6">
                    <form-label-input @updata="integrationDate" name="vehicleColor" label="车辆颜色" :value="orderItem.orderVehicles[0].vehicleColor"/>
                </div>

                <div class="col-xs-6">
                    <form-label-input @updata="integrationDate" name="vehiclePlateNo" :value="orderItem.orderVehicles[0].vehiclePlateNo" label="车&nbsp;&nbsp;牌&nbsp; 号" />
                </div>
                <div class="col-xs-6">
                    <form-label-input @updata="integrationDate" name="vehicleId" label="车&nbsp;&nbsp;架&nbsp; 号" :value="orderItem.orderVehicles[0].vehicleId"/>
                </div>
                <div class="col-xs-6"   v-if="rescueType == '03'">

                    <form-label-input type="number" :after="true" @updata="integrationDate" value="1" min="1" name="qty" :value="orderItem.orderVehicles[0].qty"  label="数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量"/>
                </div>
                <div class="col-xs-6">
                    <form-label-input
                        input-width="95px"
                        label="具体场景"
                        name="fieldSituation"   
                        placeholder="请输入其他场景"
                        @updata="integrationDate"
                        :value="orderItem.fieldSituation"/>
                </div>
                <div class="col-xs-6">
                    <form-label-input
                        label="随车人员"
                        type="number" 
                        input-width="95px"
                        name="qtyPassengers"  
                        placeholder='数量'
                        min="1"
                        @updata="integrationDate"
                        :value="orderItem.qtyPassengers"/>
                </div>

            </div>
 
            <div class="row" style="margin-top:24px;">
                <div class="col-xs-12">
                    <form-label-input 
                        label="救&nbsp;&nbsp;援&nbsp;&nbsp;地" 
                        placeholder="建议在左侧搜索栏检索地址"
                        input-width="277px"
                        verify="1"
                        name="rescueAddress"
                        :after="true"
                        @updata="integrationDate"
                        :value="orderItem.incidentAddrAddress"/>
                </div>

                <div class="col-xs-12" style="margin-top:6px;"  v-if=" rescueType && rescueType.indexOf('02') == '-1'">
                    <form-label-input 
                        label="目&nbsp;&nbsp;的&nbsp;&nbsp;地" 
                        :after="true"
                        placeholder="建议在左侧搜索栏检索地址"
                        verify="1"
                        input-width="277px"
                        name="destinationAddress"
                        :value="orderItem.destinationAddrAddress"
                        @updata="integrationDate"/>
                </div>
            </div>

            <div class="row"  v-if="rescueType == '03'">
                <div class="col-xs-6">
                    <form-label-input @updata="integrationDate" name="meetPerson" label="接&nbsp;&nbsp;车&nbsp;人"  :value="orderItem.orderVehicles[0].meetPerson"/>
                </div>
                <div class="col-xs-6">
                    <form-label-input @updata="integrationDate" name="meetPersonContact" label="联系电话" :value="orderItem.orderVehicles[0].meetPersonContact"/>
                </div>    
            </div>

            <div class="row"  v-if="rescueType == '03'">
                <div class="col-xs-6">
                    <form-label-input @updata="integrationDate" name="takePerson" label="交&nbsp;&nbsp;车&nbsp;人"  :value="orderItem.orderVehicles[0].takePerson"/>
                </div>
                <div class="col-xs-6">
                    <form-label-input @updata="integrationDate" name="takePersonContact" label="联系电话" :value="orderItem.orderVehicles[0].takePersonContact"/>
                </div>    
            </div>

            <div class="row"  v-if="rescueType == '03'">
                <div class="col-xs-3">
                    <label class="labelPadding">秘密运输</label>
                </div>
                <div class="col-xs-3">
                    <radio 
                        text="否" 
                        textDirection="right"
                        style="margin-right:0"
                        :img-left="true" 
                        name="disclose" 
                        :checked="!orderItem.orderVehicles[0].disclose ? 'checked':false "
                        value="0"
                        @updata="integrationDate"/>
                </div>    
                <div class="col-xs-3">
                    <radio 
                        text="是" 
                        textDirection="right"
                        style="margin-left:-20px"
                        :img-left="true" 
                        name="disclose" 
                        :checked="orderItem.orderVehicles[0].disclose ? 'checked':false "
                        value="1"
                        @updata="integrationDate"/>
                </div>     
            </div>

            <div class="row"  v-if="rescueType == '03'">
                <div class="col-xs-3">
                    <label class="labelPadding">添加返程</label>
                </div>
                <div class="col-xs-3">
                    <radio 
                        text="否" 
                        style="margin-right:0"
                        :img-left="true" 
                        textDirection="right"
                        name="isBackjob" 
                        :checked="!orderItem.orderVehicles[0].isBackjob ? 'checked':false "
                        checked="checked"
                        value="0"
                        @updata="integrationDate"/>
                </div>    
                <div class="col-xs-3">
                    <radio 
                        text="是" 
                        textDirection="right"
                        style="margin-right:0"
                        :img-left="true" 
                        name="isBackjob"
                        :checked="orderItem.orderVehicles[0].isBackjob ? 'checked':false "
                        value="1"
                        @updata="integrationDate"/>
                </div>     
            </div>

           

            <div class="row">
               
                <div class="col-xs-6">
                    <switch-btn 
                        name="isAccident" 
                        :checked="orderItem.isAccident? true:false " 
                        value="1"
                        @updata="integrationDate"
                        text="是否事故"/>
                </div>  
                <div class="col-xs-6">
                    <switch-btn 
                        name="needInspect" 
                        :checked="orderItem.needInspect? true:false " 
                        value="1"
                        @updata="integrationDate"
                        text="是否勘察"/>
                </div>        
            </div>

           <div class="row">
                <div class="col-xs-5">
                    <switch-btn 
                        name="needAssistWheel" 
                        :checked="orderItem.needAssistWheel? true:false " 
                        value="1"
                        @updata="integrationDate"
                        text="是否小轮"/>
                </div>
                <div class="col-xs-6" v-if="orderItem.needAssistWheel">
                    <form-label-input
                        type="number" 
                        input-width="98px"
                        name="numWheels"  
                        placeholder='数量'
                        @updata="integrationDate"
                        :value="orderItem.numWheels"/>
                </div>

            </div>

            <div class="row">
                <div class="col-xs-5">
                    <switch-btn 
                        name="specialServiceRequired" 
                        :checked="orderItem.specialServiceRequired? true:false " 
                        value="1"
                        @updata="integrationDate"
                        text="特殊服务"/>
                </div>
                <div class="col-xs-6" v-if="orderItem.specialServiceRequired">
                    <form-label-input
                        input-width="98px"
                        name="specialServiceDesc"  
                        placeholder='输入服务内容'
                        @updata="integrationDate"
                        :value="orderItem.specialServiceDesc"/>
                </div>

            </div>


          


               <!--  <div class="clearfix">
                    <div class="col-xs-2">
                        <label class="labelPadding">现场照片</label>
                    </div>
                    <div class="col-xs-10" style="padding-left:14px;">
                        <input-img display="block" :clear="clearNumber" :arr="orderItem.fieldPhotos" :set-input-img="true" @updata="watchImg"/>
                    </div>    
                </div>   -->



            
            <div class="row">
                <div class="col-xs-12">
                     <switch-btn 
                        name="cashInvoiced" 
                        :checked="orderItem.cashInvoiced ? 'checked':false " 
                        value="1"
                        @updata="integrationDate"
                        text="开&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;票"/>
                </div>
            </div>

            <div class="row" style="margin-top:0">

                <div class="col-xs-4"  v-for="it in settleMethod">
                    <radio 
                        :text="it.desc" 
                        name="settleMethod" 
                        :checked="orderItem.settleMethod == it.code ? true:false "
                        :value="it.code"
                        @updata="integrationDate"/>
                </div>
            </div>
            <div class="row" style="margin-top:0">
                <div class="col-xs-4">
                    <radio 
                        text="一&nbsp;口&nbsp; 价" 
                        :img-left="true" 
                        name="pricingMethod"
                        value="FIXED_PRICE"
                        :checked="orderItem.pricingMethod == 'FIXED_PRICE' ? 'checked':false "
                        @updata="integrationDate"/>
                </div>
                <div class="col-xs-4" v-if="quotation">
                    <radio 
                        text="自动报价" 
                        :img-left="true" 
                        name="pricingMethod"
                        value="FORMULA"
                        :disabled="!isModify"
                        :checked="orderItem.pricingMethod == 'FORMULA' ? 'checked':false "
                        @updata="integrationDate"/>
                </div>
                <div class="col-xs-4" style="padding-right:0;position: relative;top:3px" v-if="pricing == 'FIXED_PRICE'">
                    <form-label-input 
                        id='baojia'
                        label="价&nbsp;&nbsp;格"
                        @updata="integrationDate" 
                        name="price" 
                        :after="true"
                        verify="1"
                        label-right="2px"
                        input-width="60px"
                        type="number"
                        :value="result.price||orderItem.price"/>
                </div>
                <div class="col-xs-4"  style="padding-right:0;position: relative;top:3px"  v-if="pricing == 'FORMULA'">
                    <p>预计价格:<span id="jaaaqian" v-text="result.price||orderItem.price"></span></p>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12" v-if="pricing == 'FORMULA'">
                    <btn-select  
                        padding="0"
                        label="计价公式"
                        name="quotationId"
                        @updata="integrationDate"
                        label-right="12px"
                        url="control:/quota/quota/list/querypartnerquotation" 
                        method="post"
                        filter="name"
                        :params="{sysPartnerId:orderItem.customerId }"
                        list-width="250px"
                        width="248px"
                        :uuid="true"
                        :updata-key="updateNumber"
                        field="sysQuotationId"
                        :value="orderItem.quotationId"/>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12">
                    <template v-for="(it,index) in orderItem.comments" v-if="it.commentType == 'VOICE'">
                        <label class='pull-left VOICE' style="margin-top:10px;display:none">录音备注</label>
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
                        input-width="254px"
                        @updata="integrationDate" 
                        :name="'comments:' + index + ':' + 'TEXT'"
                        label="文本备注"
                        input-height="60px"
                        margin-top="0"
                        :value="it.comment"/>
                </div>
            </div>
            <!-- <div class="row">
                <div class="col-xs-12">
                    <input-text
                        label="备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注"
                        input-width="78%"
                        @updata="integrationDate" 
                        name="remark"
                        margin-top="0"
                        :value="result.remark"/>
                </div>
            </div> -->
        </div>

        <div class="footer" v-if='isOrg' style="margin:30px auto 0">
            <div class="btns">
                <button class="btn radius-btn" @click="submit" v-text="!isModify ? '修改订单':'保存订单'"></button>
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
import switchBtn from "../../../../../common_component/switch.vue";
import voice from "../../../../../common_component/voice.vue";
import {pathPlanning} from "../../../../../common_component/map.js";

    export default {
        props:['orderId','jobId'],
        components:{
            datetimepicker,
            btnSelect,
            formLabelInput,
            radio,
            checkbox,
            inputText,
            inputImg,
            switchBtn,
            voice
        },
       
        data () {
            return {
                orderItem:{
                    orderVehicles:[{}],
                    comments:[{
                        "commentId": "",
                        "comment": "",
                        "commentType": "TEXT"
                    }]
                },
                rescueType:'',
                quotation:false,
                result:{
                    faultCar:{},
                    comments:[{
                        "commentId": "",
                        "comment": "",
                        "commentType": "TEXT"
                    }]
                },
                pricing:'FIXED_PRICE',
                order:false,
                isModify:false,
                number:0,
                settleMethod:[],
                isOrg:true

            }
        },
        created() {

            const self = this;

            send({
                type:'post',
                url:'control:/sys/param/org',
                param:['/order/settle_method'],
            },function(err,res){
                console.log(res);
                if(err)return console.log(res);
                if(res.status == 200){
                    console.log(res)
                    self.settleMethod = res.content[0].orgParam.value.default ? res.content[0].orgParam.value.default : res.content[0].orgParam.value.values;
                }else{
                    console.log(res);
                }
            });

            this.getOrderDetails();

            



            bus.$on('updataAdress_trailer', function (type,item,provincial) {
                if(!self.isModify)return;
                self.quotation = order_operation.isNull('#baojia');
                if(type == 'rescue'){
                    self.orderItem.incidentAddrProvince = provincial.province;
                    self.orderItem.incidentAddrCity   = provincial.city;
                    self.orderItem.incidentAddrDistrict   = provincial.district;
                    self.orderItem.incidentAddrTown   = provincial.town;
                    self.orderItem.incidentAddrAddress    = item.address;
                    self.orderItem.rescueLnt  = item.Longitude.split(',')[0];   
                    self.orderItem.rescueLat  = item.Longitude.split(',')[1]; 

                    self.result.incidentAddrProvince  = provincial.province 
                    self.result.incidentAddrCity  = provincial.city  
                    self.result.incidentAddrDistrict  = provincial.district  
                    self.result.incidentAddrTown  = provincial.town  
                    self.result.incidentAddrAddress  = item.address   
                    self.result.rescueLnt  = item.Longitude.split(',')[0];      
                    self.result.rescueLat  = item.Longitude.split(',')[1];  

                    self.getQuote();
                    
                }
                if(type == 'destination'){
                    self.orderItem.destinationAddrProvince  = provincial.province 
                    self.orderItem.destinationAddrCity  = provincial.city  
                    self.orderItem.destinationAddrDistrict  = provincial.district  
                    self.orderItem.destinationAddrTown  = provincial.town  
                    self.orderItem.destinationAddrAddress  = item.address   
                    self.orderItem.destinationLnt  = item.Longitude.split(',')[0];      
                    self.orderItem.destinationLat  = item.Longitude.split(',')[1];  

                    self.result.destinationAddrProvince  = provincial.province 
                    self.result.destinationAddrCity  = provincial.city  
                    self.result.destinationAddrDistrict  = provincial.district  
                    self.result.destinationAddrTown  = provincial.town  
                    self.result.destinationAddrAddress  = item.address   
                    self.result.destinationLnt  = item.Longitude.split(',')[0];      
                    self.result.destinationLat  = item.Longitude.split(',')[1];  

                    self.getQuote();

                };

            });
            console.log(this.orderId)
            listEvent.sub(`order-${this.orderId}`,function(){
                self.getOrderDetails();
            });
        },
        methods:{
            getOrderDetails(cd){
                const self = this;
                send({
                    url:'order:/order/job?orderId=' + this.orderId + '&jobId' + this.jobId,
                    type:'get'
                },function(err,res){
                    if(err)return alert('服务器出错，请联系管理员');
                    if(res.status == 200){
                        console.log(res);

                        self.orderItem = res.content[0];
                        self.orderItem.comments = res.content[0].remark.length ? res.content[0].remark : [{ "commentId": "","comment": "","commentType": "TEXT"}];
                        self.rescueType = res.content[0].jobType;
                        self.result.comments = res.content[0].remark.length ? res.content[0].remark : [{ "commentId": "","comment": "","commentType": "TEXT"}];

                         if(global.ourOrgId){
                            self.isequal(global.ourOrgId);
                        }else{
                            setTimeout(function() {
                                self.isequal(global.ourOrgId);
                            }, 300);
                        }

                        self.$nextTick(function(){
                            this.quotation = order_operation.isNull('#baojia');
                            self.orderItem.comments.forEach(function(it,index){
                                if(it.commentType == 'VOICE'){
                                    $('#trailer .trailer-body').find('.VOICE').show();
                                }
                            });

                            setTimeout(function() {
                                if(!self.isModify)order_operation.form_disabled($('#trailer .trailer-body'),true);
                            }, 500);

                        });
                        self.order = self.jobId == '0' ? true:false;
                        bus.$emit('modifyRecord');
                        
                    }else{
                        console.log(res);
                        alert(res.msg);
                    };
                })
            },
            isequal(ourOrgId){
                console.log( '对比',ourOrgId,this.orderItem.orgId)
                this.isOrg = ourOrgId === this.orderItem.orgId ? true:false;
            },
            matchOrderStatus(stataus){
                return stataus  ? util.matchOrderStatus(stataus,'orderStatus_icon'):'';
            },
            matchRescueType(stataus){
                return stataus  ? util.matchRescueType(stataus).cn:'';
            },
            integrationDate(name,item){
                console.log(name,item)
                this.quotation = order_operation.isNull('#baojia');




                if(name.indexOf('comments') != -1){
                    console.log(this.orderItem.comments)
                    var newArr = name.split(':')
                    this.orderItem.comments[newArr[1]].commentType = newArr[2];
                    this.orderItem.comments[name.split(':')[1]].comment = item;
                    return;
                }



                switch(name){
                    case 'qtyOfVehicles':
                        this.result['faultCar']['qty']  = item;
                        this.orderItem['orderVehicles'][0]['qty']  = item;
                        this.result['qtyOfVehicles']  = item;
                    break;
                    case 'rescueAddress':
                        this.orderItem.incidentAddrProvince = '';
                        this.orderItem.incidentAddrCity   = '';
                        this.orderItem.incidentAddrDistrict   = '';
                        this.orderItem.incidentAddrTown   = '';
                        this.orderItem.incidentAddrAddress  = item;
                        this.orderItem.rescueAddress  = item;
                        this.orderItem.rescueLnt  = '';   
                        this.orderItem.rescueLat  = ''; 

                        this.result.incidentAddrProvince  = ''; 
                        this.result.incidentAddrCity  =''; 
                        this.result.incidentAddrDistrict  = ''; 
                        this.result.incidentAddrTown  = ''; 
                        this.result.rescueAddress  = item;   
                        this.result.rescueLat  = '';  
                        this.result.rescueLnt  = ''; 

                        this.getQuote(this);

                        break;
                    case 'destinationAddress':

                        this.orderItem.destinationAddrProvince  = '';
                        this.orderItem.destinationAddrCity  = '';
                        this.orderItem.destinationAddrDistrict  = '';
                        this.orderItem.destinationAddrTown  = '';
                        this.orderItem.destinationAddress  = item;  
                        this.orderItem.destinationAddrAddress  = item;  
                        this.orderItem.destinationLnt  = '';
                        this.orderItem.destinationLat  = '';

                        this.result.destinationAddrProvince  ='';
                        this.result.destinationAddrCity  = '';
                        this.result.destinationAddrDistrict  = '';
                        this.result.destinationAddrTown  = '';
                        this.result.destinationAddress  = item;   
                        this.result.destinationAddrAddress  = item;   
                        this.result.destinationLnt  = '';
                        this.result.destinationLat  = '';

                        this.getQuote(this);

                        break;
                    case 'vehicleCategory':
                        this.result['faultCar'][name]= item.name;
                        this.orderItem['orderVehicles'][0]['vehicleCategory']  = item.code;

                    break;
                    case 'pricingMethod':
                        this.pricing= item;
                        this.result[name]= item;
                        this.orderItem[name]= item;
                        break;
                    case 'jobType':
                        this.rescueType= item;
                        this.result[name]= item;
                        this.orderItem[name]= item;

                        break;
                    case 'quotationId':
                        this.result['quotationId']= item.sysQuotationId;
                        this.orderItem[name]= item.sysQuotationId;
                        this.getQuote();
                        break;
                    case 'vehicleBrand':
                        this.result[name]= item.name;
                        this.orderItem['orderVehicles'][0]['vehicleBrand']  = item;

                        break;
                    case 'vehicleBrand':
                        this.result[name]= item.name;
                        this.orderItem['orderVehicles'][0]['vehicleBrand']  = item;

                        break;
                    case 'vehicleModelCode':
                         if(typeof item == 'object'){
                            console.log(item)
                            this.result['faultCar'][name]= item.code;
                            this.result['faultCar']['vehicleName'] = item.name;
                            this.orderItem.orderVehicles[0].vehicleCategory= item.categoryCode;
                            this.orderItem.orderVehicles[0].vehicleBrand= item.brandName;
                            this.orderItem.orderVehicles[0].vehicleName= item.name;
                            this.orderItem.orderVehicles[0].name= item.code;
                        }else{
                            this.result['faultCar']['vehicleName'] = item;
                        }   
                        console.log(  this.orderItem )
                        break;
                    default:
                        if(name == 'qty' || name == 'carOwnerName' ||name == 'carOwnerPhone'||name == 'vehicleId'||name == 'vehiclePlateNo'||name == 'vehicleColor'||name == 'vehicleModelCode'||name == 'vehicleName'||name == 'vehicleBrand'||name == 'vehicleCategory'||name == 'vehicleInsuranceDesc'||name == 'vehicleCargoWeight'||name == 'isBackjob'||name == 'disclose'||name == 'meetPerson'||name == 'meetPersonContact'||name == 'takePerson'||name == 'takePersonContact'||name == 'number'){
                            this.result['faultCar'][name]= item;
                            this.orderItem['orderVehicles'][0][name]= item;
                        }else{
                            this.result[name]= item;
                            this.orderItem[name]= item;

                        }
                };
            },
            clone(){
                for(var i in this.orderItem ){
                    if(i == 'destinationAddrGps'){
                        this.result['destinationLnt'] = this.orderItem[i] ? this.orderItem[i]['x'] : this.orderItem['rescueLnt']  ;
                        this.result['destinationLat'] = this.orderItem[i] ? this.orderItem[i]['y'] : this.orderItem['rescueLat'];
                    }else if(i == 'incidentAddrGps'){
                        this.result['rescueLnt'] = this.orderItem[i] ? this.orderItem[i]['x'] : this.orderItem['destinationLnt']  ;
                        this.result['rescueLat'] = this.orderItem[i] ? this.orderItem[i]['y'] : this.orderItem['destinationLat'];
                    }else if(i == 'orderVehicles'){
                        for(var j in this.orderItem['orderVehicles'][0]){
                                this.result['faultCar'][j] = typeof this.orderItem['orderVehicles'][0][j] == 'boolean'  ? Number(this.orderItem['orderVehicles'][0][j]) :this.orderItem['orderVehicles'][0][j] ;

                        }
                        
                    }else if(typeof this.orderItem[i] != 'object'){
                        this.result[i] = typeof this.orderItem[i] == 'boolean' ? Number(this.orderItem[i]) : this.orderItem[i];
                    }
                }
            },
            submit(){

                const self = this;
                if(this.isModify){

                    this.result.id= this.orderId;
                    var bool = order_operation.isNull('',false,$('#trailer .trailer-body'));

                    if(!bool)return alert("数据不完整",'warning');
                    this.clone();
                    console.log( this.result )
                    send({
                        type:'put',
                        url:'order:/order',
                        param:this.result
                    },function(err,res){
                        if(err)return console.log(err);
                        if(res.status == 200){
                            alert(res.msg,'success');
                            self.isModify = false;
                            order_operation.form_disabled($('#trailer .trailer-body'),true);

                            bus.$emit('modifyRecord');
                            listEvent.trigger(`order-${self.orderId}`);

                        }else{
                            console.log(res);
                            alert(res.msg);
                        }
                    })
                }else{
                    this.isModify = !this.isModify;
                    order_operation.form_disabled($('#trailer .trailer-body'),false);


                    if(this.orderItem.confirmedResult && this.orderItem.confirmedResult === 'ACCEPTED'){
                        $('#trailer').find('[name="settleMethod"]').attr('disabled',true)
                    }
                }
            },
            getQuote(){
                const self = this;
                this.clone();
                console.log(self.result.pricingMethod)
                if(self.result.pricingMethod != 'FORMULA')return;
                console.log(self.result)
                if( !self.result.quotationId || !self.result.incidentAddrAddress  || !self.result.jobType)return;


                if(self.result.rescueLnt &&self.result.rescueLat && self.result.destinationLnt &&  self.result.destinationLat){

                    pathPlanning(false,[[self.result.rescueLnt,self.result.rescueLat],[self.result.destinationLnt,self.result.destinationLat]],function(data){
                        let param = {
                            "sysPartnerId": self.result.customerId,
                            "sysQuotationId": self.result.quotationId,
                            "businessType": util.matchRescueType(self.result.jobType).cn,
                            "carType": self.result['faultCar']['vehicleCategory'],
                            "rescueArea": self.result.incidentAddrDistrict,
                            "destinationArea": self.result.destinationAddrDistrict,
                            "milageTowing": data.routes[0].distance/980,
                            "milageGoto" : 0 ,
                            "milageBack" : 0
                        };

                        send({
                            type:'post',
                            url:'control:/quota/quota/getquotabymessage',
                            param:param
                        },function(err,res){
                            if(err)return console.log(res);
                            if(res.status == 200){
                                self.result.price = res.content[0].quota;
                                self.orderItem.price = res.content[0].quota;
                            $('#jaaaqian').text(res.content[0].quota)
                            }else{
                                console.log(res);
                                alert(res.msg);
                            }
                        });

                    });

                }else{
                    console.log(self.result)
                    send({
                        type:'post',
                        url:'control:/quota/quota/getquotabymessage',
                        param:{
                            "sysPartnerId": self.result.customerId,
                            "sysQuotationId": self.result.quotationId,
                            "businessType": util.matchRescueType(self.result.jobType).cn,
                            "carType": self.result['faultCar']['vehicleCategory'],
                            "rescueArea": self.result.incidentAddrDistrict,
                            "destinationArea": 0,
                            "milageTowing": 0,
                            "milageGoto" : 0 ,
                            "milageBack" : 0
                        }
                    },function(err,res){
                        if(err)return console.log(res);
                        if(res.status == 200){
                            self.result.price = res.content[0].quota;
                            self.orderItem.price = res.content[0].quota;
                            $('#jaaaqian').text(res.content[0].quota)

                        }else{
                            console.log(res);
                            alert(res.msg);
                        }
                    });

                }
            }
        },
        beforeDestroy(){
            listEvent.cancel(`order-${this.orderId}`);
        },
    }

   

</script>

<style scoped>
@import '../../../../../../static/css/orderNo.css';

#trailer .row{
    margin: 6px 0 0;
}
</style>