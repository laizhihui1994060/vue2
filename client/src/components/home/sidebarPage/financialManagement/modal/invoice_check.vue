<template>
    <div id='invoice_check'>
        <div class="modal-body">
            <breadcrumb
                :arr="[{path:'/LoginFinish/financialManagement/invoice',text:'发票管理'},{path:'',text: '发票编辑'}]"/>

            <div>
                <article style="margin-top:0">开票登记<i></i></article>
                <div class="details">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class='center'>
                                <form-label-input 
                                    label="往来单位" 
                                    @updata = 'integrationDate'
                                    inputWidth='545px'
                                    :value="partnerName"
                                    :disabled="disabled"/>
                            </div>
                        </div>

                    </div>

                    <div class="row">
                        <div class="col-xs-12">
                            <div class='center'>
                                <btn-select  
                                    style="margin-left:96px;"
                                    width="520px" 
                                    label="开票单位"
                                    padding="0"
                                    :url="'finance:/invoice/company/partner/' + id"
                                    filter="companyName" 
                                    name="invoicingCompanyName"
                                    @updata="integrationDate"
                                    label-right="12px" 
                                    :updata-key='num'
                                    id="invoicingUnitBtn"
                                    list-width="542px"
                                    :uuid="true"
                                    field="invoiceCompanyId"
                                    :value="res.invoicingCompanyId"/>
                                <a href="javascript:;" class="newV" data-toggle="modal" @click="open" data-target="#invoicingUnit">新建</a>
                                <a href="javascript:;" class="newV" @click="xiugai('#invoicingUnit')">修改</a>

                            </div>

                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="center">
                                <form-label-input 
                                    label='地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址' 
                                    @updata = 'integrationDate'
                                    inputWidth='545px'
                                    name='invoicingCompanyAddress'
                                    :disabled="disabled"
                                    :value="res.invoicingCompanyAddress"/>
                            </div> 
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="center">
                                <form-label-input 
                                    label='开户银行' 
                                    @updata = 'integrationDate'
                                    inputWidth='545px'
                                    name='invoicingBankName'
                                    :disabled="disabled"
                                    :value="res.invoicingBankName"/>
                            </div> 
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="center">
                                <form-label-input 
                                    label='开户账号' 
                                    @updata = 'integrationDate'
                                    inputWidth='545px'
                                    name='invoicingBankAcctNo'
                                    :disabled="disabled"
                                    :value="res.invoicingBankAcctNo"/>
                            </div> 
                        </div>
                    </div>
    
                    <div class="row"></div>
                    <div class="row"></div>

                    <div class="row">
                        <div class="col-xs-12">
                            <div class="center">
                               
                                <form-label-input 
                                    pmargin-right="40px"
                                    label='对账单号' 
                                    @updata = 'integrationDate'
                                    inputWidth='214px'
                                    :disabled='true'
                                    name='reconciliationId'
                                    :value="res.reconciliationCode"/>
                                <form-label-input 
                                    label='开票金额' 
                                    @updata = 'integrationDate'
                                    inputWidth='214px'
                                    name='invoicingAmt'
                                    type="number"
                                    :value="res.invoicingAmt"/>
                            </div> 
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12">
                            <div class="center">
                                <btn-select  
                                    style='margin-right: 40px;'
                                    width="191px" 
                                    label="开票项目"
                                    padding="0"
                                    url="finance:/invoice/item/org"
                                    filter="name" 
                                    name="invoiceItemId"
                                    @updata="integrationDate"
                                    label-right="12px" 
                                    list-width="214px" 
                                    :uuid="true"
                                    field="invoiceItemId"
                                    :value="res.invoiceItemId"/>

                                <datetimepicker
                                    label='开票日期'
                                    width="214px"
                                    @updata = 'integrationDate'
                                    minView="minute"
                                    name='invoicingDate'
                                    :value="res.invoicingDate"/>
                            </div> 
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="center">
                                <btn-select  
                                    style='margin-right:40px;'
                                    width="191px" 
                                    label="发票类型"
                                    padding="0"
                                    url='finance:/invoice/type/org'
                                    filter="name" 
                                    name="invoiceTypeId"
                                    @updata="integrationDate"
                                    label-right="12px" 
                                    :uuid="true"
                                    field="invoiceTypeId"
                                    :value="res.invoiceTypeId"/>

                                <div style='width:290px;display:inline-block'>
                                    
                                </div>
                            </div> 
                        </div>
                    </div>

                    <div class="row"></div>
                    <div class="row"></div>


                    <div class="row">
                        <div class="col-xs-12">
                            <div class="center">
                                <form-label-input 
                                    pmargin-right="40px"
                                    label='快递单号' 
                                    @updata = 'integrationDate'
                                    inputWidth='214px'
                                    name='mailNo'
                                    :value="res.mailNo"/>
                                <datetimepicker
                                    label='快递日期'
                                    width="214px"
                                    @updata = 'integrationDate'
                                    minView="minute"
                                    name='mailDate'
                                    :value="res.mailDate"/>
                            </div> 
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="center">
                                <btn-select  
                                    width="191px" 
                                    label="快递公司"
                                    padding="0"
                                    url="control:/sys/param" 
                                    method='post'
                                    :params="['/sys/mailer']"
                                    filter="name" 
                                    name="mailer"
                                    @updata="integrationDate"
                                    label-right="12px" 
                                    :value="res.mailer"/>
                                    <div style='width:328px;display:inline-block'>
                                    
                                </div>
                            </div> 
                        </div>
                    </div>

    

                    <div class="row"></div>
                    <div class="row"></div>

                    <div class="row">
                        <div class="col-xs-12">
                            <div class="center">

                                <btn-select  
                                    style="margin-left:96px;"
                                    width="520px" 
                                    label="收&nbsp;&nbsp;件&nbsp;人"
                                    padding="0"
                                    :updata-key='num'
                                    url='finance:/invoice/recipient'
                                    filter="mailName" 
                                    name="mailReceiveName"
                                    @updata="integrationDate"
                                    label-right="12px" 
                                    id="invoiceAddresseeBtn"
                                    list-width="542px"
                                    :uuid="true"
                                    field="mailRecordId"
                                    :value="res.mailReceiveId"/>
                                    <a href="javascript:;" class="newV" data-toggle="modal" @click="open" data-target="#invoiceAddressee">新建</a>
                                    <a href="javascript:;" class="newV" @click="xiugai('#invoiceAddressee')">修改</a>
                            </div> 
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="center">
                                <form-label-input 
                                    label='收件地址' 
                                    @updata = 'integrationDate'
                                    inputWidth='545px'
                                    name='mailReceiveAddress'
                                    :disabled="disabled"
                                    :value="res.mailReceiveAddress"/>
                            </div> 
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="center">
                                <form-label-input 
                                    pmargin-right="40px"
                                    label='电话号码' 
                                    @updata = 'integrationDate'
                                    inputWidth='214px'
                                    name='mailReceivePhone '
                                    :disabled="disabled"
                                    :value="res.mailReceivePhone"/>
                                <div style='width:290px;display:inline-block'>
                                    
                                </div>
                            </div> 
                        </div>
                    </div>

                </div>
                
            </div>
        </div>
        <div class="modal-footer">
            <div class="btns">
                <button type="button" class="btn radius-btn" @click="submit">{{isCreate ? '登记' : '修改'}}</button>
                <button v-if="!isCreate" type="button" class="btn radius-btn" @click="scrap">作废</button>
                <a class="btn  radius-btn" style="color:rgb(23, 134, 247)" href="javascript:history.go(-1);">返回</a>
            </div>
        </div>

        <invoicing-unit @update="invoicingUnitClear" :id="id" :current-info="currentInfo" :comIscreat="comIscreat" :num="num"/>
        <invoice-addressee @update="invoiceAddresseeClear" :id="id" :current-info="currentInfo" :comIscreat="comIscreat" :num="num"/>
    </div>
