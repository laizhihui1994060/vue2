<template>
    <!-- 起止时间框 -->
    <div class="time-parent" el='startEndTime' id='startEndTime'>
        <label v-if="label" v-text="label"></label>
        <div>
            <datetimepicker
                :background="background"
                :border="border"
                :width='width'
                :placeholder="startPlaceholder"
                :name="startName"
                :minView="minute"
                @updata="updata"
                :value='startString'
                type='start'
                :disabled='disabled'
                :title="startTitle"
                classs="startTime"
            ></datetimepicker>

        </div>
        <span class="hengxian">-</span>
        <div :style="{marginRight:left}">
            <datetimepicker
                :background="background"
                :border="border"
                :width='width'
                :placeholder="endPlaceholder"
                :name="endName"
                :minView="minute"
                @updata="updata"
                :value='endString'
                type='end'
                :disabled='disabled'
                :title="endTitle"
                classs="endtTime"

            ></datetimepicker>
        </div>
        <div v-if="enableTimeRange" class="time_range">
            <button 
                v-for="(item,index) in rangeConfig"
                :key='item'
                type="button" 
                :name='item.param'
                class="btn date_quick_query"
                :class="{date_active_query:item.param === currentRange}"
                @click="changeDateInputs(true,startName,endName,item.param)"
                v-text="item.text"
                ></button>
        </div>
        
    </div>
</template>

<script>
import datetimepicker from "./datetimepicker.vue";
export default{
    props:{
        width:{
            type: String,
            default:'135px'
        },
        height:{
            type: String,
        },
        border:{
            type: String,
            default: '1px solid #1786f7'
            
        },
        rangeConfig:{
            type: Array,
        },
        background:{
            type: String,
            default:'#eff2f3'
            // default:'#DCF4FC'
            // default:'#FFF'
        },
        left:{
            type: String,
            default:'24px'
        },
        startPlaceholder:{
            type: String,
            default:'选择开始时间'
        },
        endPlaceholder:{
            type: String,
            default:'选择结束时间'
        },
        startName:{
            type: String,
            default:"startTime"
        },
        endName:{
            type: String,
            default:"endTime"
        },
        startValue:{
        },
        endValue: {
        },
        label: {
            default:'时间范围'
        },
        minute:{
            default:'minute'
        },
        end: {
            type: String,
            default: ''
        },
        start: {
            type: String,
            default: ''
        },
        disabled:{
            
        },
        startTitle: {
            type: String,
            default: "开始时间"
        },
        endTitle: {
            type: String,
            default: "结束时间"
        },
        enableTimeRange: {
            type: Boolean,
            default: false
        },
        currentRange: {
            type: String,
            default: ''
        }
    },
    computed: {
        startString(){
            if(this.startValue) return new Date(this.startValue).toString();
        },
        endString(){
            if(this.endValue) return new Date(this.endValue).toString();
        }
    },
    components:{
        datetimepicker
    },
    data () {
        return {
            color : '#999',
            start_end_time:{
                start:'',
                end:''
            },
            time: {
                start: 0,  
                end: 0,
            }

        }
    },
    watch: {
        startValue(newV){
            const that = this;
            if(!newV) return;
            console.log("watch and learn")
            $(that.$el).find(`[name=${that.endName}]`).data("DateTimePicker").minDate( new Date(that.startValue) );
            $(that.$el).find(`[name=${this.startName}]`).on("dp.change", function(e){
                $(that.$el).find(`[name=${that.endName}]`).data("DateTimePicker").minDate(e.date);
            })
        }
    },
    methods:{
        updata(name,value, $ele, type, notQuick){
            if(!/^[0-9]*$/.test(value)){
                $ele.val('');
                return;
            } else {
                this.time[type] = value;
            }

            this.$emit('updata',name,value);
        },
        changeDateInputs(event,startName,endName,range){
            console.log(event,startName,endName,range )
            this.$emit('timeRangeSearch',event,startName,endName,range)
        }
    }    
  }
  
</script>
<style scoped>
    .hengxian{
        color:#000;
        width: auto !important
    }
    .time-parent,.time-parent div{
       display:inline-block;
    }
    label{
        margin-top: 5px;
    }
    .time-parent input::-webkit-input-placeholder { 
        color: #ccc !important; 
    }
    .time-parent input:-moz-placeholder, textarea:-moz-placeholder { 
        color:  #ccc !important; 
    }
    .time-parent input::-moz-placeholder{ 
        color:   #ccc !important; 
    }
    .time-parent input:-ms-input-placeholder{ 
        color:  #ccc !important; 
    }
    .date_quick_query{
        padding:4px 5px;
        /*background: #fff;*/
        /*color:#39B6E5;*/
        background: transparent;
        color: #424e67;
        font-size: 12px;
        /*border: 1px solid #39B6E5;*/
        border-radius: 0;
        color: #ccc;
        line-height: 18px;
    }
    .date_quick_query{
        border-right: 1px solid #DADDE1
    }
    .date_quick_query:last-child{
        border-width: 0
    }
    button.date_active_query{
        /*color:#fff;*/
        color: #1786f7;

        /*background: #39B6E5;*/
    }
    .time-parent .time_range{
        display: inline-block;
        border:1px solid #DADDE1;
        border-radius: 3px;
        background: transparent;
        margin-left: -20px;
        margin-right: 20px;
    }

</style>
