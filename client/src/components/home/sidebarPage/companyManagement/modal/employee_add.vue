<template> 
    <div id='employee_add' v-if='show'>
        <div>
            <breadcrumb
                :arr="[{path:'/LoginFinish/companyManagement/employee',text:'员工信息'},{path:'',text: navTxt }]"/>

            <div class='main'>
                <article>基本信息<i ></i></article>
                <div class='details'>
                    <div class='block'>
                        <div class="row" v-if='isAdmin || add_branch_company_emp'>
                            <div class='col-sm-4'>
                                <btn-select 
                                    label='公&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;司' 
                                    label-right='12px'
                                    url='client:/helper/org'
                                    filter="name"
                                    filterName='orgId'
                                    :uuid='true' 
                                    field='orgId'
                                    :after="true"
                                    :value='informtion.sysOrgId'
                                    width='200px' 
                                    btnWidth='0.5rem'
                                    @updata = 'integrationDate'
                                    :disabled='disabled'
                                    name="orgId" 
                                    padding='0'>
                                </btn-select>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-4'>
                                <btn-select 
                                    ref='dept'
                                    label='部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门' 
                                    label-right='12px'
                                    :url='deptUrl'
                                    filter="name"
                                    filterName='hrDeptId'
                                    :uuid='true'
                                    field='hrDeptId'
                                    :after="true"
                                    :value='informtion.hrDeptId'
                                    width='200px' 
                                    btnWidth='0.5rem'
                                    @updata = 'integrationDate'
                                    :disabled='disabled'
                                    :title='informtion.name'
                                    name="hrDeptId" 
                                    :updataKey='updataKey'
                                    padding='0'>
                                </btn-select>
                            </div>
                            <div class='col-sm-4'>
                                <form-label-input 
                                    label='员工姓名'
                                    :value='informtion.empName'
                                    @updata = 'integrationDate'
                                    :disabled='disabled'
                                    inputWidth='200px'
                                    :after="true"
                                    name='empName'>
                                </form-label-input>
                            </div>
                            <div class='col-sm-4'>
                                <form-label-input 
                                    label='基本工资' 
                                    @updata = 'integrationDate'
                                    :disabled='disabled'
                                    type="number"
                                    :max='999999.99'
                                    inputWidth='200px'
                                    :value='informtion.basicSalary'
                                    name='basicSalary'>
                                </form-label-input>
                            </div>
                        </div>
                        <div class='row'>  
                            <div class='col-sm-4'>
                                <datetimepicker
                                    label='生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日'
                                    background="#DCF4FC"
                                    width='200px'
                                    padding='4px 14px'
                                    :value='informtion.birthDate'
                                    @updata = 'integrationDate'
                                    :disabled='disabled'
                                    name="birthDate"
                                ></datetimepicker>
                            </div> 
                            <div class='col-sm-4'>
                                <btn-select 
                                    label='性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别' 
                                    label-right='12px'
                                    :arr="[ { name: '男', sex: 'M' }, { name: '女', sex: 'F' }, { name: '其它', sex: 'O' } ]" 
                                    filter="name"
                                    filterName='sex'
                                    width='200px' 
                                    btnWidth='0.5rem'
                                    :uuid='true'
                                    :after="true"
                                    field='sex'
                                    
                                    :value='informtion.gender'
                                    @updata = 'integrationDate'
                                    :disabled='disabled'
                                    name="gender" 
                                    padding='0'>
                                </btn-select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">

                                <form-label-input 
                                    label='身&nbsp;份&nbsp;&nbsp;证' 
                                    :value='informtion.idCode'
                                    @updata = 'integrationDate'
                                    :disabled='disabled'
                                    :after="true"
                                    type="number"
                                    inputWidth='6rem'
                                    name='idCode'>
                                </form-label-input>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-4'>
                                <btn-select 
                                    label='职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位' 
                                    label-right='12px'
                                    url='control:/sys/param'
                                    method='post'
                                    :params='[ "/sys/sys_position_option" ]'
                                    filter="desc"
                                    filterName='code'
                                    :uuid='true'
                                    :after="true"
                                    field='code'
                                    :value='informtion.hrPositionId'
                                    width='200px' 
                                    btnWidth='0.5rem'
                                    @updata = 'integrationDate'
                                    :disabled='disabled'
                                    name="hrPositionId"
                                    padding='0'>
                                </btn-select>
                            </div>
                            <div class='col-sm-4'>
                                <datetimepicker
                                    label='入职日期'
                                    background="#DCF4FC"
                                    width='200px'
                                    padding='4px 14px'
                                    @updata = 'integrationDate'
                                    :disabled='disabled'
                                    :value='informtion.lastJoinDate'
                                    name="joinDate"
                                ></datetimepicker>
                            </div>
                            <div class='col-sm-4'>
                                <form-label-input 
                                    label='短&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号' 
                                    @updata = 'integrationDate'
                                    :disabled='disabled'
                                    :value='informtion.shortPhone'
                                    className='noMustNeed'
                                    inputWidth='200px'
                                    type="number"
                                    name='shortPhone'>
                                </form-label-input>
                            </div>
                            
                        </div>
                        <div class='row'>
                            <div class='col-sm-4'>
                                <form-label-input 
                                    label='工作手机' 
                                    @updata = 'integrationDate'
                                    :disabled='disabled'
                                    type="number"
                                    :after="true"
                                    inputWidth='200px'
                                    :value='informtion.workMobile'
                                    name='workMobile'>
                                </form-label-input>
                            </div>
                            <div class='col-sm-4'>
                                <form-label-input 
                                    label='个人手机' 
                                    @updata = 'integrationDate'
                                    :disabled='disabled'
                                    type="number"
                                    inputWidth='200px'
                                    :value='informtion.personalMobile'
                                    className='noMustNeed'
                                    name='personalMobile'>
                                </form-label-input>
                            </div>
                            
                        </div>
                        <div class="row">
                            <div class="col-sm-4">
                                <btn-select 
                                    width='200px'
                                    btnWidth='0.5rem'
                                    label='驻&nbsp;&nbsp;车&nbsp;点' 
                                    className='noMustNeed'
                                    label-right='12px'
                                    url='client:/helper/parkinglot'
                                    method="post"
                                    :params='parkinglotParams'
                                    filter="parkingLotName" 
                                    filterName='parkingLotId'
                                    :uuid='true'
                                    field='parkingLotId'
                                    :value='informtion.parkingLotId'
                                    name="parkingLotId" 
                                    @updata="integrationDate" 
                                    title='驻车地'
                                    :disabled='disabled'
                                    padding='0'
                                    :updataKey='updataKey'
                                    />  
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-4'>
                                <checkbox
                                    text='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;技师'
                                    @updata = 'integrationDate'
                                    :disabled='disabled'
                                    :checked='informtion.isDriver'
                                    name='isDriver'
                                    labelRight='10px'
                                    top='0px'
                                />
                            </div>
                            <div class='col-sm-4'>
                                <checkbox
                                    text='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;外协'
                                    @updata = 'integrationDate'
                                    :disabled='disabled'
                                    :checked='informtion.isOutSource'
                                    name='isOutSource'
                                    labelRight='10px'
                                    top='0px'
                                />
                            </div>
                        </div>
                    </div>
                    <div class="img row">
                        <input-img name='images' :limit='4' :arr='informtion.images' :disabled='disabled' @updata='integrationDate'></input-img>
                    </div>
                    <hr />
                    <div class="modal-footer">
                        <div class="btns">
                            <button v-if='isCreate' type="button" class="btn radius-btn" @click="addModify" >保存</button>
                            <button v-if='UPD_EMP' type="button" class="btn radius-btn" @click="addModify" >{{ isModify ? '保存' : '修改' }}</button>
                            <router-link tag='button' :to = "{ path: '/LoginFinish/companyManagement/employee' }" class="btn  radius-btn" active-class=' '>返回</router-link>
                            <button v-if='!isCreate && STOP_EMP' class='btn btn-danger radius-btn' @click='deleteEmp'>删除</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
