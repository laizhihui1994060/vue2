<template>
    <div id='income_check' >
        <div class="modal-body">
            <breadcrumb
                :arr="[{path:'/LoginFinish/financialManagement/income',text:'收入'},{path:'',text: '收入详情' }]"/>

            <div>
                <article style="cursor:pointer;" @click='showDetails($event)'>
                    收入信息<span class='img up' style='display: inline-block;position: relative; left:10px;top:-2px'></span>
                </article>

                <div class="details">
                    <div class="row">
                        <div class="inline">
                            <btn-select  
                                width="498px" 
                                label="付款客户"
                                padding="0"
                                :disabled='disabled'    
                                url="client:/helper/partner"
                                method='post'
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
                        <div class="inline">
                            <form-label-input 
                                label='付&nbsp;&nbsp;款&nbsp;人'
                                @updata='integrationDate'
                                :disabled='disabled'
                                inputWidth='200px'
                                :value='information.payPersonName'
                                name='payPersonName' />
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
                                label='收款日期'
                                background="#DCF4FC"
                                width='200px'
                                padding='4px'
                                @updata = 'integrationDate'
                                :value='information.receiveDate'
                                :disabled='disabled'
                                name="receiveDate"
                            ></datetimepicker>
                        </div>
                    </div>
                    <div class="row">
                        <div class="inline">
                            <form-label-input 
                                label='收款金额'
                                inputWidth='200px'
                                @updata='integrationDate'
                                unit='元'
                                :value='information.receiveAmt'
                                :disabled='disabled'
                                name='receiveAmt'/>
                        </div>
<!--                         <div class="col-xs-6">
                            <button type="button" class="btn btn-primary">领用发票登记</button>
                        </div> -->
                    </div>
                    <div class="row">
                        <div class="inline">
                            <btn-select  
                                label="经&nbsp;&nbsp;手&nbsp;人"
                                padding="0"
                                :disabled='disabled'
                                width='200px'
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
                        <div class="inline">
                            <input-text
                                label="备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注"
                                input-width="498px"
                                :value='information.remark'
                                name='remark'
                                :disabled='remarkDisabled'
                                @updata="integrationDate" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12">
                            <inputImg name='photoImageIds' :limit='4' @updata='integrationDate' :disabled='disabled' :arr='information.photoImageIds'></inputImg>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="modal-footer">
            <div class="btns">
                <button type="button" class="btn radius-btn" @click="modify" v-if='!information.confirmedBy'>{{footerTxt}}</button>
                <button type="button" class="btn radius-btn" @click="check" v-if='!information.confirmedBy'>审核</button>
                <router-link tag='button' :to = "{ path: '/LoginFinish/financialManagement/income' }" active-class=' ' class='btn radius-btn'>返回</router-link>
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
                res:{
                  photoImageIds: ''
                },
                information: {
                    payMethod: ''
                },
                footerTxt: '修改'
            }
        },
        mounted(){
            this.information = this.$route.params.information;
            this.res = this.information;
        },
        methods:{      
            integrationDate(name,item){
                if(name == 'handlePersonId'){
                    this.res['handlePersonId'] = item.empId;
                    this.res['handlePersonName'] = item.empName;
                    return ;
                }else if(name == 'images'){
                    this.information['photoImageIds'] = item;
                }
                this.res[name]= item;
                console.log(this.res);
            },
            showDetails(){
                $(event.currentTarget).find('span').toggleClass('down');
                $(event.currentTarget).siblings('.details').slideToggle('fast');
            },
            modify(){
            	const _this = this;
                if(_this.information.confirmedBy) return alert('收款单已审核，不能再更改');

            	if(_this.disabled){
                    _this.footerTxt = '保存';
            		_this.disabled = _this.remarkDisabled = false;
            	}else{
            		let promise =  new Promise( (resolve, reject) => {
                              fileUp(_this.information.photoImageIds, function(res){
                                  console.log(res);
                                  _this.res.photoImageIds = res;
                                  resolve();
                              })
                        });

                        promise.then( () => {
                              send({
                                url: 'finance:/receivables/' + _this.information.receivesId,
                                type: 'put',
                                param: _this.res
                              }, function(err, res){
                                console.log(err, res);
                                _this.footerTxt = '修改';
                                _this.disabled = _this.remarkDisabled = true;
                                if(res.status == 200) alert('修改成功！', 'success');
                                else alert('修改失败，请联系管理员！');
                              });
                        })
            	}
            },
            check(){
                const _this = this;
                if(_this.information.confirmedBy) return alert('收款单已审核');
                    send({
                        url: 'finance:/receivables/check/' + _this.information.receivesId,
                        type: 'post',
                        param: {
                            remark: _this.res.remark
                        }
                    }, function(err, res){
                        alert(res.msg, res.status == 200 ? 'success' : 'error');
                        _this.information.confirmedBy = true;
                        window.history.go(-1);
                        console.log(res);
                    })

            }
        }
    }
</script>
<style scoped>
    #income_check label{
        min-width: 60px;
    }
    #income_check .modal-body{
        padding:15px 23px;
    }
    #income_check .modal-body > div{
        margin-bottom: 40px;
    }
    #income_check .modal-footer button{
        margin:0 50px;
    }
    #income_check article{
        margin:0;
        float:none;
        font-size:18px;
    }
    #income_check article:after{
        left:100px;
    }
    #income_check .details{
        padding:10px 50px;
        background:#fff;
        margin-top: 10px;
    }

    #income_check .row{
        margin-bottom: 10px;
    }
    #income_check .btn-primary{
        color: #fff;
        background-color: #39B6E5;
        border-radius: 0;
        padding: 3px 12px;
        border-width: 0
    }

    #income_check .modal-footer button{
        margin:0 50px;
    }

    .inline{
        display: inline-block;
    }
    .inline > div{
        padding-left: 15px
    }
</style>