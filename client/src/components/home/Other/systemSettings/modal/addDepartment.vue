<template>
    <div id="add_department">

        <breadcrumb
            :arr="[{path:'/LoginFinish/systemSettings/departmentManagement',text:'部门管理'},{path:'',text: footTxt + '部门',default:true}]"/>
    
        <article>基本信息</article>
        <div class='details clearfix'>
            <div class='col-xs-12'>
                <form-label-input @updata="integrationDate" :value='info.name' :after='true' name="name" label="部门名称" input-width="300px"></form-label-input>
            </div>
            <div class='col-xs-12'>
                <form-label-input @updata="integrationDate" :value='info.code' :after='true' name="code" label="部门代码" input-width="300px"></form-label-input>
            </div>
            <div class='col-xs-12'>
                <btn-select 
                    label='负&nbsp;&nbsp;责&nbsp;人&nbsp;'
                    url="client:/helper/emp" 
                    method='post'
                    :params='empParams'
                    className='noMustNeed'
                    filter="empName"
                    width='300px'
                    :title='info.chargePersonInfo ? info.chargePersonInfo.empName : "" '
                    filterName='empId'
                    name="chargePersonId"
                    padding='0px' 
                    @updata="integrationDate" />
            </div>
            <div class='col-xs-12'>
                <form-label-input 
                    @updata="integrationDate" 
                    name="chargePersonPhone" 
                    :value='info.chargePersonPhone'
                    label="联系电话" 
                    type='number'
                    className='noMustNeed'
                    input-width="300px">
                </form-label-input>
            </div>
            <div class="col-xs-12">
                <hr />
            </div>
            <div class="btns">
                <button class="btn radius-btn" value='添加' @click='addModify'>{{footTxt}}</button>
                <router-link tag='button' :to = "{ path: '/LoginFinish/systemSettings/departmentManagement' }" class="btn radius-btn" active-class=' '>返回</router-link>
            </div>
        </div>
        

    </div> 
</template>
 
<script>
import btnSelect from '../../../../../common_component/btn_select.vue';
import radio from '../../../../../common_component/radio.vue';
import checkbox from '../../../../../common_component/checkbox.vue';
import breadcrumb from '../../../../../common_component/breadcrumb.vue';
import formLabelInput from '../../../../../common_component/form-label-input.vue';
import getData from "../../../../../../static/js/getData.js";

    export default{
        components:{
            btnSelect,
            radio,
            checkbox,
            breadcrumb,
            formLabelInput
        },
        data(){
            return {
                uuid: uuid(),
                footTxt: '添加',
                res: {

                },
                empParams: {
                    sysOrgId: ''
                },
                info: {
                }
            }
        },
        created(){
            this.empParams.sysOrgId = this.$route.params.nowOrgId;
            if(!this.$route.params.isCreate){
                this.footTxt = '修改';
                this.info = this.$route.params.info;
                this.addModify = this.modify;
            }else{
                this.addModify = this.add;    
            }
        },
        methods: {
            addModify(){},
            add(){
                //收集验证

                const data = getData('#add_department');
                if(data){
                    // 负责人要转化为id
                    const _this = this;
                    _this.info.orgId = _this.empParams.sysOrgId;
                    
                    _this.info.chargePersonId = _this.uuid;
                    send({
                        url: 'client:/dept',
                        type: 'post',
                        param: _this.info
                    }, function(err, res){

                        if(res.status == 200){
                            alert(res.msg, 'success');
                            window.history.go(-1);
                        }else{
                            alert(res.msg);
                        }  
                    });

                }else{
                    alert('某些资料不能为空')
                }
            },
            modify(){
                const data = getData('#add_department');
                if(data){
                    // 负责人要转化为id
                    const _this = this;
                    _this.info.orgId = _this.$route.params.nowOrgId;
                    
                    console.log(this.info);
                    send({
                        url: 'client:/dept/' + _this.info.hrDeptId,
                        type: 'put',
                        param: _this.info
                    }, function(err, res){
                        if(res.status == 200){
                            alert(res.msg, 'success');
                            window.history.go(-1);
                        }else{
                            alert(res.msg);
                        }  
                    });

                }else{
                    alert('某些资料不能为空')
                }
            },
            integrationDate(name, item){
                this.info[name]= item;
                console.log(this.res);
            },
        }
    }
</script>

<style>
    #add_department{
        min-height: 600px;
    }
    #add_department label{
        min-width: 60px !important;
        margin-right: 12px;
    }
    #add_department .details > div{
        margin:10px 0;
    }
    #add_department .details{
        padding:10px 50px;
        background:#fff;
    }
    #add_department .btns{
        margin-top:20px;
    }
    #add_department .btns button{
        margin:0 20px;
        width:80px;
        height:24px;
    }
</style>