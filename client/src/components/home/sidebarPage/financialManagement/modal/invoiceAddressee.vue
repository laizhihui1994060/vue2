<template>

<!-- Modal -->
    <div class="modal fade" id="invoiceAddressee" tabindex="-1" role="dialog" aria-labelledby="orderShare" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title text-center" id="myModalLabel">{{comIscreat? '新增' : '修改'}}收件人</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-xs-12">

                            <form-label-input 
                                label='收&nbsp;件&nbsp;人&nbsp;' 
                                @updata = 'integrationDate'
                                name='mailName'
                                inputWidth="265px"
                                :value="res.mailName"/>
                        </div>
                        <div class="col-xs-12">
                            <form-label-input 
                                label='地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址' 
                                @updata = 'integrationDate'
                                name='mailAddress'
                                inputWidth="265px"
                                :value="res.mailAddress"/>
                        </div>
                        <div class="col-xs-12">
                            <form-label-input 
                                label='电话号码' 
                                @updata = 'integrationDate'
                                name='mailPhone'
                                inputWidth="265px"
                                :value="res.mailPhone"/>
                        </div>
                    </div>
                
                </div>
                <div class="modal-footer">
                    <div class="btns">
                        <button type="button" class="btn" @click="add">{{mailRecordId ? '保存' : '新增'}}</button>
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
                    mailName :'',
                    mailAddress :'',
                    mailPhone  :'',
                },
                mailRecordId:'',
                newvl:{}
           }
        },
        methods:{
            add(){
                const self = this;

                for(var i in this.res){
                    if(!this.res[i])return alert('请正确填写信息');
                }
                this.res.partnerId = this.id;
                
                if(this.mailRecordId){

                    send({
                        type:'put',
                        url:'finance:/invoice/recipient/' + this.mailRecordId,
                        param:this.res
                    },function(err,res){
                        if(err)return console.log(err);
                        if(res.status == 200){
                            console.log(res)
                            alert(res.msg, 'success');
                            self.clear();
                            self.$emit('update');
                            $('#invoiceAddresseeBtn').text('');
                        }else{
                            console.log(res);
                            alert(res.msg);
                        };
                    })
                }else{
                    send({
                        type:'post',
                        url:'finance:/invoice/recipient',
                        param:this.res
                    },function(err,res){
                        if(err)return console.log(err);
                        if(res.status == 200){
                            alert('添加成功', 'success');
                            self.$emit('update');
                            $('#invoiceAddresseeBtn').text('');
                            $('#invoiceAddressee').modal('hide');
                            
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
                    mailName :'',
                    mailAddress :'',
                    mailPhone  :'',
                };

                this.mailRecordId = '';
            },
            tihuan(){
                if(!this.newvl.mailRecordId)return;
                this.mailRecordId = this.newvl.mailRecordId;
                this.res ={
                    mailName:this.newvl.mailName,
                    mailAddress :this.newvl.mailAddress,
                    mailPhone :this.newvl.mailPhone,
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
    .modal-dialog{
        width: 400px;
    }
    .modal-body{
        padding: 25px;
    }
    .modal-body .col-xs-12{
        margin-bottom: 15px;
    }

</style>