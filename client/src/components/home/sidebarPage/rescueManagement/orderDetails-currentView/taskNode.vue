<template>
    <div id="taskNode" class="com-node">
       <div class="zhixian pull-left">
            <div class="circle_wrap" v-for="num in 10" >
                <div class="circle"></div>
                <span></span>
            </div>
       </div>
       <ul class="node pull-right">
           <li v-for="num in 10">
               <div class="pull-left taskNode-info">
                    <p>卸车完成</p>
                    <span>2016/09/09</span>
               </div>
               <div class="pull-right fnbtn">
                   <a href="javascript:;" @click="bool = !bool"><img src="../../../../../assets/photo.png" height="20" width="16" alt=""></a>
                   <a href="javascript:;"  @click="$emit('point',[113.473188,39.993253])"><img src="../../../../../assets/poin.png" height="22" width="18" alt=""></a>
               </div>
           </li>
       </ul>
    </div>
</template>
<script>

    export default{
        mounted(){
            const self = this;

            this.$nextTick(function(){
                $('.circle_wrap:last').find('span').css({display:'none'})
                
            })

            bus.$on('closePhoto',()=> self.bool = false)
        },
        data () {
            return {
                bool:false
            }
        },
        methods:{
            
        },
        watch:{
            bool(newValue){
                this.$emit('ishow',newValue)
            }
        }
    }
</script>
<style scoped>
    .com-node{
        width: 100%;
        overflow: hidden;
    }
    .node {
        width: 224px;
    }
    .node li{
        height: 46px;
        padding-bottom:10px;
        margin-bottom:10px;
        border-bottom: 1px solid #eee;
    }
    .node .taskNode-info p ,.node .Photo-info p{
        margin: 0;
        font-size: 14px;
        color: #333333;
        line-height: 16px;
    }
    .node .taskNode-info span ,.node .Photo-info span{
        font-size: 12px;
        color: #666666;
        line-height: 12px;
    }
    .node .fnbtn{
        margin-right: 24px;
        padding-top: 6px;
    }
    .node .fnbtn a:nth-child(1){
        margin-right: 18px;
    }
    .zhixian{
        padding-top: 3px;
    }
    .zhixian .circle_wrap{
        text-align: center;
        height: 56px;
        overflow: hidden;
    }
    .zhixian .circle{
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #39B6E5;
        border: 1px solid #39B6E5;

    }
    .zhixian span{
        display: inline-block;
        height: 56px;
        width: 1px;
        background: #39B6E5;
    }
</style>