<template>
    <div class="area" >
        <div :class='{ "after": after }'>
            <label v-if="label" class="control-label" v-html="label"  :style="{marginRight: labelRight,top: -(parseFloat(inputHeight) - 12) + 'px'}"></label>
            <textarea 
                class="textarea" 
                :placeholder="placeholder"
                :style="{width: inputWidth,backgroundColor:'#cfe4fb',marginTop:marginTop,overflow:overflow,height:inputHeight}"
                :name="name"
                :value="value"
                :disabled='disabled'
                :verify="after"
                @change="$emit('updata',name,$event.target.value)"
            ></textarea>
        </div>
    </div>
</template>

<script>
export default{
    props:{ 
        'label':{
            type:String,
            default:''
        },
        'labelTop':{
            type:String,
            default:'-24px'
        },
        'value':{
            type:String
        },
        'placeholder':{
            type:String
        },
        'name':{
            type:String
        },
        'labelRight':{
            type:String,
            default:'12px'
        },
        'inputWidth':{
            type:String,
            default:'72%'
        },
        'inputBackgroundColor':{
            type:String,
            default:'#DFF5FD'
        },
        'overflow':{
            type:String,
            default:'visible'
        },
        marginTop:{
            type:String,
            default:'12px'
        },
        disabled:{
            
        },
        inputHeight:{
            default:'40px'
        },
        after:{
            type:Boolean,
            default:  false
        },
    },
    data () {
        return {
           
        }
    },
    // watch:{}

  }
</script>
<style scoped>
    label{
        position: relative
    }
    textarea{
        width: 72%;
        background: #DFF5FD;
        height: 40px;
        border: 0;
        resize: none;
        font-size: 12px;
        color: #333333;
        line-height: 12px;
        padding: 8px;
        border-radius: 3px;
        line-height: 14px;
    }
    textarea[disabled]{
        background-color: #DBDFE3 !important;
    }
    .after:after {
        content: '';
        background: url(../assets/img.png) 0 -20px;
        width: 7px;
        height: 7px;
        position: absolute;
        left: 0;
        top: 14px;
    }
</style>
