<template>

<!-- Modal -->
    <div class="modal fade" id="orderShare" tabindex="-1" role="dialog" aria-labelledby="orderShare" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title text-center" id="myModalLabel" v-text="'订单分享(' + orderItem.orderCode + ')'">订单分享</h4>
                </div>
                <div class="modal-body">
                    <order-details :orderItem="orderItem"/>

                    
                    <article>分享信息</article>
                    <div style="padding:0 10px" v-if="!shareManInfo">
                        <div class="row" style="margin-top:10px">
                            <div class="col-xs-4">
                                <form-label-input 
                                    label="分享范围"
                                    textIndent="3px"
                                    @updata="integrationDate" 
                                    name="shareDistanceScope" 
                                    input-width="104px"
                                    unitRight="11px"
                                    type="number"
                                    unit="KM以内"
                                    :value="res.shareDistanceScope"
                                    :after="true"/>
                            </div>
                            <div class="col-xs-8">
                                <datetimepicker 
                                    width="138px"
                                    label="分享结束时间"  
                                    @updata="integrationDate" 
                                    name='shareDeadline'
                                    minView="minute"
                                    :startDate="true"
                                    :value="res.shareDeadline"/>                   
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xs-12">
                                <label>报价方式</label>
                                <radio 
                                    text="一口价" 
                                    :img-left="true" 
                                    value="SHARE_FIXED_PRICE"
                                    name="shareActionType"
                                    checked="checked"
                                    :checked="res.shareActionType == 'SHARE_FIXED_PRICE'"
                                    textDirection="right"
                                    @updata="integrationDate"/>

                                <radio 
                                    text="最高限价" 
                                    :img-left="true" 
                                    textDirection="right"
                                    value="SHARE_MAX_PRICE"
                                    name="shareActionType"
                                    :chekced="res.shareActionType == 'SHARE_MAX_PRICE'"
                                    @updata="integrationDate"/>
                           
                                <div style="display:inline-block;margin-left:14px">
                                    <form-label-input 
                                        label="价&nbsp;&nbsp;格"
                                        @updata="integrationDate" 
                                        name="sharePrice" 
                                        input-width="80px"
                                        :after="true"
                                        type="number"
                                        :value="res.sharePrice"
                                        unit="元" />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xs-5">
                                <btn-select 
                                    label="保险要求"
                                    url="client:/insurance/product" 
                                    filter="name" 
                                    name="shareInsurancesRequired"
                                    @updata="integrationDate"
                                    width="122px"/>
                            </div>

                            <div class="col-xs-12">
                                <p class="inline-close" style="margin-top:5px;"  v-for="(it,index) in shareInsurancesRequireds">{{it}}<i @click="removeServerItem(index)"></i></p>
                            </div>
                        </div>

                        <input-text
                            label="备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注"
                            @updata="integrationDate" 
                            input-width="88%"
                            :value="res.shareComment"
                            name="shareComment"/>
                    </div>
                    <div style="padding:0 10px" v-if="shareManInfo">
                        <div class="row" style="margin-top:10px">
                            <div class="col-xs-4">
                                <form-label-input 
                                    input-width="108px"
                                    label="分享公司" 
                                    name="rescueAddress"
                                    @updata="integrationDate"
                                    disabled="disabled"
                                    :value="orderItem.needAssistWheel? orderItem.numWheels:0"/>
                            </div>
                            <div class="col-xs-4">
                                <form-label-input 
                                    label="分享范围"
                                    @updata="integrationDate" 
                                    name="shareDistanceScope" 
                                    input-width="104px"
                                    unitRight="11px"
                                    type="number"
                                    unit="KM以内"
                                    :value="res.shareDistanceScope"/>
                            </div>
                            <div class="col-xs-4">
                                <form-label-input 
                                    label="结束时间"
                                    @updata="integrationDate" 
                                    name="shareDistanceScope" 
                                    input-width="104px"
                                    type="number"
                                    :value="res.shareDistanceScope"/>            
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xs-12">
                                <form-label-input 
                                    label="保险要求"
                                    textIndent="3px"
                                    @updata="integrationDate" 
                                    name="shareDistanceScope" 
                                    input-width="522px"
                                    padding="0"
                                    type="number"
                                    :value="res.shareDistanceScope"/>  
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-8">
                                <input-text
                                    label="备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注"
                                    @updata="integrationDate" 
                                    input-width="79%"
                                    margin-top="0"
                                    :value="res.shareComment"
                                    name="shareComment"/>
                            </div>
                            <div class="col-xs-4">
                                <form-label-input 
                                    label="报价方式"
                                    textIndent="3px"
                                    @updata="integrationDate" 
                                    name="shareDistanceScope" 
                                    input-width="104px"
                                    type="number"
                                    value="88"/>  
                                
                            </div>
                            
                        </div>
                    </div>


                    <article v-if="shareManInfo">技师信息</article>
                    
                    <div class="row" v-if="shareManInfo">
                        <div class="col-xs-4">
                            <form-label-input 
                                input-width="108px"
                                label="接单技师" 
                                name="rescueAddress"
                                @updata="integrationDate"
                                disabled="disabled"
                                :value="orderItem.needAssistWheel? orderItem.numWheels:0"/>
                            
                        </div>
                        <div class="col-xs-4">
                            <form-label-input 
                                input-width="108px"
                                label="技师车牌" 
                                name="rescueAddress"
                                @updata="integrationDate"
                                disabled="disabled"
                                :value="orderItem.needAssistWheel? orderItem.numWheels:0"/>
                            
                        </div>
                        <div class="col-xs-4">
                            <form-label-input 
                                input-width="108px"
                                label="投标价钱" 
                                name="rescueAddress"
                                @updata="integrationDate"
                                disabled="disabled"
                                :value="orderItem.needAssistWheel? orderItem.numWheels:0"/>
                        </div>
                    </div>

    
                     
                </div>
                <div class="modal-footer">
                    <div class="btns" v-if="!shareManInfo">
                        <button type="button" class="btn" @click='share' :disabled="disabled">确定分享</button>
                        <button type="button" class="btn" data-dismiss="modal">取消分享</button>
                    </div>
                    <div class="btns" v-if="shareManInfo">
                        <button type="button" class="btn" @click='share'>接受</button>
                        <button type="button" class="btn">拒绝</button>
                        <button type="button" class="btn" data-dismiss="modal">关闭窗口</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import  btnSelect from "../../../../../common_component/btn_select.vue";
