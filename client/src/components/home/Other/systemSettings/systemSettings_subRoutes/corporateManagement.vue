<template>
    <div class='corporate_management' id="corporate_management">

        <div class='container main'>
            <div class="row">
                <div class="left col-xs-3">
                    <ul>
                        <li class='main_company_li'>
                            <p @click.stop='choose(index)' style="line-height:14px;"><i class='icon img'></i>{{companies.name}}</p>
                            <menubar v-if='companies.child && companies.child.length > 0' :items='companies.child'></menubar>
                        </li>
                    </ul>
                </div>

                <div class="company col-xs-9" style="width:75%">

                    <router-link tag='button' :to = "{ name: 'add_company_branch', params: { id: chosen.sysOrgId } }" class="link-go">
                        添加子公司
                    </router-link>

                    <div class="row">
                        <div class="col-xs-8">
                            <h4 class="text-center" v-text="chosen.name"></h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6 col-lg-5">
                            <form-label-input 
                                label="公司简称" 
                                input-width="180px"
                                name="name"
                                :after="true"
                                :disabled="disabled"
                                @updata="integrationDate"
                                :value="chosen.name"/>
                        </div>
                        <div class="col-xs-6 col-lg-5">
                            <form-label-input 
                                label="公司名称" 
                                input-width="180px"
                                name="fullname"
                                :after="true"
                                :disabled="disabled"
                                @updata="integrationDate"
                                :value="chosen.fullname"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6 col-lg-5">
                           <btn-select 
                                url='client:/helper/emp'
                                method='post'
                                :params='empParams'
                                :updataKey='updataKey'
                                filter="empName"
                                filterName='empId'
                                :uuid='true'
                                field='empId'
                                :value='chosen.chargePersonId'
                                width='180px'
                                name="chargePersonId" 
                                @updata="integrationDate"   
                                padding='0' 
                                label="负&nbsp;&nbsp;责&nbsp; 人"
                                :disabled='disabled' />
                        </div>
                        <div class="col-xs-6 col-lg-5">
                            <form-label-input 
                                label="联系电话" 
                                input-width="180px"
                                name="chargePersonPhone"
                                :after="true"
                                type='number'
                                :disabled="disabled"
                                @updata="integrationDate"
                                :value="chosen.chargePersonPhone"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6 col-lg-5">
                            <checkbox 
                                :checked='chosen.independentAccountingUnit' 
                                :disabled='disabled' 
                                label-right="12px"
                                text="独立核算"
                                name='independentAccountingUnit' 
                                @updata="integrationDate"></checkbox>
                           
                        </div>
                        <div class="col-xs-6 col-lg-5">
                            <form-label-input 
                                label="结算银行" 
                                input-width="180px"
                                name="bankName"
                                :disabled="disabled"
                                @updata="integrationDate"
                                :value="chosen.bankName"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6 col-lg-5">
                            <form-label-input 
                                label="账号户名" 
                                input-width="180px"
                                name="bankAccountName"
                                :disabled="disabled"
                                @updata="integrationDate"
                                :value="chosen.bankAccountName"/>
                           
                        </div>
                        <div class="col-xs-6 col-lg-5">
                            <form-label-input 
                                label="银行账号" 
                                input-width="180px"
                                name="bankAccountCode"
                                :disabled="disabled"
                                @updata="integrationDate"
                                :value="chosen.bankAccountCode"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6 col-lg-5">
                            <form-label-input 
                                label="税务登记" 
                                input-width="180px"
                                name="taxId"
                                :disabled="disabled"
                                @updata="integrationDate"
                                :value="chosen.taxId"/>
                        </div>
                    </div>
                    <div class="row">
                    <div class="col-xs-12">
                        <form-label-input  
                            label='公司地址' 
                            :disabled="disabled"
                            inputWidth='12rem'
                            :after="true"
                            name='address'
                            :value='chosen.address'
                            :data-toggle='!disabled ? "modal" : "" ' 
                            data-target='#model_map' />

                    </div>
                    </div>
                    <div class="btns row" style="margin-top:60px;">
                        <div class="col-xs-10">
                            <button class="btn radius-btn"  @click='modify'>修改</button>
                            <button class="btn radius-btn" data-toggle='modal' data-target='#invoice_register'  @click='deleteCompany'>删除</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <model-map text='设为公司地址'></model-map>

    </div>
</template>

