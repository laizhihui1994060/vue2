<template>
    <div id='registerAuditModel' class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <span>审核操作</span>
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
                            <form-label-input :value="item.address"  label="企业地址" input-width="444px"/>
                        </div>
                    </div>
                    <div class="row disabled" >
                        <div class="col-xs-12">
                            <checkbox :checked='item.isPublic' text='平台可见' top='0px' labelRight='13px' />
                        </div>
                    </div>


                    <hr>
                    <div class="row"  style="margin-top:50px;" >
                        <div class="col-xs-12 approveComment">
                            <input-text label="审核原因" :after="true" input-width="82%" margin-top="0" name="approveComment"  @updata="integrationDate"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6">
                            <form-label-input @updata="integrationDate" :after="true" name="code"  label="审核代码" input-width="160px"/>
                        </div>
                    </div>
                    <div class="row" id='registerAuditModel_need'>
                            <div class="col-xs-4">
                                <radio 
                                    text="服务商"
                                    style="display:none"
                                    name="sysTenantType"
                                    value="VENDOR"
                                    checked="checked"
                                    @updata="integrationDate"/>
                            </div>
                            <div class="col-xs-4">
                                <radio 
                                    text="客户"
                                    style="display:none"
                                    name="sysTenantType"
                                    value="CUSTOMER"
                                    @updata="integrationDate"/>
                            </div>
                            <div class="col-xs-4">
                                <radio 
                                    text="联合体"
                                    style="display:none"
                                    name="sysTenantType" 
                                    value="UNION"
                                    @updata="integrationDate"/>
                            </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="btns">
                        <input type="button" class="btn radius-btn" value='通过' @click="sub('APPROVED')"/>
                        <input type="button" class="btn radius-btn" value='拒绝'  @click="sub('REJECTED')"/>
                    </div>
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
import getData from '../../../../../../static/js/getData.js'
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
            },
            sub(type){
                console.log(this.res);
                const self = this;
                this.res['checkStatus'] = type;

                var bool = true

                $('#registerAuditModel').find('[verify="true"]').each(function(index,el){

                    el.style.backgroundColor = '#DFF5FD';
                    if(!el.innerHTML && !el.value){
                        el.style.backgroundColor = 'rgba(255, 0, 0, 0.26)';
                        bool = false;
                    }
                });

                if(bool){
                    send({
                        type:'put',
                        url:'client:/tenant/' + this.tenantRegId +'/check',
                        param:this.res
                    },function(err,res){
                        if(err)return console.log(res);
                        if(res.status == 200){
                            console.log(res);
                            alert('审核成功', 'success');
                            $('#registerAuditModel').modal('hide');
                            self.res= {};
                            self.$emit('update');
                        }else{
                            console.log(res);
                            alert(res.msg)
                        }
                    });
                }else{
                    alert('请填入完整数据');
                }
                
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
                el = $('#registerAuditModel .modal-body .disabled');
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
                        self.item = res.content[0];
                        self.res['adminMobile'] = self.item.adminMobile;
                        $('#registerAuditModel').find('[verify="true"]').each(function(index,el){
                           el.value = '';
                        });
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
    body .modal-body{
        padding: 0 30px;
    }
    #registerAuditModel .modal-footer input[type='button']:nth-child(2){
        margin: 0 80px;
    }
    #registerAuditModel .modal-footer input[type='button']{
        font-size: 12px;
        line-height: 12px;
        padding: 6px 24px;
        margin: 0;

    }
    #registerAuditModel .approveComment .after:after{
        top: 3px;
    }
    .row{
        margin-bottom: 10px;
    }
</style>