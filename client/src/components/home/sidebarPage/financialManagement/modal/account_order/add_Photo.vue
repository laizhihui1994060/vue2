<template>

<!-- Modal -->
    <div class="modal fade" id="addPhoto" tabindex="-1" role="dialog" aria-labelledby="cancel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title text-center baoshu" id="myModalLabel">添加照片</h4>
                </div>
                <div class="modal-body">
                    <div class="Photos">
                        <input-img display="block" :clear="clearNumber" @updata="watchImg"/>
                    </div>
                    
                </div >
                <div class="modal-footer">
                    <div class="btns">
                        <button type="button" class="btn"  @click="updata">确认上传</button>
                        <button type="button" class="btn"  data-dismiss="modal">关闭窗口</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import inputImg from "../../../../../../common_component/inputImg.vue";
    export default {
        props:['towDriverActionId'],
        components:{
            inputImg
        },
        data () {
            return {
                flies:[],
                num:0,
                clearNumber:0
            }
        },
        methods:{
            watchImg(name,flies,i){
                this.flies = flies;
            },
            clear(){
                ++this.clearNumber;
                this.num = 0;
            },
            updata(){
                const self = this;

                fileUp(self.flies,function(images){

                    self.lunxun(images);
                   
                });
            },
            lunxun(images){
                const self = this;
                const photoId = images[self.num] ? images[self.num].imageId: '';

                if(!photoId){
                    $('#addPhoto').modal('hide');
                    this.$parent.parentFn();
                    return alert('照片上传成功','success');
                }

                const params = {
                    "towDriverActionId": self.towDriverActionId,
                    "sysPhotoTemplateItemId": config.sysPhotoTemplateItemId,
                    "photoId": photoId
                }

                console.log(params);

                send({
                    type:'post',
                    url:'order:/tow/driver/photo',
                    param:params
                },function(err,res){
                    ++self.num;
                    self.lunxun(images);
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
        width: 536px;
    }
   .modal-header h4{
        color: #FF6B0E;
   }
   .btns button:nth-child(2){
        margin-left: 50px;
   }
   body .modal-header, body .modal-footer{
        border-width: 1px
   }
   .Photos{
        padding-top: 20px;
        padding-bottom: 20px;
   }
</style>