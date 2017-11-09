<template>

<!-- Modal -->
    <div class="modal fade" id="invoicingUnit" tabindex="-1" role="dialog" aria-labelledby="orderShare" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title text-center" id="myModalLabel">{{comIscreat? '新增' : '修改'}}开票单位</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-xs-12">

                            <form-label-input 
                                label='开票单位' 
                                @updata = 'integrationDate'
                                name='companyName'
                                inputWidth="265px"
                                :after="true"
                                :value="res.companyName"/>
                        </div>
                        <div class="col-xs-12">
                            <form-label-input 
                                label='地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址' 
                                @updata = 'integrationDate'
                                name='companyAddress'
                                inputWidth="265px"
                                :after="true"
                                :value="res.companyAddress"/>
                        </div>
                        <div class="col-xs-12">
                            <form-label-input 
                                label='开户银行' 
                                @updata = 'integrationDate'
                                name='bankName'
                                :after="true"
                                inputWidth="265px"
                                :value="res.bankName"/>
                        </div>
                        <div class="col-xs-12">
                            <form-label-input 
                                label='开户账号' 
                                @updata = 'integrationDate'
                                name='bankAcctNo'
                                :after="true"
                                inputWidth="265px"
                                :value="res.bankAcctNo"/>
                        </div>
                    </div>
                
                </div>
                <div class="modal-footer">
                    <div class="btns">
                        <button type="button" class="btn" @click="add"  data-dismiss="modal">{{invoiceCompanyId ? '保存' : '新增'}}</button>
                        <button type="button" class="btn"  data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import  btnSelect from "../../../../../common_component/btn_select.vue";
import  formLabelInput from "../../../../../common_component/form-label-input.vue";

    export default {
        props:['id','currentInfo','comIscreat','num'],
        components:{
            btnSelect,
            formLabelInput,
        },
        
        data () {
           return {
                res:{
                    companyName:'',
                    companyAddress :'',
                    bankName :'',
                    bankAcctNo :''
                },
                invoiceCompanyId:'',
                newvl:{}
           }
        },
        methods:{
            add(){
                const self = this;

                let bool = true;
                $('#invoicingUnit').find('[verify="true"]').each(function(index, el) {
                    el.style.border="none"
                    if( (el.tagName.toLocaleLowerCase() == 'input' ) &&  !el.value){
                        el.style.border="1px solid rgb(249, 188, 188)";
                        bool = false;
                    };

                });

                if(!bool)return alert('数据不完整，请完善数据')

                this.res.partnerId = this.id;

                if(this.invoiceCompanyId){

                    send({
                        type:'put',
                        url:'finance:/invoice/company/' + this.invoiceCompanyId,
                        param:this.res
                    },function(err,res){
                        if(err)return console.log(err);
                        if(res.status == 200){
                            console.log(res)
                            alert(res.msg, 'success');
                            self.clear();
                            self.$emit('update');
                            $('#invoicingUnitBtn').text('');
                            $('#invoicingUnit').modal('hide');
                        }else{
                            console.log(res);
                            alert(res.msg);
                        };
                    })
                }else{
                    send({
                        type:'post',
                        url:'finance:/invoice/company',
                        param:this.res
                    },function(err,res){
                        if(err)return console.log(err);
                        if(res.status == 200){
                            alert('添加成功', 'success');
                            $('#invoicingUnit').modal('hide');
                            self.$emit('update');
                            $('#invoicingUnitBtn').text('');
                            self.clear();
                        }else{
                            console.log(res);
                            alert(res.msg);
                        };
                    })
                }

            },
            integrationDate(name,item){
                this.res[name] = item;
            },
            clear(){
                this.res = {
                    companyName:'',
                    companyAddress :'',
                    bankName :'',
                    bankAcctNo :''
                };

                this.invoiceCompanyId = '';
            },
            tihuan(){
                if(!this.newvl.invoiceCompanyId)return;
                this.invoiceCompanyId = this.newvl.invoiceCompanyId;
                this.res ={
                    companyName:this.newvl.companyName,
                    companyAddress :this.newvl.companyAddress,
                    bankName :this.newvl.bankName,
                    bankAcctNo :this.newvl.bankAcctNo,
                }
            }
        },
        created(){
            this.res.partnerId  = this.id;
        },
        watch:{
            currentInfo(newv){
                this.newvl = newv;
            },
            num(newv){
                this.comIscreat ? this.clear():this.tihuan();
            }
        }
    }
 

</script>
<style scoped>
    #invoicingUnit .modal-body{
        margin: 0;
    }
    .modal-dialog{
        width: 400px;
    }
    .modal-body{
        padding: 25px;
        margin: 0 !important;
    }
    .modal-body .col-xs-12{
        margin-bottom: 15px;
    }

</style>