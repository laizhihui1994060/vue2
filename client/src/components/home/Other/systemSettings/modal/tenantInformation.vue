<template>
    <div id='tenantInformation' class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <span>租户详细信息</span>
                    <button class='close' data-dismiss="modal">
                        <span class="glyphicon glyphicon-remove close"></span>
                    </button>
                </div>
                <div class="modal-body clearfix">
                    <div class="row disabled" >
                        <div class="col-xs-6">
                            <form-label-input :value="item.adminName"  label="真实姓名" input-width="160px" />
                        </div>
                        <div class="col-xs-6">
                            <form-label-input :value="item.adminMobile"  label="手机号码" input-width="160px" />
                        </div>
                    </div>
                    <div class="row disabled" >
                        <div class="col-xs-6">
                            <form-label-input :value="item.adminEmail"  label="邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱" input-width="160px" />
                        </div> 
                    </div>
                    <div class="row disabled" >
                        <div class="col-xs-6">
                            <form-label-input :value="item.fullname" label="企业名称" input-width="160px" />
                        </div>
                        <div class="col-xs-6">
                            <form-label-input :value="item.name" label="企业简称" input-width="160px"/>
                        </div>
                    </div>
                    <div class="row disabled" >
                        <div class="col-xs-6">
                            <form-label-input :value="item.domain"  label="企业域名" input-width="160px"/>
                        </div>
                        <div class="col-xs-6">
                            <form-label-input :value="item.contact"  label="联系方式" input-width="160px"/>
                        </div>
                    </div>
                    <div class="row disabled" >
                        <div class="col-xs-12">
                            <form-label-input :value="item.address"  label="企业地址" input-width="450px"/>
                        </div>
                    </div>
                    <div class="row disabled" >
                        <div class="col-xs-12">
                            <checkbox :checked='item.isPublic' text='平台可见' top='0px' labelRight='13px' />
                        </div>
                    </div>


                    <template v-if='item.status == "APPROVED"'>
                        <div class="row"  style="margin-top:20px;">
                            <div class="col-xs-12">
                                <input-text :value='item.approveComment' :disabled='true' label="审核原因" input-width="82%" margin-top="0" name="approveComment"  @updata="integrationDate"/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-6">
                                <form-label-input @updata="integrationDate" :value='item.code' :disabled='true' name="code"  label="审核代码" input-width="160px"/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-4">
                                <radio 
                                    text="服务商"
                                    style="display:none"
                                    name="sysTenantType"
                                    value="VENDOR"
                                    :disabled='true'
                                    :checked="item.sysTenantType == 'VENDOR'"
                                    @updata="integrationDate" />
                            </div>
                            <div class="col-xs-4">
                                <radio 
                                    text="客户"
                                    style="display:none"
                                    name="sysTenantType"
                                    value="CUSTOMER"
                                    :disabled='true'
                                    :checked="item.sysTenantType == 'CUSTOMER'"
                                    @updata="integrationDate" />
                            </div>
                            <div class="col-xs-4">
                                <radio 
                                    text="联合体"
                                    style="display:none"
                                    name="sysTenantType"
                                    value="UNION"
                                    :disabled='true'
                                    :checked="item.sysTenantType == 'UNION'"
                                    @updata="integrationDate" />
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import formLabelInput from "../../../../../common_component/form-label-input.vue";
import inputText from "../../../../../common_component/inputText.vue";
import radio from "../../../../../common_component/radio.vue";
import checkbox from "../../../../../common_component/checkbox.vue";
    let el = null;
    export default{
        props: {
            'sysTenantRegId':{}
        },
        data(){
            return {
                item:{
                    adminName:'',
                    adminNickname:'',
                    adminEmail:'',
                    adminMobile:'',
                    fullname:'',
                    name:'',
                    domain:'',
                    contact:'',
                    address:'',
                },
                res:{
                    sysTenantType: 'VENDOR'
                },
                tenantRegId:'',
            }
        },
        methods: {
        
            integrationDate(name,item){
                this.res[name] = item;
                console.log(this.res);
            }
        },
        components:{
            formLabelInput,
            inputText,
            radio,
            checkbox
        },
        computed:{
            
        },
        mounted(){
            this.$nextTick(function(){
                el = $('#tenantInformation .modal-body .disabled');
                el.find('input').attr('disabled',true);
                el.find('textarea').attr('disabled',true);
            })
        },
        watch:{
            sysTenantRegId(newv){
                this.tenantRegId  = newv;
                const self = this;
                send({
                    type:'get',
                    url:'client:/regtenant/' + newv
                },function(err,res){
                    if(err)return console.log(err);
                    if(res.status == 200){
                        console.log(res);
                        self.item = res.content[0];
                        self.res['adminMobile'] = self.item.adminMobile;
                    }else{
                        console.log(res);
                        alert(res.msg);
                    }
                })
            }
        }
        
    }
</script>

<style>
    #tenantInformation .modal-body{
        width:650px;
        padding: 50px;
    }
    #tenantInformation .modal-footer input[type='button']:nth-child(2){
        margin: 0 80px;
    }
    #tenantInformation .modal-footer input[type='button']{
        font-size: 12px;
        line-height: 12px;
        padding: 6px 24px;
        margin: 0;

    }
    .row{
        margin-bottom: 10px;
    }
</style>