<script>
import checkbox from '../../../../../common_component/checkbox.vue'
import btnSelect from '../../../../../common_component/btn_select.vue'
import menubar from '../components/menubar.vue'
import modelMap from '../../../../../common_component/model_map.vue'
import formLabelInput from '../../../../../common_component/form-label-input.vue'
    export default {
        data() {
            return {
                disabled: true,
                companies: {},
                chosen:{
                    sysOrgId: '11',
                    chargePersonInfo:{
                        empName: ''
                    }
                },
                chosenLi: '',
                isEdit: false,
                current:{},
                empParams: {
                    sysOrgId: global.ourOrgId
                },
                updataKey: 1,
            }
        },
        methods: {
            integrationDate(name, item){
                this.chosen[name]= item;
                console.log(name, item);    
            },
            choose(index){
                const _this = this;
                $('.corporate_management .li_active').removeClass('li_active');

                $(event.target).siblings('ul').slideToggle();


                $(event.target).parent().addClass('li_active');
                // 获取该公司的详细信息
                send({
                    url: 'client:/org/' + _this.companies.orgId,
                    type: 'get'
                }, function(err, res){
                    if(res.status == 200){
                        _this.empParams = {
                            sysOrgId: _this.companies.orgId
                        };
                        _this.updataKey++;

                        _this.chosen = res.content[0];
                        console.log(_this.chosen)
                    }else{
                        alert(res.msg + ', 获取公司信息失败！请联系管理员!')
                    }
                });
            },
            modify(){
                if(this.disabled)return this.disabled = false;

                // 向后端传入数据，更改  修改分公司信息
                const _this = this;

                let bool = false;

                $('#corporate_management').find('[verify="true"]').each(function(index,el){

                    el.style.backgroundColor = '#DFF5FD';
                    if(!el.innerHTML && !el.value){
                        el.style.backgroundColor = 'rgba(255, 0, 0, 0.26)';
                        bool = true;
                    }
                });

                if(bool)return alert("请完善数据");

                this.disabled = true;
                console.log(_this.chosen)
                delete _this.chosen['branchType']
                delete _this.chosen['defaultParkingLotId']
                if(!_this.chosen["chargePersonId"]) delete _this.chosen["chargePersonId"];
                // 修改数据
                console.log(_this.chosen)
                send({
                    url: 'client:/org/' + _this.chosen.sysOrgId,
                    type: 'put',
                    param: _this.chosen
                }, function(err, res){
                    console.log(err,res)
                    if(res.status == 200){
                        alert(res.msg, 'success');
                        _this.updata(_this.chosen.sysOrgId);
                    }else{
                        console.info(res);
                        alert(res.msg)
                    }
                })
            },
            deleteCompany(){
                const _this = this;

                // 停用分公司
                console.log(this.chosen)
                confirm(`确定删除"${this.chosen.name}"公司吗?`, function(){
                    send({
                        url: 'client:/org/' + _this.chosen.sysOrgId,
                        type: 'delete'
                    }, function(err, res){
                        if(res.status == 200){
                            alert(res.msg, 'success');
                            _this.updata(global.ourOrgId);
                        }else if( res.status == 412 ){
                            alert(res.msg);
                        }else{
                            alert(res.msg);
                        }
                    })
                }, true)
            },
            esc(){
                const vm = this;
                this.disabled = true;
                $('.corporate_management .operate, .corporate_management .model_map').css('display', 'none');
                $('.corporate_management .company input[type="text"]').each(function(value, ele){
                    const name = $(ele).attr('name');
                    $(ele).val(vm.chosen[name])
                });
            },
            updata(orgId){
                    const _this = this;
                    send({
                        url: 'client:/org/' + ourOrgId + '/org',
                        type: 'get'
                    }, function(err, res){
                        _this.companies = res.content[0];    // 树状
                        // 马上获取该公司详细信息
                        send({
                            url: 'client:/org/' + orgId,
                            type: 'get'
                        }, function(err, res){
                            console.log(res);
                            if(res.status == 200){
                                if(res.content.length >= 1){
                                    _this.chosen = res.content[0];
                                }else{
                                    _this.chosen = _this.companies;
                                }
                            }else{
                                alert(res.msg + ', 获取公司信息失败！请联系管理员!')
                            }
                            
                        })
                    })
            }
        },
        created(){
            const _this = this;

            if(global.ourOrgId){
                _this.updata(global.ourOrgId);
            }else{
                var time = setInterval(function(){
                    if(global.ourOrgId){
                        clearInterval(time);
                        _this.updata(global.ourOrgId);
                    }
                }, 500);
            }

            /*
             *  后台获取数据
             */

            // 获取分公司列表
        },

        mounted(){
            const _this = this;
            bus.$on('chooseCompany', function(chosenObj, index){   
                // 获取该公司的详细信息
                _this.chosenLi = chosenObj.name;

                send({
                    url: 'client:/org/' + chosenObj.orgId,
                    type: 'get'
                }, function(err, res){
                    console.log(res.content[0])

                    if(res.status == 200){
                        _this.empParams = {
                            sysOrgId: res.content[0].sysOrgId
                        };
                        console.log(_this.empParams)
                        _this.chosen = res.content[0];
                        _this.updataKey++;
                    }else{
                        alert(res.msg ? res.msg : '获取公司信息失败! ');
                    }
                })
            });

            bus.$on('updataAdress' , function (type,item,provincial) {

                const longitude = item.Longitude;
                _this.chosen.address = item.address;
                _this.chosen.lng = longitude.split(',')[0];
                _this.chosen.lat = longitude.split(',')[1];
                $('#model_map').modal('hide')
            });

        },
        components:{
            menubar,
            checkbox,
            modelMap,
            btnSelect,
            formLabelInput
        },
    }
