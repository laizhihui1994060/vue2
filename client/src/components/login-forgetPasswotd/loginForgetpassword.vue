<template>
    <div id='parentEl'>
        <login-nav></login-nav>
        <router-view></router-view>
    </div>
</template>

<script>

import loginNav from "./loginNav.vue";
    export default{
        components:{
            loginNav
        },
        data () {
            return {
            }
        },
    }



</script>
<style scoped>
    #parentEl{
        height: 100%;
        display: flex;
        flex-direction: column;
        min-height: 100px;
    }
</style>