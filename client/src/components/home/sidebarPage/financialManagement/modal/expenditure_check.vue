<template>
    <div id='expenditure_check' >
        <div class="modal-body">
            <breadcrumb
                :arr="[{path:'/LoginFinish/financialManagement/expenditure',text:'支出'},{path:'',text: '支出详情'}]"/>

            <div>
                <article style="cursor:pointer;" @click='showDetails($event)'>
                    订单信息<span class='img up' style='display: inline-block;position: relative; left:10px;top:-2px'></span>
                </article>

                <div class="details">
                    <div class="row">
                        <div class="col-xs-12">
                            <btn-select  
                                width="544px" 
                                label="收款客户"
                                padding="0"
                                :disabled='disabled'	
                                url="client:/helper/partner"
                                method='post'
                                :param="{'isCustomer': true,'cooperationStatus':'UNDER_CONTRACT'}"
                                filter="name"
                                filterName='partnerId'
                              	:uuid='true'
                              	field='partnerId'
                              	:value='information.partnerId'
                                name="partnerId"
                                @updata="integrationDate"
                                label-right="12px" />
                        </div>
                        
                    </div>
					
					<div class="row">
						<div class="col-xs-12">
							<form-label-input 
							    label='收&nbsp;&nbsp;款&nbsp;人'
							    @updata='integrationDate'
							    :disabled='disabled'
							    inputWidth='200px'
							    :value='information.receivePersonName'
							    name='invoiceNo' />
						</div>
						
					</div>

                    <div class="row">
                        <div class="inline">
                            <btn-select  
                                label="付款方式"
                                width='200px'
                                btnWidth='0.5rem'
                                :disabled='disabled'
                                padding="0"
                                :arr="[{ name:'现金', code:'CASH' }, {name: '银行转账', code: 'TRANSFER'}, {name: '电汇', code: 'WIRE'}, {name: '支票', code: 'CHECK'}]"
                                filter="name" 
                                filterName='code'
                                :uuid='true'
                                field='code'
                                :value='information.payMethod'
                                name="payMethod"
                                @updata="integrationDate"
                                label-right="12px" />
                        </div>
                        <div class="inline">
                        	<datetimepicker
                        	    label='付款日期'
                        	    background="#DCF4FC"
                        	    width='200px'
                        	    padding='4px'
                        	    @updata = 'integrationDate'
                        	    :value='information.payDate'
                        	    :disabled='disabled'
                        	    name="joinDate"
                        	></datetimepicker>
                        </div>
                    </div>
                    <div class="row">
                        <div class="inline">
                        	<form-label-input 
                        	    label='发票单号'
                        	    @updata='integrationDate'
                        	    inputWidth='200px'
                        	    :value='information.invoiceNo'
                        	    :disabled='disabled'
                        	    name='invoiceNo'/>
                        </div>
                        <div class="inline">
                        	<form-label-input 
                        	    label='付款金额'
                        	    inputWidth='200px'
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
                        <div class="col-xs-12">
                        	<btn-select  
                        	    label="经&nbsp;&nbsp;手&nbsp;人"
                        	    padding="0"
                        	    :disabled='disabled'
                        	    width='200px'
                                btnWidth='0.5rem'
                        	    url='client:/helper/emp'
                        	    method='post'
                        	    filter="empName" 
                        	    filterName='empId'
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
                                input-width="544px"
                                :value='information.remark'
                                name='remark'
                                :disabled='remarkDisabled'
                                @updata="integrationDate" />
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="modal-footer">
            <div class="btns">
                <button type="button" class="btn" @click="modify" v-if='!information.confirmedBy'>{{footerTxt}}</button>
                <button type="button" class="btn" @click="check" v-if='!information.confirmedBy'>核算</button>
                <router-link tag='button' :to = "{ path: '/LoginFinish/financialManagement/expenditure' }" active-class=' ' class='btn' style='color: #39B6E5;'>返回</router-link>
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
            	disabled: true,
                remarkDisabled: true,
                isCreate: '',
                chosen: '',
                res:{},
                information: {
                	payMethod: ''
                },
                footerTxt: '修改',
            }
        },
        mounted(){
            this.information = this.$route.params.information;
            this.res = this.information;
            console.log("information")
            console.log(this.res);
        },
        methods:{      
            integrationDate(name,item){
                this.res[name]= item;
                console.log(this.res);
            },
            showDetails(){
                $(event.currentTarget).find('span').toggleClass('down');
                $(event.currentTarget).siblings('.details').slideToggle('fast');
            },
            modify(){
            	const _this = this;
            	if(_this.information.confirmedBy) return alert('付款单已审核，不能再更改');
            	if(_this.disabled){
                    _this.footerTxt = '保存';
            		_this.disabled = _this.remarkDisabled = false;
            	}else{
            		send({
            			url: 'finance:/payments/' + _this.information.paymentsId,
            			type: 'put',
            			param: _this.res
            		}, function(err, res){
                        
            			console.log(err, res);
                        if(res.status == 200){
                            _this.footerTxt = '修改';
                            alert(res.msg, 'success');
                        }else{
                            alert(res.msg);
                        }
            		})
            	}
            },
            check(){
                const _this = this;
                if(_this.information.confirmedBy) return alert('付款单已审核');


                send({
                    url: 'finance:/payments/check/' + _this.information.paymentsId,
                    type: 'post',
                    param: _this.res['remark']
                }, function(err, res){
                    alert(res.msg, res.status == 200 ? "success" : "error");
                    window.history.go(-1);
                    console.log(res);
                })

            }
        }
    }
</script>
<style scoped>
    #expenditure_check label{
        min-width: 60px;
    }
    #expenditure_check .modal-body{
        padding:15px 23px;
    }
    #expenditure_check .modal-body > div{
        margin-bottom: 40px;
    }
    #expenditure_check .modal-footer button{
        margin:0 50px;
    }
    #expenditure_check article{
        margin:0;
        float:none;
        font-size:18px;
    }
    #expenditure_check article:after{
        left:100px;
    }
/*     #expenditure_check  article i{
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
    #expenditure_check  article.up i{
        background:url('../../../../../assets/down.png') no-repeat 0 7px;
    } */
    #expenditure_check .details{
        padding:10px 50px;
        background:#fff;
        margin-top: 10px;
    }

    #expenditure_check .row{
        margin-bottom: 10px;
    }
    #expenditure_check .btn-primary{
        color: #fff;
        background-color: #39B6E5;
        border-radius: 0;
        padding: 3px 12px;
        border-width: 0
    }

    #expenditure_check .modal-footer button{
        margin:0 50px;
    }
    .inline{
        display: inline-block;
    }
    .inline > div{
        padding-left: 15px
    }
</style>