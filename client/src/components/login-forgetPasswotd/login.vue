<template>
    <div class="center">
        <div class="topContent">
            <history-version></history-version>
            <!-- 背景图 -->

            <div class='login-form'>
                <div class="center_left img out_bg"></div>
                
                <form class="form" v-if='!msgLogin'>
                    <div class="form-group">
                        <label class="control-label">账号</label>
                        <input type="text" class="form-control" placeholder="输入账号" v-model="user" id="user">
                    </div>
                    <div class="form-group">
                        <label class="control-label">密码</label>
                        <router-link tabindex='-1' class="pull-right forgetPassword" to="/forgetPass">忘记密码?</router-link>

                        <input type="password" class="form-control" placeholder="输入密码" v-model="pass" id="password">
                    </div>
                    <div class="form-group">
                        <label class="control-label">验证码</label>
                        <div>
                            <input type="text" class="form-control" id="verification" placeholder="输入右侧的验证码" v-model="code">
                            <img :src="src" alt="" @click="updataVerification">
                        </div>
                    </div>
                    <hr>
                    <div class="form-group">
                        <div class="col-sm-6" style="padding-left:0">
                            <checkbox 
                                text="记住密码" 
                                name="save_pass"
                                checked="checked"
                                labelRight="14px"
                                direction="left"
                                top='0px'
                                @updata="integrationDate"/>
                        </div>
                        <div class="col-sm-offset-2 col-sm-4" style="padding-right:0">
                            <button class="btn login  pull-right" @click.stop.prevent="login">登录</button>
                        </div>
                    </div>
                    <div class='form-group' style='margin-top:40px'>
                        <a href='javascript:;' style='font-size:16px; color:#39B6E5' @click='msgLogin = true'>短信快捷登录</a>
                    </div>
                </form>
                
                <!-- 短信登录 -->
                <form class="form" v-else>
                    <div class='form-group' style=''>
                        <a href='javascript:;' style='font-size:16px; color:#39B6E5' @click='msgLogin = false'> < 返回</a>
                    </div>
                    <div class="form-group">
                        <label class="control-label">账号</label>
                        <input type="text" class="form-control" placeholder="输入账号" v-model="user" id="user">
                    </div>
                    <div class="form-group">
                        <label class="control-label" style='display:block'>短信验证码</label>
                        <input  style='width:230px; ' class="form-control pull-left" placeholder="输入短信验证码" v-model="LoginCode" >
                        <button class="btn login  pull-right" style="height:34px" @click.stop.prevent='getLoginCode' >{{msgTxt}}</button>
                    </div>
    
                    <hr>
                    <div class="form-group" style='border-top:1px solid #ccc;padding-top:20px'>
                        <div class="col-sm-offset-2 col-sm-10" style="padding-right:0">
                            <button class="btn login  pull-right" @click.stop.prevent="useMsgLogin">登录</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="buttonCenter" v-if="isShow">
            <ul class="left">
                <li><h5>移动客户端</h5></li>
                <li v-if="QR_code.ios"><a href="javascript:;"  title="iPhone">快快 iPhone版</a></li>
                <li v-if="QR_code.andorid"><a href="javascript:;"  title="Android">快快 Android版</a></li>
                <li><a href="javascript:;"  title="watch">微信公众号</a></li>
            </ul>
            <ul class="pull-right">
                <li><h5>关注我们</h5></li>
                <li><a href="javascript:;">官方网站 :http://www.wshuttle.com</a></li>
                <li><a href="javascript:;">官方email :Support@wshuttle.com</a></li>
                <li><a href="javascript:;">官方手机号 :+86(20) 89052414</a></li>
            </ul>
            <div>
                <p><span>© Copyright by WShuttle Infotech Ltd, All Rights Reserved.</span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<span>粤ICP备16000208号</span></p>
                <div class="erweima"><img :src="srr" alt=""></div>
            </div>
        </div>
            <history-modal></history-modal>

    </div>
</template>

<script>
import loginNav from "./loginNav.vue";
import checkbox from "../../common_component/checkbox.vue";
import historyVersion from "./history_version.vue";
import historyModal from "./history_modal.vue";
import "../../../static/js/md5.js";         //md5


