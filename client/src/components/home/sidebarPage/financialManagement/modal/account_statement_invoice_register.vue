<template>
    <div>
        <div class="modal-body"  id='invoice_register'>
            <breadcrumb
            
                :arr="[{path:'/LoginFinish/financialManagement/account_statement',text:'对账单'},{path:'auto',text: res.reconciliationCode},{path:'',text: '开票登记'}]"/>

            <div>
                <article style="margin-top:0">开票登记<i></i></article>
                <div class="details">
                    <div class="row">
                        <div class="col-xs-12">
                            <form-label-input 
                                label="往来单位" 
                                @updata = 'integrationDate'
                                inputWidth='545px'
                                :value="partnerName"
                                :disabled="disabled"/>
                        </div>

                    </div>

                    <div class="row">
                        <div class="col-xs-12">

                            <btn-select  
                                width="545px" 
                                label="开票单位"
                                padding="0"
                                :url="'finance:/invoice/company/partner/' + id"
                                filter="companyName" 
                                name="invoicingCompanyName"
                                @updata="integrationDate"
                                :after="true"
                                label-right="12px" 
                                :updata-key='invoicingUnitNum'
                                id="invoicingUnitBtn"
                                :uuid="true"
                                field="invoiceCompanyId"
                                :value="res.invoicingCompanyId"/>
                            <a href="javascript:;" class="newV" data-toggle="modal" @click="open('#invoicingUnit')" data-target="#invoicingUnit">新建</a>
                            <a href="javascript:;" class="newV" @click="xiugai('#invoicingUnit')">修改</a>


                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <form-label-input 
                                label='地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 址' 
                                @updata = 'integrationDate'
                                inputWidth='545px'
                                name='invoicingCompanyAddress'
                                :disabled="disabled"
                                :value="res.invoicingCompanyAddress"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <form-label-input 
                                label='开户银行' 
                                @updata = 'integrationDate'
                                inputWidth='545px'
                                name='invoicingBankName'
                                :disabled="disabled"
                                :value="res.invoicingBankName"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                                <form-label-input 
                                    label='开户账号' 
                                    @updata = 'integrationDate'
                                    inputWidth='545px'
                                    name='invoicingBankAcctNo'
                                    :disabled="disabled"
                                    :value="res.invoicingBankAcctNo"/>
                        </div>
                    </div>
    


                    <!-- <div class="row">
                        <div class="col-xs-12">
                            <btn-select  
                                label="发&nbsp;&nbsp;票&nbsp;&nbsp;薄"
                                :after="true"
                                padding="0"
                                url="finance:/invoice/book/list"
                                :updata-key='invoiceBookNum'
                                method="post"
                                :params="{pageSize:1000,pageIndex:1}"
                                filter="invoiceBookNo" 
                                name="invoiceBookId"
                                @updata="integrationDate"
                                width="520px" 
                                label-right="12px" 
                                :uuid="true"
                                field="invoiceBookId"
                                :value="res.invoiceBookId"/>


                            <a href="javascript:;" class="newV" data-toggle="modal" @click="open('#invoiceBook')" data-target="#invoiceBook">新建</a>
                            <a href="javascript:;" class="newV" @click="xiugai('#invoiceBook')">修改</a>

                        </div>
                    </div> -->



                    <!-- <div class="row">
                        <div class="col-xs-12">
                                    
                            <form-label-input 
                                label='发票张数'  
                                :disabled='true'
                                pmargin-right="25px"
                                name='qtyInit'
                                type="number"
                                @updata="integrationDate" 
                                input-width="214px"
                                :value="res.qtyInit"/>

                            <form-label-input 
                                label='最大开票金额'  
                                name='maxAmount'
                                :disabled='true'
                                @updata="integrationDate" 
                                input-width="214px"
                                label-right="0"
                                :value="res.maxAmount"/>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12">
                            <form-label-input 
                                pmargin-right="40px"
                                :disabled='true'
                                label='起始编号'  
                                name='invoiceBookStartNo'
                                @updata="integrationDate" 
                                input-width="214px"
                                :value="res.invoiceBookStartNo"/>
                                
                            <form-label-input 
                                label='结束编号'  
                                :disabled='true'
                                name='invoiceBookEndNo'
                                @updata="integrationDate" 
                                input-width="214px"
                                :value="res.invoiceBookEndNo"/>
                        </div>
                    </div> -->
                    <!-- <div class="row">
                        <div class="col-xs-12">

                            <form-label-input 
                                label='发票号码'  
                                :after="true"
                                name='invoiceBookNo'
                                @updata="integrationDate" 
                                input-width="214px"
                                :value="res.invoiceBookNo"/>

                        </div>
                    </div> -->


                    <div class="row"></div>
                    <div class="row"></div>


                    <div class="row">
                        <div class="col-xs-12">
                            <btn-select  
                                label="开票项目"
                                padding="0"
                                url="finance:/invoice/item/org"
                                :after="true"
                                filter="name" 
                                name="invoiceItemId"
                                @updata="integrationDate"
                                :updata-key='invoiceItemNum'
                                width="545px" 
                                label-right="12px" 
                                :uuid="true"
                                field="invoiceItemId"
                                :value="res.invoiceItemId"/>

                                <a href="javascript:;" class="newV" data-toggle="modal" @click="open('#invoiceItem')" data-target="#invoiceItem">新建</a>
                                <a href="javascript:;" class="newV" @click="xiugai('#invoiceItem')">修改</a>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12">
                            <btn-select  
                                label="发票类型"
                                padding="0"
                                :after="true"
                                url='finance:/invoice/type/org'
                                filter="name" 
                                :updata-key='invoiceTypeNum'
                                name="invoiceTypeId"
                                @updata="integrationDate"
                                label-right="12px" 
                                width="545px" 
                                :uuid="true"
                                field="invoiceTypeId"
                                :value="res.invoiceTypeId"/>

                            <a href="javascript:;" class="newV" data-toggle="modal" @click="open('#invoiceType')" data-target="#invoiceType">新建</a>
                            <a href="javascript:;" class="newV" @click="xiugai('#invoiceType')">修改</a>

                        </div>

                    </div>



                    <div class="row">
                        <div class="col-xs-12">
                               
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
                                :after="true"
                                :value="res.invoicingAmt"/>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12">
                            <form-label-input 
                                label='发票号码'  
                                name='invoiceBookNo'
                                pmargin-right="40px"
                                :after="true"
                                @updata="integrationDate" 
                                input-width="214px"
                                :value="res.invoiceBookNo"/>   

                            <datetimepicker
                                label='开票日期'
                                width="214px"
                                :after="true"
                                @updata = 'integrationDate'
                                name='invoicingDate'
                                :value="res.invoicingDate"/>


                        </div>
                    </div>


                    <div class="row"></div>
                    <div class="row"></div>


                    <div class="row">
                        <div class="col-xs-12">
                            <form-label-input 
                                pmargin-right="40px"
                                label='快递单号' 
                                @updata = 'integrationDate'
                                inputWidth='214px'
                                :after="true"
                                name='mailNo'
                                :value="res.mailNo"/>
                            <datetimepicker
                                label='快递日期'
                                width="214px"
                                :after="true"
                                @updata = 'integrationDate'
                                name='mailDate'
                                :value="res.mailDate"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <btn-select  
                                width="191px" 
                                label="快递公司"
                                padding="0"
                                :after="true"
                                url="control:/sys/param" 
                                method='post'
                                :params="['/sys/mailer']"
                                filter="name" 
                                name="mailer"
                                @updata="integrationDate"
                                label-right="12px" 
                                :value="res.mailer"/>
                        </div>
                    </div>

    

                    <div class="row"></div>
                    <div class="row"></div>

                    <div class="row">
                        <div class="col-xs-12">

                            <btn-select  
                                width="545px" 
                                label="收&nbsp;&nbsp;件&nbsp;人"
                                padding="0"
                                :after="true"
                                :updata-key='invoiceAddresseeNum'
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
                                <a href="javascript:;" class="newV" data-toggle="modal" @click="open('#invoiceAddressee')" data-target="#invoiceAddressee">新建</a>
                                <a href="javascript:;" class="newV" @click="xiugai('#invoiceAddressee')">修改</a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <form-label-input 
                                label='收件地址' 
                                @updata = 'integrationDate'
                                inputWidth='545px'
                                name='mailReceiveAddress'
                                :disabled="disabled"
                                :value="res.mailReceiveAddress"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <form-label-input 
                                pmargin-right="40px"
                                label='电话号码' 
                                @updata = 'integrationDate'
                                inputWidth='214px'
                                name='mailReceivePhone '
                                :disabled="disabled"
                                :value="res.mailReceivePhone"/>
                        </div>
                    </div>

                </div>
                
            </div>
        </div>
        <div class="modal-footer">
            <div class="btns">
                <button type="button" class="radius-btn" @click="submit">{{isCreate ? '登记' : '修改'}}</button>
                <button v-if="!isCreate" type="button" class="radius-btn" @click="scrap">作废</button>
                <a style="margin-left:100px;" class="return radius-btn" href="javascript:history.go(-1);">返回</a>
            </div>
        </div>

        <invoicing-unit @update="invoicingUnitClear" :id="id" :current-info="currentInfo" :comIscreat="comIscreat" :num="invoicingUnitNum"/>
        <invoice-addressee @update="invoiceAddresseeClear" :id="id" :current-info="currentInfo" :comIscreat="comIscreat" :num="invoiceAddresseeNum"/>
        <invoice-book  @update="invoiceBookClear" :id="id" :current-info="currentInfo" :comIscreat="comIscreat" :num="invoiceBookNum"/>
        <invoice-item  @update="invoiceItemClear"  :id="id" :current-info="currentInfo" :comIscreat="comIscreat" :num="invoiceItemNum"/>
        <invoice-type  @update="invoiceTypeClear"  :id="id" :current-info="currentInfo" :comIscreat="comIscreat" :num="invoiceTypeNum"/>
    </div>
