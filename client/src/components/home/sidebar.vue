<template>
    <div id="wrap_box">
        <div class="setborderBg">
            <div class="row">
                <div class="col-xs-10 col-xs-offset-1">
                    <div>
                        <ul class="nav nav-pills" role="tablist">
                            <li  v-if="serverURL(['UnderSingle'])">
                                <router-link to="/LoginFinish/UnderSingle">
                                  下单
                                </router-link>
                            </li>
                            <li  v-if="serverURL(['rescueManagement'])">
                                <router-link to="/LoginFinish/rescueManagement">
                                  救援管理
                                </router-link>
                            </li>
                            <li  v-if="serverURL(['financialManagement'])">
                                <router-link to="/LoginFinish/financialManagement">
                                  财务管理
                                </router-link>
                            </li>
                            <li  v-if="serverURL(['companyManagement'])">
                                <router-link to="/LoginFinish/companyManagement">
                                  公司管理
                                </router-link>
                            </li>
                            <li  v-if="serverURL(['reportManagement'])">
                                <router-link to="/LoginFinish/reportManagement">
                                  报表管理
                                </router-link>
                            </li>
                            <li  v-if="serverURL(['chart'])">
                                <router-link to="/LoginFinish/chart">
                                    业务鹰眼
                                </router-link>
                            </li>
                        </ul>
<!--                         <div class="serverInput pull-right">
                            <div class="input-group">
                                <input type="text" class="form-control"  placeholder="输入搜索地址">
                                <a href="javascript:;" class="input-group-addon">
                                    <span class="glyphicon glyphicon-search"></span>
                                </a>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
        <router-view @delectMsg="delectMsg"></router-view>
    </div>
</template>

<script>
    export default {
        created(){
            ConfigPage.updatePage();
            
        },
        components:{
        },
        data(){
            return{
            }
        },
        methods:{
            serverURL(url){
                return ConfigPage.isExist(url);
            },
            delectMsg(type){
                this.$emit('delectMsg', type);
            }
        }
    }
</script>
<style scoped>
    #wrap_box{
        margin: 0 auto;
        position: relative;
    }
    .setborderBg{
        background-color: #fff;
    }

    .center-block{
        padding-top: 4px;
    }
    .nav-pills{
        float: left;
    }
    .nav-pills > li > .router-link-active{
        color: #1786f7;
        font-weight: bold;
        font-size: 15px;

    }
  
    .nav-pills > li{
        padding: 0 30px;
    }
    .nav-pills > li:nth-child(1){
        padding-left: 0
    }
    .nav-pills > li > a{
        padding: 10px 0;
        color: #000 ;
        font-size: 14px;
        line-height: 14px;
        border-bottom: 3px solid #fff;
        border-radius: 0;
        background: #fff
    }

    .nav-pills > li > .active, .nav-pills > li > .active:hover, .nav-pills > li > .active:focus{
        color: #1786f7;
        border-bottom: 3px solid #1786f7;
    }
    .nav-pills > li> a:hover, .nav-pills > li > a:hover, .nav-pills > li > a:focus{
        color: #1786f7;
        border-bottom: 3px solid #1786f7;

    }
    #wrap_box .serverInput  .form-control{
        border-radius: 0;
        border: 1px solid #39B6E5 ;
        height: 27px;
        width: 194px;
    }
    .serverInput {
        padding-top: 5px;
        box-sizing: border-box
    }
    .input-group{
        width: 230px;
    }
    .input-group-addon{
        background-color: #39B6E5 ;
        border-width: 0;
        padding: 3px 10px;
        border-radius: 0
    }
    .glyphicon-search{
        color: #fff;
        font-size: 16px
    }
    .row{
        margin: 0;
    }

</style>