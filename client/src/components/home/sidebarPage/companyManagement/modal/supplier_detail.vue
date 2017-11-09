<template> 
    <div id="supplier_add" class='child_page'>
        <breadcrumb
            :arr="[{path:'/LoginFinish/companyManagement/supplier',text:'服务商'},{path:'',text:isCreate ? '添加服务商' : '查看服务商'}]"/>

        <article style="cursor:pointer;" @click='showDetails($event)'>
            服务商信息<span class='img up' style='display: inline-block;position: relative; left:10px;top:-2px'></span>
        </article> 
        <div class='details'>
            <div class="details-body" id="customerInfo">
                <div>
                    <div class="row">
                        <div class="col-xs-4">
                            <form-label-input 
                                label='公司简称'  
                                name='name'
                                :after="true"
                                :value='chosen.name'
                                @updata='integrationData'
                                :disabled='disabled'
                                inputWidth='200px' />
                        </div>
                        <div class="col-xs-4">
                            <form-label-input 
                                label='公&nbsp;&nbsp;司&nbsp;全&nbsp;称' 
                                :after="true"
                                name='fullname' 
                                :value='chosen.fullname'
                                @updata='integrationData'
                                :disabled='disabled'
                                inputWidth='200px' />
                        </div>
                        <div class="col-xs-4">
                            <form-label-input 
                                label='拼音缩写' 
                                name='pinyin' 
                                :value='chosen.pinyin'
                                @updata='integrationData'
                                :disabled='disabled' 
                                inputWidth='200px' />
                        </div>
                        
                    </div>
    
                    <div class="row">
                        <div class="col-xs-4">
                            <btn-select  
                                label='归属员工' 
                                label-right='12px'
                                url='client:/helper/emp'
                                method='post'
                                filter='empName'
                                :after="true"
                                filterName='empId'
                                width='200px'
                                btnWidth='0.5rem'
                                :uuid='true'
                                field='empId'
                                :value='chosen.hrEmployeeIdOwner'
                                name="hrEmployeeIdOwner" 
                                @updata='integrationData'
                                :disabled='disabled'
                                padding='0'/>
                        </div>
                        <div class="col-xs-4">
                            <btn-select 
                                label='结&nbsp;&nbsp;算&nbsp;方&nbsp;式' 
                                label-right='12px'
                                width='200px'
                                btnWidth='0.5rem'
                                url='control:/sys/param/org'
                                method='post'
                                :params="[ '/order/settle_method' ]"
                                :after="true"
                                filter="desc"
                                filterName='code'
                                name="settlementMethod"
                                :uuid='true'
                                field='code'
                                :value='chosen.settlementMethod'
                                @updata='integrationData'
                                :disabled='disabled'
                                padding='0'/>
                        </div>
                        <div class="col-xs-4">
                            <form-label-input 
                                label='银行户名' 
                                name='bankName'
                                :value='chosen.bankName'
                                @updata='integrationData'
                                :disabled='disabled'
                                inputWidth='200px'/>
                        </div>
                    </div>

                    <div class="row">
                        
                        <div class="col-xs-4">
                            <form-label-input 
                                label='银行账号' 
                                inputWidth='200px'
                                name='bankAccountCode'
                                @updata='integrationData'
                                :disabled='disabled'
                                :value='chosen.bankAccountCode'/>
                        </div>
                        <div class="col-xs-4" v-if='!isCreate'>
                            <btn-select 
                                label='服务商状态' 
                                label-right='12px'
                                :arr="partnerStatusArr"
                                :updataKey='updataKey'
                                filter="name"
                                filterName='code'
                                :after="true"
                                :uuid='true'
                                field='code'
                                :value='chosen.partnershipStatus'
                                width='200px'
                                btnWidth='0.5rem'
                                name="partnershipStatus" 
                                @updata='integrationData'
                                :disabled='partnershipStatusDisabled || disabled'
                                padding='0'/>
                        </div>
                        <div class="col-xs-4">
                            <form-label-input 
                                label='税务登记' 
                                @updata='integrationData'
                                :disabled='disabled'
                                :value='chosen.taxId'
                                inputWidth='200px'
                                name='taxId'/>
                        </div>
                    </div>
                    <div class="row">
                        
                        <div class="col-xs-4">
                            <form-label-input 
                                label='公司邮箱' 
                                inputWidth='200px'
                                name='email'
                                @updata='integrationData'
                                :disabled='disabled'
                                :value='chosen.email'/>
                        </div>
                        <div class="col-xs-4">
                            <btn-select  
                                label='服务商类型' 
                                label-right='12px'
                                width='200px'
                                btnWidth='0.5rem'
                                url='control:/sys/param/org'
                                method='post'
                                :params="[ '/customer/customer_types' ]"
                                filter='desc'
                                filterName='code'
                                name="companyType" 
                                :after="true"
                                :uuid='true'
                                field='code'
                                :value='chosen.companyType'
                                @updata='integrationData'
                                :disabled='disabled'
                                padding='0' />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-4">
                            <btn-select  
                                label='车辆类型' 
                                label-right='12px'
                                width='200px'
                                btnWidth='0.5rem'
                                url='client:/helper/vehiclecat'
                                filter='name'
                                filterName='code'
                                name="vehicleCategory" 
                                :uuid='true'
                                field='code'
                                :value='chosen.vehicleCategory'
                                @updata='integrationData'
                                :disabled='disabled'
                                padding='0' />
                        </div>
                        <div class="col-xs-4">
                            <btn-select  
                                label='车&nbsp;&nbsp;辆&nbsp;品&nbsp;牌' 
                                label-right='12px'
                                width='200px'
                                btnWidth='0.5rem'
                                url='client:/helper/brand?pageSize=100&pageIndex=1&vendorCode='
                                filter='name'
                                filterName='code'
                                name="vehicleBrand" 
                                :uuid='true'
                                field='code'
                                :value='chosen.vehicleBrand'
                                @updata='integrationData'
                                :disabled='disabled'
                                padding='0' />
                        </div>
                    </div>
                    <div class="row">
                         <div class="col-xs-12 address">
                            <form-label-input  
                                label='公司地址' 
                                :after="true"
                                inputWidth='17rem'
                                name='address'
                                @updata='integrationData'
                                :disabled='disabled'
                                :value='chosen.address'
                                :data-toggle='!disabled ? "modal" : "" ' 
                                data-target='#model_map' 
                                 />
                            <a v-if='!disabled' href="javascript:;" class="toggle_point map" data-toggle='modal' data-target='#model_map' >
                                <span class='point img' alt="" style='display: inline-block;position: relative;top:5px'></span>
                            </a>
                        </div>
                    </div>

                 <!--    <div class="billing_company">

                        <div>
                            <div class="row" >
                                <div class="col-xs-12">
                                    <btn-select  
                                        label='开票公司' 
                                        label-right='12px'
                                        width='200px'
                                        btnWidth='0.5rem'
                                        :url="'client:/invoice/company/partner/123' + id"
                                        filter='name'
                                        filterName='code'
                                        name="companyName" 
                                        :value='chosen.companyName'
                                        @updata='collectBilling_company'
                                        :disabled='disabled'
                                        padding='0' />     
                                    <span class="inline-close"  v-for="(it,index) in billing_company" :disabled='disabled'>{{it}}<i @click="removeBilling_company(index)"></i></span>
                                </div>
                            </div>
                        </div>
                    </div> -->

                    <div class="serviceItem">
                        <div>
                            <div class="row" >
                                <div class="col-xs-12">
                                    <btn-select
                                        label='服务项目'
                                        label-right='12px'
                                        url='client:/helper/job'
                                        filter="name"
                                        :after="true"
                                        width='200px'
                                        maxHeight='120px'
                                        name="serviceItem" 
                                        :index='index'
                                        :disabled='disabled'
                                        title='请选择服务项目'
                                        @updata='collectServiceItem' />
                                    <span class="inline-close"  v-for="(it,index) in serviceItem">{{it.name}}<i @click="removeServerItem(index)"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row"></div>
                    <div style='margin:10px 0;'>
                        <div class="row">
                            <div class="col-xs-4">
                                <checkbox name='needApproveOnOrdersIn' @updata='integrationData' text='需要审核' :checked="chosen.needApproveOnOrdersIn" :disabled='disabled' labelRight='10px'></checkbox>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div class="btns details-footer">
                <button type="button" class="btn radius-btn" @click="addModifyPartnerInfo">{{ !disabled ? '保存' : '修改' }}</button>
            </div>
        </div>

        <template v-if='hasPartnerId'>
            <article style="cursor:pointer;" @click='showDetails($event)'>
                添加联系人<span class='img up' style='display: inline-block;position: relative; left:10px;top:-2px'></span>
            </article>
            <div class="details"  id="contactInfo">
                <div class="details-body">
                     <div class='contact' style="position: relative;">
                        <span style='margin-right:3px;vertical-align:top;color:rgb(102, 102, 102);' class="contact">联&nbsp;&nbsp;系&nbsp;人&nbsp;&nbsp;</span>
                        <div style='display: inline-block'>
                            <div v-if='!ContactsDisabled' style="float:left;margin-right:10px">
                                <span class='add img input'  style="cursor: pointer; display:inline-block; position:relative; top: 5px;" @click='addContacts'></span>
                            </div>
                            <div style="float:left">
                                <div class="row" style='margin-top:0;position: relative;' v-for='(item,index) in contact'>
                                    <div class="col-xs-2">
                                        <input
                                            style='' 
                                            placeholder='名字'
                                            v-model='item.name'
                                            verify="true"
                                            :disabled='ContactsDisabled'
                                            name='name'/>
                                    </div>
                                    <div class="col-xs-2">
                                        <input
                                            style='margin-right:10px' 
                                            placeholder='昵称'
                                            v-model='item.nickname'
                                            verify="true"
                                            :disabled='ContactsDisabled'
                                            name='nickname'/>
                                    </div>
                                    <div class="col-xs-2">
                                        <input
                                            style='margin-right:10px' 
                                            placeholder='手机号码'
                                            v-model='item.mobile'
                                            verify="true"
                                            phone='true'
                                            :disabled='ContactsDisabled'
                                            name='mobile'/>
                                    </div>
                                    <div class="col-xs-2">
                                        <input
                                            type='email'
                                            style='margin-right:10px' 
                                            placeholder='邮箱'
                                            v-model='item.email'
                                            :disabled='ContactsDisabled'
                                            name='email'/>
                                    </div>
                                    <div class="col-xs-2">
                                        <input
                                            style='margin-right:10px' 
                                            placeholder='qq'
                                            v-model='item.qq'
                                            verify="true"
                                            :disabled='ContactsDisabled'
                                            name='qq'/>
                                    </div>
                                    <div class="col-xs-2">
                                        <input
                                            style='margin-right:10px' 
                                            placeholder='微信'
                                            v-model='item.weChat'
                                            :disabled='ContactsDisabled'
                                            name='weChat'/>
                                    </div>
                                    <a  v-if='!ContactsDisabled' href="javscript:;"  class="delete" @click="deleteContact(item,index)">
                                        <span class='delete img'></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div class="btns details-footer"  style="margin-top:20px">
                    <button type="button" class="btn radius-btn" @click="addModifyContacts">{{ContactsText}}</button>
                </div>
            </div>

            <article style="cursor:pointer;" @click='showDetails($event)'>
                报价公式<span class='img up' style='display: inline-block;position: relative; left:10px;top:-2px'></span>
            </article>
            <div class="details">
                <div class="details-body">
                    <div>
                        <div>
                            <div class='row'>
                                <div class="col-xs-3">
                                    <span>公式名称</span>
                                </div>

                                <div class="col-xs-9">
                                    <span>报价公式</span>
                                </div>
                            </div>
                            <template v-for='(item, index) of quotation_formula'>
                                
                                <div class='row closeParent'>
                                    <span v-if='!formulaDisabled' class='delete img close' @click='removeFormula(index)'></span>
                                    <div class="col-xs-3">
                                        <btn-select 
                                            label-right='12px'
                                            url="control:/quota/quota/list/query" 
                                            method='post'
                                            :params="{ pageSize:10000, pageIndex:1 }"
                                            filter="name"
                                            width='100px'
                                            :index='index'
                                            @updata='integrationQuota'
                                            name="quotation_formula"
                                            :disabled='formulaDisabled'
                                            :title = 'item.name'
                                            padding='0'/>
                                    </div>
                                    <div class="col-xs-9">
                                        <p style='background:#ccc;min-width:200px;min-height:24px;padding:2px 5px'>{{item.pricingFormulaChinese}}</p>
                                    </div>
                                </div>
                                
                            </template>
                            <div class="row" >
                                <div v-if='!formulaDisabled' class='col-xs-4'>
                                    <span class='add img input'  style="cursor: pointer; display:inline-block; position:relative; top: 5px;" @click='addQuota'></span>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <hr />
                <div class="btns details-footer"  style="margin-top:20px">
                    <button type="button" class="btn radius-btn" @click="addModifyFormula">{{formulaText}}</button>
                </div>
            </div>
            
            <article style="cursor:pointer;" @click='showDetails($event)'>
                照片模板<span class='img up' style='display: inline-block;position: relative; left:10px;top:-2px'></span>
            </article>
            <div class="details">
                <div class="details-body">
                    <div>
                        <div>
                            <div class='row'>
                                <div class="col-xs-3">
                                    <span>模板名称</span>
                                </div>
                                <div class="col-xs-9">
                                    <span>模板描述</span>
                                </div>
                            </div>
                            <template v-for='(item, index) of template_photo'>
                                <div class='row closeParent'>
                                <span v-if='!templatePhotoDisabled' class='delete img close' @click='removeTemplatePhoto(index)'></span>
                                    <div class="col-xs-3">
                                        <btn-select 
                                            label-right='12px'
                                            url="control:/photo_template/org" 
                                            filter="templateName"
                                            width='100px'
                                            :index='index'
                                            @updata='getTemplate_photo'
                                            name="photo_template"
                                            :disabled='templatePhotoDisabled'
                                            :title = 'item.templateName'
                                            filterArr='active'
                                            maxHeight='200px'
                                            padding='0'/>
                                    </div>
                                    <div class="col-xs-9">
                                        <p style='background:#ccc;min-width:200px;min-height:24px;padding:2px 5px'>{{item.templateDesc}}</p>
                                    </div>
                                </div>
                                
                            </template>
                            <div class="row" >
                                <div v-if='!templatePhotoDisabled' class='col-xs-4'>
                                    <span class='add img input'  style="cursor: pointer; display:inline-block; position:relative; top: 5px;" @click='addTemplate_photo'></span>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <hr />
                <div class="btns details-footer"  style="margin-top:20px">
                    <button type="button" class="btn radius-btn" @click="addModifyTemplatePhoto">{{templatePhotoText}}</button>
                </div>
            </div>
        </template>



        <model-map text='设为公司地址'></model-map>
    </div>
