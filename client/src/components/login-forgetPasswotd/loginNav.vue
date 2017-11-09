<template>
    <div id="loginNav">
        <nav class="nav" role="navigation">
            <div class="container">
                <div class="row">
                    <div class="col-xs-6">
                        <div class="header">
                            <a class="setHeight" href="#" style="padding-top:10px">
                                <img :src="config.logo" alt="" width="38" height='29'>
                            </a>
                            <span class="bar"></span>
                            <a class="setHeight header_right" href="#">
                                <h1 v-text="config.PlatformName + '　' + config.build"></h1>
                               <!--  <h2>广州网梭信息技术有限公司</h2> -->
                            </a>
                        </div>
                    </div>
                    <div class="col-xs-6" v-if="this.$route.fullPath != '/register'">
                        <router-link id="register" to="/register" class="pull-right img" style='padding-right: 30px;'>
                          企业注册入口
                        </router-link>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>

    export default{
        data(){
            return {
                config:config
            }
        },
        mounted(){
            const self = this;
            this.$nextTick(function(){
                console.log('~~~~~~~~~~',self.config.PlatformName)
                document.title = self.config.PlatformName;
            });
        }
    }
</script>

<style scoped>
    .img{
        display: inline-block;
    }
    #loginNav{
        position: relative;
        z-index:100;
    }
    .header{
        float: left
    }
    .bar{
        width: 1px;
        height: 28px;
        background-color: #999;
        float: left;
        margin-top: 10px;
    }
    .header h1{
        font-size: 22px;
        color: #ddd;
        line-height: 20px;
        margin: 0;
    }
    .header h2{
        font-size: 12px;
        color: #333333;
        margin: 0;
        line-height: 12px;
    }
    .setHeight{
        height: 46px;
        float: left;
        padding: 15px ;
        font-size: 18px;
        line-height: 20px;
    }
    .header_right{
        padding-top: 14px;
    }
    .container {
        /*min-width: 1170px !important;*/
    }
    nav{
        min-height: 46px;
        background-color: #333;
        position: relative;
    }
    #register{
        background-color: transparent;
        margin-top: 14px;
        color: #bbb;
        width: 132px;
        background-position: 95px -904px;
    }
</style>
