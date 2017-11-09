<template>
    <div class="clearfix" id='switchBtn'>
        <div class="pull-left">
            <label class="switchBtn_text" v-html="text" :style="{marginRight:labelRight}"></label>
        </div>
        <div class="pull-left bg_con">  
            <input 
                :id="name" 
                type="checkbox" 
                class="switch"  
                @click="toggle" 
                :name="name"
                :checked="checked"
                :disabled='disabled'
                :value="value"/>  
            <label class="setBg" :for="name"></label>  
        </div>     
    </div>
</template>

<script>
export default{
    props:{
        name:{},
        checked:{},
        value:{},
        text:{},
        disabled:{},
        labelRight:{
            default:"16px"
        }
    },
    data () {
        return {

        }  
    },
    methods:{
        toggle(ev){
            const eve = ev || event;
            const checked = eve.target.checked;

            if(!this.value)return this.$emit('updata',this.name,checked);

            if(checked)this.$emit('updata',this.name,this.value);
            else this.$emit('updata',this.name,'');
        }
    }
}
 
</script>
<style scoped>
    #switchBtn{
        display: inline-block;
        margin-bottom: 0;
        position: relative;
        top: 2px;
    }
    .switchBtn_text{
        line-height: 24px;
        margin-bottom: 0;
        margin-right: 16px;
    }
    .bg_con{
        width: 53px;
        margin-top: 2px;
    }
    .switch{   
        display:none;   
    }   
    #switchBtn .setBg{   
        position:relative;   
        display: inline-block;
        width: 42px;   
        border-radius: 26px;   
        height: 20px;   
        background-color: #eee;   
        cursor: pointer;   
        vertical-align: top;   
        user-select: none;   
        margin-bottom: 0;
    }   
    .setBg:before{   
        content: '';   
        display: block;   
        border-radius: 22px;   
        height: 20px;   
        background-color: #e9e9e9;   
        transform: scale(1, 1);   
        transition: all 0.3s ease;   
    }  
    .setBg:after{   
        content: '';   
        position: absolute;   
        top: 50%;     
        left: 50%;     
        margin-top: -9px;
        margin-left: -11px;
        width: 18px;
        height: 18px;
        border-radius: 26px;   
        background-color: white;   
        box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.08);   
        transform: translateX(-9px);   
        transition: all 0.3s ease;   
    }   
    .switch:checked~label:after{   
        transform: translateX(14px);   
    }   
    .switch:checked~label:before{   
        background-color:#1683f3;   
    }   
    .switch[disabled]~label:before{
        background: #DBDFE3
    }
    .switch[disabled]~label:after{
        background: #C3C3C3 
    } 
</style>
