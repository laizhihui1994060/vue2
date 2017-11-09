<template>
    <div id='account_order_modal'>
        <div class="modal-body">
            <breadcrumb
                :arr="[{path:'/LoginFinish/financialManagement/accounting_order',text:'核算订单'},{path:'',text: '查看订单详情'}]"/>

            <div class='order'>
                <article style="margin-top:0">订单信息<i @click='showDetails'></i></article>
                <div class="details">
                    <div class="row">
                        <div class="col-xs-4">
                            <form-label-input @updata="integrationDate" name="order_number" label="订单编号"  />
                        </div>
                        <div class="col-xs-4">
                            <datetimepicker
                                label="救援时间"
                                label-right="12px"
                                background="#DFF5FD"
                                width="95px"
                                name="rescueTime"
                                @updata="integrationDate" />
                        </div>
                        <div class="col-xs-4">
                            <form-label-input @updata="integrationDate" name="ownerName" label="订单来源" />
                        </div>
                        <div class="col-xs-4">
                            <form-label-input @updata="integrationDate" name="ownerName" label="客户名称" />
                        </div>
                        <div class="col-xs-4">
                            <form-label-input @updata="integrationDate" name="ownerName" label="救援单位" />
                        </div>
                        <div class="col-xs-4">
                            <form-label-input @updata="integrationDate" name="ownerName" label="案&nbsp;&nbsp;件&nbsp;号" />
                        </div>
                        <div class="col-xs-4">
                            <form-label-input @updata="integrationDate" name="ownerName" label="救援结果" />
                        </div>
                        <div class="col-xs-4">
                            <form-label-input @updata="integrationDate" name="ownerName" label="故障车牌" />
                        </div>
                        <div class="col-xs-4">
                            <form-label-input @updata="integrationDate" name="ownerName" label="技&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;师" />
                        </div>
                        <div class="col-xs-4">
                            <form-label-input @updata="integrationDate" name="ownerName" label="车主姓名" />
                        </div>
                        <div class="col-xs-4">
                            <btn-select  
                                width="72px" 
                                label="结算方式"
                                padding="0"
                                url="/item" 
                                filter="SVC_NAME" 
                                name="Vehicle"
                                @updata="integrationDate"
                                label-right="12px" />
                        </div>
                        <div class="col-xs-4">
                            <btn-select  
                                width="72px" 
                                label="任务类型"
                                padding="0"
                                url="/item" 
                                filter="SVC_NAME" 
                                name="Vehicle"
                                @updata="integrationDate"
                                label-right="12px" />
                        </div>
                    </div>
                </div>
            </div>
            <div class='check'>
                <article>核算信息<i @click='showDetails'></i></article>
                <div class="details">
                    <div class="row">

                        <div class="col-xs-4">
                            <datetimepicker
                                label="核算时间"
                                label-right="12px"
                                background="#DFF5FD"
                                width="95px"
                                name="rescueTime"
                                @updata="integrationDate" />
                        </div>
                        <div class="col-xs-4">
                            <btn-select  
                                width="72px" 
                                label="&nbsp;核&nbsp;算&nbsp;人"
                                padding="0"
                                url="/item" 
                                filter="SVC_NAME" 
                                name="Vehicle"
                                @updata="integrationDate"
                                label-right="12px" />
                        </div>
                        <div class="col-xs-4">
                            <form-label-input @updata="integrationDate" name="ownerName" label="核算状态" />
                        </div>
                        <div class="col-xs-4">
                            <form-label-input @updata="integrationDate" name="ownerName" label="&nbsp;协&nbsp;议&nbsp;价" />
                        </div>
                        <div class="col-xs-4">
                            <form-label-input @updata="integrationDate" name="ownerName" label="收现金额" />
                        </div>
                        <div class="col-xs-4">
                            <form-label-input @updata="integrationDate" name="ownerName" label="佣&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金" />
                        </div>
                        <div class="col-xs-4">
                            <form-label-input @updata="integrationDate" name="ownerName" label="&nbsp;等&nbsp;待&nbsp;费" />
                        </div>
                        <div class="col-xs-4">
                            <form-label-input @updata="integrationDate" name="ownerName" label="小&nbsp;轮&nbsp;数&nbsp;" />
                        </div>
                        <div class="col-xs-4">
                            <form-label-input @updata="integrationDate" name="ownerName" label="小轮金额" />
                        </div>
                        <div class="col-xs-4">
                            <form-label-input @updata="integrationDate" name="ownerName" label="&nbsp;邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费" />
                        </div>
                        <div class="col-xs-4">
                            <form-label-input @updata="integrationDate" name="ownerName" label="餐&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费" />
                        </div>
                        <div class="col-xs-4">
                            <form-label-input @updata="integrationDate" name="ownerName" label="&nbsp;路&nbsp;桥&nbsp;费" />
                        </div>
                        <div class="col-xs-4">
                            <form-label-input @updata="integrationDate" name="ownerName" label="&nbsp;修&nbsp;理&nbsp;费" />
                        </div>
                        <div class="col-xs-4">
                            <form-label-input @updata="integrationDate" name="ownerName" label="物料配件" />
                        </div>
                        <div class="col-xs-4">
                            <form-label-input @updata="integrationDate" name="ownerName" label="代垫费用" />
                        </div>
                        <div class="col-xs-4">
                            <form-label-input @updata="integrationDate" name="ownerName" label="其他费用" />
                        </div>
                        <div class="col-xs-4">
                            <form-label-input @updata="integrationDate" name="ownerName" label="费用总计" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="btns">
                <button type="button" data-dismiss="modal" class="btn" @click='save'>保存并核算</button>
                <router-link tag='button' :to = "{ path: '/LoginFinish/financialManagement/accounting_order' }" active-class=' ' class='btn' style='color: #39B6E5;'>返回</router-link>
            </div>
        </div> 
    </div>
</template>

<script>
    import btnSelect from '../../../../../common_component/btn_select.vue'
    import formLabelInput from '../../../../../common_component/form-label-input.vue'
    import datetimepicker from '../../../../../common_component/datetimepicker.vue'
    import breadcrumb from '../../../../../common_component/breadcrumb.vue'

    export default {
        data(){
            return {
                chosen: {},
            }
        },
        components:{
            btnSelect,
            formLabelInput,
            datetimepicker,
            breadcrumb
        },
        data(){
            return {
                res:{}
            }
        },
        methods:{
            integrationDate(name,item){
                this.res[name]= item;
            },
            showDetails(){
                $(event.target).parent().toggleClass('up');
                $(event.target).parent().siblings('.details').slideToggle('fast');
            },
            save(){
                for(let key in this.res){
                    this.chosen[key] = this.res[key];
                }
            }
        }
    }
</script>

<style scoped>
    body article:after{
        width: 615px;
    }
    .order .row .col-xs-4,.check .row .col-xs-4{
        margin-bottom: 10px;
    }
    #account_order_modal .modal-body{
        padding:15px 23px;
    }
    #account_order_modal .modal-body > div{
        margin-bottom: 40px;
    }
    #account_order_modal .modal-footer button{
        margin:0 50px;
    }
    #account_order_modal article{
        margin:0;
        float:none;
        font-size:18px;
    }
    #account_order_modal article:after{
        width:1400px;
        left:100px;
    }
 /*    #account_order_modal  article i{
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
    #account_order_modal  article.up i{
        background:url('../../../../../assets/down.png') no-repeat 0 7px;
    }
    #account_order_modal .details{
        padding:10px 50px;
        background:#fff;
    } */
</style>