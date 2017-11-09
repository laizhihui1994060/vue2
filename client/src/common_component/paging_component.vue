<template>
    <div class="page-bar clearfix">
        <ul>
            <li v-if="showFirst"><a v-on:click="btnClick(--false_page)">&laquo;</a></li>
            <li v-for="index in indexs"  v-bind:class="{ 'active': cur == index}">
                <a v-on:click="btnClick(index)" v-text="index"></a>
            </li>
            <li v-if="showLast"><a v-on:click="btnClick(++false_page)">&raquo;</a></li>
            <li><a>共<i v-text="all"></i>页</a></li>
            <li v-if="recordSize"><a>共<i v-text="recordSize"></i>条</a></li>
        </ul>
    </div>
</template>
<style scoped>
    .page-bar{
        position: fixed;
        bottom: 25px;
        right: 25px;
    }
    .page-bar ul{
        float: right;
    }
    .page-bar ul,li{
        margin: 0px;
        padding: 0px;
    }
    .page-bar li{
        list-style: none;
        float: left;
    }
    .page-bar li:first-child>a {
       margin-left: 0px
    }
    .page-bar a{
        border: 1px solid #ddd;
        text-decoration: none;
        position: relative;
        float: left;
        padding: 6px 12px;
        margin-left: -1px;
        line-height: 1.42857143;
        /*color: #39b6e5;*/
        color: #1786f7;
        cursor: pointer;
        background-color: #fff
    }
    .page-bar a:hover{
        background-color: #eee;
    }
    .page-bar .active a{
        color: #fff;
        cursor: default;
        /*background-color: #39b6e5;*/
        background-color: #1786f7;
        border-color: #39b6e5;
    }
    .page-bar i{
        font-style:normal;
        color: #d44950;
        margin: 0px 4px;
        font-size: 12px;
    } 
</style>
<script>
  export default {
    props:{
        'cur':{
            type: Number,
            default: 1
        },
        'all':{
            type: Number,
            default: 1
        },
        'recordSize':{
            type: Number,
        }
    },
    data () {
        return {
            false_page:1
            // all: 20, //总页数
            // cur: 1,//当前页码
        }
    },
    methods: {
        btnClick: function(data){//页码点击事件
            if(data != this.cur){
                this.false_page = data;
                this.$emit('upPage',this.false_page);
            }

        }
    },
    computed: {
        indexs: function(){
            var left = 1
            var right = this.all
            var ar = [] ;
            if(this.all>= 11){
                if(this.cur > 5 && this.cur < this.all-4){
                        left = this.cur - 5
                        right = this.cur + 4
                }else{
                    if(this.cur<=5){
                        left = 1
                        right = 10
                    }else{
                        right = this.all
                        left = this.all -9
                    }
                }
            }
            while (left <= right){
                ar.push(left)
                left ++
            }   
            return ar
       },
       showLast: function(){
            if(this.cur == this.all){
                return false
            }
            return true
       },
       showFirst: function(){
            if(this.cur == 1){
                return false
            }
           return true
       }
   }
}
</script>
