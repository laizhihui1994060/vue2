<template>
    <div class="container-fluid" id="reportManagement">
        <div class="wrap_sidebar">
            <ul class="sidebar">
                <!-- <li>
                    <router-link  to="/LoginFinish/reportManagement/cashAccount">
                        现金流水
                    </router-link>
                </li> -->
                <li  v-if="serverURL(['reportManagement','employeeAchievement'])">
                    <router-link  to="/LoginFinish/reportManagement/employeeAchievement">
                        员工业绩表
                    </router-link>
                </li>
                <li  v-if="serverURL(['reportManagement','clientAchievement'])">
                    <router-link  to="/LoginFinish/reportManagement/clientAchievement">
                        客户业绩表
                    </router-link>
                </li>

                <li   v-if="serverURL(['reportManagement','businessDailyReport'])">
                    <router-link  to="/LoginFinish/reportManagement/businessDailyReport">
                        营业额日报表
                    </router-link>
                </li>

                <li   v-if="serverURL(['reportManagement','truckBusinessDailyReport'])">
                    <router-link  to="/LoginFinish/reportManagement/truckBusinessDailyReport">
                        单车日报表
                    </router-link>
                </li>


                <li   v-if="serverURL(['reportManagement','customerDailyReport'])">
                    <router-link  to="/LoginFinish/reportManagement/customerDailyReport">
                        客户日报表
                    </router-link>
                </li>

                <li   v-if="serverURL(['reportManagement','providerDailyReport'])">
                    <router-link  to="/LoginFinish/reportManagement/providerDailyReport">
                        服务商日报表
                    </router-link>
                </li>

                <li   v-if="serverURL(['reportManagement','technicianMonthlyReport'])">
                    <router-link  to="/LoginFinish/reportManagement/technicianMonthlyReport">
                        技师月报表
                    </router-link>
                </li>
                <!-- <li>
                    <router-link  to="/LoginFinish/reportManagement/visitReport">
                        回访报表
                    </router-link>
                </li>
                <li>
                    <router-link  to="/LoginFinish/reportManagement/orderShare">
                        订单分享
                    </router-link>
                </li>
                <li>
                    <router-link  to="/LoginFinish/reportManagement/businessIncome">
                        营业收入
                    </router-link>
                </li> -->
            </ul>
        </div>
        <div class="container-fluid">
            <router-view></router-view>
        </div>
    </div>

</template>

<script>
  
    export default {
     
        methods: {
            serverURL(url){
               return ConfigPage.isExist(url);
            }
        }
    }

</script>

<style scoped>
    #reportManagement{
        display: flex;
        flex:1;
    }
    .container-fluid {
        flex: 1;
        overflow: hidden;
        padding-right: 10px !important;
    }
    #CompanySetting{
        background: #fff;
    } 
    .wrap_sidebar{
        width: 180px;
        flex-basis:210px;
        overflow: hidden;
    }
    .sidebar{
        float: left;
    }
    .sidebar li{
        width: 190px;
        height: 45px;
        background: #fff;
        border-top: 1px solid #f6f6f6;
        
    }
    .sidebar li a{
        display: block;
        text-align: center;
        line-height: 45px;
        font-size: 14px;
        color: #999999;
        font-weight: bold;
        

    }
    .sidebar li a:visited{
        text-decoration: none
    }
    .sidebar2{
        width: 190px;
        float: left;
        background: #fff;
    }
    .sidebar2 li{
        width: 190px;
        height: 45px;
        border-top: 1px solid #f6f6f6;
    }
    .sidebar2 li a{
        display: block;
        text-align: center;
        line-height: 45px;
        font-size: 14px;
        color: #999999;
        background: #fff;
        font-weight: bold;

    }
    .sidebar3{
        width: 190px;
        float: left;
        background: #fff;
    }
    .sidebar3 li{
        width: 190px;
        height: 45px;
        border-top: 1px solid #f6f6f6;
    }
    .sidebar3 li a{
        display: block;
        text-align: center;
        line-height: 45px;
        font-size: 14px;
        color: #999999;
        background: #fff;
        font-weight: bold;

    }
        .sidebar4{
        width: 190px;
        float: left;
        background: #fff;
    }
    .sidebar4 li{
        width: 190px;
        height: 45px;
        border-top: 1px solid #f6f6f6;
    }
    .sidebar4 li a{
        display: block;
        text-align: center;
        line-height: 45px;
        font-size: 14px;
        color: #999999;
        background: #fff;
        font-weight: bold;

    }
   .setborderBg{
    background-color: #fff
   }
    .router-link-active{
        background: #f4f4f4 !important;
        color: #1785F7 !important;
    }
</style>
