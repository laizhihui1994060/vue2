<template>
    <div id='reimbursement_add'>
        <div class="modal-body">
            <breadcrumb
                :arr="[{path:'/LoginFinish/financialManagement/reimbursement', text:'报销管理'},{path:'',text:isCreate ? '添加报销单' : '查看报销单'}]"/>

            <div>
                <article style="margin-top:0">订单信息<i @click='showDetails'></i></article>
                <div class="details">
                    <div class="row">
                        <div class="col-xs-6">
                            <btn-select  
                                width="82px" 
                                label="报&nbsp;销&nbsp;&nbsp;人"
                                padding="0"
                                url="/item" 
                                filter="SVC_NAME" 
                                name="company_name"
                                @updata="integrationDate"
                                title="2000"
                                label-right="12px" />
                        </div>
                        <div class="col-xs-6">
                            <btn-select  
                                width="82px" 
                                label="车&nbsp;牌&nbsp;&nbsp;号"
                                padding="0"
                                url="/item" 
                                filter="SVC_NAME" 
                                name="company_name"
                                @updata="integrationDate"
                                title="国税"
                                label-right="12px" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-6">
                            <datetimepicker
                                label="支付日期"
                                label-right="12px"
                                background="#DFF5FD"
                                width="104px"
                                name="rescueTime"
                                @updata="integrationDate"
                            ></datetimepicker>
                        </div>
                        <div class="col-xs-6">
                            <btn-select  
                                width="82px" 
                                label="支付方式"
                                padding="0"
                                url="/item" 
                                filter="SVC_NAME" 
                                name="company_name"
                                @updata="integrationDate"
                                title="国税"
                                label-right="12px" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-6">
                            <btn-select  
                                width="82px" 
                                label="报销金额"
                                padding="0"
                                url="/item" 
                                filter="SVC_NAME" 
                                name="company_name"
                                @updata="integrationDate"
                                title="国税"
                                label-right="12px" />
                        </div>
                        <div class="col-xs-6">
                            <btn-select  
                                width="82px" 
                                label="费用类型"
                                padding="0"
                                url="/item" 
                                filter="SVC_NAME" 
                                name="company_name"
                                @updata="integrationDate"
                                title="路桥费"
                                label-right="12px" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-6">
                            <btn-select  
                                width="82px" 
                                label="有无票据"
                                padding="0"
                                url="/item" 
                                filter="SVC_NAME" 
                                name="company_name"
                                @updata="integrationDate"
                                title="国税"
                                label-right="12px" />
                        </div>
                        <div class="col-xs-6">
                            <btn-select  
                                width="82px" 
                                label="发票号码"
                                padding="0"
                                url="/item" 
                                filter="SVC_NAME" 
                                name="company_name"
                                @updata="integrationDate"
                                title="国税"
                                label-right="12px" />
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-xs-12">
                            <input-text
                                label="备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注"
                                input-width="58%"
                                @updata="integrationDate" name="remarks" />
                        </div>
                    </div>

                    <button type="button" class="btn btn-primary">生成收款单</button>

                    <div class='input_img_div row'>
                        <div class='col-sm-1'>
                            <input-img imgName='fsdf'></input-img>
                        </div>
                        <div class='col-sm-1'>
                            <input-img imgName='fsdf'></input-img>
                        </div>
                        <div class='col-sm-1'>
                            <input-img imgName='fsdf'></input-img>
                        </div>
                    </div>
                </div>
            </div>
            

            
        </div>
        <div class="modal-footer">
            <div class="btns">
                <button type="button" class="btn">{{isCreate ? '添加' : '修改'}}</button>
                <router-link tag='button' :to = "{ path: '/LoginFinish/financialManagement/reimbursement' }" active-class=' ' class='btn' style='color: #39B6E5;'>取消并返回</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import btnSelect from '../../../../../common_component/btn_select.vue'
    import inputImg from '../../../../../common_component/inputImg.vue'
    import datetimepicker from '../../../../../common_component/datetimepicker.vue'
    import inputText from '../../../../../common_component/inputText.vue'
    import breadcrumb from '../../../../../common_component/breadcrumb.vue'
    export default {
        components:{
            btnSelect,
            inputImg,
            datetimepicker,
            inputText,
            breadcrumb
        },
        data(){
            return {
                isCreate:'',
                id: '',
                res:{}
            }
        },
        created(){
            this.isCreate = this.$route.params.isCreate;
            this.id = this.$route.params.id;

            //传入后台，获取数据
        },
        methods:{
            integrationDate(name,item){
                this.res[name]= item;
            },
            showDetails(){
                $(event.target).parent().toggleClass('up');
                $(event.target).parent().siblings('.details').slideToggle('fast');
            },
        }
    }
</script>

<style scoped>
   
    #reimbursement_add .modal-body{
        padding:15px 23px;
    }
    #reimbursement_add .modal-body > div{
        margin-bottom: 40px;
    }
    #reimbursement_add .modal-footer button{
        margin:0 50px;
    }
    #reimbursement_add article{
        margin:0;
        float:none;
        font-size:18px;
    }
    #reimbursement_add article:after{
        width:1400px;
        left:100px;
    }
/*     #reimbursement_add  article i{
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
    #reimbursement_add  article.up i{
        background:url('../../../../../assets/down.png') no-repeat 0 7px;
    } */
    #reimbursement_add .details{
        padding:10px 50px;
        background:#fff;
    }

    #reimbursement_add .row{
        margin-bottom: 10px;
    }

    #reimbursement_add .row:nth-child(1){
        margin-top: 0;
    } 
    #reimbursement_add .modal-footer button{
        margin:0 50px;
    }
    #reimbursement_add .btn-primary{
        color: #fff;
        background-color: #39B6E5;
        border-radius: 0;
        padding: 3px 12px;
        border-width: 0;
        margin: 20px 0 ;    
    }
</style>