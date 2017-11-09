<template>
    <div class="details" id="dataDictionary">
        <div class="details-body">

            <div class="row">
                <div class="col-xs-4">
                    <form-label-input 
                        inputWidth='180px'
                        label='车&nbsp;&nbsp;牌&nbsp; 号'  
                        name='plateNo'
                        check="^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$"
                        checkTip='车牌不符合规范'
                        :after="true"
                        :value="result.plateNo" 
                        @updata="integrationDate" 
                        :disabled='disabled'
                        input-width="126px"/>
                </div>
                <div class="col-xs-4">
                    <form-label-input 
                        inputWidth='180px'
                        label='车&nbsp;&nbsp;&nbsp;架&nbsp;&nbsp;&nbsp;&nbsp;号'  
                        name='vin'
                        :value="result.vin"
                        @updata="integrationDate" 
                        :disabled='disabled'
                        input-width="126px"/>
                </div>
                <div class="col-xs-4">
                   <btn-select
                        width='180px'
                        btnWidth='0.5rem'
                        label='蓝&nbsp;&nbsp;黄&nbsp;牌' 
                        label-right='12px'
                        :arr="[ {name:'蓝牌', code:'BLUE'}, {name:'黄牌',code:'YELLOW'},{name:'其他',code:'OTHER'} ]"
                        list-width="128px"
                        filter="name"
                        :after="true"
                        filterName='code'
                        :uuid='true'
                        field='code'
                        :value='result.plateColor'
                        name="plateColor" 
                        @updata="integrationDate"   
                        :disabled='disabled'
                        padding='0'/>
                </div>
            </div>
    
            <div class="row">
                <div class="col-xs-4">
                    <btn-select
                        width='180px'
                        btnWidth='0.5rem'
                        label='车辆类型'
                        list-width="128px"
                        label-right='12px'
                        url="client:/helper/towtruckcat?pageSize=10000&pageIndex=1" 
                        filter="name" 
                        filterName='towTruckCatId'
                        :after="true"
                        :uuid='true'
                        field='towTruckCatId'
                        :value='result.towTruckCatId'
                        name="towTruckCatId" 
                        @updata="integrationDate"   
                        :disabled='disabled'
                        padding='0'/>
                </div>
                <div class="col-xs-4">
                    <datetimepicker
                        background="#DCF4FC"
                        name="purchaseDate"
                        label="购&nbsp;买&nbsp;日&nbsp;&nbsp;期"
                        :value="result.purchaseDate"
                        @updata="integrationDate"
                        :disabled='disabled'
                        width="180px"/> 
                </div>
                
                <div class="col-xs-4">
                    <form-label-input 
                        inputWidth='180px'
                        label='车辆证书'  
                        name='licenseNo'
                        :value="result.licenseNo"
                        :disabled='disabled'
                        @updata="integrationDate" />

                </div>
            </div>

            <div class="row">
                
                <div class="col-xs-4">
                    <form-label-input 
                        inputWidth='180px'
                        label='发动机号'  
                        name='motorNo'
                        :value="result.motorNo"
                        @updata="integrationDate" 
                        :disabled='disabled'
                        input-width="126px"/>
                </div>
                <div class="col-xs-4">
                    <btn-select
                        width='180px'
                        btnWidth='0.5rem'
                        label='品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌' 
                        label-right='12px'
                        url="client:/helper/brand?pageSize=100&pageIndex=1&vendorCode=" 
                        list-width="128px"
                        filter="name" 
                        filterName='code'
                        :uuid='true'
                        field='code'
                        :value='result.brand'
                        name="brand" 
                        @updata="integrationDate"   
                        :disabled='disabled'
                        padding='0'/>
                </div>
                <div class="col-xs-4">
                    <btn-select
                        width='180px'
                        btnWidth='0.5rem'
                        label='车辆状态' 
                        :after="true"
                        label-right='12px'
                        :arr="[{name:'忙',code:'BUSY'},{name:'空闲',code:'FREE'},{name:'维修中',code:'MAINTENANCE'}]"
                        list-width="128px"
                        filter="name"
                        filterName='code' 
                        :uuid='true'
                        field='code'
                        :value='result.status'
                        name="status" 
                        @updata="integrationDate"   
                        :disabled='statusDisabled'
                        :updataKey='statusUpdataKey'
                        padding='0'/>
                    <span v-if='!isCreate' @click='modifyStatus' class='bianji img' style="display: inline-block;position:relative;top:2px;cursor:pointer;"></span>
                </div>
            </div>
            <div class="row">
                
                <div class="col-xs-4">
                    <btn-select
                        width='180px'
                        btnWidth='0.5rem'
                        label='GPS类型' 
                        :after="true"
                        label-right='12px'
                        :arr="[{name:'车载gps终端',code:'GPS'},{name:'手机上传GPS',code:'APP'},{name:'没有配置',code:'NONE'}]"
                        list-width="128px"
                        filter="name" 
                        filterName='code'
                        :uuid='true'
                        field='code'
                        :value='result.gpsTerminalType'
                        name="gpsTerminalType" 
                        @updata="integrationDate"   
                        :disabled='disabled'
                        padding='0'
                            />
                </div>
                <div class="col-xs-4">
                    <form-label-input 
                        inputWidth='180px'
                        label='GPS终端号'  
                        labelRight='12px'
                        name='gpsTerminalId'
                        :after="isGPS"
                        :value="result.gpsTerminalId"
                        @updata="integrationDate" 
                        :disabled='(!isGPS || !isModify)'
                        input-width="126px"/>
                </div>
                <div class="col-xs-4">
                    <switchs
                        text='手机上传GPS'
                        name='appGpsUpload'
                        :value='true'
                        :checked='result.appGpsUpload'
                        :disabled='appGpsDisabled || disabled'
                        @updata="integrationDate" 
                        />
                </div>

            </div>
            <div class="row">
                <div class="col-xs-4">
                    <form-label-input 
                        inputWidth='180px'
                        label='车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重'  
                        labelRight='12px'
                        name='weight'
                        :value="result.weight"
                        :disabled='true'
                        input-width="126px"/>
                </div>
                <div class="col-xs-4">
                    <form-label-input 
                        inputWidth='180px'
                        label='车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;长'  
                        labelRight='12px'
                        name='height'
                        :value="result.height"
                        :disabled='true'
                        input-width="126px"/>
                </div>
                <div class="col-xs-4">
                    <form-label-input 
                        inputWidth='180px'
                        label='车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;宽'  
                        labelRight='12px'
                        name='width'
                        :value="result.width"
                        :disabled='true'
                        input-width="126px"/>                
                </div>
                
            </div>
            <div class="row">
                <div class="col-xs-4">
                    <form-label-input 
                        inputWidth='180px'
                        label='最大载重'  
                        labelRight='12px'
                        name='maxLoad'
                        :value="result.maxLoad"
                        :disabled='true'
                        input-width="126px"/>
                </div>
                <div class="col-xs-4">
                    <btn-select 
                        width='180px'
                        btnWidth='0.5rem'
                        label='燃油类型' 
                        label-right='12px'
                        :after="true"
                        list-width="128px"
                        url="control:/sys/param/org"
                        method='post'
                        :params='["/order/oil_type"]' 
                        filter="desc" 
                        filterName='code'
                        :uuid='true'
                        field='code'
                        :value='result.oilType'
                        name="oilType" 
                        @updata="integrationDate"   
                        :disabled='disabled'
                        padding='0'/>
                </div>
                <div class="col-xs-4">
                    <form-label-input 
                        inputWidth='180px' 
                        :value="result.oilCardId" 
                        label='加&nbsp;油&nbsp;卡&nbsp;&nbsp;号'  
                        name='oilCardId'
                        @updata="integrationDate" 
                        :disabled='disabled'
                        input-width="126px"/>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <btn-select 
                        width='180px'
                        btnWidth='0.5rem'
                        label='当前司机' 
                        label-right='12px'
                        list-width="128px"
                        url='client:/helper/emp'
                        method='post'
                        :params='{ isConfig: 0, isDriver: true, isUser: true  }'
                        filter="empName" 
                        filterName='userId'
                        :title='vehicleDriver' 
                        name='towDriverId'
                        :disabled='modifyDriverDisabled'
                        :updataKey='driverUpdataKey'
                        @updata="integrationDate"  
                        padding='0'/>

                    <span v-if='!isCreate' @click='modifyDriver' class='bianji img' style="display: inline-block;position:relative;top:2px;cursor:pointer;"></span>
                </div>
            </div>
            
            <div class="row">
                <div class="col-xs-6">
                    <btn-select 
                        width='180px'
                        btnWidth='0.5rem'
                        label='驻&nbsp;&nbsp;车&nbsp;点' 
                        className='noMustNeed'
                        label-right='12px'
                        url='client:/helper/parkinglot'
                        method="post"
                        :params="{sysOrgId:nowOrgId}"
                        filter="parkingLotName" 
                        filterName='parkingLotId'
                        :uuid='true'
                        field='parkingLotId'
                        :value='result.parkingLotId'
                        name="parkingLotId" 
                        @updata="integrationDate" 
                        :disabled='disabled'
                        title='驻车地'
                        padding='0'
                        />  

                    <radio 
                        text="就近驻车"
                        name="isAdhocParking"
                        style='margin-left:18px;'
                        :checked='true'
                        value='true'
                        :disabled='disabled'
                        @updata="integrationDate"/>
                </div>
                
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <label>开放人群</label>
                    <checkbox 
                        text="对伙伴可见"
                        label-left="10px" 
                        name="isPartnerVisible"
                        :checked='result.isPartnerVisible'
                        direction="left"
                        :disabled='disabled'
                        @updata="integrationDate"/>

                    <checkbox 
                        margin-left="30px"
                        text="对平台可见" 
                        label-left="10px" 
                        :checked='result.isPlatformVisible'
                        name="isPlatformVisible" 
                        direction="left"
                        :disabled='disabled'
                        @updata="integrationDate"/>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-3">
                    <btn-select 
                        width='180px'
                        btnWidth='0.5rem'
                        label='服务项目' 
                        label-right='12px'
                        list-width="128px"
                        url="client:/helper/job" 
                        filter="name" 
                        filterName=''
                        name="serviceItems"
                        title="选择服务项目"
                        @updata="integrationDate"   
                        :disabled='disabled'
                        padding='0'
                        style="display:inline-block;margin-right:20px;"/>
                </div>
                <div class="col-xs-9">
                    <p class="inline-close" :disabled='disabled'  v-for="(it,index) in serviceItems">{{it.name}}<i @click="removeServerItem(index)"></i></p>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <input-img  name='images' :disabled='!isModify' :arr='result.images' @updata="getImages"></input-img>
                </div>
            </div>
        </div>
        <hr />
        <div class="details-footer btns">
            <button type="button" class="btn radius-btn" @click="submit">{{footerTxt}}</button>
            <router-link tag='button' :to = "{ path: '/LoginFinish/companyManagement/listVehicles' }" class="btn radius-btn" active-class=' '>返回</router-link>
        </div>
        <vehicleStatus :vehicleStatus='result.status' @setStatus='setStatus'></vehicleStatus>
        <vehicleDriver :vehicleDriver='vehicleDriver' :vehicleDriverUserId='vehicleDriverUserId' :driverUpdataKey='driverUpdataKey' @setDriver='setDriver'></vehicleDriver>
    </div>