</template>
<script>
import btnSelect from '../../../../../common_component/btn_select.vue'
import breadcrumb from '../../../../../common_component/breadcrumb.vue'
import formLabelInput from '../.././../../../common_component/form-label-input.vue'
import getData from "../../../../../../static/js/getData.js"
import modelMap from '../../../../../common_component/model_map.vue'
import checkbox from '../../../../../common_component/checkbox.vue'
    export default{
        data () {
            return {
                partnershipStatusDisabled: true,
                partnerStatusArr: [ { name: '解除伙伴关系', code: 'BROKEN' },  { name: '我的服务商', code: 'MY_SERIVCE_PROVIDER' }, { name: '是对方的服务商', code: 'PEERS_SERVICE_PROVIDER' }, { name: '双方的服务商', code: 'PARTNER' } ],
                updataKey: 1,
                hasPartnerId: false,
                chosen: {
                    address: '',
                    needApproveOnOrdersIn:false
                },
                quotation_formula: [],
                template_photo: [],
                isCreate: true,
                res: {
                    isCustomer: false, 
                    isServiceProvider: true,
                    isPartner: false,
                    isActive: true,
                    serviceItem: [],
                    // billing_company: []
                },
                disabled: false,
                serviceItem: [],
                // billing_company:[],
                contact:[{
                    name: '',
                    nickname: '',
                    mobile: '',
                    email: '',
                    qq: '',
                    weChat: ''
                }],
                formulaDisabled: true,
                formulaText: '修改',
                removeFormulaArr: [],
                templatePhotoDisabled: true,
                templatePhotoText: '修改',
                removePhotoArr: [],
                removeContactArr: [],
                ContactsText:'修改',
                ContactsDisabled:true,
                id: ''
            }
        },
        created(){
            const _this = this;
            this.isCreate = this.$route.params.isCreate.toString() === 'true';
            if(global.ourOrgId){
                updata();
            }else{
                var timer = setInterval(function(){
                    if(global.ourOrgId){
                        clearInterval(timer);
                        updata();
                    }
                }, 500);
            }

            function updata(){
                if(_this.isCreate){
                    _this.addModifyPartnerInfo = _this.addPartnerInfo;

                }else{
                    _this.hasPartnerId = true;
                    _this.addModifyPartnerInfo = _this.modifyPartnerInfo;
                    _this.disabled = true;
                    _this.id = _this.$route.params.chosen;
                    

                    // 获取服务商信息
                    let getPartnerInfo = () => {
                        return new Promise( (resolve, reject) => {
                            send({
                                url: 'client:/partner/' + _this.id,
                                type: 'get'
                            }, function(err, res){
                                console.log(res);
                                resolve();
                                if(res.status == 200){
                                    _this.chosen = res.content[0];

                                    // 未建立的伙伴关系不能更改
                                    if(_this.chosen.partnershipStatus !== 'NONE'){
                                        _this.partnershipStatusDisabled = false;  
                                    }else{
                                        _this.partnerStatusArr.push({ name: '未建立', code: 'NONE'  });
                                        console.log(_this.partnerStatusArr)
                                        _this.updataKey++;
                                    }
                                    
                                    _this.res = res.content[0];
                                    delete _this.res['gps'];
                                    if( res.content[0].gps)_this.res['lng'] = res.content[0].gps.x;
                                    if( res.content[0].gps)_this.res['lat'] = res.content[0].gps.y;
                                    send({
                                        url: 'client:/helper/job',
                                        type: 'get'
                                    }, function(err, res){
                                        if(res.status == 200){
                                            if(_this.chosen.serviceItem){
                                                _this.chosen.serviceItem.forEach( (value, index) => {
                                                    res.content.some( (obj, index) => {
                                                        if(value == obj.code){
                                                            _this.serviceItem.push(obj);
                                                            return true;
                                                        }
                                                    } )
                                                });
                                            }
                                            
                                        }
                                    }) 
                                }else{
                                    // 找不到伙伴信息
                                    alert(res.msg);
                                }
                            });
                        })
                    } 

                    // 获取服务商报价
                    let getPartnerFormula = () => {
                        return new Promise( (resolve, reject) => {
                            send({
                                url: 'control:/quota/quota/list/querypartnerquotation',
                                type: 'post',
                                param:{
                                    sysPartnerId: _this.id
                                }
                            }, function(err, res){
                                resolve();
                                _this.quotation_formula = res.content;
                            })
                        })
                    }

                    // 获取联系人
                    let getPartnerContact = () => {
                        return new Promise( (resolve, reject) => {
                            send({
                                url: 'client:/partner/' + _this.id + '/contact',
                                type: 'get'
                            }, function(err, res){
                                resolve();
                                console.log(res);
                                if(res.status == 200){
                                    _this.contact = res.content;
                                }else if(res.status == 404){
                                    _this.contact = [];
                                }else{
                                    console.log(res);
                                    alert(res.msg)
                                }
                            })
                        })
                    }
                
                    // // 获取开票公司
                    // let getPartnerCompany = () => {
                    //     return new Promise( (resolve, reject) => {
                    //         send({
                    //             url: 'finance:/invoice/company/partner/' + _this.id,
                    //             type: 'get'
                    //         }, function(err, res){
                    //             let arr = res.content.map( (obj, index) => {
                    //                 return obj.companyName;
                    //             });
                    //             _this.billing_company = arr;
                    //             _this.res.billing_company = arr;
                    //             resolve();
                    //         })
                    //     })
                    // }

                    // 获取服务商拍照模板
                    let getPartnerPhoto = (id) => {
                        return new Promise( (resolve, reject) => {
                            send({
                                url: 'control:/photo_template/org/partner/list',
                                type: 'post',
                                param: [_this.id]
                            }, function(err, res){
                                if(res.status == 200){
                                    _this.template_photo = res.content[0].template.map( (obj, index) => {
                                        obj.partnerId = _this.id;
                                        return obj;
                                    });
                                }
                            })
                        })
                    }

                    let mainGetInformation = () => {
                        let promises = [getPartnerInfo(), getPartnerFormula(), getPartnerContact(), getPartnerPhoto()];
                        return Promise.all(promises);
                    }

                    mainGetInformation();
                    // getPartnerInfo().then(getPartnerFormula).then(getPartnerContact).then(getPartnerPhoto());
                }
            }

            
        },
        mounted(){
            const _this = this;
            bus.$on('updataAdress', function(type, addressObj, details){
                const arr = addressObj.Longitude.split(',');
                _this.res.lng = arr[0];
                _this.res.lat = arr[1];
                _this.res.address = _this.chosen.address = addressObj.address;
                for(let key in details){
                    _this.res[key] = details[key];
                };

                $('#model_map').modal('hide')

            });
        },
        methods:{
            // 上传修改操作
            addModifyPartnerInfo(){},
            addPartnerInfo(){
                // 收集
                const _this = this;

                var bool = true;

                $('#customerInfo').find('[verify="true"]').each(function(index,el){

                    el.style.backgroundColor = '#DFF5FD';
                    if(!el.innerHTML && !el.value){

                        el.style.backgroundColor = 'rgba(255, 0, 0, 0.26)';
                        bool = false;
                    }
                });


                if(bool){
                    //提交到后端
                    console.log(_this.res)

                    send({
                        url: 'client:/partner',
                        type: 'post',
                        param: _this.res
                    }, function(err, response){
                        if(response.status == 200){
                            _this.id = response.content[0].id;
                            _this.hasPartnerId = true;
                            _this.addModifyPartnerInfo = _this.modifyPartnerInfo;
                            _this.updatePartnerInfo();
                            _this.disabled = true;
                            alert('添加服务商成功', 'success');
                        }else{
                            alert(response.msg);
                        }
                    })

                }else{
                    alert('某些资料不能为空')
                }
            },
            modifyPartnerInfo(){
                   // 收集
                const _this = this;

                if(this.disabled)return this.disabled = false;

                var bool = true;

                $('#customerInfo').find('[verify="true"]').each(function(index,el){

                    el.style.backgroundColor = '#DFF5FD';
                    if(!el.innerHTML && !el.value){

                        el.style.backgroundColor = 'rgba(255, 0, 0, 0.26)';
                        bool = false;
                    }
                });
                console.log(_this.res)
                if(bool){
                    //提交到后端
                    send({
                        url: 'client:/partner/' + _this.id,
                        type: 'put',
                        param: _this.res
                    }, function(err, response){
                        if(err)return alert('服务器出错，请联系管理员');
                        if(response.status == 200){
                            console.log(response);
                            _this.disabled = true;
                            alert('修改服务商信息成功', 'success');
                        }else{
                            alert(response.msg);
                            console.log(response);
                        }
                    });
                   
                }else{
                    alert('某些资料不能为空')
                }
            },
            updatePartnerInfo(){
                const _this = this;
                send({
                    url: 'client:/partner/' + _this.id,
                    type: 'get'
                }, function(err, res){
                    console.log(res);
                    
                    if(res.status == 200){
                        _this.chosen = res.content[0];
                        _this.res = res.content[0];
                        delete _this.res['gps'];
                        if( res.content[0].gps)_this.res['lng'] = res.content[0].gps.x;
                        if( res.content[0].gps)_this.res['lat'] = res.content[0].gps.y;
                        // 服务项目
                        send({
                            url: 'client:/helper/job',
                            type: 'get'
                        }, function(err, res){

                            if(res.status == 200){
                                if(_this.chosen.serviceItem){
                                    _this.chosen.serviceItem.forEach( (value, index) => {
                                        res.content.some( (obj, index) => {
                                            if(value == obj.code){
                                                _this.serviceItem.push(obj);
                                                return true;
                                            }
                                        } )
                                    });
                                }
                                
                            }
                        }) 
                    }
                });
            },
            
            addModifyFormula(){
                const _this = this;
                if(this.formulaDisabled){
                    this.formulaDisabled = false;
                    this.formulaText = '保存';
                }else{
                    let promise = new Promise( (resolve, reject) => {
                        // 删除
                        let length = 0;
                        if(_this.removeFormulaArr.length > 0){
                            _this.removeFormulaArr.forEach( (obj, index) => {
                                send({
                                    url: 'control:/quota/partnerquota',
                                    type: 'delete',
                                    param: obj
                                }, function(err, res){
                                    if(res.status != 200){
                                        alert('修改失败'); 
                                        reject();
                                    }
                                    if(++length == _this.removeFormulaArr.length) resolve()
                                })
                            })
                        }else{
                            resolve();
                        }  
                    });


                    // 添加
                    promise.then( () => {
                        let bool = true;
                        _this.quotation_formula.forEach( (obj, index) => {
                            if(!obj.hasOwnProperty('sysPartnerId')){
                                if(obj.sysQuotationId){
                                    send({
                                        url: 'control:/quota/partnerquota',
                                        type: 'post',
                                        param: {
                                            sysPartnerId: _this.id,
                                            sysQuotationId: obj.sysQuotationId,
                                            active: true
                                        }
                                    }, function(err, res){
                                        if(res.status == 200){
                                            _this.formulaText = '修改'
                                        }else{
                                            bool = false;
                                            alert(res.msg ? res.msg : '修改失败，请联系管理员!');
                                        }
                                    });
                                }
                                
                            }
                        });
                        if(bool){
                            alert('修改成功', 'success'); 
                            _this.formulaText = '修改';
                            this.formulaDisabled = true;
                        }
                        $('#supplier_add button[name="quotation_formula"]').each(function(index, ele){
                            if(!$(ele).text()){
                                $(ele).parentsUntil('.closeParent').parent().remove();
                            }
                        });
                    })
                }
            }, 
            updateContacts(){
                const _this = this;
                send({
                    url: 'client:/partner/' + _this.id + '/contact',
                    type: 'get'
                }, function(err, res){
                    console.log(res);
                    if(res.status == 200){
                        _this.contact = res.content;
                    }else if(res.status == 404){
                        _this.contact = [];
                    }else{
                        alert(res.msg)
                    }
                });
            },
            addModifyContacts(){
                const _this = this;
                if(this.ContactsDisabled){
                    this.ContactsDisabled = false;
                    this.ContactsText = '保存';
                }else{
                    
                    var bool = true, isPhone = true;

                    // 手机号码
                    $('#contactInfo').find('[phone="true"]').each(function(index,el){

                        el.style.backgroundColor = '#DFF5FD';

                        const patt = new RegExp(/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|3|5|6|7|8]|18[0|1|2|3|5|6|7|8|9])\d{8}$/);

                        if( !patt.test(el.value) ){

                            el.style.backgroundColor = 'rgba(255, 0, 0, 0.26)';
                            isPhone = false;
                        }
                    });

                    if(!isPhone){
                        alert('请输入正确的手机号码');
                        return ;
                    }

                    $('#contactInfo').find('[verify="true"]').each(function(index,el){

                        el.style.backgroundColor = '#DFF5FD';
                        if(!el.innerHTML && !el.value){

                            el.style.backgroundColor = 'rgba(255, 0, 0, 0.26)';
                            bool = false;
                        }
                    });
                    


                    if(bool){
                        // 删除联系人
                        
                        _this.removeContactArr.forEach( (id, index) => {
                            send({
                                type:"delete",
                                url:'client:/partner/' + _this.id + '/' + id,
                              },function(err,res){
                                if(err)return alert('服务器出错，请联系管理员');
                                if(res.status != 200){
                                    alert('删除联系人失败');
                                }
                            });
                        });

                        console.log(_this.contact)
                        
                        let hasContactIdArr = [], noContactIdArr = [];

                        _this.contact.forEach( (obj, index) => {
                            if(obj.contactId){
                                hasContactIdArr.push(obj);
                            }else{
                                noContactIdArr.push(obj);
                            }
                        });
                        // 修改
                        hasContactIdArr.forEach( (obj, index) => {
                            send({
                                type: 'put',
                                url: 'client:/partner/' + _this.id + '/' + obj.contactId,
                                param: obj
                            }, function(err, res){
                                console.log(res);
                                if(err)return alert('服务器出错，请联系管理员');
                                if(res.status != 200){
                                    alert(' 修改联系人失败');
                                }
                            })
                        })

                        // 添加
                        if(noContactIdArr.length){
                            console.info(noContactIdArr)
                            send({
                                type:'post',
                                url:'client:/partner/' + _this.id + '/contact',
                                param: noContactIdArr
                            },function(err,res){
                                if(err)return alert('服务器出错，请联系管理员');
                                if(res.status == 200){
                                    console.log(res);
                                    _this.updateContacts();
                                    _this.ContactsText = '修改';
                                    _this.ContactsDisabled = true;
                                }else{
                                    console.log(res);
                                    alert(res.msg);
                                }
                            });
                        }else{
                            _this.ContactsDisabled = true;
                        }
                    }else{
                        alert('请完善信息');
                    }
                }
            },
            deleteContact(item, index){
                const self = this;
                // 把要删除的保存起来
                if(item.contactId){
                    this.removeContactArr.push(item.contactId);
                }
                self.contact.splice(index,1);
                
            },
            removeFormula(index){
                const obj = this.quotation_formula[index];
                if(obj.hasOwnProperty('sysPartnerId')){
                    // 把要删除的保存起来
                    this.removeFormulaArr.push({
                        sysQuotationId: obj.sysQuotationId,
                        sysPartnerId: obj.sysPartnerId
                    });
                }
                this.quotation_formula.splice(index, 1);
            },
            removeTemplatePhoto(index){
                const obj = this.template_photo[index];
                if(obj.partnerId){
                    // 把要删除的保存起来

                    this.removePhotoArr.push(obj.templateId);
                }
                this.template_photo.splice(index, 1);
            },
            addModifyTemplatePhoto(){
                const _this = this;
                if(this.templatePhotoDisabled){
                    this.templatePhotoDisabled = false;
                    this.templatePhotoText = '保存';
                }else{
                    let promise = new Promise( (resolve, reject) => {
                        // 删除
                        if(_this.removePhotoArr.length > 0){
                            send({
                                url: 'control:/photo_template/org/partner',
                                type: 'delete',
                                param: {
                                    partnerId: _this.id,
                                    photoTemplateIds: _this.removePhotoArr
                                }
                            }, function(err, res){
                                resolve();
                                console.log(res);  
                            })
                        }else{
                            resolve();
                        }
                        
                    });

                    promise.then( () => {
                        let arr = [];
                        _this.template_photo.forEach( function(obj, index){
                            if(!obj.partnerId && obj.templateId){
                                arr.push(obj.templateId)
                            }
                        });
                        if(arr.length > 0 && arr[0]){
                            send({
                                url: 'control:/photo_template/org/partner',
                                type: 'post',
                                param: {
                                    partnerId: _this.id,
                                    photoTemplateIds: arr
                                }
                            }, function(err, res){
                                console.log(err,res);
                                if(res.status == 200){
                                    alert('修改成功！', 'success');
                                }else{
                                    alert(res.msg ? res.msg : '修改失败，请联系管理员!');
                                }
                                _this.templatePhotoDisabled = true;
                            });
                        }else{
                            alert('修改成功!', 'success');
                            _this.templatePhotoText = '修改';
                            _this.templatePhotoDisabled = true;
                        }
                        $('#supplier_add button[name="photo_template"]').each(function(index, ele){
                            if(!$(ele).text()){
                                $(ele).parentsUntil('.closeParent').parent().remove();
                            }
                        });
                    })
                }
            },

            // 基本操作
            integrationData(name, item){
                this.res[name]= item;
            },
            // 选择公式
            integrationQuota(name, item, index){
                const obj = this.quotation_formula[index];
                
                if(obj.hasOwnProperty('sysPartnerId')){
                    this.removeFormulaArr.push({
                        sysQuotationId: obj.sysQuotationId,
                        sysPartnerId: obj.sysPartnerId
                    });
                }else{
                    this.quotation_formula.some( (obj, index) => {
                        if(obj.sysQuotationId == item.sysQuotationId){
                            alert('已经有该公式了')
                            return true;
                        }
                    })
                }
                this.quotation_formula.splice(index, 1, item);
            },
            addQuota(){
                this.quotation_formula.push({});
            },
            // collectBilling_company(name, item, index){
            //     this.res.billing_company.push(item);
            //     this.billing_company.push(item);
            //     console.log(this.res.billing_company)
            // },
            // removeBilling_company(index){
            //     this.billing_company.splice(index,1);
            //     this.res.billing_company.splice(index,1);
            // },
       
            collectServiceItem(name, item, index){
                if(!this.res.serviceItem)this.res.serviceItem = [];

                let bool = this.res.serviceItem.some( (code, index) => {
                    if(code == item.code) return true;
                });

                if(bool){
                    alert('已经有该服务项目！');
                    return;
                }
                this.res.serviceItem.push(item.code);
                this.serviceItem.push(item);
                console.log(this.res.serviceItem)
            },
            removeServerItem(index){
                this.serviceItem.splice(index,1);
                this.res.serviceItem.splice(index,1);
            },
            getTemplate_photo(name, item, index){
                const _this = this;
                const hasItem = _this.template_photo.some((obj, index) => {

                    if(obj.jobType == item.jobType){
                        return true;
                    }
                });
                // 如果没有相同类型
                if(!hasItem){
                    const obj = _this.template_photo[index];
                    console.log(obj);
                    if(obj.partnerId){
                        // 把要删除的保存起来
                        console.log(obj.templateId)
                        _this.removePhotoArr.push(obj.templateId);
                    }

                    _this.template_photo.splice(index, 1, item);
                }else{
                    alert('该拖车类型已经有了');
                }
                
            },
            addTemplate_photo(name, item){
                this.template_photo.push({});
            },
            addContacts(){
                this.contact.push({
                    name: '',
                    nickname: '',
                    mobile: '',
                    email: '',
                    qq: '',
                    weChat: ''
                });
            },
            showDetails(){
                $(event.currentTarget).find('span').toggleClass('down');
                $(event.currentTarget).next('.details').slideToggle('fast');
            },
            add(){
                //收集
                let data = {};
                const _this = this;
                data = getData('#supplier_add');
                if(data){
                    //提交到后端

                    // 上传基本数据
                    let putPartnerInfo = () => {
                        return new Promise( (resolve, reject) => {
                            $('#main_loading').show();
                            send({
                                url: 'client:/partner',
                                type: 'post',
                                param: _this.res
                            }, function(err, response){

                                if(response.status == 200){
                                    resolve(response.content[0].id)
                                }
                            })
                        });
                    }

                    // 上传服务商报价表达式
                    let putFormula = (id) => {
                        return new Promise(function(resolve, reject){
                            console.log(_this.quotation_formula)
                            _this.quotation_formula.forEach( (obj, index) => {
                                send({
                                    url: 'control:/quota/partnerquota',
                                    type: 'post',
                                    param: {
                                        sysPartnerId: id,
                                        sysQuotationId: obj.sysQuotationId,
                                        active: true
                                    }
                                }, function(err, res){
                                    console.log(err, res);
                                    resolve(id);
                                });
                            })
                        })
                    }

                    // 上传服务商拍照模板
                    let putPhotoTemplate = (id) => {
                        return new Promise(function(resolve, reject){
                            const arr = _this.template_photo.map( function(obj, index){
                                return obj.templateId;
                            });

                            send({
                                url: 'control:/photo_template/org/partner',
                                type: 'post',
                                param: {
                                    partnerId: id,
                                    photoTemplateIds: arr
                                }
                            }, function(err, res){
                                console.log(err,res);
                                if(res.status == 200){
                                    console.log(res);
                                    alert('添加成功！', 'success')
                                    $('#main_loading').hide();
                                }
                            })
                        })
                    }

                    putPartnerInfo().then(putBillingCompany).then.then(putFormula).then(putPhotoTemplate).catch(function(){
                        $('#main_loading').hide();
                        alert('部分数据未上传成功');
                    })
                }else{
                    alert('某些资料不能为空')
                }
            }
        },
        components:{
            btnSelect,
            formLabelInput,
            breadcrumb,
            modelMap,
            checkbox
        }
    }
