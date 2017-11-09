<template>
    <div class='repeated_reminders btn-group'>
        <select v-on:change='change' @click='change' v-model="selected">
            <option>无</option>
            <option>每天</option>
            <option>每周</option>  
            <option>每月</option>  
            <option>每年</option>  
            <option>自定义...</option>  
        </select>
        <span class='icon'><i></i></span>
        <div class='showDetail'>
            <div>
                <span>频率：</span>
                  <div>
                    <select v-on:change = 'chooseSelect'>
                        <option>每天</option>
                        <option>每周</option>  
                        <option>每月</option>  
                        <option>每年</option>  
                    </select>
                    <span class='icon'><i></i></span>
                </div>
                <div v-show='active == "每天"' class='every_day' >
                    <p>每<input type='text' :value='repeat.unregular.day.day_times' />天</p>
                </div>
                <div v-show='active == "每周"' class='every_week' >
                    <p>每<input type='text' :value="repeat.unregular.week.week_times"/>周</p>
                    <ul class='choose_day' @click='chooseDay'>
                        <li v-for="item in week_days">{{item}}</li> 
                    </ul>
                </div>  
                <div v-show='active == "每月"' class='every_month' >
                    <p>每<input type='text'  :value="repeat.unregular.month.month_times"/>月</p>
                    <ul class='choose_day clearfix' @click='chooseDay'>
                        <li v-for='n in 31'>{{n}}</li> 
					</ul>
                </div>
				<div v-show='active == "每年"' class='every_year' >
                    <p>每<input type='text' :value="repeat.unregular.year.year_times"/>年</p>
                    <ul class='choose_day clearfix' @click='chooseDay'>
                        <li v-for='n in 12' style='width:40px'>{{n}}月</li> 
                    </ul>
                    <p>第<input type='text' :value="repeat.unregular.year.year_day"/>号</p>
                </div>
                <div class='btns'>
                    <button @click="cancel">取消</button>
                    <button @click="finish">完成</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


export default{

    data () {
        return {
             active: '每天',
             selected: '无',
             week_days:['日','一','二','三','四','五','六'],
             repeat:{
                regular:'',//无，每日，每周，每月，每年
                unregular:{
                    name:'',//用户选择的是：自定义‘年’，‘月’，‘日’
                    year:{
                        year_times:1,
                        year_months:[],
                        year_day:1
                    },
                    month:{
                        month_times:1,
                        month_days:[]
                    },
                    week:{
                        week_times:1,
                        week_days:[]
                    },
                    day:{
                        day_times:1,                      
                    }
                }
             }
             

        }
    },
    mounted(){
        $(document).click(function(){
            if($(event.target).parents('.repeated_reminders').length == 0){
                $('.repeated_reminders .showDetail').hide();
            
            }
        });

    },
    methods:{
        //一级
        change(){
            if(event.target.value === '自定义...'){
                $('.repeated_reminders .showDetail').show();
            }else{
                $('.repeated_reminders .showDetail').hide();
            }
            let boolean = false;

            if(event.target.value != '无'){
                boolean = true;
            }
            this.$emit('repeatedComp', boolean)
        },
        // 二级
        chooseSelect(){
            this.active = event.target.value; 
            var val="";
            switch(event.target.value){
                case "每天":val="day";break;
                case "每周":val="week";break;
                case "每月":val="month";break;
                case "每年":val="year";
            }
           this.repeat.unregular.name=val;
        },
        chooseDay(event){
            $(event.target).toggleClass('selected');
        },
        finish(){
            var $chooseItem;
            var name=this.repeat.unregular.name;
            switch(name){
              //  case "day"://如果用户选择的是自定义每天
    
                case "week"://如果用户选择的是自定义每周
                $chooseItem=$(".every_week").children("ul").children("li");          
                 for(var i=0;i<$chooseItem.length;i++){
                   
                    if($chooseItem[i].className==="selected"){
                        this.repeat.unregular.week.week_days.push($chooseItem[i].innerHTML);
                    }                 
                };
                break;
                case "month"://如果用户选择的是自定义每月
             
                 $chooseItem=$(".every_month").children("ul").children("li");
                 for(var i=0;i<$chooseItem.length;i++){
                  
                    if($chooseItem[i].className==="selected"){
                        this.repeat.unregular.month.month_days.push($chooseItem[i].innerHTML);//自定义每月中的天
                    }                 
                };
                break;
                case "year":
                $chooseItem=$(".every_year").children("ul").children("li");
                for(var i=0;i<$chooseItem.length;i++){
                    console.log($chooseItem[i].className);
                    if($chooseItem[i].className=="selected"){
                        this.repeat.unregular.year.year_months.push($chooseItem[i].innerHTML);//自定义年的月份
                    }                 
                };

            }
           console.log(this.repeat.unregular);
           $(".showDetail").css("display","none");
        },
        cancel(){
            $(".showDetail").css("display","none");
        }
	}
}
</script> 
<style scoped>
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
.repeated_reminders select {
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
.repeated_reminders  span.icon{
    display: inline-block;
	width:20px;
    height: 21px;
    background: #39B6E5;
    position:relative;
    left: -25px;
    top: -2px;
    text-align:center;
    outline: none;
}
.repeated_reminders span.icon i{
    display: inline-block;
    border-width: 5px;
    border-style: solid;
    border-color: transparent;
    border-top-color: #fff;
    position: relative;
    top: 5px;
}
.repeated_reminders .showDetail{
    position: absolute;
    z-index: 10;
    outline: 2px solid #eee;
    width: 205px;
    min-height: 100px;
    padding: 10px;
    background: #fff;
    display: none;
	}

.repeated_reminders .showDetail > div div{
    display: inline-block;
    margin-bottom: 10px;
}
.repeated_reminders .showDetail > div div input[type='text']{
    width: 32px;
    height: 18px;
    background: #DFF5FD;
    border: 0;
    padding-left: 5px;
    margin: 0 5px;
}
.choose_day li {
    width: 24px;
    height: 24px;
    float: left;
    border: 1px solid #eee;
    background-color: #fff;
	text-align: center;
    line-height:24px;
    cursor: pointer;
    user-select:none;
}
.choose_day li.selected{
    background-color: #DFF5FD;
}
.repeated_reminders .showDetail .btns{
    display: block;
    text-align: center; 
}
.repeated_reminders .showDetail .btns button{
    width: 54px;
    height: 18px;
    background: #FFFFFF;
    border: 1px solid #39B6E5;
    color: #39B6E5;
}
</style>
