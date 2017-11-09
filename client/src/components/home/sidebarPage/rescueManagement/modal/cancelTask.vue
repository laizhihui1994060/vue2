<template>

<!-- Modal -->
    <div class="modal fade" id="cancelTask" tabindex="-1" role="dialog" aria-labelledby="cancel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title text-center" id="myModal">是否取消订单</h4>
                </div>
                <div class="modal-body">
                    <input-text
                        placeholder="请输入恢复未派原因"
                        input-width="100%"
                        input-height="58px"
                        margin-top="0"
                        @updata="integrationDate"/>
                </div>
                <div class="modal-footer">
                    <div class="btns">
                        <button type="button" class="btn"  @click="cancel">确定取消</button>
                        <button type="button" class="btn"  data-dismiss="modal">关闭窗口</button>
                    </div>
                </div>
                <span id="orderId" style="display:none"></span>
                <span id="dispatchActionId" style="display:none"></span>
            </div>
        </div>
    </div>
</template>

<script>
import  inputText from "../../../../../common_component/inputText.vue";
import  radio from "../../../../../common_component/radio.vue";


    export default {
        components:{
            inputText,
            radio
        },
        data () {
            return {
                cancelReason:'' ,
                jobResult:''   ,
                num:0 
            }
        },
        methods:{
            integrationDate(name,value){
                this.cancelReason = value;
            },

            cancel(){
                const self = this;
                send({
                    type:'put',
                    url:'order:/dispatch/cancel_dispatch',
                    param:{
                        "id": $('#orderId').text(),
                        "dispatchActionId": $('#dispatchActionId').text(),
                        "cancelBy": "AGENT",
                        "cancelReason": this.cancelReason,
                    }
                },function(err,res){
                    if(err)return console.log(res);
                    if(res.status == 200){
                        console.log(res);
                        alert('恢复未派成功','success');
                        $('#cancelTask').modal('hide');
                        self.$emit('updatakey',++self.num);

                    }else{  
                        console.log(res);
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
        width: 400px;
    }
   .modal-header h4{
        color: #FF6B0E;
   }
   .btns button:nth-child(2){
        margin-left: 50px;
   }
</style>