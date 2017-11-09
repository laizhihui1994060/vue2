<template>
    <div class="child_page" id="registration_add">
        <breadcrumb
            :arr="[{path:'/LoginFinish/companyManagement/registration',text:'驻车地管理'},{path:'',text:isCreate ? '添加驻车地' : '查看驻车地'}]"/>

        <article>基本信息</article>

        <div class='details'> 
            <div class="details-body">
                <div class='row'>
                    <div class="col-sm-4">
                        <form-label-input 
                            label='驻车名称'
                            @updata='integrationDate' 
                            :disabled='disabled'
                            :value='chosen.name'
                            :after="true"
                            name='name'
                            input-width="200px"/>
                    </div>
                    <div class="col-sm-4">
                        <checkbox name='isDefault' text='设为默认驻车地' @updata='integrationDate' top='0px'
                        :disabled='disabled' :checked='chosen.isDefault' value='true' labelSize='14px'/>
                    </div>
                </div>
                <template v-if='isAdmin'>
                    <div class='row'>
                        <div class="col-sm-4">
                            <btn-select 
                                label='公&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;司'  
                                label-right='12px'
                                url='client:/helper/org'
                                filter="name"
                                filterName='orgId'
                                :uuid='true'
                                field='orgId'
                                :after="true"
                                :value='ourOrgId'
                                width='200px' 
                                btnWidth='0.5rem'
                                @updata = 'integrationDate'
                                :disabled='!isAdmin'
                                :title='nowOrgName'
                                name="orgId" 
                                padding='0'>
                            </btn-select>
                        </div>
                    </div>
                </template>
                <div class="row">
                    <div class="col-sm-4">
                        <btn-select 
                            label='接单人一'  
                            label-right='12px'
                            url='client:/helper/emp'
                            method="post"
                            :params="{isUser :true}"
                            filter="empName"
                            :after="true"
                            filterName='userId'
                            :uuid='true'
                            :disabled='disabled'
                            field='userId'
                            :value='chosen.firstOrderTaker'
                            width='200px' 
                            btnWidth='0.5rem'
                            @updata = 'integrationDate'
                            title='第一接单人'
                            name="firstOrderTaker" 
                            padding='0'>
                        </btn-select>
                    </div>
                    <div class="col-sm-4">
                        <btn-select 
                            label='接单人二'  
                            method="post"
                            :params="{isUser :true}"
                            label-right='12px'
                            url='client:/helper/emp'
                            filter="empName"
                            filterName='userId'
                            :uuid='true'
                            :disabled='disabled'
                            field='userId'
                            :value='chosen.secondOrderTaker'
                            width='200px' 
                            btnWidth='0.5rem'
                            @updata = 'integrationDate'
                            title='第二接单人'
                            name="secondOrderTaker" 
                            padding='0'>
                        </btn-select>
                    </div>
                </div>
                <div class='row'>
                    <div class="col-sm-1" style='margin-left:-24px'>
                    </div>
                    <div class="col-sm-6" style='color:orange;font-size:12px'>只有有用户账号的员工才能成为接单人</div>
                </div>    
                <div class="row">
                    <div class="col-sm-12 address">
                        <form-label-input 
                            label='驻&nbsp;车&nbsp; 地' 
                            name='address'
                            placeholder="建议点击右侧地图坐标定位公司经纬度"
                            inputWidth='12rem'
                            :value="chosen.address"
                            :disabled='disabled'
                            :after="true"
                            @updata="integrationDate" 
                            :data-toggle='!disabled ? "modal" : "" ' 
                            data-target='#model_map' />
                    </div>
                </div> 
<!--                 <div class="row">
                    <div class='col-sm-4'> 
                        <form-label-input 
                            label='经&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度'
                            @updata='integrationDate'
                            :disabled='disabled'  
                            :value='chosen.gps.lng'
                            input-width="200px"
                            name='lng' />
                    </div>
                    <div class='col-sm-4'>
                        <form-label-input 
                            label='纬&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度' 
                            @updata='integrationDate'
                            :disabled='disabled' 
                            :value='chosen.gps.lat'
                            input-width="200px"
                            name='lat'/>
                    </div>
                </div> -->
            </div>
            <hr /> 
            <div class="btns details-footer" style='margin-top: 30px;'>
                <button type="button" style='margin:0 40px;' class="btn" @click='addModify'>{{footerTxt}}</button>
                <router-link tag='button' :to = "{ path: '/LoginFinish/companyManagement/registration' }" class="btn" active-class=' '>返回</router-link>
            </div>
        </div>
        <model-map text='设为驻车地'></model-map>
    </div>
