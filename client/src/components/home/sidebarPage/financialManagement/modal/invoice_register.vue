<template>
    <div id='invoice_register'>
        <div class="modal-body">
            <breadcrumb
                :arr="[{path:'/LoginFinish/financialManagement/invoice',text:'发票管理'},{path:'',text: isCreate ? '开票登记' : '查看发票'}]"/>

            <div>
                <article style="margin-top:0">开票登记<i @click='showDetails'></i></article>
                <div class="details">
                    <div class="row">
                        <div class="col-xs-3">
                            <btn-select  
                                width="120px" 
                                label="开票单位"
                                padding="0"
                                url="/item" 
                                filter="SVC_NAME" 
                                name="company_name"
                                @updata="integrationDate"
                                title="广州网梭信息技术有限公司"
                                label-right="12px" />
                        </div>
                    

                        <div class="col-xs-3">                    
                            <form-label-input
                                input-width="140px" 
                                label="地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址" 
                                @updata="integrationDate"
                                title="广州市海珠区琶洲广场"
                                label-right="12px"
                                disabled="disabled"/>
                        </div>

                        <div class="col-xs-3">                   
                            <form-label-input
                                input-width="140px" 
                                label="开户银行" 
                                @updata="integrationDate"
                                title="广州市海珠区琶洲广场"
                                label-right="12px"
                                disabled="disabled"/>
                        </div>

                        <div class="col-xs-3">                
                            <form-label-input
                                input-width="140px" 
                                label="开户账号" 
                                @updata="integrationDate"
                                title="广州市海珠区琶洲广场"
                                label-right="12px"
                                disabled="disabled"/>
                        </div>
                    </div>

                    <hr>
                    <div class="row">
                        <div class="col-xs-3"> 
                            <btn-select  
                                width="120px" 
                                label="发票类型"
                                padding="0"
                                url="/item" 
                                filter="SVC_NAME" 
                                name="company_name"
                                @updata="integrationDate"
                                title="23456789"
                                label-right="12px" />
                        </div>

                        <div class="col-xs-3">
                            <btn-select  
                                width="120px" 
                                label="开票项目"
                                padding="0"
                                url="/item" 
                                filter="SVC_NAME" 
                                name="company_name"
                                @updata="integrationDate"
                                title="23456789"
                                label-right="12px" />
                        </div>

                        <div class="col-xs-3">             
                            <form-label-input
                                input-width="140px" 
                                label="开票金额" 
                                @updata="integrationDate"
                                title="广州市海珠区琶洲广场"
                                label-right="12px"
                                disabled="disabled"/>
                        </div>

                        <div class="col-xs-3">
                            <datetimepicker
                                label="开票日期"
                                label-right="12px"
                                background="#DFF5FD"
                                width="140px"
                                name="rescueTime"
                                @updata="integrationDate"/>
                        </div>

                        <div class="col-xs-3">
                            <btn-select  
                                width="120px" 
                                label="发票代码"
                                padding="0"
                                url="/item" 
                                filter="SVC_NAME" 
                                name="company_name"
                                @updata="integrationDate"
                                title="2000"
                                label-right="12px" />
                        </div>

                        <div class="col-xs-3">           
                            <form-label-input
                                input-width="144px" 
                                label="发票号码" 
                                @updata="integrationDate"
                                title="广州市海珠区琶洲广场"
                                label-right="12px"
                                disabled="disabled"/>
                        </div>

                        <div class="col-xs-3">         
                            <form-label-input
                                input-width="144px" 
                                label="税&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;率" 
                                @updata="integrationDate"
                                title="广州市海珠区琶洲广场"
                                label-right="12px"
                                disabled="disabled"/>
                        </div>

                        <div class="col-xs-3">         
                            <form-label-input
                                input-width="144px" 
                                label="税&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;额" 
                                @updata="integrationDate"
                                title="广州市海珠区琶洲广场"
                                label-right="12px"
                                disabled="disabled"/>
                        </div>
                    </div>
                    <hr>

                
            </div>
        </div>
        <div class="modal-footer">
            <div class="btns">
                <button type="button" class="btn">{{isCreate ? '登记' : '修改'}}</button>
                <button v-if='!isCreate' type="button" class="btn">作废</button>
                <button v-if='!isCreate' type="button" class="btn">寄送</button>

                <router-link tag='button' :to = "{ path: '/LoginFinish/financialManagement/invoice' }" active-class=' ' class='btn' style='color: #39B6E5;'>取消并返回</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import btnSelect from '../../../../../common_component/btn_select.vue'
    import datetimepicker from '../../../../../common_component/datetimepicker.vue'
    import breadcrumb from '../../../../../common_component/breadcrumb.vue'
    import formLabelInput from '../../../../../common_component/form-label-input.vue'
    export default {
        components:{
            btnSelect,
            datetimepicker,
            breadcrumb,
            formLabelInput
        },
        data(){
            return{
                isCreate: '',
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

<style>
    #invoice_register .modal-body{
        padding:15px 23px;
    }
    #invoice_register .modal-body > div{
        margin-bottom: 40px;
    }
    #invoice_register .modal-footer button{
        margin:0 50px;
    }
    #invoice_register article{
        margin:0;
        float:none;
        font-size:18px;
    }
    #invoice_register article:after{
        left:120px;
    }
    #invoice_register  article i{
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
    }
    #invoice_register .details{
        padding:10px 35px;
        background:#fff;
    }

    #invoice_register .col-xs-3{
        margin-bottom: 10px;
    }

    #invoice_register .row:nth-child(1){
        margin-top: 0;
    } 
    #invoice_register .modal-footer button{
        margin:0 50px;
    }
</style>