import  checkbox from "../../../../../common_component/checkbox.vue";
import  datetimepicker from "../../../../../common_component/datetimepicker.vue";
import  radio from "../../../../../common_component/radio.vue";
import  formLabelInput from "../../../../../common_component/form-label-input.vue";
import  inputText from "../../../../../common_component/inputText.vue";
import  orderDetails from "../../../../../common_component/orderDetails.vue";

    export default {
        props:['orderItem','orderId','shareManInfo'],
        components:{
            btnSelect,
            radio,
            formLabelInput,
            inputText,
            checkbox,
            datetimepicker,
            orderDetails
        },
        
        data () {
           return {
                res:{
                    shareActionType:"SHARE_FIXED_PRICE",
                    shareDistanceScope:10,
                    shareInsurancesRequired:[],
                    shareActionTime:'',
                    sharePrice:'',
                    shareComment:'',
                    shareDeadline:new Date().getTime() + 1000*60*30

                },
                shareInsurancesRequireds:[],
                disabled:false
           }
        },
        methods:{
            integrationDate(name,value){
                console.log(name,value)
                if(name == 'shareInsurancesRequired'){
                    const bool = this.shareInsurancesRequireds.some((it)=>{
                        return it == value.name;
                    });
                    if(bool)return alert('已存在相同保险');
                    this.shareInsurancesRequireds.push(value.name);
                    this.res.shareInsurancesRequired.push({key:value.insuranceProductCode});
                }else{
                    this.res[name] = value;
                }
            },
            share(){
                if(!this.orderId)alert('当前订单不合法');
                let bool = true;
                $('#orderShare').find('[verify="true"]').each(function(index,el){
                    if(!el.innerHTML && !el.value){
                        bool = false;
                    }
                });

                if(bool){
                    this.disabled = true;

                    const self = this;
                    this.res.id = this.orderId;
                    console.log(this.res)
                    send({
                        type:'post',
                        url:'order:/share/order',
                        param:this.res
                    },function(err,res){
                        if(err)return alert('服务器出错，请联系管理员');
                        if(res.status == 200){
                            self.res = {
                                shareActionType:"shareActionType",
                                shareDistanceScope:10,
                            };
                            $('#orderShare').modal('hide');
                            self.$emit('completed','share');
                            console.log(res);
                            self.disabled = false;

                        }else{
                            console.log(res);
                            alert(res.msg);
                        }
                    })
                }else{
                    alert('请完善数据');
                }

            },
            removeServerItem(index){
                this.shareInsurancesRequireds.splice(index,1);
                this.res.shareInsurancesRequired.splice(index,1);
            }
        },
        watch:{
            orderItem(newv){
                console.log(newv)
                $('#orderShare').find('button[name="shareInsurancesRequired"]').text('');
                const self = this;

                this.res = {
                    shareActionType:"SHARE_FIXED_PRICE",
                    shareDistanceScope:10,
                    shareInsurancesRequired:[],
                    shareActionTime:'',
                    sharePrice:'',
                    shareComment:'',
                    shareDeadline:new Date().getTime() + 1000*60*30

                };
                this.shareInsurancesRequireds = [];

                send({
                    type:'post',
                    url:'control:/sys/param/org',
                    param:['/order/share/timeout']
                },function(err,res){
                    console.log(res)
                    self.res.shareDeadline = res.content[0] ?  new Date().getTime() + parseInt(res.content[0].orgParam.value.values[0].code) * 60 * 1000 : new Date().getTime() + parseInt(res.content[0].value.values[0].code) * 60 * 1000 * 5;
                })

            }
        }
    }
 

</script>
<style scoped>
    #orderShare .modal-header{
        padding: 10px;
    }
     #orderShare .modal-footer{
        padding-bottom: 15px;
        padding-top: 5px;
     }
    #orderShare article{
        margin: 0;
    }
    article:after{
        width: 553px;
    }
    .modal-body{
    }
    .row{
        margin-top: 2px
    }
    .row:nth-child(1){
        margin-top: 0
    }
  
    body .modal-dialog{
        margin-top: 80px !important;
    }
    .modal-content{
        width: 648px;
    }
  
   
    .btns button:nth-child(1){
        margin-right: 98px;
    }
 
    .resetPadding{
        padding: 0
    }
  
   
</style>