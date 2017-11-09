<template>
    <div class='reminder btn-group'>
        <select v-on:change.stop='change' @click.stop='change'>
            <option>无</option>
            <option>事件发生前</option>
            <option>5分钟前</option>
            <option>10分钟前</option>  
            <option>15分钟前</option>  
            <option>30分钟前</option>  
            <option>1小时前</option>  
            <option>2小时前</option>
            <option>1天前</option>
            <option>2天前</option>
            <option>自定义...</option>
        </select>
        <span class='icon'><i></i></span>
        <div class='showDetail' >
            <div>
                <input type='text' v-if='datetimepicker' :value='remind.unregular.before_regular.num'/>
                <select v-on:change.stop='chooseSelect' >
                    <option>分钟前</option>
                    <option>小时前</option>  
                    <option>天前</option>
                    <option>分钟后</option>
                    <option>小时后</option>  
                    <option>天后</option>
                    <option>于日期</option>
                </select>
                <span class='icon'><i></i></span>
                <div v-if='datetimepicker == false'>
                    <date-timepicker
                        background='transparent'
                        width='100px'
                        padding='0'
                        placeholder='选择提醒时间'
                        min-view='minute'
                        name="before_date"
                        @updata="collectData"
                    ></date-timepicker>
                </div>
            </div>
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
            active: '每天',
            datetimepicker: true,
             remind:{
                regular:'',//非自定义的选项
                unregular:{
                   before_regular:{
                      num:20,
                      unit:''//分钟前，小时前..
                   },
                   before_date:'' //于日期                 
                }//自定义选项
             }  
        }
    },
    mounted(){
        $(document).click(function(){
            if($(event.target).parents('.reminder').length == 0){
                $('.reminder .showDetail').hide();
            }
        });
    },
    methods:{
        //一级
        change(){
            const value = event.target.value;
            if( value === '自定义...'){
                $('.reminder .showDetail').show();
            }else{
                $('.reminder .showDetail').hide();
                this.remind.regular=value;
            }
        },
        // 二级
        chooseSelect(){
            console.log(event.target.value)
            if(event.target.value === '于日期'){
                this.datetimepicker = false;
                $('.reminder .showDetail .icon').addClass('data');
            }else{
                this.datetimepicker = true;
                $('.reminder .showDetail .icon').removeClass('data');
                this.remind.unregular.before_regular.unit=event.target.value;
            }

        },
        collectData(name,value){
           if(name==="before_date")this.remind.unregular.before_date=value;
        },
        cancel(){
            $('.reminder .showDetail').hide();
        },
        finish(){
            console.log(this.remind);
            $('.reminder .showDetail').hide();
        }
    },
    components:{
        dateTimepicker
    }
  }
</script>
<style>
button{
    border-radius: 0;
    border: 0;
    background-color: #DFF5FD;
    outline: none;
}
.repeated_reminders{
    display: inline-block;
    position: relative;
    font-size: 12px;
}
.reminder select {
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
  font-size: 12px;
}
.reminder  span.icon{
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
.reminder span.icon i{
    display: inline-block;
    border-width: 5px;
    border-style: solid;
    border-color: transparent;
    border-top-color: #fff;
    position: relative;
    top: 5px;
}
.reminder .showDetail{
    position: absolute;
    z-index: 10;
    outline: 2px solid #eee;
    width: 205px;
    min-height: 100px;
    padding: 10px;
    background: #fff;
    display: none;
}
.reminder .showDetail > div > input[type='text']{
    width: 76px;
    height: 18px;
    background: #DFF5FD;
    border: 0;
    padding-right: 10px;
    margin: 0 5px;
    text-align: right;
}
.reminder .showDetail select{
    width: 76px;
}
.reminder .showDetail span.icon{
    left: 145px;
    top: -20px;
    height:20px;
}
.reminder .showDetail span.icon.data{
    left: -24px;
    top: 0;
}
.reminder .showDetail .btns{
    display: block;
    text-align: center; 
    margin-top: 40px;
}
.reminder .showDetail .btns button{
    width: 54px;
    height: 18px;
    background: #FFFFFF;
    border: 1px solid #39B6E5;
    color: #39B6E5;
}
</style>
