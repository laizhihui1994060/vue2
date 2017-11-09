<template> 
    <div id="systemManagement">
        <div class="wrap_sidebar">
            <ul>
                <li v-if="serverURL(['systemSettings','accountConfiguration'])"> 
                    <router-link @click.native='addTwoParentCss' :to="{ path: '/LoginFinish/systemSettings/accountConfiguration'}" active-class='one_active'> 账户管理
                    </router-link>
                </li>
                <li class='corporateManagement twoLevel' >
                    <a href="javascript:;" @click='showCompany("corporateManagement")' :class="{'one_active':active == 'two_active'}">
                        公司设置
                    </a>
                    <ul>
                    <!--     <router-link active-class='two_active' @click.native='addTwoParentCss' tag='li' v-if="serverURL(['systemSettings','companyInformation'])" :to="{ path: '/LoginFinish/systemSettings/companyInformation'}"> 
                            <a>公司信息维护</a>
                        </router-link> -->

                        <router-link @click.native='addTwoParentCss' tag='li' v-if="serverURL(['systemSettings','corporateManagement'])" :to="{ path: '/LoginFinish/systemSettings/corporateManagement'}"  active-class='two_active' > 
                            <a>分公司管理</a>
                        </router-link>

                        <router-link @click.native='addTwoParentCss' tag='li' v-if="serverURL(['systemSettings','serialNumber'])" :to="{ path: '/LoginFinish/systemSettings/serialNumber' }" active-class='two_active'> 
                            <a>流水号</a>
                        </router-link>
                        
                        <router-link @click.native='addTwoParentCss' tag='li' v-if="serverURL(['systemSettings','departmentManagement'])" :to="{ path: '/LoginFinish/systemSettings/departmentManagement'}"  active-class='two_active' > 
                            <a>部门管理</a>
                        </router-link>
                    </ul>
                </li>
                <li class='vehicleSettings twoLevel' v-if="serverURL(['systemSettings','resucedCarManage'])">
                    <a href="javascript:;" @click='showCompany("vehicleSettings")' :class="{'one_active':active == 'three_active'}">
                        车辆管理
                    </a> 
                    <ul>
                        <router-link tag='li' @click.native='addTwoParentCss' :to="{ path: '/LoginFinish/systemSettings/rescueVehicle'}"  active-class='two_active' > 
                            <a>救援车型管理</a>
                        </router-link>
                        
                        <router-link tag='li' @click.native='addTwoParentCss' :to="{ path: '/LoginFinish/systemSettings/rescuedCar'}"  active-class='two_active' > 
                            <a>被救车型管理</a>
                        </router-link>
                    </ul>
                </li>
                <li class='rightsAllocation twoLevel' v-if="serverURL(['systemSettings','rightsAllocation'])">

                    <a href="javascript:;" @click='showCompany("rightsAllocation")' :class="{'one_active':active == 'two_active'}">
                        权限配置
                    </a>
                    <ul>
                            <router-link @click.native='addTwoParentCss' tag='li' v-if="serverURL(['systemSettings','rightsAllocation'])" :to="{ path: '/LoginFinish/systemSettings/rightsAllocation'}" active-class='two_active' >
                                <a>权限配置</a>
                            </router-link>
                       
                            <router-link @click.native='addTwoParentCss' tag='li' v-if="serverURL(['systemSettings','rightsAllocation'])" :to="{ path: '/LoginFinish/systemSettings/schemaConfiguration'}" active-class='two_active' >
                                <a>图表配置</a>
                            </router-link>
                    </ul>
                </li>
                <li  v-if="serverURL(['systemSettings','parameterSetting'])">
                    <router-link @click.native='addTwoParentCss' :to="{ path: '/LoginFinish/systemSettings/parameterSetting'}" active-class='one_active' > 参数设置
                    </router-link>
                </li>
                <li   v-if="serverURL(['systemSettings','homePanel']) && false">
                    <router-link @click.native='addTwoParentCss' :to="{ path: '/LoginFinish/systemSettings/homePanel'}" active-class='one_active' > 
                    首页面板管理
                    </router-link>
                </li>
                <li  v-if="serverURL(['systemSettings','quotationFormula'])">
                    <router-link @click.native='addTwoParentCss' :to="{ path: '/LoginFinish/systemSettings/quotationFormula'}" active-class='one_active' > 
                    报价公式维护
                    </router-link>
                </li>
                
                <li   v-if="serverURL(['systemSettings','auditLog']) && false">
                    <router-link @click.native='addTwoParentCss' :to="{ path: '/LoginFinish/systemSettings/auditLog'}" active-class='one_active'> 
                    审计日记
                    </router-link>
                </li>
                <li  v-if="serverURL(['systemSettings','smsBill']) && false">
                    <router-link @click.native='addTwoParentCss' :to="{ path: '/LoginFinish/systemSettings/smsBill'}" active-class='one_active'> 
                    短信账单
                    </router-link>
                </li>
                <li  v-if="serverURL(['systemSettings','phoneBill']) && false">
                    <router-link @click.native='addTwoParentCss' :to="{ path: '/LoginFinish/systemSettings/phoneBill'}" active-class='one_active' > 
                    话费账单
                    </router-link>
                </li>
                <li  v-if="serverURL(['systemSettings','registerAudit'])">
                    <router-link @click.native='addTwoParentCss' :to="{ path: '/LoginFinish/systemSettings/registerAudit'}" active-class='one_active' > 
                    注册审核
                    </router-link>
                </li>
                <li  v-if="serverURL(['systemSettings','tenant'])">
                    <router-link @click.native='addTwoParentCss' :to="{ path: '/LoginFinish/systemSettings/tenant'}" active-class='one_active' > 
                    租户信息
                    </router-link>
                </li>
                <li  v-if="serverURL(['systemSettings','photoTemplate'])">
                    <router-link @click.native='addTwoParentCss' :to="{ path: '/LoginFinish/systemSettings/photoTemplate'}" active-class='one_active' > 
                    拍照模板
                    </router-link>
                </li>
                <li class='extended twoLevel'>
                    <a href="javascript:;" @click='showCompany("extended")' :class="{'one_active':active == 'two_active'}">
                        扩展功能
                    </a>
                    <ul>
                        <router-link @click.native='addTwoParentCss' tag='li' v-if="serverURL(['systemSettings','smsTemplate'])" :to="{ path: '/LoginFinish/systemSettings/smsTemplate'}"  active-class='two_active' > 
                            <a>短信扩展</a>
                        </router-link>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="pull-left wrap_right">