</script>

<style>
#supplier_add{
    margin-bottom: 100px;
}
#supplier_add label{
    min-width: 72px;
}
#supplier_add article:after{
    width:auto;
    left:105px;
    top:-10px;
}
#supplier_add article i{
    left:92px;
}
#supplier_add .details{
    background:#fff;
    padding:20px 30px;
}
#supplier_add .contact input[disabled]{
    background:#f6f6f6 !important;
}
#supplier_add{
    margin-top: 22px;
    overflow: visible;
}
#supplier_add .closeParent{
    position: relative;
}
#supplier_add .details .close{
    position: absolute;
    left:-8px;
    top:6px;
    padding:5px;
    z-index: 10;
    opacity: 1;
}
#supplier_add .address > div:after{
    top:11px;
}
#supplier_add .details .close:hover{
    color:red;
}
#supplier_add .inline-close{
    background-color: #f6f6f6;
}
#supplier_add .my_checkbox input{
    top: -1px;
}
#supplier_add .contact input{
    background: rgb(207, 228, 251);
    width: 95px;
    border-width: 0;
    color: #333333;
    text-indent: 8px;
    padding: 5px 0;
    height: 24px;
    font-size: 12px;
}
#supplier_add .row > div{
    margin-bottom: 8px;
}
#supplier_add ::-webkit-input-placeholder { /* WebKit browsers */ 
    color: #999 !important; 
} 
#supplier_add .child_page{
    min-height: 800px;
}

#supplier_add .contact .delete{
    position: absolute;
    top: 3px
}
#supplier_add .serviceItem .btn-group{
    padding-right: 0;
}
</style>