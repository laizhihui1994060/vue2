<template>
    <div class="modal fade" id="account_statement_receipt_add" tabindex="-1" role="dialog" aria-labelledby="orderShare" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                 <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title text-center" id="myModalLabel">添加收款记录</h4>
                </div>
                <div class="modal-body">
                    <div class="details">
                        <div class="row">
                            <div class="col-xs-12">
                                <form-label-input 
                                    label='付款客户'
                                    @updata='integrationDate'
                                    :disabled='true'
                                    :after="true"
                                    inputWidth='425px'
                                    :value='customerName'
                                    name='customerName' />
                            </div>
                            
                        </div>
                        
                        <div class="row">
                            <div class="col-xs-6">
                                <form-label-input 
                                    label='付&nbsp;&nbsp;款&nbsp;人'
                                    @updata='integrationDate'
                                    :disabled='disabled'
                                    :after="true"
                                    inputWidth='156px'
                                    :value='information.payPersonName'
                                    name='payPersonName' />
                            </div>
                            <div class="col-xs-6">
                                <btn-select  
                                    label="付款方式"
                                    width='156px'
                                    :disabled='disabled'
                                    :after="true"
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
                        </div>

                        <div class="row">
                            <div class="col-xs-6">
                                <datetimepicker
                                    label='收款日期'
                                    background="#DCF4FC"
                                    width='156px'
                                    padding='4px'
                                    @updata = 'integrationDate'
                                    :value='information.receiveDate'
                                    :disabled='disabled'
                                    :after="true"
                                    name="receiveDate"
                                ></datetimepicker>
                            </div>
                            <div class="col-xs-6">
                                <form-label-input 
                                    label='收款金额'
                                    type='number'
                                    inputWidth='156px'
                                    @updata='integrationDate'
                                    unit='元'
                                    :value='information.receiveAmt'
                                    :disabled='disabled'
                                    :after="true"
                                    name='receiveAmt'/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-6">
                                <btn-select  
                                    label="经&nbsp;&nbsp;手&nbsp;人"
                                    padding="0"
                                    :disabled='disabled'
                                    :after="true"
                                    width='156px'
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
                                    input-width="425px"
                                    :value='information.remark'
                                    name='remark'
                                    :disabled='disabled'
                                    @updata="integrationDate" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <inputImg :limit='4' @updata='collectImg' name='images'></inputImg>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-footer">
                    <div class="btns">
                        <button type="button" class="btn"  @click="add">添加收款</button>
                        <button type="button" class="btn"  data-dismiss="modal">关闭窗口</button>
                    </div>
                </div>
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
        props:['customerName','finReconId', 'partnerId'],
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
                id: '',
                information: {
                    payMethod: ''
                }, 
                images: []
            }
        },
        methods:{      
            integrationDate(name,item){
                if(name == 'handlePersonId'){
                    this.res['handlePersonName'] = item.empName;
                    this.res['handlePersonId'] = item.empId;
                    return ;
                }
                this.res[name]= item;
                console.log(this.res);
            },
            collectImg(name, item){
                this.images = item;
            },
            // 清空
            clear(){
                $('#account_statement_receipt_add').find('input:not([name=customerName]), button.filter, textarea').val('').text('');
            },
            add(){
                const _this = this;
                let bool = true;
                $('#account_statement_receipt_add').find('[verify="true"]').each(function(index, el) {
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
                if(bool){
                    let promise = new Promise( (resolve, reject) => {
                        fileUp(_this.images, function(res){
                            console.log(res);
                            _this.res['photoImageIds'] = res;
                            resolve()
                        });
                    });
                    promise.then( () => {
                        _this.res.partnerId = _this.partnerId;
                        send({
                            url: 'finance:/receivables',
                            type: 'post',
                            param: _this.res
                        }, function(err, res){
                            if(res.status == 200){
                                alert('添加成功！', 'success');
                                $('#account_statement_receipt_add').modal('hide');
                                _this.clear();
                                _this.$emit('updata');
                            }else{
                                alert(res.msg ? res.msg : '添加失败，请联系管理员');
                            }
                        })
                    })
                }else{
                    alert('请完整填写资料！')
                }
                
            }
        },
        watch:{
            finReconId(newv){
                console.log(newv)
                this.res['finReconciliationId'] = this.finReconId;
            }
        }
    }
</script>

<style>
    #account_statement_receipt_add .modal-dialog{
        width: 600px;
    }
     #account_statement_receipt_add label{
        min-width: 60px;
    }
    #account_statement_receipt_add .modal-body{
        padding: 0;
    }
    #account_statement_receipt_add .modal-body > div{
        margin-bottom: 40px;
    }
    #account_statement_receipt_add .modal-footer button{
        margin:0 50px;
    }
    #account_statement_receipt_add article{
        margin:0;
        float:none;
        font-size:18px;
    }
    #account_statement_receipt_add article:after{
        width:1400px;
        left:100px;
    }
/*     #account_statement_receipt_add  article i{
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
    #account_statement_receipt_add  article.up i{
        background:url('../../../../../assets/down.png') no-repeat 0 7px;
    } */
    #account_statement_receipt_add .details{
        padding:10px 45px;
        background:#fff;
    }

    #account_statement_receipt_add .row{
        margin-bottom: 10px;
    }
    #account_statement_receipt_add .btn-primary{
        color: #fff;
        background-color: #39B6E5;
        border-radius: 0;
        padding: 3px 12px;
        border-width: 0
    }

    #account_statement_receipt_add .modal-footer button{
        margin:0 50px;
    }
</style>