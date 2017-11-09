<template>
    <div id="companyManagement">
        <div class='nav'>
            <ul class="nav nav-pills nav-stacked" role="tablist" id="list_nav">
                <li>
                    <a href="javascript:;" @click='toggle'>往来单位</a>
                    <ul>
                        <router-link tag="li" to="/LoginFinish/companyManagement/customer"
                        v-if="serverURL(['companyManagement','customer'])">
                            <a>客户</a>
                        </router-link>
                        <router-link tag="li" to="/LoginFinish/companyManagement/supplier"
                        v-if="serverURL(['companyManagement','supplier'])" >
                            <a>服务商</a>
                        </router-link>
                        
                    </ul>
                </li>
                <li >
                    <a href="javascript:;" @click='toggle'>注册审核</a>
                    <ul>
                        <router-link tag="li" to="/LoginFinish/companyManagement/customer_contact_list"
                        v-if="serverURL(['companyManagement','customer_contact_list'])" >
                            <a style='font-size:12px;'>4S店员工</a>
                        </router-link> 
                        <router-link tag="li" to="/LoginFinish/companyManagement/weChat_contact_list"
                        v-if="serverURL(['companyManagement','weChat_contact_list'])" >
                            <a style='font-size:12px;'>公众号企业用户</a>
                        </router-link> 
                    </ul>
                </li>
                <li >
                    <a href="javascript:;" @click='toggle'>员工管理</a>
                    <ul>
                        <router-link tag="li" to="/LoginFinish/companyManagement/employee"
                        v-if="serverURL(['companyManagement','employee'])" >
                            <a>员工信息</a> 
                        </router-link>
<!--                         <router-link tag="li" to="/LoginFinish/companyManagement/turnover"
                        v-if="serverURL(['companyManagement','turnover'])" >
                            <a>离职信息</a>
                        </router-link>
                        <router-link tag="li" to="/LoginFinish/companyManagement/wageSetting"
                        v-if="serverURL(['companyManagement','wageSetting'])" >
                            <a>工资设定</a>
                        </router-link>
                        <router-link tag="li" to="/LoginFinish/companyManagement/salary"
                        v-if="serverURL(['companyManagement','salary'])" >
                            <a>工资奖惩</a>
                        </router-link>
 -->                </ul>
                </li>  
                <li>
                    <a href="javascript:;" @click='toggle'>车辆管理</a>
                    <ul>
<!--                         <router-link tag="li" to="/LoginFinish/companyManagement/inVehicle"
                        v-if="serverURL(['companyManagement','inVehicle'])" >
                            <a>车辆通览</a>
                        </router-link> -->
                        <router-link tag="li" to="/LoginFinish/companyManagement/listVehicles"
                        v-if="serverURL(['companyManagement','listVehicles'])" >
                            <a>车辆列表</a>
                        </router-link>
<!--                         <router-link tag="li" to="/LoginFinish/companyManagement/maintenance"
                        v-if="serverURL(['companyManagement','maintenance'])" >
                            <a>维修登记</a>
                        </router-link>
                        <router-link tag="li" to="/LoginFinish/companyManagement/accident"
                        v-if="serverURL(['companyManagement','accident'])" >
                            <a>事故记录</a>
                        </router-link>
                        <router-link tag="li" to="/LoginFinish/companyManagement/buyInsurance"
                        v-if="serverURL(['companyManagement','buyInsurance'])" >
                            <a>保险记录</a>
                        </router-link>
                        <router-link tag="li" to="/LoginFinish/companyManagement/annualRecord"
                        v-if="serverURL(['companyManagement','annualRecord'])" >
                            <a>年审记录</a>
                        </router-link> -->
                        <router-link tag="li" to="/LoginFinish/companyManagement/registration"
                        v-if="serverURL(['companyManagement','registration'])" >
                            <a>驻车地管理</a>
                        </router-link>
                    </ul>
                </li>
            </ul>
        </div>
        <div class='content'>
           <router-view></router-view>
        </div>
    </div>
</template>

<script>



    export default {
        data(){
            return {

            }
        },
        methods:{
            toggle(event){
                const currentTarget = $(event.currentTarget);
                const currentBoolean = currentTarget.hasClass('active_a');

                if(!currentBoolean){
                    $('#companyManagement .nav li').find('.active_a').removeClass('active_a').siblings('ul').slideUp();
                    currentTarget.addClass('active_a');
                    currentTarget.parent().find('ul').slideToggle();
                    currentTarget.parent().find('ul').find('li a')[0].click();
                }
                
            },
            serverURL(url){
                return ConfigPage.isExist(url);
            }
        },
        mounted(){
            
            $('#list_nav > li').each(function(index, ele){
                const $ele = $(ele);
                if($ele.find('ul li').length < 1){
                    $ele.hide();
                }
            });

            $('#companyManagement .nav li .router-link-active').parent().slideDown().siblings('a').addClass('active_a');


        }
    }
</script>

<style>
    #companyManagement .modal-header{
        text-align: center;
        font-size:18px;
    }
    #companyManagement{
        min-height: 600px;
        overflow:hidden;
        display: flex;
        flex: 1;
    }
    #companyManagement article:after{
        /*width:90.5%;*/
    }
    #companyManagement .nav{
        width:180px;
        color:#999 !important;
        text-align:center;
        font-size:14px;
        float:left;
        flex-basis:210px;        
    }
    #companyManagement .nav > li{   
        
    }
    #companyManagement .nav li{
        margin:0;
        font-weight:bold;
        padding:0;
        cursor:pointer;
        background: #fff;
        border-top: 1px solid #f6f6f6     
    }
  
    #companyManagement .nav li > ul{
        display:none;
    }
    #companyManagement .nav li > ul > li {
        background: #f6f6f6;
        font-weight:200;
    }
     #companyManagement .nav li > ul > li > a{
        font-size: 12px;
        color: #999999;
        background: #e0e0e0;
     }
    #companyManagement .nav li > ul > li.router-link-active a{
        position:relative;
        font-size: 14px;
        color:  #1785F7;
        font-weight: bold;
        background: transparent;
    }
    #companyManagement .nav li > ul > li.router-link-active a:after{
        content:'';
        display:inline-block;
        position:absolute;
        top:20px;
        left:40px;
        width: 4px;
        height: 4px;
        background: #1785F7;
        border-radius: 2px;
    }
    #companyManagement .nav > li > a.active_a{
        color:  #1785F7;
    }
    #companyManagement .nav > li > a.active_a:after {
        content: "";
        display: inline-block;
        position: absolute;
        top: 18px;
        left: 150px;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 8px solid #1785F7;


    }

    #companyManagement .nav li a{
        display:inline-block;
        width:100%;
        height:45px;
        line-height:45px;
        padding:0;
        text-decoration:none;
        text-align: center;
        font-size: 14px;
        background: transparent;
        

    }
    #companyManagement .nav a:link,.companyManagement .nav a:visited{
        color:#999;
    }
    #companyManagement td a{
        color: #337ab7 !important;
    }
    #companyManagement .content{
        flex: 1;
        padding-right: 20px;
    }
    /*bootstrap*/   


    /* 通用 */
    #companyManagement .add,
    #companyManagement .export{
        margin-right: 14px;
        margin-left:5px;

    }
    #companyManagement .setting{
        background: #F6F6F6;
        border: 1px solid #39B6E5;
        color: #000;
        padding: 5px 6px;
        height: auto;

    }
    #companyManagement .modal-footer{
        position: static;
    }
</style>