</template>

<script>
    import btnSelect from '../../../../../common_component/btn_select.vue'
    import datetimepicker from '../../../../../common_component/datetimepicker.vue'
    import breadcrumb from '../../../../../common_component/breadcrumb.vue'
    import formLabelInput from '../../../../../common_component/form-label-input.vue'
    import invoicingUnit from "../modal/invoicingUnit.vue";
    import invoiceAddressee from "../modal/invoiceAddressee.vue";
    import invoiceBook from "../modal/invoiceBook.vue";
    import invoiceItem from "../modal/invoiceItem.vue";
    import invoiceType from "./invoiceType.vue";

    export default {
        components:{
            btnSelect,
            datetimepicker,
            breadcrumb,
            formLabelInput,
            invoicingUnit,
            invoiceAddressee,
            invoiceBook,
            invoiceItem,
            invoiceType
        },
        data(){
            return{
                isCreate: '',
                id: '',
                invoicingUnitNum:0,
                invoiceAddresseeNum:0,
                invoiceBookNum:0,
                invoiceItemNum:0,
                invoiceTypeNum:0,
                comIscreat:false,//是否新建
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
                    mailReceiveId:'' ,
                    invoicingDate:new Date(),
                    mailDate: new Date()
                },
                partnerName :'',
                currentInfo:{}
            }
        },
        created(){
            this.isCreate = this.$route.params.isCreate.toString() === 'true';
            if(this.isCreate){
                this.id = this.$route.params.id.split('|')[0];
                console.log(this.id)
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


            if(!this.isCreate){
                send({
                    type:'post',
                    url:'finance:/recon/list',
                    param:{
                        pageSize:1,
                        pageIndex:1,
                        finInvoicingId:this.finInvoicingId
                    }
                },function(err,res){
                    if(err)return console.log(err);
                    if(res.status == 200){
                        var data = res.content[0];
                        self.res = data ;
                        $('#invoice_register .modal-body').find('input').attr('disabled',true);
                        $('#invoice_register .modal-body').find('button').attr('disabled',true);
                        console.log(res);
                    }else{
                        console.log(res);
                    }
                })
            }
        },
        methods:{
            integrationDate(name,item){
                // console.log("thisres");
                // console.log(JSON.stringify(this.res));
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
                    this.currentInfo = item;
                }else if(name == 'invoiceTypeId'){
                    this.res['invoiceTypeId'] = item.invoiceTypeId;
                    this.res['invoiceTypeName'] = item.name;
                    this.currentInfo = item;
                }else if(name == 'mailer'){
                    this.res['mailer'] = item.name
                }else if(name == 'invoiceBookId'){
                    this.res['invoiceBookEndNo'] = item.invoiceBookEndNo;
                    this.res['invoiceBookId'] = item.invoiceBookId;
                    this.res['qtyInit'] = item.qtyInit;
                    this.res['invoiceTypeId'] = item.invoiceTypeId;
                    this.res['invoiceBookStartNo'] = item.invoiceBookStartNo;
                    this.res['maxAmount'] = item.maxAmount;
                    this.currentInfo = item;
                }else{
                    this.res[name]= item;
                }
                console.log(this.res)
            },
            invoicingUnitClear(){
                this.res['invoicingCompanyName'] = '';
                this.res['invoicingCompanyId'] = '';
                this.res['invoicingBankName'] = '';
                this.res['invoicingBankAcctNo'] = '';
                this.res['invoicingCompanyAddress'] = '';
                ++this.invoicingUnitNum
            },
            invoiceAddresseeClear(){
                this.res['mailReceiveName'] = '';
                this.res['mailReceiveAddress'] = '';
                this.res['mailReceivePhone'] = '';
                this.res['mailReceiveId'] = '';
                ++this.invoiceAddresseeNum

            },
            invoiceBookClear(){
                this.res['invoiceBookEndNo'] = '';
                this.res['qtyInit'] = '';
                this.res['invoiceTypeId'] = '';
                this.res['invoiceBookStartNo'] = '';
                this.res['maxAmount'] = '';
                this.res['invoiceBookNo'] = '';
                $('#invoice_register').find('[name="invoiceBookNo"]').text('');
                $('#invoice_register').find('[name="invoiceTypeId"]').text('');
                ++this.invoiceBookNum
            },
            invoiceItemClear(){
                ++this.invoiceItemNum;
            },
            invoiceTypeClear(){
                ++this.invoiceTypeNum;
            },
            submit(){

                const self = this;

                let bool = true;
                $('#invoice_register').find('[verify="true"]').each(function(index, el) {
                    el.style.border="none"
                    if( (el.tagName.toLocaleLowerCase() == 'input' ) &&  !el.value){
                        el.style.border="1px solid rgb(249, 188, 188)";
                        bool = false;
                    };

                    if( (el.tagName.toLocaleLowerCase() != 'input' ) && !el.innerHTML){
                        el.style.border="1px solid rgb(249, 188, 188)";
                        bool = false;
                    }

                });

                if(!bool)return alert('数据不完整，请先完善数据');

                if(this.isCreate){
                    console.log(this.res)
                    send({
                        type:'post',
                        url:'finance:/invoice/register',
                        param:this.res
                    },function(err,res){
                        if(err)return console.log(res);
                        if(res.status == 200){
                            console.log(res)
                            alert('添加成功', 'success');
                            window.history.back(-1);
                        }else{
                            console.log(res);
                            alert(res.msg);
                        }
                    })
                }else{
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
                                $('#invoice_register .modal-body').find('input').attr('disabled',true);
                                $('#invoice_register .modal-body').find('button').attr('disabled',true);
                            }else{
                                console.log(res);
                                alert(res.msg)
                            }
                        })
                    }else{
                        $('#invoice_register .modal-body').find('input').attr('disabled',false);
                        $('#invoice_register .modal-body').find('button').attr('disabled',false);
                        setTimeout(function(){
                            self.disabled = 'disabled';
                        }, 30);
                        this.disabled = false;
                    }

                    this.isxiu = !this.isxiu;
                }
            },
            xiugai(id){
                console.log(id)
                this.comIscreat = false;
                this.switchs(id);
                if(this.res.invoicingBankAcctNo || this.res.mailReceiveAddress || this.res.qtyInit || this.res.invoiceItemId || this.res.invoiceTypeId){
                    $(id).modal('show');
                }else{
                    return alert('请先选择一张单位信息');
                }
            },
            open(id){
                console.log($(id))
                this.switchs(id)
                this.comIscreat = true;
            },
            switchs(id){
                if( id == "#invoiceAddressee"){
                    ++this.invoiceAddresseeNum;
                }else if( id == "#invoicingUnit"){
                    ++this.invoicingUnitNum;
                }else if( id == "#invoiceBook"){
                    ++this.invoiceBookNum;
                }else if( id == "#invoiceItem"){
                    ++this.invoiceItemNum;
                }else if( id == "#invoiceType"){
                    ++this.invoiceTypeNum;
                }
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
    #invoice_register .center{
        text-align: center;

        position: relative
    }

    #invoice_register {
        margin-top: 22px;
        margin-left: 38px;
        position: relative;
    }

    #invoice_register article{
        margin:0;
        float:none;
        font-size:18px;
    }
  /*   #invoice_register  article i{
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
    #invoice_register  article.up i{
        background:url('../../../../../assets/down.png') no-repeat 0 7px;
    } */
    #invoice_register .details{
        padding:10px 50px;
        background:#fff;
    }

    #invoice_register .row{
        margin-bottom: 10px;
    }

    #invoice_register .row:nth-child(1){
        margin-top: 0;
    } 
    .newV{
        font-size: 12px;
        color: #39b6e5;
        margin-top: 4px;
        margin-left: 20px;
    }
</style>