var YZM = parseInt(Math.random()*9000+1000);
    export default{
        mounted(){
            cookie.setCookie('USERID','nSR4zsRnbYZbWXKnAAAB',1);

            const self =this;

            this.$nextTick(function(){

                
                $('.buttonCenter .left a').hover(function(e) {
                    switch( e.target.getAttribute('title') ){
                        case 'iPhone':
                            self.srr = config.QR_code.ios;
                        break;
                        case 'Android':
                            self.srr = config.QR_code.andorid;
                        break;
                        case 'watch':
                            self.srr = '';
                        break;
                    };
                    $('.erweima').fadeIn(0);
                }, function() {
                    $('.erweima').fadeOut(0);
                });
            });
        },
        components:{
            loginNav,
            checkbox,
            historyVersion,
            historyModal,
        },
        data () {
            return {
                user:'',
                pass:'',
                save_pass:true, 
                code:'',
                YZM:YZM,
                srr:config.QR_code.ios,
                src:config.nodePath + '/verification/' + YZM,
                QR_code:config.QR_code,
                LoginCode: '',
                msgLogin: false,
                msgTxt: '获取验证码',
                second: 59,
                isShow:true
            }
        },
        created(){
            let OLDUSERPASS = cookie.getCookie('USERPASS') ? JSON.parse( cookie.getCookie('USERPASS') ) : '';
            if(OLDUSERPASS){
                this.user = OLDUSERPASS.u;
                this.pass = OLDUSERPASS.s;
            };

            this.updataVerification();
           
        },
        methods: {
            integrationDate(name,item){
                this.save_pass = item;
            },
            getLoginCode(){
                const self = this;
                const url = '/user/getLoginCode';
                const params = {
                    phone: self.user, 
                    type: 'LOGIN'
                }

                ajax('/user/getLoginCode', "POST", params, function(res, err){
                    console.log(res, err);
                    if(res.status == 200){
                        let timer = setInterval(function(){
                            self.msgTxt = `${self.second--}秒后重试`;
                            if(self.second == 0){
                                clearInterval(timer);
                                self.msgTxt = '获取验证码';
                                self.second = 59;
                            }
                        }, 1000);
                    }else{
                        alert(res.msg);
                    }
                })
            },
            useMsgLogin(){
                const self = this;
                const $loading = $('#main_loading');
                $loading.show();   // 展示蒙版loading
                ajax('/login', "POST", { sourceType: "WEB", code: self.LoginCode, name: self.user.trim() }, function(res, err){
                    if(res.status == 200){
                         self.loginSuccessed(res);
                    }else{
                        alert(res.msg);
                        $loading.hide();
                    }
                });
            },
            login(){

                if(   ($('#verification').val() != this.YZM )  ){
                    alert('验证码错误!');   
                    // this.YZM = parseInt(Math.random()*9000+1000);
                    // this.src = config.nodePath + '/verification/' + this.YZM;
                    this.updataVerification();
                    return
                } 

                var self = this;

                var param = {
                    name:self.user.trim(),
                    password:hex_md5(self.pass), 
                    sourceType:'WEB'
                }
                const $loading = $('#main_loading');
                $loading.show();   // 展示蒙版loading

                ajax('/login', "POST", param, function(res,err){
                    self.loginSuccessed(res);
                },function(err){
                    console.error(err);
                    alert(err.toString());
                    alert('服务器出错，请联系管理员');
                    $loading.hide();   // 展示蒙版loading
                }); 

            },
            updataVerification(){
                this.YZM = parseInt(Math.random()*9000+1000);
                // this.src = config.nodePath + '/verification/' + this.YZM;
                const self = this;
                var url = '/verification/' + this.YZM;

                $.ajax({
                    url: location.port == 8080  ? config.nodePath + url : url,
                    type: 'get',
                    success: function(res){
                        self.src = 'data:image/png;base64,' + res;
                    }
                });
            },
            loginSuccessed: function(res){
                console.log( res)
                const self = this;

                const $loading = $('#main_loading');

                if(res.status === 200){

                    const content = res.content[0];
                    console.log(content)

                    if(content.userType == 'CUSTOMER_CONTACT'){
                        $loading.hide();   // 展示蒙版loading
                        cookie.removeCookie('USERPASS');
                        return alert('此账号只能登录快快APP，不能登录网页。');
                    }

                    global.ourOrgId = content.orgId;
                    global.ourOrgName = content.company.name;
                    global.isAdmin = content.isAdmin;
                    // return console.log(send)
                    local.setItem('ROLES', res.content[0].roles);

                    cookie.setCookie('uid',content.uid,1);

                    self.save_pass ? cookie.setCookie('USERPASS',JSON.stringify({u:self.user,s:self.pass}),30) : cookie.removeCookie('USERPASS');

                    let systemSettings = ['accountConfiguration', 'companyInformation', 'corporateManagement', 'add_company_branch', 'serialNumber', 'departmentManagement', 'addDepartment', 'addCarStyle', 'rescuedCar', 'vehicleModels', 'rescuedAddCarStyle', 'rightsAllocation', 'parameterSetting', 'homePanel', 'quotationFormula', 'addFormula', 'auditLog', 'smsBill', 'phoneBill', 'photoTemplate', 'photoTemplate_add', 'smsTemplate', 'addSeriaNumber','grant_role', 'STOP_EMP', 'UPD_DEPT', 'STOP_DEPT', 'ADD_EMP', 'UPD_EMP',"schemaConfiguration" ]

                    if(content.isAdmin && content.company.code == 'wshuttle'){
                        systemSettings.push('registerAudit', 'tenant', 'resucedCarManage', 'rescueVehicle');
                    }
                        // 'chart',

                    var routePages = [ 
                        {'UnderSingle':['UnderSingle', 'dispatch_service_providers','accept_order','dispatch_org_car','check_order','dispatch_provider_driver','share_order_operator', 'showAllPlatformCars']}, 
                        {'rescueManagement':['orderanagement','taskTrip','CurrentTask','OrderVisit','taskTrip_add','shareTask','shareDetail','share_order','order_number_off']},
                        {'financialManagement':['accounting_order', 'accounting_order_business', 'account_statement', 'account_statement_check', 'account_statement_edit', 'account_statement_receipt_add', 'account_statement_payment_order', 'account_statement_invoice_register', 'accounts_payable', 'accounts_receivable',  'expenditure', 'expenditure_check', 'income', 'income_check', 'income_add', 'expenditure_add_modal', 'expenditure_write_off', 'invoice', 'invoice_check', 'invoice_book_add', 'invoice_book_add_record', 'invoice_receipt_record', 'invoice_returned_record', 'invoice_receipt', 'invoice_returned', 'reimbursement', 'reimbursement_add', 'collection_statistics']},
                        {'reportManagement':['employeeAchievement','clientAchievement', 'businessDailyReport','truckBusinessDailyReport','customerDailyReport','providerDailyReport','technicianMonthlyReport']},
                        {'companyManagement':['customer', 'customer_add', 'supplier', 'supplier_add', 'customer_contact_list', 'customer_contact_manager', 'employee', 'employee_add', 'turnover', 'turnover_leave', 'wageSetting', 'wageSetting_standard', 'salary', 'salary_reward', 'inVehicle', 'listVehicles', 'listVehicles_add', 'maintenance', 'maintenance_registration', 'accident', 'accident_registration', 'buyInsurance', 'annualRecord', 'annualRecord_add', 'registration', 'registration_add', 'weChat_contact_list', 'wechat_contact_manager'
                         , "query_verification","update_verification","query_insurance","update_insurance","query_pass","update_pass","query_repair","update_repair","calendar_index_notice"]},
                        {'systemSettings': systemSettings},
                        'isAdmin',

                        'add_branch_company_dept',
                        'add_branch_company_emp',
                        "chart",

                    ];
                     
                    var roles = [],
                        i = 0,
                        j = 0,
                        q = 0,
                        newRoutePages = [],
                        obj = [];

                    for(i =0 ; i<content.roles.length;i++){

                        for(j = 0;j<content.roles[i].operations.length;j++){
                            roles.push(content.roles[i].operations[j].routeCode, content.roles[i].operations[j].code);
                        }
                    };
                    roles.push('weChat_contact_list', 'wechat_contact_manager');  // 临时 公众号企业注册审核

                    if(content.isAdmin){
                        roles.push('rightsAllocation','grant_role','accountConfiguration','isAdmin','companyInformation','corporateManagement','add_company_branch','serialNumber','departmentManagement','addDepartment','employee','employee_add','parameterSetting',  'addSeriaNumber');
                    }
                    if(content.isAdmin && content.company.code == 'wshuttle'){
                        roles.push('registerAudit', 'tenant', 'resucedCarManage', 'rescueVehicle');
                    }
                    if(content.company.code == 'wshuttle'){
                        roles.push('showAllPlatformCars');
                    }

                    for(i =0 ;i<routePages.length;i++){

                        if(typeof routePages[i] == 'object'){

                            for(var k in routePages[i]){
                                obj = [];

                                for(q = 0;q<routePages[i][k].length;q++){
                                    for(j =0 ; j<roles.length;j++){
                                        if(roles[j] == routePages[i][k][q]){
                                            obj.push(roles[j]);
                                            let bool = false;
                                            switch(roles[j]){
                                                case 'income':
                                                    obj.push('income_check');
                                                    break;
                                                case 'expenditure':
                                                    obj.push('expenditure_check');
                                                    break;
                                                case 'rightsAllocation':
                                                    obj.push('schemaConfiguration');
                                                    break;
                                                case 'photoTemplate':
                                                    obj.push('photoTemplate_add');
                                                    break;
                                                case 'quotationFormula':
                                                    obj.push('addFormula');
                                                    break;
                                                case 'registration':
                                                    obj.push('registration_add');
                                                    break;
                                                case 'accounting_order_business':
                                                    bool = obj.some( (value, index) => {
                                                        if(value == 'accounting_order') return true;
                                                    });
                                                    if(!bool){
                                                        obj.pop();
                                                    }
                                                    break;
                                                case 'employee':
                                                    obj.push('employee_add');
                                                    break;
                                                case 'employee_add': 
                                                    bool = obj.some( (value, index) => {
                                                        if(value == 'employee') return true;
                                                    });
                                                    if(!bool){
                                                        obj.pop();
                                                    }
                                                    break;
                                                case 'customer_add': 
                                                    bool = obj.some( (value, index) => {
                                                        if(value == 'customer') return true;
                                                    });
                                                    if(!bool){
                                                        obj.pop();
                                                    }
                                                    break;
                                                case 'account_statement_receipt_add':
                                                    bool = obj.some( (value, index) => {
                                                        if(value == 'account_statement') return true;
                                                    });
                                                    if(!bool){
                                                        obj.pop();
                                                    }
                                                    break;
                                                case 'account_statement_invoice_register':
                                                    bool = obj.some( (value, index) => {
                                                        if(value == 'account_statement') return true;
                                                    });
                                                    if(!bool){
                                                        obj.pop();
                                                    }
                                                    break;
                                                case 'account_statement':
                                                    obj.push('account_statement_edit');
                                                    obj.push('account_statement_check');
                                                    break;
                                                case 'taskTrip':
                                                    obj.push('taskTrip_add');
                                                    obj.push('account_statement_check');
                                                    break;
                                                case 'rescueVehicle': 
                                                    obj.push('rescueVehicle');
                                                    obj.push('rescuedCar');
                                                    obj.push('rescuedAddCarStyle');
                                                    obj.push('vehicleModels');
                                                    break;
                                            }
                                        }
                                    }

                                }


                                if(obj.length){
                                    newRoutePages.push({
                                        [k]: obj
                                    });
                                }
                            }
                        }else{
                            for(j =0 ; j<roles.length;j++){
                                if(roles[j] == routePages[i])newRoutePages.push(roles[j])
                            }

                        }

                    }

                       if(content.roleCharts && content.roleCharts.length)newRoutePages.push('chart');
                        console.log( newRoutePages )

                        ConfigPage.dataSource( newRoutePages );///权限 new
                        self.isShow = false;
                        $loading.hide();   // 展示蒙版loading
                        self.$router.push({
                            path:'/LoginFinish/' + ConfigPage.returnHome(),
                        },function(){
                            bus.enableRemind = true;
                        });

                }else{
                    $loading.hide();   // 展示蒙版loading
                    cookie.removeCookie('USERPASS');
                    

                    this.updataVerification();
                    alert(res.msg);
                }
            }
        }
    }


