<template>
    <div id='register_success'>
        <form class="form_wrap row">
            <i class='img success'></i>
            <h5>设置成功</h5>
            <p>您的资料已提交，我们会在 3 个工作日内联系您。</p>
            <p>请您耐心等待</p>
        </form>
    </div>
</template>

<script>


    export default{
        components: {
            
        },
        data(){
            return {
              
            }
        },
        methods:{
           
        },
        mounted(){
            this.$nextTick(function(){
                $('#register').css('margin-top', '0');
            });
        }
    }
</script>
<style>
    #register_success .form_wrap{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 64px 0;
        margin-top:-180px;
    }
    #register_success .form_wrap h5{
        font-size: 20px;
        color: #39B6E5;
        margin: 32px 0 24px 0;
    }
    #register_success .form_wrap p{
        color: #666
    }
    #register_success .img{
        display: block;
        margin: 0 auto;
    }
</style>