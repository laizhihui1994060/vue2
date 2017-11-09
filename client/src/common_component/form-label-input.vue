<template>
    <!-- 输入框 -->
   <div  :class="[ 'label_value', { 'after' : after,'setAfter':!label }]" :style="{marginRight: pmarginRight,width:inputWidth.indexOf('%') != -1 ? '100%' : 'auto'}">
        <label v-if="label" class="control-label" v-html="label"  :style="{marginLeft: labelLeft, marginRight: labelRight, width: labelWidth, color:labelColor}"></label>
        <input 
            :type="type"  
            :class="[ 'label-text', className ]"
            :id="id"
            :style="{width: inputWidth,backgroundColor:inputBackgroundColor,marginRight:marginRight,textIndent:textIndent,border:textBorder,borderRadius:'3px'}" 
            :placeholder="placeholder"
            :disabled="disabled"
            :name="name"
            :min="min"
            :max="max" 
            :isVerify="verify"
            :value="value"
            :verify="after"
            :title='type != "password" ? value : "" '
            :text="title"
            :matchcn="matchcn"
            :autocomplete='autocomplete'
            @focus="focusFunc"
            @blur="watchText"
            @change="emit($event)"
            @input="trigInput($event)"
            >
        <span v-if="hasClearButton" class="clear_btn" @click='clearValue(name)'>&times;</span>
        <span class='unit' :style='{right: unitRight}'>{{unit}}</span>
   </div>
</template>

<script>


export default{
    props:{
        'label':{
            type:String,
            default:''
        },
        'placeholder':{
            type:String
        },
        'name':{
        },
        'className':{},
        'value':{
            
        },
        "hasClearButton":{
            type:Boolean,
            default:false
        },
        "min":{
        },
        "max":{
            default:10000000000000000000
        },
        'labelLeft':{
            type:String,
            default:'auto'
        },
        'labelRight':{
            type:String,
            default: '12px'
        },
        'labelWidth':{
            type:String,
        },
        'labelAlign':{
            type:String
        },
        'labelColor':{
            type:String
        },
        'marginRight':{
            type:String,
            default: '0'
        },
        'inputWidth':{
            type:String,
            default: '95px'
        },
        'inputBackgroundColor':{
            type:String,
            default:'#cfe4fb'
        },
        'textBorder':{
            type:String,
        },
        'disabled':{
            default: false
        },
        'index':{},
        'indexTwo': {},
        'pmarginRight':{
            type:String,
            default: '0px'
        },
        'matchcn':{
            type:String
        },
        after:{
            type:Boolean,
            default:  false
        },
        textIndent:{
            default:  '5px'
        },
        type:{
            type:String,
            default: 'text'
        },
        unit: {
            type: String
        },
        verify:{

        },
        id:{
            type: String
        },
        title:{},
        unitRight:{
            
        },
        // 自动填充
        autocomplete: {
            type: String,
            default: 'on'
        },
        check: {},
        checkTip:{}
    },
    data () {
        return {
            is:true
        }
    },
    methods:{
        emit(ev){
            var val = ev.target.value;
            this.is = val ? false :true; 
            this.$emit('updata',this.name,val, this.index, this.indexTwo)
        },
        watchText(ev){
            const pattern = new RegExp(this.check);

            if(!pattern.test(ev.target.value)){
                alert(this.checkTip || '不符合规范!');
                $(ev.target).css('background', 'rgba(255, 0, 0, 0.26)');
                return;
            }else{
                // $(ev.target).css('background', 'transparent');
                $(ev.target).css('background', this.inputBackgroundColor);
                // $(ev.target).css('background', 'rgb(239, 242, 243)');

            }
            var val = ev.target.value;
            this.is = val ? false :true; 
            if(!val && this.type == 'number' && this.name == "price")$(ev.target).val(0);
        },
        focusFunc(ev){
            this.is =false;
            this.$emit("focusFunction");
            if(this.value == 0 && this.type == 'number'){
                $(ev.target).val('');
            }
        },
        clearValue(name){
            $('input[name='+name+']').val('');
            this.$emit('updata',name,'');
            this.$emit('valClear',name,'');
        },
        trigInput(e){
            this.$emit('inputTrigged',e.target.name,e.target.value);

        }
    },
    watch:{
    }

  }
</script>
<style scoped>
    .label_value{
        display: inline-block;
        position: relative;
    }
    .unit{
        position: absolute;
        font-size:12px;
        color:#999999;
        right:2px;
        top:5px;
    }
    input{
        width: 95px;
        /*background: rgb(207, 228, 251);*/
        border-width: 0;
        color: #333333;
        text-indent: 13px;
        padding: 5px;
        height: 24px;
        font-size: 12px;
        border-radius:3px
    }
    input[disabled]{
        background-color: #DBDFE3 !important;
        border-color: #EEEEEE !important;
    }
    .after:after{
        content: '';
        background:url(../../src/assets/img.png) no-repeat;
        background-position:0 -20px;
        width: 7px;
        height: 7px;
        position: absolute;
        left: -15px;
        top: 7px;
    }
    .setAfter:after{
        left: -15px !important;
        top: 7px !important;   
    }
    ::-webkit-input-placeholder { /* WebKit browsers */ 
        color: #999 !important; 
    } 
    .label_value .setbg{
        background-color: rgba(255, 0, 0, 0.26) !important;
    }
    input.transparent-input[disabled]{
        background-color: transparent !important;
    }
    .clear_btn{
        cursor: pointer;
        position: absolute;
        color: #333;
        top: 10%;
        right: 5%;
    }
    .clear_btn::selection{
        background: none;
        /*color: #e5e5e5;*/
    }
</style>
