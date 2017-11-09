<template>
    <div class="my_checkbox" :class='{"newStyle":newStyle ? true:false }' :style="{marginLeft:marginLeft}">
        <label v-if="direction == 'right'" :for="value ?  'checkbox_'  + value :'checkbox_'  + name " v-html="text" :style="{fontSize:labelSize,marginRight:labelRight}"></label>
        <input 
            type="checkbox" 
            :name="name"
            ref="input" 
            :value="value" 
            :id="value ?  'checkbox_'  + value :'checkbox_'  + name " 
            :checked='checked' 
            :style="{marginLeft:inputLeft, display:display, top:top}" 
            @click="emit($event)"
            :index='index'
            :params='params'
            :disabled="disabled" />
        <label v-if="direction == 'left'" :for="value ?  'checkbox_'  + value :'checkbox_'  + name " v-html="text" :style="{fontSize:labelSize, marginLeft:labelLeft}"></label>
    </div>
</template>

<script>

    export default{
        props:{
            'text':{
                type:String,
            },
            'newStyle':{
            },
            'name':{
            },
            'checked':{
                type: Boolean,
            },
            'value':{
            },
            'labelSize':{
                type:String,
            },
            'imgLeft':{
                type:Boolean,
                default:  false
            },
            'direction':{
                type: String,
                default:  'right'
            },
            'display':{
                type: String,
                default: 'inline-block'
            },
            'disabled':{
                type:Boolean,
                default:  false
            },
            'marginLeft':{
                type:String,
                default:'0'
            },
            'labelLeft':{
                type:String,
                default:'16px'
            },
            'inputLeft':{
                type:String,
                default:'0'
            },
            'marginTop':{
                type:String,
                default:'0'
            },
            'labelRight':{
                type:String,
                default:'0'
            },
            'index':{
                type:Number,
                default:0
            },
            'params': {
                default: function(){
                    return {};
                }
            },
            'no':{
                type:Boolean,
                default:  false
            },
            top:{
                default: '2px'
            },
            'noSend':{
                type:Boolean,
                default:  false
            }
        },
        created(){
           
        },
        methods:{
            emit(ev){

                var checked = ev.target.checked;
                var value = this.value;
                if(!value)value = checked;

                if(!checked && typeof value == 'string')value = '';

                if(!checked && this.no)return;
                this.$emit('updata',this.name,value,this.index, this.params)
            }
        },
        mounted(){ 
            const self = this;
            this.$nextTick(function(){

                if(self.imgLeft){
                    $('.my_checkbox').addClass('set_margin_my_checkbox');
                }

                var checked = self.$refs.input.checked;
                var value = self.value;
                if(!value)value = checked;

                if(!checked)return;

                self.$emit('updata',self.name,value,self.index, this.params)
            })
        },
        watch:{
            checked: {
                handler(val, oldVal) {
                    const self = this;
                    this.$nextTick(function(){

                            var checked = self.$refs.input.checked;
                            var value = self.value;
                            if(!value)value = checked;

                            if(!checked || self.noSend)return;

                            self.$emit('updata',self.name,value,self.index, this.params);


                    });
                },
                deep: true
            }
        }
    }
</script>

<style>
.my_checkbox{
    display:inline-block ;

}
 .my_checkbox label{
    margin-right:0;
    cursor: pointer;
    -webkit-user-select: none;
} 
.my_checkbox input[type="checkbox"]{
    position:relative;
    visibility:hidden;
    cursor: pointer;
}
.my_checkbox input[type="checkbox"]:after{
    content:'';
    display:block;
    width:14px;
    height:14px;
    visibility:visible;
    outline-style:none;
    position:relative;
}
.set_margin_my_checkbox input[type="checkbox"]:after{
    margin-left: 12px;
}
.my_checkbox input[type="checkbox"]:after{
    background: url('../assets/brandNewCheckbox.png') no-repeat -14px 0px;
    /*background:url('../assets/img.png') no-repeat 0 -235px;*/
    opacity:0.8;
}
.my_checkbox input[type="checkbox"]:checked:after{
    background: url('../assets/brandNewCheckbox.png') no-repeat 0px 0px;
    /*background:url('../assets/img.png') no-repeat 0 -390px;*/
    opacity:0.8;
}
.my_checkbox input[type="checkbox"]:disabled:after{
    background:url('../assets/img.png') no-repeat 0 -221px;
}
.my_checkbox input[type="checkbox"]:disabled:checked:after{
    background:url('../assets/img.png') no-repeat 0 -404px;  
}

.newStyle input[type="checkbox"]:after{
    width:18px;
    height:18px;
    top:-3px
}

.newStyle input[type="checkbox"]:after{
    background:url('../assets/newRadio.png') no-repeat -19px 0;
}
.newStyle input[type="checkbox"]:checked:after{
    background:url('../assets/newRadio.png') no-repeat;
}
.newStyle input[type="checkbox"]:disabled:after{
    background:url('../assets/newRadio.png') no-repeat -38px 0;
}

</style>