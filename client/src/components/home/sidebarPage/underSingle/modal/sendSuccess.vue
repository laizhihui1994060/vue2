<template>

<!-- Modal -->
    <div class="modal fade" id="sendSuccess" tabindex="-1" role="dialog" aria-labelledby="rescueDilemma" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title text-center" id="myModalLabel">派遣成功</h4>
                </div>
                <div class="modal-body">
                    <p>订单已派遣成功，本弹窗<span v-text="number"></span>秒后关闭</p>
                </div>
                <div class="modal-footer">
                    <div class="btns">
                        <button type="button" class="btn"  data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>



    export default {
        props:['time'],
        components:{
        },
        mounted(){
        },
       
        data () {
            return {
                number:3,
            }
        },
        methods:{
           
           
        },
        watch:{
            time(newV){

                const self = this;
                self.number = 3;
                var timer = setInterval(function(){
                    --self.number
                    if(self.number == 0){
                        $('#sendSuccess').modal('hide');
                        clearInterval(timer);
                        self.$emit('clear');
                    }
                }, 300);


            }
        }
    }
 

</script>
<style scoped>
    .modal-title{
        font-size: 18px;
        color: #FF6B0E;
    }
    .modal-body{
        text-align: center;
    }
    .modal-dialog{
        margin-top: 250px;
        width: 370px;
    }
    .modal-footer button{
        width: 80px;
        margin: 0;
    }
    .modal-footer button:nth-child(2){
        margin-left: 60px;
    }

  
</style>