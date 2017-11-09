<template>

<!-- Modal -->
    <div class="modal fade" id="shareOrderCheck" tabindex="-1" role="dialog" aria-labelledby="shareOrderCheck" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title text-center" id="myModalLabel" v-text="'订单分享(' + orderItem.orderCode + ')'">订单分享</h4>
                </div>
                <div class="modal-body">
                    <order-details :orderItem="orderItem"/>


                    <article>分享信息</article>
                    <div style="padding:0 10px">
                        <div class="row">
                            <div class="col-xs-4">
                                <form-label-input 
                                    label="结束时间"
                                    @updata="integrationDate" 
                                    name="shareDistanceScope" 
                                    disabled="disabled"
                                    input-width="104px"
                                    type="number"
                                    :value="orderItem.shareDeadline"/>            
                            </div>
                            <div class="col-xs-4">
                                <form-label-input 
                                    label="分享范围"
                                    @updata="integrationDate" 
                                    name="shareDistanceScope" 
                                    disabled="disabled"
                                    input-width="104px"
                                    unitRight="11px"
                                    type="number"
                                    unit="KM以内"
                                    :value="orderItem.shareDistanceScope"/>
                            </div>
                            <div class="col-xs-4">
                                <form-label-input 
                                    label="报价方式"
                                    textIndent="3px"
                                    @updata="integrationDate" 
                                    disabled="disabled"
                                    name="shareDistanceScope" 
                                    unit="元"
                                    input-width="104px"
                                    :value="orderItem.shareActionType == 'SHARE_FIXED_PRICE' ? '一口价:' + orderItem.sharePrice : '最高限价' + orderItem.sharePrice "/>  
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xs-12">
                                <form-label-input 
                                    input-width="525px"
                                    label="分享公司" 
                                    name="rescueAddress"
                                    @updata="integrationDate"
                                    disabled="disabled"
                                    :value="orderItem.orgName"/>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xs-12">
                                <form-label-input 
                                    label="保险要求"
                                    textIndent="3px"
                                    @updata="integrationDate" 
                                    name="shareDistanceScope" 
                                    disabled="disabled"
                                    input-width="525px"
                                    type="number"
                                    :value="orderItem.shareInsurancesRequired"/>  
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xs-12">
                                <input-text
                                    label="备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注"
                                    @updata="integrationDate" 
                                    input-width="86%"
                                    disabled="disabled"
                                    margin-top="0"
                                    :value="orderItem.shareComment"
                                    name="shareComment"/>
                            </div>
                            
                        </div>
                    </div>


                    <article>技师信息</article>
                    <div style="padding:0 10px">
                    
                        <div class="row">
                            <div class="col-xs-4">
                                <form-label-input 
                                    input-width="100px"
                                    label="接单技师" 
                                    name="rescueAddress"
                                    @updata="integrationDate"
                                    disabled="disabled"
                                    :value="orderItem.driverName"/>
                                
                            </div>
                            <div class="col-xs-4">
                                <form-label-input 
                                    input-width="100px"
                                    label="技师车牌" 
                                    name="rescueAddress"
                                    @updata="integrationDate"
                                    disabled="disabled"
                                    :value="orderItem.needAssistWheel? orderItem.numWheels:0"/>
                                
                            </div>
                            <div class="col-xs-4">
                                <form-label-input 
                                    input-width="100px"
                                    label="投标价钱" 
                                    @updata="integrationDate"
                                    :value="orderItem.bidPrice"
                                    :disabled="isChange"
                                    unit="元"/>
                                    <span v-if="orderItem.shareActionType != 'SHARE_FIXED_PRICE'" class="bianji img" style="display: inline-block; position: relative; top: 2px; cursor: pointer;" @click="isChange=false"></span>
                            </div>
                        </div>
                    </div>
    
                     
                </div>
                <div class="modal-footer">
                    <div class="btns">
                        <button type="button" class="btn" @click='check("BID_APPROVED")'>接受</button>
                        <button type="button" class="btn" @click='check("BID_NOTPASSED")'>拒绝</button>
                        <button type="button" class="btn" data-dismiss="modal">关闭窗口</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import  formLabelInput from "../../common_component/form-label-input.vue";
import  inputText from "../../common_component/inputText.vue";
import  orderDetails from "../../common_component/orderDetails.vue";

    export default {
        props:['orderItem','orderId','bidId'],
        components:{
            formLabelInput,
            inputText,
            orderDetails
        },
        
        data () {
           return {
                isChange:true,
                bidPrice:''
           }
        },
        methods:{
            integrationDate(name,value){
                console.log(value);
                if(this.orderItem.shareActionType == 'SHARE_FIXED_PRICE')return this.bidPrice = this.orderItem.bidPrice;
                this.bidPrice = value;
            },
           
            check(status){
                const self =this;
                send({
                    type:'put',
                    url:'order:/share/check',
                    param:{
                        "bidId": self.bidId,
                        "bidPrice": this.bidPrice,
                        "approveStatus": status
                    }
                },function(err,res){
                    if(err)return alert('服务器出错，连联系管理员');
                    if(res.status == 200){
                        console.log(res)
                        alert(res.msg,'success');
                        $('#shareOrderCheck').modal('hide');
                        self.$emit('complete');
                        self.$emit('delectMsg','shareMessage');
                    }else{
                        alert(res.msg);
                    }
                });
            },
           
        },
        watch:{
            orderItem(){
                this.bidPrice = this.orderItem.bidPrice;
                this.isChange = true;
            }
        }
    }
 

</script>
<style scoped>
    #shareOrderCheck .modal-header{
        padding: 10px;
    }
     #shareOrderCheck .modal-footer{
        padding-bottom: 15px;
        padding-top: 5px;
     }
    #shareOrderCheck article{
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
    #shareOrderCheck .btn{
        padding: 6px 14px;
    }
    #shareOrderCheck .btns button{
        margin-right: 55px;
    }
    .col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12{
        padding-right: 0 ;
    }
</style>