</template>

<script>
    import btnSelect from '../../../../../common_component/btn_select.vue'
    import datetimepicker from '../../../../../common_component/datetimepicker.vue'
    import breadcrumb from '../../../../../common_component/breadcrumb.vue'
    import formLabelInput from '../../../../../common_component/form-label-input.vue'
    import invoicingUnit from "../modal/invoicingUnit.vue";
    import invoiceAddressee from "../modal/invoiceAddressee.vue";

    export default {
        components:{
            btnSelect,
            datetimepicker,
            breadcrumb,
            formLabelInput,
            invoicingUnit,
            invoiceAddressee
        },
        data(){
            return{
                isCreate: '',
                id: '',
                num:0,
                comIscreat:false,
                isxiu:false,
                disabled:'disabled',
                reconciliationCode:'',
                finInvoicingId:'',
                res:{
                    invoicingBankName:'',
                    invoicingBankAcctNo:'',
                    invoicingCompanyAddress:'',
                    mailReceiveName:'',
                    mailReceiveAddress:'',
                    mailReceivePhone:'',
                    mailReceiveId:''
                },
                partnerName :'',
                currentInfo:{}
            }
        },
        created(){
            this.isCreate = this.$route.params.isCreate;
            if(this.isCreate){
                this.id = this.$route.params.id.split('|')[0];
                this.res.partnerId = this.id;
                this.res.reconciliationId =  this.$route.params.id.split('|')[1];
                this.res.reconciliationCode = this.$route.params.id.split('|')[2];
            }else{
                this.id = this.$route.params.id.split('|')[1];
                this.res.partnerId = this.id;
                this.finInvoicingId =  this.$route.params.id.split('|')[0];
            }


            const self = this;

            send({
                type:'post',
                url:'client:/partner/list',
                param:[this.id]
            },function(err,res){
                if(err)return console.log(err);
                if(res.status == 200){
                    self.partnerName = res.content[0].name
                    console.log(res);
                }else{
                    console.log(res);
                }
            });



            send({
                type:'get',
                url:'finance:/invoice/company/partner/' + this.id
            },function(err,res){
                if(err)return console.log(err);
                if(res.status == 200){
                    console.log(res);
                }else{
                    console.log(res);
                    alert(res.msg);
                }
            });

        },
        methods:{
            integrationDate(name,item){
                console.log(name,item)
                if(name == 'invoicingCompanyName'){
                    this.res['invoicingCompanyName'] = item.companyName;
                    this.res['invoicingCompanyId'] = item.invoiceCompanyId;
                    this.res['invoicingBankName'] = item.bankName;
                    this.res['invoicingBankAcctNo'] = item.bankAcctNo;
                    this.res['invoicingCompanyAddress'] = item.companyAddress;
                    this.currentInfo = item;
                }else if(name == 'mailReceiveName'){
                    this.res['mailReceiveName'] = item.mailName;
                    this.res['mailReceiveAddress'] = item.mailAddress;
                    this.res['mailReceivePhone'] = item.mailPhone;
                    this.res['mailReceiveId'] = item.mailRecordId;
                    this.currentInfo = item;
                }else if(name == 'invoiceItemId'){
                    this.res['invoiceItemId'] = item.invoiceItemId;
                    this.res['invoiceItemName'] = item.name;
                }else if(name == 'invoiceTypeId'){
                    this.res['invoiceTypeId'] = item.invoiceTypeId;
                    this.res['invoiceTypeName'] = item.name;
                }else if(name == 'mailer'){
                    this.res['mailer'] = item.name
                }else{
                    this.res[name]= item;
                }
            },
            invoicingUnitClear(){
                this.res['invoicingCompanyName'] = '';
                this.res['invoicingCompanyId'] = '';
                this.res['invoicingBankName'] = '';
                this.res['invoicingBankAcctNo'] = '';
                this.res['invoicingCompanyAddress'] = '';
                ++this.num
            },
            invoiceAddresseeClear(){
                this.res['mailReceiveName'] = '';
                this.res['mailReceiveAddress'] = '';
                this.res['mailReceivePhone'] = '';
                this.res['mailReceiveId'] = '';
                ++this.num

            },
            submit(){

                const self = this;


                if(this.isxiu){
                    send({
                        type:'put',
                        url:'finance:/invoice/register/' + this.res.invoiceRegisterId,
                        param:this.res
                    },function(err,res){
                        if(err)return console.log(err);
                        if(res.stauts == 200){
                            alert('修改成功', 'success');
                            console.log(res);
                            $('#invoice_check .modal-body').find('input').attr('disabled',true);
                            $('#invoice_check .modal-body').find('button').attr('disabled',true);
                        }else{
                            console.log(res);
                            alert(res.msg)
                        }
                    })
                }else{
                    $('#invoice_check .modal-body').find('input').attr('disabled',false);
                    $('#invoice_check .modal-body').find('button').attr('disabled',false);
                    setTimeout(function(){
                        self.disabled = 'disabled';
                    }, 30);
                    this.disabled = false;
                }

                this.isxiu = !this.isxiu;

            },
            xiugai(id){
                this.comIscreat = false;
                if(this.res.invoicingBankAcctNo || this.res.mailReceiveAddress){
                    ++this.num
                    $(id).modal('show');
                }else{
                    return alert('请先选择一张单位信息');
                }
            },
            open(){
                ++this.num;
                this.comIscreat = true;
            },
            scrap(){
                send({
                    type:'put',
                    url:'finance:/invoice/register/scrap/'  + this.res.invoiceRegisterId,
                },function(err,res){
                    if(err)return console.log(res);
                    if(res.status == 200){
                        console.log(res)
                        alert('作废成功', 'success');
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
    #invoice_check .center{
        text-align: center;
    }
    #invoice_check .modal-body{
        padding:15px 23px;
    }


    #invoice_check article{
        margin:0;
        float:none;
        font-size:18px;
    }
    #invoice_check article:after{
        width:1400px;
        left:100px;
    }
/*     #invoice_check  article i{
        content:'';
        display:inline-block;
        width:14px;
        height:14px;
        margin-left:10px;
        top:0;
        left:0px;
        cursor: pointer;
        background:url('../../../../../assets/up.png') no-repeat 0 5px;
        
    }
    #invoice_check  article.up i{
        background:url('../../../../../assets/down.png') no-repeat 0 7px;
    } */
    #invoice_check .details{
        padding:10px 50px;
        background:#fff;
    }

    #invoice_check .row{
        margin-bottom: 10px;
    }

    #invoice_check .row:nth-child(1){
        margin-top: 0;
    } 
    #invoice_check .modal-footer{
        margin:10px 0;
        padding:0;
    }
    .newV{
        font-size: 12px;
        color: #39b6e5;
        margin-top: 4px;
        margin-left: 20px;
    }
</style>