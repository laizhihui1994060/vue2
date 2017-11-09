<template>
    <ul id="sms">
        <li v-for="num in 5">
            <div class="pull-left sms_left">
                <p class="time"><span>2016/08/08</span>&nbsp;&nbsp;&nbsp;<span>18:60</span></p>
            </div>
            <div class="pull-left sms_right">
                <p>修改数量修改数量修改数量修改数量修改数量修改数量修改数量修改数量修改数量修改数量修改数量修改数量修改数量修改数量修改数量修改数量修改数量修改数量修改数量修改数量修改数量修改数量修改
                </p>
            </div>
        </li>
       
    </ul>
</template>

<script>

    export default{
        data () {
            return {
        
            }
        },
    }
</script>
<style>
    #sms{
        height: 207px;
        overflow: auto;
        padding-top: 10px;
    }
    #sms li{
        overflow: hidden;
        border-bottom: 1px solid #eee;
        padding-bottom: 12px;
        margin-bottom: 12px;
    }
    #sms p{
        font-size: 12px;
        color: #333333;
        line-height: 16px;
        margin: 0;
    }
    #sms .sms_left .time{
        background-color: #fff;
    }
    #sms .sms_right p{
        width: 648px;
        margin-left: 20px;
    }
</style>