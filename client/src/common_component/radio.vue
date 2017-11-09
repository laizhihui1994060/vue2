<template>
    <div  :class="[ 'my_radio', { 'after_1' : after ,'set_margin_my_radio' : imgLeft}]" :style="{marginRight:parentMarginRight,display:parentDisplay,height:parentHeight}">
        <label v-if="textDirection == 'left' " :for="'radio_' + random" v-html="text" style="{marginRight:inputRight}"></label>
        <input 
            type="radio" 
            :name='name' 
            :value="value" 
            :id="'radio_' + random" 
            :checked='checked' 
            :index='index'
            :style="{ top:top,marginTop:radioMrginTop }"
            @click="emit($event)"
            :disabled="disabled" />
        <label v-if="textDirection == 'right' " :for="'radio_' + random" v-html="text" :style="{marginLeft:rightMarginLeft}"></label>
    </div>
</template>

<script>
    export default{
        props:{
            'text':{
                type:String,
            },
            'textDirection':{
                type:String,
                default:'left'
            },
            'rightMarginLeft':{
                type:String,
                default:'11px'
            },
            'name':{
                type:String,
            },
            'checked':{
                type:Boolean,
            },
            'value':{
                type: String,
            },
            'imgLeft':{
                type:Boolean,
                default: false
            }, 
            'disabled':{
                type:Boolean,
                default:  false
            },
            after:{
                type:Boolean,
                default:  false
            },
            index: {},
            inputRight:{
                default:'2px'
            },
            top:{},
            parentMarginRight:{
                default:'12px'
            },
            radioMrginTop:{
            },
            parentHeight:{
                default:'auto'
            },
            parentDisplay:{
                default:'inline-block'
            }
        },
        data(){
            return {
                random: Math.random()
            }
        },
        created(){
            var value = this.value;
            if(value == 'true')value = true;
            if(value == 'false')value = false;
            
            if(this.checked) this.$emit('updata',this.name, value, this.index)
            
        },
        methods:{
            emit(ev){
                var value = this.value;
                if(!value){
                    value = ev.target.checked;
                }
                if(value == 'true')value = true;
                if(value == 'false')value = false;
                this.$emit('updata',this.name, value, this.index)
            }
        }

       
    }
</script>

<style>
.my_radio{
    display:inline-block !important;
    margin-right: 20px;
}
.my_radio label{
    margin-right:0;
    cursor: pointer;
}
.my_radio input[type="radio"]{
    position:relative;
    top:1px;
    visibility:hidden;
    cursor: pointer;
    width:18px;
    height:15px;
}
.my_radio input[type="radio"]:after{
    content:'';
    display:block;
    width:18px;
    height:18px;
    visibility:visible;
}
.set_margin_my_radio input[type="radio"]:after{
    margin-left: 12px;
}
.my_radio input[type="radio"]:disabled:after{
    background:url('../assets/img.png') no-repeat 0 -484px !important;
}
.my_radio input[type="radio"]:disabled:checked:after{
    background:url('../assets/img.png') no-repeat 0 -448px !important;
}
.my_radio input[type="radio"]:after{
    background: url('../assets/brandNewRadio.png') no-repeat -19px 0px;
    /*background:url('../assets/img.png') no-repeat 0 -546px ;*/
}
.my_radio input[type="radio"]:checked:after{
    background: url('../assets/brandNewRadio.png') no-repeat 0px 0px;
    /*background:url('../assets/img.png') no-repeat 0 -466px;*/
}
.after_1:after{
    content: '';
    background: url('../assets/img.png') no-repeat 0 -20px;
    width: 7px;
    height: 7px;
    position: absolute;
    left: 0;
    top: 7px;
}

</style>