<!--             <a  class="agotoHome iconfont-fanhui img" href="javascript:;" @click="returnHome"> 
            返回首页
            </a> -->
            <div id="right_content" style="padding-right:20px">
                <router-view></router-view>
            </div>
        </div>
    </div>
    

</template>

<script>



  export default {
    data(){
        return {
            active:''
        }
    },
    methods:{

        // 给二级菜单的父级添加样式
        addTwoParentCss(){
            const currentTarget = event.currentTarget;
            $('#systemManagement li a').removeClass('one_active');
            if(currentTarget.tagName == 'A'){ 
                $(currentTarget).addClass('one_active');
                $('#systemManagement .slide').removeClass('slide').find('ul').slideToggle();

                return ;
            }
            console.log($(currentTarget).parent().siblings('a'));
            $(currentTarget).parent().siblings('a').addClass('one_active');
        },

        //展开二级菜单    
        showCompany(sclass){

            //收起其他
            if( !$(event.target).parent().hasClass('slide') ){    //判断是否是原来的
                $('#systemManagement ul li ul').slideUp().parent().removeClass('slide');
                $('#systemManagement .'+ sclass + ' ul').slideToggle().parent().toggleClass('slide');
                console.log( $('#systemManagement .'+ sclass + ' ul').find('li a')[0] )
                $('#systemManagement .'+ sclass + ' ul').find('li a')[0].click();

            }
            
            
        },
        returnHome(){
            this.$router.push('/LoginFinish/' + ConfigPage.returnHome());
        },
        serverURL(url){
            return ConfigPage.isExist(url);
        }
    },
    mounted(){
        this.$nextTick(function(){
            // 刷新问题 
            $('#systemManagement .two_active').parent().slideToggle().parent().toggleClass('slide').children('a').addClass('one_active');

            const extendedLength = $('#systemManagement .extended > ul li').length;
            if(extendedLength < 1 ){
                $('#systemManagement .extended').hide();
            } 

            $('#systemManagement .twoLevel').each( function(index, ele){
                if($(ele).find('ul li').length == 0){
                    $(ele).hide();
                }
            })
        });
    }
  }
</script>

