<template>

<!-- Modal -->
    <div class="modal fade" id="cancelShare" tabindex="-1" role="dialog" aria-labelledby="cancel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title text-center baoshu" id="myModalLabel">是否取消分享</h4>
                </div>
                <div class="modal-body">
                    <input-text
                        input-width="100%"
                        input-height="58px"
                        name="cancelRemark"
                        margin-top="0"
                        @updata="integrationDate"/>

                    
                </div >
                <div class="modal-footer">
                    <div class="btns">
                        <button type="button" class="btn"  @click="cancel">确定取消</button>
                        <button type="button" class="btn"  data-dismiss="modal">关闭窗口</button>
                    </div>
                </div>
                <span id="shareActionId" style="display:none"></span>
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
                data:{
                    "shareActionId": "string",
                    "cancelBy": "SHARER",
                    "cancelRemark": "string"
                }
            }
        },
        methods:{
            integrationDate(name,item){
            },
            cancel(){
                const self = this;
                this.data.shareActionId = $('#shareActionId').text();
                this.data.cancelRemark = $('textarea[name="cancelRemark"]').val();

                   console.log(this.data)
                send({
                    type:'put',
                    url:'order:/share/cancel_share',
                    param:this.data
                },function(err,res){
                    if(err)return console.log(res);
                    if(res.status == 200){
                        alert(res.msg,'success');
                        self.$emit('updatakey',++self.num);
                        $('#cancelShare').modal('hide');
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