</script>

<style>
    .link-go{
        position: absolute;
        right: 5%;
        top: 24px;
        color: rgb(23, 134, 247);
        font-size: 12px;
        border: 1px solid rgb(23, 134, 247);
        text-align: center;
        background: #fff;
        line-height: 12px;
        padding: 6px 12px;
    }
    .corporate_management .company{
        border-left: 1px solid #c9c9c9;
        padding-top: 25px;
        padding-bottom: 25px;
        height: auto;
        padding-left: 50px;
    }

    .company h4{
        margin: 42px 0;
        margin-top: 0;
        margin-left: -45px;

    }
    .company .col-xs-6{
        margin-bottom: 10px;
    }

    .corporate_management p i.icon{
        display: inline-block;
        width:14px;
        height: 15px;
        margin-left:2px;
        height:10px;
        width:8px;
        background-position:0 -57px;
    }
    .corporate_management .main_company_li > p > i.icon{
        height:15px;
        width:14px;
        background-position:0 -249px;
        margin-right:5px;
    }
    .corporate_management .branch_company_li > p > i.icon{
        height:13px;
        width:14px;
        background-position:0 -194px;
        position: relative;
        top:2px;
        margin-right:5px;

    }
    .corporate_management .col-xs-10 button:nth-child(1){
        margin-right: 60px;
    }
    .corporate_management .dropdown-menu{
        padding:0;
    }
    .corporate_management .my_checkbox input{
        width:195px;
    }
    .corporate_management article{
        padding-bottom:24px;
        border-bottom:1px solid #d4d4d4;
        margin:0;
        margin-bottom:10px;
        float:none;
        font-size:14px;
        color:#000;
    }
    .corporate_management article:after{
        display: none;
    }
    .corporate_management .childrenLi{
        font-size:12px;
        list-style: none;  
    }
    .corporate_management ul{
        margin: 0;  
        padding: 10px 0 0 10px;
    }
    .corporate_management ul .childrenLi {  
        list-style: none;  
        position: relative; 
        padding-bottom: 5px;
    }
    .corporate_management ul .childrenLi ul{
        display: none;
    }

    .corporate_management ul p i.downUp{

        padding:3px 2px;
        display: inline-block;
        height:6px;width:8px;
        background-position:0 -73px;
        background-repeat: no-repeat;
        float:right;
        position: relative;
        top:5px;
        vertical-align: center;
    }
    .corporate_management ul  p i.up{
        height:6px;
        width:8px;
        background-position:0 -51px;
    }
    /*main*/
    .corporate_management ul .main_company_li > p > i.downUp{
        height:6px;
        width:8px;
        background-position:0 -79px;
    }
    .corporate_management ul .main_company_li > p > i.up{
        height:6px;
        width:8px;
        background-position:0 -39px;
    }
    /*branch*/
    .corporate_management ul .branch_company_li > p > i.downUp{
        height:6px;
        width:8px;
        background-position:0 -33px;
    }
    .corporate_management ul .branch_company_li > p > i.up{
        height:6px;
        width:8px;
        background-position:0 -67px;
    }
    .corporate_management ul .childrenLi:before {  
        position: absolute;  
        content: '';  
        top: -5px;  
        left: -10px;  
        width: 10px;  
        height: 15px;  
        border-style: none none solid solid;  
        border-width: 2px; 
        border-color:#c9c9c9;
    }
    .corporate_management ul .childrenLi:last-child:before{
        border-style: none none solid solid;
        top:-10px;
        height:20px;
    }
    .corporate_management ul .childrenLi:not(:last-child):after {  
        position: absolute;  
        content: '';  
        top: -10px;  
        left: -10px; 
        bottom: 0;  
        border-style: none none none solid;  
        border-width: 2px;
        border-color:#c9c9c9;
    }  

    .corporate_management .main{
        margin-top:40px;
        background: #fff !important;
        padding: 0 25px !important;
        margin-left: 0;
        width: 100%;
    }
    .corporate_management .main .left{
        overflow: hidden;
        transition:all 1s ;
    }
    .corporate_management .main .left > ul{
        padding:20px;
    }

    .corporate_management .main .left > ul > li{
        min-width:180px;
    }
    .corporate_management .main .left > ul > li  ul{
        width:95%;
        margin-left:9px;
    }

    .corporate_management .main .left ul li p{
        cursor: pointer;
        margin: 0;
    }
    .corporate_management .main .left ul .li_active > p{
        background: #DFF5FD;
    }

</style>