<style>
    #systemManagement{
        display: flex;
        flex: 1;
    }
    #systemManagement .modal{
        transition: all 0.2s;
    }
    #systemManagement article:after{
        width: 95%;
    }
    #systemManagement .groupBtn{
        width: 2rem;
        height: 22px;
        border: 1px solid rgb(23, 134, 247);
        color: rgb(23, 134, 247);
        line-height: 11px;
        text-align: center;
        background-color: #fff;
        padding: 0;
        font-size: 12px;
        background-color: #fff!important;
    }
    #systemManagement .btn-group .btn + .groupBtnx{
        width: 20px;
        height: 22px;
        border: 1px solid rgb(23, 134, 247);
        color: #999;
        line-height: 11px;
        text-align: center;
        background-color: #fff;
        padding: 0;
        font-size: 12px;
    }
    .btn-group .btn + .groupBtnx .caret{
        color: rgb(23, 134, 247);
        margin-left: 2px;
        margin-top: 8px
    }
    #systemManagement .setWidth{
        min-width: 80px;
    }
    .modal-header{
        text-align: center;
        border-bottom:none;
        font-size:18px;
    }
    .modal-content{
        border-radius:0;
    }
    .modal-body input{
        border-radius:0;
        border:none;
    }
    .modal-footer{
        border-top:none;
        text-align: center;
    }
    .modal-footer input[type='button']{
        border:1px solid rgb(23, 134, 247);
        margin:0 20px;
        font-size:14px;
        color:rgb(23, 134, 247);  
        background-color:#fff;
    }

    #systemManagement > .contain{
        flex:1;
    }
    #systemManagement .wrap_right{
        flex:1;
    }
    #systemManagement .container {
        overflow: hidden;
        background: #F4F4F4;
        padding: 0;
    }
    #systemManagement .wrap_sidebar{
        width: 180px;
        box-sizing: content-box;
        flex-basis:210px;        
    }
    #systemManagement ul li li a{
        font-size: 12px;
        transform: scale(0.9);
    }
    #systemManagement .wrap_sidebar ul li{
        width: 190px;
        min-height: 45px;
        border-bottom: 1px solid #e4e4e4;
        background: #fff
    }
    #systemManagement .wrap_sidebar ul a{
        display:block;
        width:100%;
        height:100%;
         
    }
    #systemManagement .wrap_sidebar ul .one_active{
        color: #1785F7;
        background: #f4f4f4
    }
    #systemManagement .wrap_sidebar .slide > a{
        color: #1785F7;
        background-color: transparent;
        position: relative;
    }
    #systemManagement .wrap_sidebar .slide > a:after{
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
    #systemManagement .wrap_sidebar .slide li{
        border-bottom: 1px solid #f6f6f6;
        background: #e0e0e0;
    }
    #systemManagement .wrap_sidebar .slide li:last-child{
        border-width: 0;
    }
    #systemManagement .wrap_sidebar ul li .two_active{
        background-color: #f4f4f4;
        color: #1785F7;
        position: relative;
    }
    #systemManagement .wrap_sidebar ul li .two_active a{
        color: #1785F7;
    }
    #systemManagement .wrap_sidebar ul li .two_active a:after{
        content: '';
        display: block;
        position: absolute;
        left: 72px;
        top: 21px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #1785F7;
    }
    #systemManagement .wrap_sidebar ul li a{
        line-height: 45px;
        font-size: 14px;
        color: #999999;
        font-weight: bold;
        display: inline-block;
        text-decoration:none ;
        padding-left: 70px
    }
    #systemManagement .wrap_sidebar .active{
        color: #333 ;
        border-bottom: 1px solid #333 ;
    }
    #systemManagement .agotoHome{
        width:80px;
        font-size: 12px;
        color: rgb(23, 134, 247);
        line-height: 12px;
        padding-left: 22px;
        margin-top: 24px;
        position: absolute;
        right: 17px;
    }
    #systemManagement #right_content {
        margin-top: 20px;
        min-height: 500px;
    }
    #systemManagement .vehicleSettings ul,
    #systemManagement .corporateManagement ul,
    #systemManagement .extended ul,
    #systemManagement .rightsAllocation ul{
        display:none;
    }
    #systemManagement .vehicleSettings ul li a,
    #systemManagement .corporateManagement ul li a,
    #systemManagement .extended ul li a,
    #systemManagement .rightsAllocation ul li a{
        font-size:12px;
        text-indent: 2em;
    }
    #systemManagement .operates{
        padding-right:0;
    }
    #systemManagement .operates .setWidth{
        width: 100px;
    }
    #systemManagement .operates .dropdown-menu{
        width:100%;
    }
    #systemManagement .operates .dropdown-menu li a{
        width:100%;
        text-align:center;
    }
    #systemManagement input[type='text']{
        font-size:12px;
    }

    #systemManagement .pages{
        margin-top:200px;
        float:right;
    }
    #systemManagement .pages button{
        position:relative;
        top:-5px;
        outline:none;
    }
    #systemManagement .pages .left{
        border:8px solid #f4f4f4;
        border-right-color:#999;

    }
    #systemManagement .pages .right{
        border:8px solid #f4f4f4;
        border-left-color:#999;
    }
    #systemManagement .pages .nowPage{
        display:inline-block;
        margin:0px 10px;
    }
    #systemManagement .pages .allPage{
        letter-spacing:5px;
    }
    #systemManagement input[type='button'],
    #systemManagement button{
        outline: none;
    }
    #systemManagement .add,
    #systemManagement .search,
    #systemManagement .vehicle_models{
        background-color: rgb(23, 134, 247);
        color: #fff;
        border: none;
        font-size: 12px;
        height:22px;
        min-width:82px;
        padding:0 10px;
        margin-right: 20px;
    }
    #systemManagement .time{
        background-color: #DCF4FC;
        padding-left:5px;
        cursor: pointer;
    }
    #systemManagement .form_datetime.time{
        box-sizing: border-box; 
        height: 22px;
    }
    #systemManagement .input-append .time,
    #systemManagement .form-group{
        display:inline-block;
    }

    #systemManagement .operate .btn{
        margin: 5px 15px;
        width: 72px;
        height: 24px;
        padding: 0;
        border:1px solid rgb(23, 134, 247);
        background-color:#fff !important;
        color:rgb(23, 134, 247);
    }
    
    #systemManagement .left-offet{
        margin-left: 30px
    }
   
</style>