</script>
<style scoped>
    .login-form{
        display: flex;
        justify-content: center;
        flex: 1;
    }
    .buttonCenter{
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        height: 190px;
        background-color: #333;
        flex-wrap: wrap;
        padding: 10px 100px 0 200px;

        /*test*/
        position: relative;
        z-index: 100;
    }
    .buttonCenter > ul:nth-child(1){
        align-self: flex-start;
        flex: 1;
    }
    .erweima{
        position: absolute;
        left: 309px;
        top: -212px;
        transform: scale(0.5);
        display: none;
    }
    .buttonCenter > ul:nth-child(1) li a:after{
        content: '';
        background: url('../../assets/erweima.png');
        position: absolute;
        right: -25px;
        top: 0;
        width: 16px;
        height: 16px;
    }
    .buttonCenter > ul:nth-child(2){
        align-self: flex-start;
        width: 300px;
    }
    .buttonCenter > ul > li{
        text-align: left
    }
    .buttonCenter > ul h5{
        font-size: 16px;
        color: #ddd;
        padding-bottom: 20px;
    }
    .buttonCenter > ul a{
        color: #bbb;
        display: inline-block;
        padding-bottom: 15px;
        text-decoration: none;
        position: relative;
    }
    .buttonCenter > ul a:hover{
        color: #ededed;
    }
    .buttonCenter > div{
        width: 100%;
        text-align: center;
        background-color: #000;
        color: #999;
        line-height: 45px;
        position: absolute;
        bottom: 0;
        left: 0;
    }
    .buttonCenter > div p {
        margin: 0;
    }
    .topContent{
        position: relative;
        display: flex;
        flex: 1;
        align-items: center;
    }
    .my_checkbox input[type='checkbox']{
        top:0px;
    }
    .center{
        display: flex;
        flex: 1;
        flex-direction: column
    }
    .center_right{
        width: 380px;
        height: 190px;
        margin-left:48px;
    }
    .form {
        background-color: #fff;
        padding: 42px 0;
    }
    .form-group{
        padding: 0 24px 10px 24px;

    }
    .form label{
        font-size: 14px;
        color: #999999;
        line-height: 14px;
        margin-bottom: 8px;
        font-weight: normal
    }
    .form .form-control{
        background: #FFFFFF;
        border: 1px solid #EEEEEE;
        -webkit-box-shadow:0 0 10px rgba(238, 238, 238, 1);  
        -moz-box-shadow:0 0 10px rgba(238, 238, 238, 1);  
        box-shadow:0 0 10px rgba(238, 238, 238, 1);  
        border-radius: 0;
        font-size: 14px;
        color: #999999;
        line-height: 14px;

    }
    .form .forgetPassword{
        font-size: 12px;
        color: #39B6E5;
        letter-spacing: 0px;
        line-height: 12px;
        text-decoration: none;
        margin-top: 4px;
    }
    .form .forgetPassword:hover{
        color: #03baff;
    }
    .form .text{
        margin: 0;
        display: inline-block;
        margin-left: 7px;
        font-size: 12px;
        color: #999999;
    }
 
    .form .login{
        font-size: 14px;
        color: #FFFFFF;
        line-height: 14px;
        border-radius: 0;
        background: #39B6E5;
        box-shadow:0 0 10px rgba(0, 204, 204, .5);  
        padding: 8px 24px;
    }

    #verification{
        display: inline-block;
        width: 230px;
        margin-right: 10px;
    }
</style>