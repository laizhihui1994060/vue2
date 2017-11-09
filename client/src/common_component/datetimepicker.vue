<template>
    <div el='dateTimePicker' class="time-p" :id="name"   :class="{'after' : after}">
        <label v-if="label" class="control-label" v-html="label" :style="{marginRight: labelRight}"></label>

        <input 
            type="text" 
            class="form_datetime time"
            :class="classs" 
            :style="{width: width,height: height,background:'#cfe4fb',padding:padding,border:border,borderRadius:'3px' }" 
            :placeholder="placeholder"
            :verify="after"
            :name='name'
            :value='valueString'
            :disabled='disabled'
        >
        <span class="glyphicon glyphicon-calendar"></span>
    </div>
</template>

<script>
function getDate(time) {
    var now = new Date(time),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
}

export default{
    props:{
        width:{
            type: String,
        },
        height:{
            type: String,
        },
        background:{
            type: String,
        },
        placeholder:{
            type: String,
        },
        border:{
            type: String,
            // default:'1px solid rgb(57, 182, 229)'
        },
        padding:{
            type: String,
        },
        minView:{
            type: String,
        },
        label:{
            type: String
        },
        labelRight:{
            type: String,
            default:'12px'
        },
        name:{
            type: String
        },
        disabled:{
            type:Boolean,
            default: false
        },
        value:{
        },
        classs:{
            type: String,
            default:'form_datetime'
        },
        type: {
            type: String,
            default: ''
        },
        startDate:{
            default:false
        },
        after:{},
        minDate: {}
    },
    computed: {
        valueString(){
            if(this.value){
                const date = getDate(this.value)
                if(this.minView == 'minute'){
                    return date.substring(0, date.length - 3);
                }else{
                    return date.substring(0, date.length - 9);
                }
            }
        },
    },
    data () {
        return {
        }
    },
    methods:{

    },
    mounted(){
        const self = this;
        let format, minV;
        this.$nextTick(function(){
            if(self.minView && self.minView == 'minute' ){
                format = 'YYYY-MM-DD HH:mm'
            }else{
                format = 'YYYY-MM-DD'
            }
            var el = $(this.$el).find(".form_datetime");
            var data = self.startDate ? new Date() : false;

            el.datetimepicker({
                format: format ,
                minDate: data,
                viewDate: new Date(),
                allowInputToggle:true,
                useCurrent: true
            }).on('dp.change', function(ev){
                console.log('change触发')
                var $ele = $(ev.target);
                var date = $ele.val();
                date = date.substring(0,19);    
                date = date.replace(/-/g, '/'); 
                var timestamp = new Date(date ? date : self.value).getTime();
                self.$emit('updata', self.name, timestamp, $ele, self.type ,"notQuick");
            }).on('dp.hide', function(e){
                // console.log('隐藏触发', $(e.currentTarget), moment(self.value).format('YYYY-MM-DD HH:mm') );
                if(!e.target.value){
                    $(e.currentTarget).data("DateTimePicker").date( new Date(self.value) );
                    e.target.value = moment(self.value).format('YYYY-MM-DD HH:mm');
                }
            }).on('dp.show', function(e){
                // console.log('显示触发', $(e.currentTarget), moment(self.value).format('YYYY-MM-DD HH:mm') );
                // console.log("seolffff.valsue",self.value)
                //日期非法格式判断
                if( new Date(self.value).toString() === "Invalid Date" ){
                    console.log("日期非法")
                    $(e.currentTarget).data("DateTimePicker").date( new Date() );
                    e.target.value = moment().format(format);//原来是'YYYY-MM-DD HH:mm'
                } else {
                    console.log("日期合法")
                    $(e.currentTarget).data("DateTimePicker").date( new Date( self.value ) );
                    e.target.value = moment(self.value).format(format);//原来是'YYYY-MM-DD HH:mm'
                }
            });
            this.$el.querySelector(".form_datetime").onkeydown = function(e){
                event.preventDefault();
            }
        })
    },
    watch:{
        minDate(newv){
            if(!newv) return;
            let el = $(this.$el).find(".form_datetime");

            let defaultDate = newv ? new Date(newv) : new Date();
            let minDate = this.startDate ? defaultDate : false;
            // console.log(el, minDate);
            el.data("DateTimePicker").minDate( new Date(minDate.setHours(0) ) );
        }
    }
 

  }
</script>
<style scoped>
    .glyphicon-calendar{
        width: 0;
        position: relative;
        top: 3px;
        right: 25px;
        color:#999;
    }
    .time-p{
        display: inline-block;
        position: relative;
    }
   .time{
        width: 95px;
        background: #e7f2fe;
        border-width: 0;
        font-size: 12px;
        color: #333333;
        padding: 4px 8px;
        line-height: 14px;
   }
   
    .startTime{
        margin: 0 !important;
    }
     input[disabled]{
        background-color: #DBDFE3 !important;
        border-color: #EEEEEE !important;
    }
    .after:after{
        content: '';
        background: url('../assets/img.png') 0 -20px;
        width: 7px;
        height: 7px;
        position: absolute;
        left: -15px;
        top: 7px;
    }
</style>
