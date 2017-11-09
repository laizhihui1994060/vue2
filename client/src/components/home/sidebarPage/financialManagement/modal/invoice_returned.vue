<template>
    <div id='invoice_returned'>
        <div class="modal-body">
            <breadcrumb
                :arr="[{path:'/LoginFinish/financialManagement/invoice',text:'发票管理'},{path:'',text: '发票退还'}]"/>

            <article style="margin-top:0">发票退还信息<i @click='showDetails'></i></article>
            <div class="details">
                <div class="row">
                    <div class='col-sm-6'>
                        <form-label-input input-width="312px" @updata="integrationDate" name="ownerName" label="开头号码" />
                    </div>
                    <div class='col-sm-6'>
                        <form-label-input input-width="312px" @updata="integrationDate" name="ownerName" label="结尾号码" />
                    </div>
                </div>
                <div class='row'>
                    <div class='col-sm-6'>
                        <form-label-input input-width="312px" @updata="integrationDate" name="ownerName" label="退还张数" />
                    </div>
                    <div class='col-sm-6'>
                        <btn-select
                            label='登&nbsp;记&nbsp;人 '
                            url="/item" 
                            filter="SVC_NAME" 
                            name="Vehicle"
                            width='80px'
                            @updata="integrationDate"
                            title="登记人"
                            labelRight='17px'
                            />
                    </div>
                </div>
                <div class='row'>
                    <div class='col-sm-6'>
                        <datetimepicker
                            label='退还日期'
                            background="#DCF4FC"
                            width='86px'
                            padding='4px'
                            labelRight='12px'
                        ></datetimepicker> 
                    </div>
                </div>
            </div>
            
        </div>
        <div class="modal-footer">
            <div class="">
                <button type="button" data-dismiss="modal" class="btn">保存</button>
                <router-link tag='button' :to = "{ path: '/LoginFinish/financialManagement/invoice' }" active-class=' ' class='btn' style='color: #39B6E5;'>取消并返回</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import btnSelect from '../../../../../common_component/btn_select.vue'
    import datetimepicker from '../../../../../common_component/datetimepicker.vue'
    import formLabelInput from '../../../../../common_component/form-label-input.vue'
    import breadcrumb from '../../../../../common_component/breadcrumb.vue'
    export default {
        components:{
            btnSelect,
            datetimepicker,
            formLabelInput,
            breadcrumb
        },
        data(){
            return {
                res:{}
            }
        },
        methods: {
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
    #invoice_returned .modal-body{
        padding:15px 23px;
    }
    #invoice_returned .modal-body > div{
        margin-bottom: 40px;
    }
    #invoice_returned .modal-footer button{
        margin:0 50px;
    }
    #invoice_returned article{
        margin:0;
        float:none;
        font-size:18px;
    }
    #invoice_returned article:after{
        width:90%;
        left:100px;
    }
/*     #invoice_returned  article i{
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
    #invoice_returned  article.up i{
        background:url('../../../../../assets/down.png') no-repeat 0 7px;
    } */
    #invoice_returned .details{
        padding:10px 50px;
        background:#fff;
    }

    #invoice_returned .row{
        margin-bottom: 10px;
    }

    #invoice_returned .modal-body > div > div{
        margin:5px 0;
    }

    #invoice_returned .modal-footer{
        margin-top:0;
        text-align: center;
    }
    #invoice_returned .modal-footer button{
        margin:0 20px;
        height:24px;
        line-height:24px;
        width:80px;
        border-radius:0;
        border:1px solid #39B6E5;
        background-color:#fff;
        padding:0;
        color:#39B6E5;
        font-size:14px;
    }
</style>