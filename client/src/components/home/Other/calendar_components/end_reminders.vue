<template>
    <div class='end_reminders btn-group'>
        <select v-on:change='change' @click="change">
            <option>永不</option>
            <option>于次数</option>
            <option>于日期</option>  
        </select>
        <span class='icon'><i></i></span>
        <div class='showDetail'>
            <div v-show='active == "于次数"'>
                <p><input type='text' :value='end_remind.times'/>次数后结束</p>
            </div>
            <div v-show='active == "于日期"'>
                <span>结束时间：</span>
                <date-timepicker
                    background='transparent'
                    width='100px'
                    padding='0'
                    placeholder='选择结束时间'
                    min-view='minute'
                    name="date"
                    @updata="collectData"
                ></date-timepicker>
            </div>
            <p class="tip tip_date">请输入日期</p>
            <p class="tip tip_times">请输入次数</p>
            <div class='btns'>               
                <button @click="cancel">取消</button>
                <button @click="finish">完成</button>

            </div>
        </div>
    </div>
</template>
<script>
import dateTimepicker from '../../../../common_component/datetimepicker.vue'
export default{
    data () {
        return {
            active: '',
            end_remind:{
                select:'',
                times:1,
                date:''
            }
        }
    },
    mounted(){
        $(document).click(function(){
            if($(event.target).parents('.end_reminders').length == 0){
                $('.end_reminders .showDetail').hide();
            }
        });
    },
    methods:{
        //一级
        change(){
            if(event.target.value === '于次数' || event.target.value === '于日期'){
                this.active = event.target.value;
                $('.end_reminders .showDetail').show();
            }else{
                $('.end_reminders .showDetail').hide();
            }
            this.end_remind.select=event.target.value;
        },
        collectData(name,value){
           if(name==="date")this.end_remind.date=value;
        },
        cancel(){
            $('.end_reminders .showDetail').hide();
        },
        finish(){
            if(this.end_remind.select==="于次数"&&this.end_remind.times==''){
                $(".tip_times").css("display","block");
            }else if(this.end_remind.select==="于日期"&&this.end_remind.date==''){
                $(".tip_date").css("display","block");
            }else{
                $('.end_reminders .showDetail').hide();
                $(".tip").css("display","none");
            }
          
        }
    },
    components:{
        dateTimepicker
    }
  }
</script>
<style>
.tip{
    display:none;
}
button{
    border-radius: 0;
    border: 0;
    background-color: #DFF5FD;
    outline: none;
}
.end_reminders{
    display: inline-block;
    position: relative;
    font-size: 12px;
}
.end_reminders select {
  width: 120px;
  border: none;
  appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;
  border-radius: 0;
  padding: 2px 0 2px 10px;
  padding-right: 20px;
  background-color: #DFF5FD;
  cursor: pointer;
}
.end_reminders  span.icon{
    display: inline-block;
    width: 20px;
    height: 21px;
    background: #39B6E5;
    position:relative;
    left: -25px;
    top: -2px;
    text-align:center;
    outline: none;
}
.end_reminders span.icon i{
    display: inline-block;
    border-width: 5px;
    border-style: solid;
    border-color: transparent;
    border-top-color: #fff;
    position: relative;
    top: 5px;
}
.end_reminders .showDetail{
    position: absolute;
    z-index: 10;
    outline: 2px solid #eee;
    width: 205px;
    min-height: 100px;
    padding: 10px;
    background: #fff;
    display: none;
}
.end_reminders .showDetail input[type='text']{
    width: 32px;
    height: 18px;
    background: #DFF5FD;
    border: 0;
    padding-left: 5px;
    margin: 0 5px;
}
.end_reminders  .showDetail .btns{
    display: block;
    text-align: center; 
    margin-top: 40px;
}
.end_reminders .showDetail .btns button{
    width: 54px;
    height: 18px;
    background: #FFFFFF;
    border: 1px solid #39B6E5;
    color: #39B6E5;
}
</style>