import btnSelect from '../../../../../common_component/btn_select.vue'
import breadcrumb from '../../../../../common_component/breadcrumb.vue'
import datetimepicker from '../../../../../common_component/datetimepicker.vue'
import checkbox from '../../../../../common_component/checkbox.vue'
import inputImg from '../../../../../common_component/inputImg.vue'
import formLabelInput from '../.././../../../common_component/form-label-input.vue'

    export default{
        components:{
            btnSelect,
            inputImg,
            datetimepicker,
            formLabelInput,
            checkbox,
            breadcrumb

        },
        data(){
            return {
                uuid: uuid(),

                navTxt: '查看员工',
                ourOrgId: global.ourOrgId,
                show: false,
                disabled: false,
                chosen: {

                },
                informtion: {},
                res: {},
                isCreate: true ,
                isAdmin: ConfigPage.isExist(['isAdmin']) ? true :false,
                add_branch_company_emp: ConfigPage.isExist(['add_branch_company_emp']) ? true :false,
                updataKey: 1,
                deptUrl: 'client:/org/' + global.ourOrgId + '/dept',
                parkinglotParams: { sysOrgId: global.ourOrgId },
                isModify:true,
                STOP_EMP: '',
                UPD_EMP: ''
            }
        },
        created(){

            

            const _this = this;
            let updata = () => {
                // $('#companyManagement li.router-link-active').parent().slideUp().siblings('a').removeClass('active_a');

                _this.$nextTick(()=> {
                    $('#companyManagement li.router-link-active').parent().slideDown().siblings('a').addClass('active_a');
                });

                _this.chosen = _this.$route.params.chosen;
                _this.isCreate = _this.$route.params.isCreate.toString() === 'true';
                _this.show = true;
                
                _this.deptUrl = 'client:/org/' + global.ourOrgId + '/dept';
                _this.parkinglotParams = { sysOrgId: global.ourOrgId};

                _this.addModify = _this.isCreate ? _this.add : _this.modify;
                _this.isModify = _this.isCreate;
                

                // 查看员工信息
                if(!_this.isCreate || _this.isCreate == 'false'){


                    // 权限问题

                    _this.STOP_EMP = ConfigPage.isExist(['systemSettings', 'STOP_EMP']);
                    _this.UPD_EMP = ConfigPage.isExist(['systemSettings', 'UPD_EMP']);



                    _this.disabled = true;
                    const data = {
                        hr_employee_id: _this.chosen,
                    };
                    let promise = new Promise(function(resolve, reject){
                        send({
                             type:'get',
                             url:'client:/emp/' + data.hr_employee_id, 
                        },function(err, res){
                            console.log(res);
                            if(res.status == 200){
                                _this.informtion = res.content[0];
                                _this.res.images = res.content[0].images;
                            }
                        })
                    });
                }else{
                    _this.disabled = false;
                    _this.navTxt = _this.chosen == 'administrator' ? '注册管理员信息' : '添加员工';
                }
            }

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
            

        },
        methods:{
            update(){
                const _this = this;
                send({
                     type:'get',
                     url:'client:/emp/' + _this.chosen, 
                },function(err, res){
                    if(res.status == 200){
                        _this.informtion = res.content[0];
                        _this.res.images = res.content[0].images;
                    }else{
                        alert(res.msg);
                    }
                });
            },
            integrationDate(name, item){
                // 刷新部门下拉
                if(name == 'orgId'){
                    this.res['hrDeptId'] = '';
                    $(this.$refs.dept.$el).find('.setWidth').text('');   // 清空dept
                    this.deptUrl = 'client:/org/' + item + '/dept';
                    this.parkinglotParams = { sysOrgId: item };
                    this.updataKey++;
                }
                this.res[name]= item;
            },
            add(){

                const _this = this;

                const $basicSalary = $('#employee_add').find('[name="basicSalary"]');
                const basicSalary = $basicSalary.val();

                if(basicSalary && basicSalary > 999999.99){
                    $basicSalary.css('backgroundColor', 'rgba(255, 0, 0, 0.26)')
                    alert('工资必须小于999999.99');
                    return false;
                }

                var bool = true;
                $('#employee_add').find('[verify="true"]').each(function(index,el){
                    el.style.backgroundColor = '#DFF5FD';
                    if(!el.innerHTML && !el.value){
                        el.style.backgroundColor = 'rgba(255, 0, 0, 0.26)';
                        bool = false;
                    }
                });

                if(bool){
                    let promise = new Promise( function(resolve, reject){
                        fileUp(_this.res.images, function(res){
                            _this.res.images = res;
                            console.log(res)
                            resolve();
                        })
                    });
                    promise.then(function(){

                        _this.res.hrEmpId = _this.uuid;

                        if(_this.chosen != 'administrator'){
                            send({ 
                                url: 'client:/emp', 
                                type: 'post',
                                param: _this.res
                            }, function(err, res){
                                console.log(res);
                                if(res.status == 200){
                                    if(err)return alert('服务器出错，请联系管理员');
                                    alert(res.msg, 'success');
                                    window.history.go(-1);
                                }else{
                                    alert(res.msg);
                                }
                                
                            });
                        }else{
                            // 管理员设置信息
                            let promise = new Promise( (resolve, reject) => {
                                send({ 
                                    url: 'client:/user/' + global.user_info.userId + '/emp', 
                                    type: 'post',
                                    param: _this.res
                                }, function(err, res){
                                    console.log(res);
                                    if(res.status == 200){
                                        if(err)return alert('服务器出错，请联系管理员');
                                        alert(res.msg, 'success');
                                        resolve();
                                    }else{
                                        alert(res.msg);
                                    }
                                });
                            });

                            // 设置超级管理权限（全部权限)
                            let promise_2 = promise.then( () => {
                                return new Promise( (resolve, reject) => {
                                    send({
                                        url: 'control:/role',
                                        type: 'post',
                                        param: {
                                            roleName: '超级管理员'
                                        }
                                    }, function(err, res){
                                        console.log(res);
                                        if(res.status == 200){
                                            // resolve(res.content[0].roleId);
                                            setTimeout(function(){
                                                window.location = window.location.origin;
                                            }, 2000);
                                        }
                                    })
                                })

                            })

                            promise_2.then( (roleId) => {
                                send({
                                    url: 'control:/role/module',
                                    type: 'post'
                                }, function(err, res){
                                    if(res.status == 200){
                                        const content = res.content;    

                                        let params = [];
                                        content.forEach( (obj, index) => {
                                            let param = {};
                                            param.moduleId = obj.mid;

                                            param.code = obj.operations.map( (obj, index) => {
                                                return obj.code;
                                            });

                                            param.roleId = roleId;

                                            params.push(param);
                                        });

                                        // 设置权限
                                        send({
                                            url: 'control:/role/grant/permission',
                                            type: 'post',
                                            param: params
                                        }, function(err, res){
                                            console.log(res);
                                            // 赋予角色 
                                            if(res.status == 200){

                                                send({
                                                    url: 'control:/role/grant',
                                                    type: 'post',
                                                    param: [{
                                                        orgId: global.ourOrgId,
                                                        grantor: global.user_info.userId,
                                                        roles: [roleId]
                                                    }]
                                                }, function(err, res){
                                                    if(res.status == 200){
                                                        alert('绑定管理员用户成功，界面即将返回登陆页，重新登录。。。', 'success');
                                                        setTimeout(function(){
                                                            window.location = window.location.origin;
                                                        }, 2000);
                                                    }
                                                })
                                            }
                                        })
                                    }
                                });
                            });

                            // 创建超级管理员，现在让后台处理，不用我们处理
                            // promise_2.then( (roleId) => {
                            //     send({
                            //         url: 'control:/role/module',
                            //         type: 'post'
                            //     }, function(err, res){
                            //         if(res.status == 200){
                            //             const content = res.content;    

                            //             let params = [];
                            //             content.forEach( (obj, index) => {
                            //                 let param = {};
                            //                 param.moduleId = obj.mid;

                            //                 param.code = obj.operations.map( (obj, index) => {
                            //                     return obj.code;
                            //                 });

                            //                 param.roleId = roleId;

                            //                 params.push(param);
                            //             });

                            //             // 设置权限
                            //             send({
                            //                 url: 'control:/role/grant/permission',
                            //                 type: 'post',
                            //                 param: params
                            //             }, function(err, res){
                            //                 console.log(res);
                            //                 // 赋予角色 
                            //                 if(res.status == 200){

                            //                     send({
                            //                         url: 'control:/role/grant',
                            //                         type: 'post',
                            //                         param: [{
                            //                             orgId: global.ourOrgId,
                            //                             grantor: global.user_info.userId,
                            //                             roles: [roleId]
                            //                         }]
                            //                     }, function(err, res){
                            //                         if(res.status == 200){
                            //                             alert(res.msg, 'success');
                            //                             setTimeout(function(){
                            //                                 window.location = window.location.origin;
                            //                             }, 2000);
                            //                         }
                            //                     })
                            //                 }
                            //             })
                            //         }
                            //     });
                            // });
                        }

                        
                    })
                    
                }else{
                    alert('某些资料不能为空');
                }
            },
            modify(){

                const _this = this;
                if(_this.disabled){
                    _this.disabled = false;
                    _this.isModify = true;
                }else{

                    const $basicSalary = $('#employee_add').find('[name="basicSalary"]');
                    const basicSalary = $basicSalary.val();

                    if(basicSalary && basicSalary > 999999.99){
                        $basicSalary.css('backgroundColor', 'rgba(255, 0, 0, 0.26)')
                        alert('工资必须小于999999.99');
                        return false;
                    }

                    
                    let promise = new Promise (function(resolve, reject){
                        fileUp(_this.res.images, function(res){
                            _this.res.images = res;
                            resolve();
                        });
                    });
                    promise.then(function(){
                        let data = {
                            hr_employee_id: _this.chosen,
                            params: _this.res
                        }
                        send({
                            url: 'client:/emp/' + data.hr_employee_id,
                            type: 'put',
                            param: data.params
                        }, function(err, res){
                            _this.update();
                            alert(res.msg, res.status == 200 ? 'success' : 'error');
                            _this.disabled = true;
                            _this.isModify = false;
                        })
                    });
                }
            },
            addModify(){},
            deleteEmp(){
                const _this = this;

                confirm('确定删除该员工吗？', function(){
                    send({
                        url: 'client:/emp/' + _this.chosen,
                        type: 'delete'
                    }, function(err, res){
                        if(res.status == 200){
                            alert(res.msg, 'success');
                            window.history.go(-1);
                        }else{
                            console.log(res);
                            alert(res.msg ? res.msg : '删除失败，请联系管理员');
                        }
                    })
                },true);
            }
        }
    }
</script>

<style>
    #employee_add{
        margin-top: 22px;
    }
    #employee_add label{
        min-width: 60px;
    }
    #employee_add .details{
        padding:10px 50px;
        background: #fff;
    }
    #employee_add .details .row {
        margin:10px 0;
    }
    #employee_add .details > div{
        margin-bottom: 8px;
    }
    #employee_add .details input[type='checkbox']{
        top:-1px;
    }
    #employee_add .btn-danger{
        background-color:#d9534f;border-color: #d43f3a;color:#fff;
    }
    #employee_add .btn-danger:hover{
        color: #fff;
        background-color: #c9302c;
        border-color: #ac2925;
    }

</style>