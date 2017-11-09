<template>
  
    <div class="container-fluid" id="rescueManagement">
        <div id="wrap_sidebar">
            <ul id="sidebar">
                <li  v-if="serverURL(['rescueManagement','orderanagement'])">
                    <router-link  to="/LoginFinish/rescueManagement/orderanagement">
                        订单管理
                    </router-link>
                </li>
                <li  v-if="serverURL(['rescueManagement','taskTrip'])">
                    <router-link  to="/LoginFinish/rescueManagement/taskTrip">
                        行程任务
                    </router-link>
                </li>
                <li v-if="serverURL(['rescueManagement','CurrentTask'])">
                    <router-link  to="/LoginFinish/rescueManagement/CurrentTask">
                        当前任务
                    </router-link>
                </li>
                <li v-if="serverURL(['rescueManagement','shareTask'])">
                    <router-link  to="/LoginFinish/rescueManagement/shareTask">
                        分享任务
                    </router-link>
                </li>
               <!--  <li  v-if="serverURL(['rescueManagement','OrderVisit'])">
                    <router-link  to="/LoginFinish/rescueManagement/OrderVisit">
                        订单回访
                    </router-link>
                </li> -->
            </ul>
            <!-- <history-search :search-items='searchItems'></history-search> -->
        </div>

        <div style="flex:1">
            <router-view></router-view> 
        </div>
    </div>

</template>

<script>

  export default {
    data(){
        return {
            searchItems: []
        }
    },
    events:{
        update(searchItems){
            this.searchItems = searchItems;
        }
    },
    methods:{
        serverURL(url){
            return ConfigPage.isExist(url);
        }
    }
  }
</script>

<style scoped>
    #rescueManagement{
        display: flex;
        flex: 1;
    }
    .container-fluid {
        flex: 1;
        padding-right: 20px !important;
    }
  
    #wrap_sidebar{
        overflow: hidden;
        width: 180px;
        flex-basis:210px;
    }
    #sidebar{
        width: 190px;
    }
    #sidebar li{
        width: 190px;
        height: 45px;
        background: #fff;
        border-top: 1px solid #f6f6f6

    }
    #sidebar li a{
        display: block;
        text-align: center;
        line-height: 45px;
        font-size: 14px;
        color: #999999;
        background: transparent;
        font-weight: bold;
    }

    .router-link-active{
        background: #f4f4f4 !important;
        color: #1785F7 !important;
    }
</style>