</template>
<script>

import btnSelect from "../../../../../../common_component/btn_select.vue";
import switchs from '../../../../../../common_component/switch.vue'
import datetimepicker from "../../../../../../common_component/datetimepicker.vue";
import formLabelInput from "../../../../../../common_component/form-label-input.vue";
import inputImg from "../../../../../../common_component/inputImg.vue";
import checkbox from "../../../../../../common_component/checkbox.vue";
import radio from "../../../../../../common_component/radio.vue";
import getData from '../../../../../../../static/js/getData.js'
import vehicleStatus from './vehicleStatus.vue'
import vehicleDriver from './vehicleDriver.vue'
    export default{
        components:{
            btnSelect,
            datetimepicker,
            formLabelInput,
            inputImg,
            checkbox,
            switchs,
            vehicleStatus,
            vehicleDriver,
            radio
        },
        props: ['towTruckId'],
        data(){
            return {
                uuid: uuid(),

                footerTxt: '保存',
                gpsDisabled: true,
                isCreate: false,
                result:{
                    plateNo:'' ,
                    plateColor :'', // 蓝黄牌:BLUE(蓝牌),YELLOW(黄牌),OTHER(其他) ,
                    towTruckCatId :'' , //拖车类型id ,
                    brand :"" , // 品牌 ,
                    purchaseDate :"" , // 购买日期 ,
                    vin :"" , // 车架号 ,
                    licenseNo :"" , // 车辆证书号 ,
                    motorNo :"" , // 发动机号 ,
                    gpsTerminalId :"" , // GPS终端号 ,
                    gpsTerminalType :"" , // GPS终端类型:GPS(车载gps终端),APP(手机上传GPS),none(没有配置) ,
                    status :"" , // 车辆状态:BUSY(忙),FREE(空闲),MAINTENANCE(维修中) ,
                    weight :"" , //车重 ,
                    height :"" , //车长 ,
                    width :"" ,//车宽 ,
                    maxLoad :"" , //最大载重 ,
                    serviceItems :[] ,// 服务项目 ,
                    parkingLotId :"" , // 驻车点id ,
                    images : [] , //照片 ,
                    oilCardId :"" , // 加油卡号 ,
                    isAdhocParking :"" ,    //是否就近驻车  
                    visibleType : null,       //开放类型
                    appGpsUpload: false,       // 手机gps,
                    towDriverId: '',
                    isPlatformVisible:false,
                    isPartnerVisible:false

                },
                disabled: false,
                isModify: false,
                serviceItems: [],
                files:[],
                images: [],
                isGPS:false,
                appGpsDisabled: false,
                nowOrgId: global.ourOrgId,
                statusDisabled: true,   // 车辆状态修改
                statusUpdataKey: 1,

                vehicleDriver: '',
                vehicleDriverUserId: '',
                modifyDriverDisabled: true,  // 司机修改
                driverUpdataKey: 1,
            }
        },
        created(){
            const self = this;
            this.isCreate = this.$route.params.isCreate.toString() === 'true';
            if(this.isCreate == false){
                
                self.footerTxt = '修改';
                self.submit = self.modify;
                self.isGPS = false;
                self.disabled = true;
                self.isModify = false;
                this.updateInfo();
            }else{
                this.submit = this.add;
                this.isModify = true;
                this.statusDisabled = false;
                this.modifyDriverDisabled = false;

                // 默认所有服务项目
                send({
                    url: "client:/helper/job",
                    type: 'get'
                }, function(err, res){
                    res.content.forEach( (obj, index) => {
                        self.serviceItems.push(obj);
                        self.result.serviceItems.push(obj.code);
                    })
                    
                    console.info(res);
                })
            }
        },
        methods:{
            updateInfo(){
                const self = this;
                send({
                    type:'get',
                    url:'client:/towtruck/' + self.towTruckId,
                },function(err,res){
                    console.log(err, res);
                    if(err)return console.log(err);
                    if(res.status == 200){
                        self.result = res.content[0];
                        self.serviceItems = res.content[0].serviceItemResp ? res.content[0].serviceItemResp:[];

                        // 司机
                        send({
                            url: 'client:/config/list',
                            type: 'post',
                            param: {
                                towTruckId: self.towTruckId
                            }
                        }, function(err, res){
                            console.info(res)
                            if(res.status == 200){
                                self.vehicleDriver = res.content[0].towDriverInfo ? res.content[0].towDriverInfo.empName : '';
                                self.vehicleDriverUserId = res.content[0].towDriverInfo ? res.content[0].towDriverInfo.userId : '';
                            }else{
                                self.vehicleDriver = '';
                            }
                        })

                    }else{
                        alert('获取数据失败');
                    }
                });
            },
            getImages(name, item){
                this.images = item;
            },
            modifyStatus(){
                $('#vehicleStatus').modal('show');
            },
            modifyDriver(){
                $('#vehicleDriver').modal('show');
                this.driverUpdataKey++;
            },
            setDriver(driverObj, type){
                console.info(driverObj, type);
                const _this = this;
                if(!driverObj.userId){
                    $('#vehicleDriver').modal('hide');
                    return ;
                }else{
                    // 绑定、解绑
                    send({
                        url: 'client:/config/' + _this.towTruckId,
                        type: 'post',
                        param: {
                            towTruckId: _this.towTruckId,
                            towDriverId: driverObj.userId, 
                            switchType: (type && type) == 'remove' ? 'REMOVE' : 'BINDING',
                            switchFrom: 'WEB_SUPERVIOR'
                        }
                    }, function(err, res){
                        if(res.status == 200){
                            console.log(res);
                            _this.$emit('upateHistory');
                            $('#vehicleDriver').modal('hide');
                            _this.vehicleDriver =  (type && type) == 'remove' ? '' : driverObj.empName;
                            _this.vehicleDriverUserId =  (type && type) == 'remove' ? '' : driverObj.userId;
                            console.info(_this.vehicleDriver, _this.vehicleDriverUserId)
                            _this.driverUpdataKey++;
                            alert(res.msg, 'success');
                        }else{
                            alert(res.msg);
                        }
                    });
                }
                
            },
            setStatus(status){
                const _this = this;
                send({
                    url: 'client:/towtruck/' + _this.towTruckId + '/base',
                    type: 'put',
                    param: {
                        towTruckId: _this.towTruckId,
                        status: status
                    }
                }, function(err, res){
                    if(res.status == 200){
                        $('#vehicleStatus').modal('hide');
                        _this.result.status = status;
                        _this.statusUpdataKey++;
                        alert(res.msg, 'success');
                        

                    }else{
                        alert(res.msg)
                    }
                })
            },
            integrationDate(name,item){
                console.log(name,item)
                const _this = this;
                if(name == 'parkingLotId'){
                    $('input[name="isAdhocParking"]')[0].checked = false;
                    _this.result['isAdhocParking'] = false;
                    _this.result[name] = item;
                }else if(name == 'isAdhocParking'){
                    $('button[name="parkingLotId"]').text('').next();
                    _this.result['isAdhocParking'] = true;
                    delete _this.result['parkingLotId']; 

                }else if(name == 'serviceItems'){
                    let bool;
                    if(_this.result.serviceItems == null){
                        bool = false;
                    }else{
                        bool = _this.result.serviceItems.some( (value, index) => {
                            // 找到了
                            if(value == item.code){
                                alert('已有相同的项目');
                                return true;
                            }
                        });
                    }
                    
                    if(!bool){
                        _this.serviceItems.push(item);
                        if(!_this.result.serviceItems)_this.result.serviceItems = [];
                        _this.result.serviceItems.push(item.code);
                    }
                    
                }else if(name == 'towTruckCatId'){
                    send({
                        url: 'client:/towtruck/towtruckcat/' + item,
                        type: 'get'
                    }, function(err, res){
                        const content = res.content[0];
                        _this.result.width = content.width;
                        _this.result.weight = content.weight;
                        _this.result.maxLoad = content.load;
                        _this.result.height =content.length;
                    });
                    _this.result[name] = item;
                }else if( name == 'gpsTerminalType'){
                    if(item == 'GPS'){
                        _this.isGPS = true;
                        _this.appGpsDisabled = false;
                    }else{
                        _this.isGPS = false;
                        _this.gpsTerminalId = _this.result.gpsTerminalId = '';
                        if(item == 'APP'){
                            _this.result.appGpsUpload = true;
                            _this.appGpsDisabled = true;
                        }else{
                            _this.result.appGpsUpload = false;
                            _this.appGpsDisabled = true;
                        }
                    }
                    _this.result[name] = item;
                }else{
                    _this.result[name] = item;
                }
                
            },
            removeServerItem(index){
                this.serviceItems.splice(index,1);
                this.result.serviceItems.splice(index,1);
                console.log(this.result.serviceItems);
            },
            add(){
                const _this = this;

                order_operation.element = $(order_operation.isExtsts_el());
                var bool = true;

                if(!/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test(_this.result.plateNo)){
                    alert('车牌号不规范!');
                    return ;
                }

                $('#dataDictionary').find('[verify="true"]').each(function(index,el){

                    el.style.backgroundColor = '#DFF5FD';
                    if(!el.innerHTML && !el.value){

                        el.style.backgroundColor = 'rgba(255, 0, 0, 0.26)';
                        bool = false;
                    }
                });
                console.log( _this.result)
                if(bool){
                    let promise = new Promise(function(resolve, reject){
                        fileUp(_this.images, function(images){
                            _this.result.images = images;
                            resolve();
                        })
                    });

                    let promise_2 = promise.then(function(){
                        return new Promise(function(resolve, reject){

                            _this.result.towTruckId  = _this.uuid;

                            send({
                                url: 'client:/towtruck',
                                type: 'post',
                                param: _this.result
                            }, function(err, res){
                                if(err)return console.log('服务器出错，请联系管理员！');
                                if(res.status == 200){
                                    const id = res.content[0].id;
                                    _this.$emit('updateId', id);

                                    resolve({
                                        response: res,
                                        id: id
                                    });
                                }else{
                                    alert(res.msg);
                                    console.log(res);
                                }
                            });
                        });
                    })

                    promise_2.then(function(obj){
                        if(!_this.result.towDriverId){
                            alert(obj.response.msg, 'success');
                            window.history.go(-1);
                            return ;
                        }
                        send({
                            url: 'client:/config/' + obj.id,
                            type: 'post',
                            param: {
                                towTruckId: obj.id,
                                towDriverId: _this.result.towDriverId,
                                switchType: 'BINDING',
                                switchFrom: 'WEB_SUPERVIOR'
                            }
                        }, function(err, res){
                            if(res.status == 200){
                                alert(obj.response.msg, 'success');
                                window.history.go(-1);
                            }else{
                                alert(res.msg);
                            }
                        });
                    })
                    
                }else{
                     alert('请完整填写资料!');
                }

                
            },
            modify(){
                console.log(this.result)
                const _this = this;
                if(!_this.isModify){
                    _this.isModify = true;
                    _this.disabled = false;
                    _this.footerTxt = '保存';
                }else{
                    _this.isModify = false;
                    _this.disabled = true;
                    let promise = new Promise(function(resolve, reject){
                        fileUp(_this.images, function(images){
                            _this.result.images = images;
                            resolve();
                        });
                    })

                    promise.then(function(){
                        console.info(_this.result)
                        send({
                            url: 'client:/towtruck/' + _this.towTruckId,
                            type: 'put',
                            param: _this.result
                        }, function(err, res){
                            if(err)alert('服务器出错，请联系管理员');
                            if(res.status == 200){
                                _this.updateInfo();
                                alert(res.msg,'success');
                            }else{
                                alert(res.msg);
                            }
                            _this.footerTxt = '修改';
                        })
                    })
                    
                }
                
            },
           
        }
    }
</script>

<style>
    #dataDictionary label:not(.setBg){
        min-width: 72px;
    }
    #dataDictionary .inline-close{
        margin-bottom: 5px;
        width: 100px;

    }
</style>