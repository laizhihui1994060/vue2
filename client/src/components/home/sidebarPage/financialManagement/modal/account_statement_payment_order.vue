<template>
    <div id='account_statement_payment_order' >
        <div class="modal-body">
            <breadcrumb
                :arr="[{path:'/LoginFinish/financialManagement/account_statement',text:'对账单'},{path:'',text: '付款单登记'}]"/>

            <div>
                <article style="margin-top:0">订单信息<i></i></article>
                <div class="details">
                    <div class="row">
                        <div class="col-xs-12">
                            <btn-select  
                                width="11rem" 
                                label="收款客户"
                                padding="0"
                                :disabled='true'    
                                url="client:/helper/partner"
                                method='post'
                                :param="{'isCustomer': true,'cooperationStatus':'UNDER_CONTRACT'}"
                                filter="name"
                                filterName='partnerId'
                                :uuid='true' 
                                field='partnerId'
                                :value='partnerId'
                                name="partnerId"
                                @updata="integrationDate"
                                label-right="12px" />
                        </div>
                        
                    </div>
                    
                    <div class="row">
                        <div class="col-xs-4">
                            <form-label-input 
                                label='收&nbsp;&nbsp;款&nbsp;人'
                                @updata='integrationDate'
                                :disabled='disabled'
                                inputWidth='3.44rem'
                                :value='information.receivePersonName'
                                name='receivePersonName' />
                        </div>
                        
                    </div>

                    <div class="row">
                        <div class="col-xs-4">
                            <btn-select  
                                label="付款方式"
                                width='2.95rem'
                                btnWidth='0.5rem'
                                :disabled='disabled'
                                padding="0"
                                :arr="[{ name:'现金', code:'CASH' }, {name: '银行转账', code: 'TRANSFER'}, {name: '电汇', code: 'WIRE'}, {name: '支票', code: 'CHECK' }]"
                                filter="name" 
                                filterName='code'
                                :uuid='true'
                                field='code'
                                :value='information.payMethod'
                                name="payMethod"
                                @updata="integrationDate"
                                label-right="12px" />
                        </div>
                        <div class="col-xs-4">
                            <datetimepicker
                                label='付款日期'
                                background="#DCF4FC"
                                width='3.44rem'
                                padding='4px'
                                @updata = 'integrationDate'
                                :value='information.payDate'
                                :disabled='disabled'
                                name="payDate"
                            ></datetimepicker>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-4">
                            <form-label-input 
                                label='发票单号'
                                @updata='integrationDate'
                                inputWidth='3.44rem'
                                :value='information.invoiceNo'
                                :disabled='disabled'
                                name='invoiceNo'/>
                        </div>
                        <div class="col-xs-4">
                            <form-label-input 
                                label='付款金额'
                                type='number'
                                inputWidth='3.44rem'
                                @updata='integrationDate'
                                unit='元'
                                :value='information.payAmt'
                                :disabled='disabled'
                                name='payAmt'/>
                        </div>
<!--                         <div class="col-xs-6">
                            <button type="button" class="btn btn-primary">领用发票登记</button>
                        </div> -->
                    </div>
                    <div class="row">
                        <div class="col-xs-6">
                            <btn-select  
                                label="经&nbsp;&nbsp;手&nbsp;人"
                                padding="0"
                                :disabled='disabled'
                                width='2.95rem'
                                btnWidth='0.5rem'
                                url='client:/helper/emp'
                                method='post'
                                filter="empName" 
                                :uuid='true'
                                field='empId'
                                :value='information.handlePersonId'
                                name="handlePersonId"
                                @updata="integrationDate"
                                label-right="12px" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <input-text
                                label="备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注"
                                input-width="15.5rem"
                                :value='information.remark'
                                name='remark'
                                :disabled='disabled'
                                @updata="integrationDate" />
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="modal-footer">
            <div class="btns">
                <button type="button" class="btn" @click="add">保存</button>
                <a class="return" href="javascript:history.go(-1);">返回</a>

            </div>
        </div>
    </div>
</template>


<script>
    import btnSelect from '../../../../../common_component/btn_select.vue'
    import inputImg from '../../../../../common_component/inputImg.vue'
    import inputText from '../../../../../common_component/inputText.vue'
    import getData from "../../../../../../static/js/getData.js"
    import breadcrumb from '../../../../../common_component/breadcrumb.vue'
    import formLabelInput from '../../../../../common_component/form-label-input.vue'
    import datetimepicker from '../../../../../common_component/datetimepicker.vue'

    export default{
        components:{
            btnSelect,
            inputImg,
            inputText,
            breadcrumb,
            formLabelInput,
            datetimepicker
        },
        data(){
            return {
                disabled: false,
                res:{},
                information: {
                    payMethod: ''
                },
                id: '',
                partnerId: ''
            }
        },
        created(){
            

            this.id = this.$route.params.id;
            this.partnerId = this.$route.params.partnerId;
            this.res['finReconciliationId'] = this.id;
            console.log(this.id)

        },
        methods:{      
            integrationDate(name,item){
                if(name == 'handlePersonId'){
                    this.res['handlePersonName'] = item.empName;
                    this.res[name]= item.empId;
                }else{
                    this.res[name]= item;

                }

            },
            add(){
                const _this = this;
                const bool = getData('#account_statement_payment_order');

                if(bool){
                    send({
                        url: 'finance:/payments',
                        type: 'post',
                        param: _this.res
                    }, function(err, res){
                        if(res.status == 200){
                            alert('添加成功！', 'success');
                            window.history.go(-1);
                        }else{
                            alert('添加失败，请联系管理员');
                        }
                    })
                }else{
                    alert('请完整填写资料！')
                }
                
            }
        }
    }
</script>
<style>
    #account_statement_payment_order label{
        min-width: 60px;
    }
    #account_statement_payment_order .modal-body{
        padding:15px 23px;
    }
    #account_statement_payment_order .modal-body > div{
        margin-bottom: 40px;
    }
    #account_statement_payment_order .modal-footer button{
        margin:0 50px;
    }
    #account_statement_payment_order article{
        margin:0;
        float:none;
        font-size:18px;
    }
    #account_statement_payment_order article:after{
        width:1400px;
        left:100px;
    }
 /*    #account_statement_payment_order  article i{
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
    #account_statement_payment_order  article.up i{
        background:url('../../../../../assets/down.png') no-repeat 0 7px;
    } */
    #account_statement_payment_order .details{
        padding:10px 50px;
        background:#fff;
    }

    #account_statement_payment_order .row{
        margin-bottom: 10px;
    }
    #account_statement_payment_order .btn-primary{
        color: #fff;
        background-color: #39B6E5;
        border-radius: 0;
        padding: 3px 12px;
        border-width: 0
    }

    #account_statement_payment_order .modal-footer button{
        margin:0 50px;
    }
</style>