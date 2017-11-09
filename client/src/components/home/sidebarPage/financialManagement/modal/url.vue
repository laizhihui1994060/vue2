<template>

<!-- Modal -->
    <div class="modal fade" id="urlModel" tabindex="-1" role="dialog" aria-labelledby="cancel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title text-center" id="myModalLabel">对账单外链与密码</h4>
                </div>
                <div class="modal-body">
                
                    <p>
                        <span style="color:#000">链接：</span>
                        <input  type="text" style="color:#d00707;width:422px;border:0" class="urlModel_url"  />
                        <button class="btn clone" @click="clone('urlModel_url')">复制</button>
                    </p>
                    <p>
                        <span style="color:#000">密码：</span>
                        <input  type="text" style="color:#d00707;width:65px;border:0" class="urlModel_pas"  />
                        <button class="btn clone"  @click="clone('urlModel_pas')">复制</button>
                    </p>
                </div>
                <div class="modal-footer">
                    <div class="btns">
                        <!-- <button class="btn" @click="clone">复制连接</button> -->
                        <button type="button" class="btn" data-dismiss="modal">关闭窗口</button>
                    </div>
                </div>
                <span id="towOrderId" style="display:none"></span>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        components:{
        },
        
        data () {
            return {
            }
        },
        mounted(){
          
        },
        methods:{
            clone(classc){
                $(`.` + classc).select();
                document.execCommand("Copy");
            }
        }
    }
 

</script>
<style scoped>
    .modal-body{
        padding-bottom: 0;
        text-align: left;
    }
    .modal.in .modal-dialog{
        width: 560px;
    }
   .modal-header h4{
        color: #FF6B0E;
   }
   .btns button:nth-child(2){
        margin-left: 50px;
   }
   .clone{
        font-size: 12px;
        color: #1785F7;
        border-radius: 0;
        border-width: 0;
        text-align: center;
        background: #fff;
        display: inline-block;
        line-height: 12px;
   }
</style>