<template>
    <div>
        <div class="btn-group"  :style="{paddingRight:padding}" @click="showDropDown">
            <button type="button" :class="[ 'btn setWidth filter', { 'grayBtn' : grayStyle == 'true' } ]"
                    :style="{color: textColor ,width:width}"                 
                    v-text="title"
                    :name="name"
                    :data-text="defaultTitle"
                    >
            </button>
            <button type="button" :class="[ 'btn dropdown-toggle caretPar', { 'grayBtn' : grayStyle == 'true' } ]">
                <span class="caret"></span>
            </button>
            <div class="dropdown-menu" role="menu"  :style="{width:listWidth}">
            	<form-label-input label="最小值"></form-label-input>
            	<form-label-input label="最大值"></form-label-input>
            	<button class="btn cancelbtn">取消</button>
                <button class="btn surebtn">确定</button>     
            </div>
        </div>
    </div>
</template>
<script>
import formLabelInput from './form-label-input.vue'
let oldDataSource = [];
export default{
    props:{
        'grayStyle': {
            type:String,
            default:  'false'
        },
        width:{
            type: String,
            default:'74px'
        },
        label:{
            type: String,
        },
        listWidth:{
            type: String,
            default:'160px'
        },
        url:{
            type: String,
        },
        filter:{
            type: String,
        },
        labelRight:{
            type: String,
        },
        name:{
            type: String,
        },
        title:{
            type:String,
            default: ''
        },
        padding:{
            type: String,
            default: '24px'
        },
        color:{
            type: String,
            default: '#999'
        },
        arr:{
            type:Array
        }

    },
    data () {
        return {
            textColor: this.color,
            defaultTitle:'',
            searchQuery:'',
            dataSource:{}
        }
    },
    methods:{
        toggleText(data){
            this.isDefault = false;
            this.textColor = '#333';
            
            $(event.target).parentsUntil('.btn-group').parent().find('.setWidth').text( data.trim() )
            // this.defaultTitle = data.trim();
            this.$emit('updata',this.name, data.trim())
        },
        updata(){
            
        },
        integrationDate(){

        },
        showDropDown(event){
           var tar=event.target||event.srcElement;
           if(tar.className=="btn dropdown-toggle caretPar" || tar.className=="btn setWidth filter"){
                tar.parentNode.children[2].style.display="block";
           }else if(tar.className.match("cancelbtn")||tar.className.match("surebtn")){
                tar.parentNode.parentNode.children[2].style.display="none";
           }else if(tar.tagName.toLowerCase()=="li"){
                tar.children[0].children[1].checked="checked";
           }else if(tar.className=="form_datetime time startTime"){
                tar.parentNode.parentNode.parentNode.parentNode.children[0].children[1].checked="checked";
           }else if(tar.className=="label-text"){
                 tar.parentNode.parentNode.children[0].children[1].checked="checked";
           } 
        }
    },
    components:{
       formLabelInput
    }
  }
</script>
<style scoped>
    .dropdown-menu{
        min-width:300px;
        height:100px;
        padding:10% 0;
    }
    .dropdown-menu > ul{
        min-width:80%;
        height:80%;
    }
    .dropdown-menu button{
        position:relative;
        float:right;
        background-color:#39B6E5;
        color:white;
        margin-right:10px;
        margin-top:20px;
    }

</style>