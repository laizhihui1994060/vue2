<template>
    <div class="container-fluid">
        <!-- <router-view style='min-width:100%;min-height:100%;display:flex;flex-direction:column;'></router-view> -->
        <router-view style='min-width:100%;min-height:100%;'></router-view>
        <loading></loading>
    </div>
</template>

<script>
    import login from './components/login-forgetPasswotd/login.vue'
    import loading from './common_component/loading.vue'

    export default{
        components: {
            login,
            loading,

        }
    }
</script>

<style scoped>
    .container-fluid{
        height: 100%;
    }
</style>