</template>
<script>
import btnSelect from '../../../../../common_component/btn_select.vue'
import checkbox from '../../../../../common_component/checkbox.vue'
import breadcrumb from '../../../../../common_component/breadcrumb.vue'
import formLabelInput from '../.././../../../common_component/form-label-input.vue'
import modelMap from '../../../../../common_component/model_map.vue'
import getData from '../../../../../../static/js/getData.js'


    export default{
        components:{
            btnSelect,
            checkbox,
            formLabelInput,
            breadcrumb,
            modelMap
        },
        data(){
            return {
                uuid: uuid(),
                footerTxt: '添加',
                disabled: false,
                id: '',
                chosen:{
                    address: '',
                    firstOrderTaker:'',
                    secondOrderTaker:'',
                    gps: {
                        lat: '',
                        lng: '',
                    }
                },
                isCreate: false,
                res:{
                    address: '',             //地址
                    parkingLotId :'',       //驻车地id
                    sysTenantId:'',         //租户ID
                    sysOrgId:'',            //分公司ID
                    name:'',                //驻车地名字
                    description:'',         //描述
                    isDefault:'',           //是否默认
                    isActive:true,            //是否启用
                    lng:'',                 //经度
                    lat:'',                 //公纬度
                    province:'',            //省
                    city:'',                //市
                    district:'',            //区
                    town:'',                //镇
                },
                Longitude:'',
                res: {

                },
                nowOrgName: global.ourOrgName,
                nowOrgId: global.ourOrgId

            }
        },
        mounted(){
            this.isCreate = this.$route.params.isCreate.toString() === 'true';
            console.log("check Res ",this.res)
            const _this = this;
            bus.$on('updataAdress', function(type, addressObj, details){
                const longitude = addressObj.Longitude.split(',');
                _this.chosen.gps.lng = _this.res.lng = longitude[0];
                _this.chosen.gps.lat = _this.res.lat = longitude[1];

                _this.chosen.address = _this.res.address = addressObj.address;

                if(details){
                    for(var i in details){
                        _this.res[i] = details[i];
                    }
                }
                $('#model_map').modal('hide');
            });

            if(_this.isCreate){
                _this.addModify = _this.add;
            }else{

                if(global.ourOrgId){
                    updata();
                }else{
                    var time = setInterval(function(){
                        if(global.ourOrgId){
                            clearInterval(time);
                            updata();
                        }
                    }, 500);
                }

                function updata(){
                    _this.footerTxt = '修改';
                    _this.addModify = _this.modify;
                    _this.disabled = true;
                    _this.id = _this.$route.params.chosen;
                    // 获取数据
                    const url = 'client:/parkinglot/' + _this.id + '?orgId=' + global.ourOrgId;
                    send({
                        url: url,
                        type: 'get'
                    }, function(err, res){
                        console.log(res)
                        if(res.status == 200){
                            _this.chosen = res.content[0];
                            _this.res.isActive = res.content[0].isActive
                            // console.log("chosen响应",_this.chosen)
                        }else{
                            alert(res.msg)
                        }
                    })
                }
            }
        },
        methods: {
            integrationDate(name, item){
                if(!window.event) return;
                const event = window.event.target;
                

                if(name == 'firstOrderTaker' || name == 'secondOrderTaker'){
                    
                    if(
                        (name == 'firstOrderTaker' && this.res['secondOrderTaker'] == item) 
                        || 
                        (name == 'secondOrderTaker' && this.res['firstOrderTaker'] == item)){
                        alert('已有该接单人，请重新选择!');
                        this.res[name] = '';
                        console.log($(event).parentsUntil('btn-group').parent());
                        $(event).parent().parent().parent().find('.setWidth').text('');
                    }else{
                        this.res[name]= item;
                    }
                }else{
                    this.res[name]= item;
                }
            },
            choose(index){

            },
            add(){

                var bool = true;

                $('#registration_add').find('[verify="true"]').each(function(index,el){

                    el.style.backgroundColor = '#DFF5FD';

                    if(!el.innerHTML.trim() && !el.value.trim()){

                        el.style.backgroundColor = 'rgba(255, 0, 0, 0.26)';
                        bool = false;
                    }
                });


                if(bool){

                    const _this = this;

                    _this.res.parkingLotId  = _this.uuid;
                    send({
                        url: 'client:/parkinglot',
                        type: 'post',
                        param: _this.res
                    }, function(err, res){
                        if(err)alert('服务器出错，请联系管理员');
                        if(res.status == 200){
                            alert(res.msg, 'success');
                            window.history.go(-1);
                        }else{
                            alert(res.msg ? res.msg : '添加失败，请联系管理员！');
                        }
                        
                    })
                }else{
                    alert('请完善信息');
                }
               
            },
            modify(){
                const _this = this;
                if(_this.disabled){
                    _this.disabled = false;
                    _this.footerTxt = '保存';
                }else{
                    let params = _this.res,
                        url = 'client:/parkinglot/' +  _this.id,
                        bool = true;
                    // console.log('_thisRes，',_this.res)
                    params.isActive = _this.res.isActive?true:false;


                    $('#registration_add').find('[verify="true"]').each(function(index,el){
                           el.style.backgroundColor = '#DFF5FD';
                            if(!el.innerHTML.trim() && !el.value.trim()){
                                el.style.backgroundColor = 'rgba(255, 0, 0, 0.26)';
                                bool = false;
                            }
                        }
                    );
                    if(!bool){
                       return alert('请完善信息')
                    }
                    send({
                        url: url,
                        type: 'put',
                        param: params
                    }, function(err, res){
                        if(err)alert('服务器出错，请联系管理员');
                        if(res.status == 200){
                            console.log("params",params)
                            alert(res.msg,'success');
                        }else{
                            alert(res.msg);
                        }
                        _this.disabled = true;
                        _this.footerTxt = '修改';
                      
                    });
                }
            },
            addModify(){}
        },
    }

</script>

<style>
#registration_add {
    margin-top: 22px;
    min-height:600px;
}
#registration_add .row{
    margin:10px 0;
}
#registration_add .details{
    padding:20px 30px;
    background: #fff;
}
#registration_add .details input[type='checkbox']{
    top:-1px;
}
</style>