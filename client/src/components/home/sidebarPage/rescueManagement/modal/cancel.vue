<template>

<!-- Modal -->
    <div class="modal fade" id="cancel" tabindex="-1" role="dialog" aria-labelledby="cancel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title text-center baoshu" id="myModalLabel">是否取消订单</h4>
                </div>
                <div class="modal-body">
                    <input-text
                        input-width="100%"
                        placeholder="请填写取消订单原因"
                        input-height="58px"
                        name="cancelReason"
                        margin-top="0"
                        @updata="integrationDate"/>

                    <div class="row" v-if="isradio">
                        <div class="col-xs-6">
                            <radio 
                                text="救援成功" 
                                value="SUCCESS"
                                name="jobResult"
                                @updata="integrationDate"
                                textDirection="right"
                                :checked="true"/>
                        </div>
                        <div class="col-xs-6">
                            <radio 
                                text="取消无费" 
                                value="CANCEL_NOFEE"
                                name="jobResult"
                                @updata="integrationDate"
                                textDirection="right"
                                :checked="true"/>
                        </div>
                        <div class="col-xs-6">
                            <radio 
                                text="救援失败" 
                                value="FAILED"
                                name="jobResult"
                                @updata="integrationDate"
                                textDirection="right"/>
                        </div>
                        <div class="col-xs-6">
                            <radio 
                                text="取消救援" 
                                value="CANCEL_CHARGABLE"
                                name="jobResult"
                                @updata="integrationDate"
                                textDirection="right"/>
                        </div>
                    </div>
                </div >
                <div class="modal-footer">
                    <div class="btns">
                        <button type="button" class="btn"  @click="cancel">取消订单</button>
                        <button type="button" class="btn"  data-dismiss="modal">关闭窗口</button>
                    </div>
                </div>
                <span id="towOrderId" style="display:none"></span>
            </div>
        </div>
    </div>
</template>

<script>
import  inputText from "../../../../../common_component/inputText.vue";
import  radio from "../../../../../common_component/radio.vue";


    export default {
        props:{
            isradio:{
                default:true
            }
        },
        components:{
            inputText,
            radio
        },
        data () {
            return {
                cancelReason:'CANCEL_NOFEE' ,
                jobResult:'' ,
                num:0   
            }
        },
        methods:{
            integrationDate(name,value){
                this.cancelReason = value;
            },
            cancel(){
                const self = this;
                
                const param = {
                    "orderId": $('#towOrderId').text(),
                    "cancelBy": "AGENT",
                    "cancelReason": this.cancelReason,
                    "jobResult":'CANCEL_NOFEE'
                };


                send({
                    type:'put',
                    url:'order:/order/cancel',
                    param:param
                },function(err,res){
                    if(err)return alert('服务器出错，请联系管理员');
                    if(res.status == 200){
                        alert('取消订单成功','success');
                        console.log(res)
                        $('#cancel').modal('hide');
                        self.$emit('updatakey',++self.num);
                    }else{  
                        alert(res.msg);
                    }
                })
            }
        }
    }
 

</script>
<style scoped>
    .modal-body{
        padding-bottom: 0
    }
    .modal.in .modal-dialog{
        width: 450px;
    }
   .modal-header h4{
        color: #FF6B0E;
   }
   .btns button:nth-child(2){
        margin-left: 50px;
   }
</style>