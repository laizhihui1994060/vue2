<template>

<!-- Modal -->
    <div class="modal fade" id="sendCompleted" tabindex="-1" role="dialog" aria-labelledby="rescueDilemma" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title text-center" id="myModalLabel">派遣未完成</h4>
                </div>
                <div class="modal-body">
                    <p>还有<span v-text="surplus"></span>辆车没有托运!</p>
                    <p>请继续派车，如果订单有变动，请对该订单进行修改.</p>                              
                </div>
                <div class="modal-footer">
                    <div class="btns">
                        <button type="button" class="btn"  data-dismiss="modal">加派车辆</button>
                        <button type="button" class="btn"  data-dismiss="modal">修改订单</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>



    export default {
        props:['surplus'],
        components:{
        },
        mounted(){
        },
       
        data () {
            return {
                result:{
                    number:1
                }
            }
        },
        methods:{
           
           
        },
        watch:{
            total(newV){
                $('.transportNum').attr({
                    max: parseInt(newV),
                });
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