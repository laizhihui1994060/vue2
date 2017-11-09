<template>
    <div class="forgetPassword">
        <h6>重置密码成功</h6>
        <hr>
        <div class="form_wrap">
            <form class="form">
                <div class="img_wrap">
                    <i class="img success" alt=""></i>
                    <p>设置成功</p>
                </div>
            </form>
                
                <hr>
                <div class="form-group text-center">
                    <router-link class="btn login" to="/">立即登陆</router-link>
                </div>
        </div>
    </div>
</template>

<script>

    export default{
        props:['currentView'],
       
        data () {
            return {
              
            }
        } 
       
    } 
</script>
<style scoped>
    .img{
        display: block;
        margin: 0 auto;
    }
</style>