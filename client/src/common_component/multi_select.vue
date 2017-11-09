<template>
    <div class="modal fade" id="multi-select" tabindex="-1" role="dialog" aria-labelledby="cancel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title text-center" id="myModalLabel">条件搜索配置</h4>
                </div>
                <div class="modal-body clearfix">
                    <div class="row title-wrap">
                        <p class="col-md-4 ">隐藏的条件</p>
                        <p class="col-md-4 col-md-offset-3">当前条件</p>
                    </div>
                    <div class="row">
                        
                    </div>
                    <ul class="left pull-left">
                        <li v-for='(item, index) in filterBtns' @click='addNowBtns(item,index)'>{{item.title}}</li>
                    </ul>
                    <ul class='right pull-right'>
                        <li v-for='(item, index) in nowBtns'  class='delete_parent'>
                            {{item.title}}
                            <a  href="javscript:;"  class="delete" @click="deleteNowBtns(item,index)">
                                <span class='delete img'></span>
                            </a>
                        </li>
                    </ul>
                    <!-- <button @click='addAllBtns'>加全部</button> -->
                </div>
<!--                 <div class="modal-footer"> 
                    <div class="btns">
                        <button type="button" class="btn" data-dismiss="modal">确定</button>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>
</template>

<script>

import checkbox from './checkbox.vue';
export default{
    props:{
        filterBtns:{
            type:Array
        },
        nowBtns: {
            type: Array
        }
    },
    components:{
        checkbox 
    },
    methods:{
        deleteNowBtns(item, index){
            this.$emit('deleteNowBtns', item, index);
        },
        addNowBtns(item, index){
            this.$emit('addNowBtns', item, index);
        },
        addAllBtns(){
            this.$emit('addAllBtns');
        }
    }
  }
</script>
<style scoped>
    #multi-select .delete_parent{
        position: relative;
    }
    #multi-select .delete{
        position: absolute;
        top: 5px;
        right: 5px;
    }
    #multi-select .modal-dialog{
        width: 400px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.5);
    }
    #multi-select .modal-content{
        border-radius: 10px;
        padding: 10px;
    }
    #multi-select .modal-body ul{
        width:138px;
        border:1px solid #C9C9C9;
        height: 230px;
        overflow-y:auto;
        overflow-x:none;
        width:138px;
    }
    #multi-select .modal-header{
        margin-top: -12px;
    }
    #multi-select .modal-body ul.right span{
        margin-left: 28px;
        display: none
    }
    #multi-select .modal-body ul.right li{
        padding:5px;
        cursor: pointer;
        border:1px solid #eee;
    }
    #multi-select .modal-body ul.right li:hover span{
        display: inline-block;
    }
    #multi-select .modal-body .left li{
        padding:5px;
        cursor: pointer;
        border:1px solid #eee;
    }
    #multi-select .modal-body .left li.active{
        background:#DFF5FD;
        color:#000;
    }
    #multi-select .modal-body .right .my_radio{
        width:100%;
    }
    .modal-footer{
        margin-top: 8px;
    }
</style>
