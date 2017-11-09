<template>
    <div id='add_company_branch' class='child_page'>
        <breadcrumb
            :arr="[{path:'/LoginFinish/systemSettings/corporateManagement',text:'分公司管理'},{path:'',text:'添加分公司'}]"/>
        
        <div class='details'>
            <div class="details-body clearfix">
                <div class='needInput'>
                    <div class='col-xs-12'>
                        <form-label-input :after='true'  name="name" label="公司简称" input-width="10rem" placeholder="输入公司简称" @updata="integrationDate"  />
                    </div>
                    <!-- <div>
                        <form-label-input  name="code" label="公司代码" input-width="10rem"  placeholder="输入公司代码" @updata="integrationDate" />
                    </div> -->
                    <div class='col-xs-12'>
                        <form-label-input :after='true'  name="fullname" label="公司名称" input-width="10rem"   placeholder="输入公司名称" @updata="integrationDate" />
                    </div>
                    <div class='col-xs-12'>
                        <form-label-input :after='true' type='number'  name="chargePersonPhone" label="手机号码" input-width="10rem"  placeholder="输入公司手机号码" @updata="integrationDate"/>
                    </div>
                    <div class='col-xs-12 address'>
                        <form-label-input :after='true' data-toggle='modal' data-target='#model_map'  name="address" :value='chosen.address' label="公司地址" input-width="10rem" placeholder="输入公司公司地址" @updata="integrationDate"/>
                    </div>
                    <div class='col-xs-12'>
                        <checkbox input-left="12px" text='独立核算' name='independentAccountingUnit'  @updata="integrationDate"/>
                    </div>
                </div>
                <div class='col-xs-12'>
                    <form-label-input  name="bankName" label="结算银行" input-width="10rem"  placeholder="输入结算银行" @updata="integrationDate"/>
                </div>
                <div class='col-xs-12'>
                    <form-label-input  name="bankAccountName" label="账号户名" input-width="10rem"  placeholder="输入账号户名" @updata="integrationDate" />
                </div>
                <div class='col-xs-12'>
                    <form-label-input type='number'  name="bankAccountCode" label="银行帐号" input-width="10rem"  placeholder="输入银行帐号" @updata="integrationDate" />
                </div>
                <div class='col-xs-12'>
                    <form-label-input type='number'  name="taxId" label="税务登记" input-width="10rem"  placeholder="输入税务登记" @updata="integrationDate" />
                </div>
            </div>
            <hr />
            <div class="btns details-footer">
                <button class="btn radius-btn" @click='addCompanyBranch' style="margin-right: 50px">添加</button>
                <router-link tag='button' :to = "{ path: '/LoginFinish/systemSettings/corporateManagement' }" class="btn radius-btn" active-class=' '>返回</router-link>
            </div>
        </div>
        <model-map text='设为公司地址' ></model-map>
    </div>
</template> 

<script>
import btnSelect from '../../../../../common_component/btn_select.vue'
import radio from '../../../../../common_component/radio.vue'
import checkbox from '../../../../../common_component/checkbox.vue'
import getData from "../../../../../../static/js/getData.js"
import breadcrumb from '../../../../../common_component/breadcrumb.vue'
import formLabelInput from '../../../../../common_component/form-label-input.vue'
import modelMap from '../../../../../common_component/model_map.vue'
    export default{
        components:{
            btnSelect,
            radio,
            checkbox,
            breadcrumb,
            formLabelInput,
            modelMap
        },
        data(){
            return {
                chosen: {
                    address: ''
                },
                uuid: uuid(),
                res:{}
            }
        },
        created(){
            console.log(this.$route.params.id)
            this.res.parentOrgId = this.$route.params.id;
        },
        mounted(){
            const _this = this;
            bus.$on('updataAdress', function(type, addressObj, details){
                for(let key in details){
                    _this.res[key] = details[key];
                }
                _this.res.address = addressObj.address;
                // 经纬度
                const latLntArr = addressObj.Longitude.split(',');
                _this.res.lng = latLntArr[0];
                _this.res.lat = latLntArr[1]; 

                _this.chosen.address = addressObj.address;
                $('#model_map').modal('hide');
               
            })
        },
        methods: {
            integrationDate(name, item){
                this.res[name]= item;
                console.log(this.res);
            },
            addCompanyBranch(){
                //收集
                const _this = this;
                const data = getData('#add_company_branch .needInput');
                if(data){
                    //向后端传入
                    _this.res.sysOrgId  = _this.uuid;
                    send({
                        url: 'client:/org',
                        type: 'post',
                        param: _this.res
                    }, function(err, res){
                        if(res.status == 200){
                            alert(res.msg, 'success');
                            window.history.go(-1);
                        }else{
                            alert(res.msg);
                        }
                        
                    })

                }else{
                    alert('某些资料不能为空')
                }
            }
        }
    }
</script>

<style scoped>
    #add_company_branch{
        padding: 0 20px;
    }
    #add_company_branch .needInput > div{
        margin:4px 0;
    }

    #add_company_branch .address > div:after{
        top: 13px;
    }
    #add_company_branch .col-xs-12{
        margin:5px 0;
    }
    #add_company_branch .details{
        padding:10px 50px;
        background:#fff;
    }
    #add_company_branch .details > div{
        margin-bottom: 10px;
    }
    #add_company_branch article{
        margin:0;
        float:none;
        font-size:18px;
    }
    #add_company_branch article:after{
        left:100px;
    }

</style>