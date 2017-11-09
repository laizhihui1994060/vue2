<template>
    <div id='invoice_receipt' >
        <div class="modal-body">
            <breadcrumb
                :arr="[{path:'/LoginFinish/financialManagement/invoice',text:'发票管理'},{path:'',text:'发票领用'}]"/>

            <article style="margin-top:0">发票领用信息<i @click='showDetails'></i></article>
            <div class="details">
                <div class="row">
                    <div class="col-xs-6">
                        <form-label-input input-width="105px" @updata="integrationDate" name="ownerName" label="开头号码" />
                    </div>
                    <div class="col-xs-6">
                        <form-label-input input-width="105px" @updata="integrationDate" name="ownerName" label="结尾号码" />
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-xs-6">
                        <datetimepicker
                            label="入库日期"
                            label-right="12px"
                            background="#DFF5FD"
                            width="104px"
                            name="rescueTime"
                            @updata="integrationDate"
                        ></datetimepicker>
                    </div>
                    <div class="col-xs-6">
                        <form-label-input input-width="105px" @updata="integrationDate" name="ownerName" label="登&nbsp;记&nbsp;&nbsp;人" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-6">
                        <form-label-input input-width="105px" @updata="integrationDate" name="ownerName" label="入库张数" />
                    </div>
                </div>
            </div>
            
        </div>
        <div class="modal-footer">
            <div class="btns">
                <button type="button" data-dismiss="modal" class="btn">领用</button>
                <router-link tag='button' :to = "{ path: '/LoginFinish/financialManagement/invoice' }" active-class=' ' class='btn' style='color: #39B6E5;'>取消并返回</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import datetimepicker from '../../../../../common_component/datetimepicker.vue'
import formLabelInput from '../../../../../common_component/form-label-input.vue'
import breadcrumb from '../../../../../common_component/breadcrumb.vue'
    export default {
        components:{
            datetimepicker,
            formLabelInput,
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
        }
    }
</script>

<style>
    #invoice_receipt .modal-body{
        padding:15px 23px;
    }
    #invoice_receipt .modal-body > div{
        margin-bottom: 40px;
    }
    #invoice_receipt .modal-footer button{
        margin:0 50px;
    }
    #invoice_receipt article{
        margin:0;
        float:none;
        font-size:18px;
    }
    #invoice_receipt article:after{
        width:90%;
        left:100px;
    }
/*     #invoice_receipt  article i{
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
    #invoice_receipt  article.up i{
        background:url('../../../../../assets/down.png') no-repeat 0 7px;
    } */
    #invoice_receipt .details{
        padding:10px 50px;
        background:#fff;
    }

    #invoice_receipt .row{
        margin-bottom: 10px;
    }

    #invoice_receipt .row:nth-child(1){
        margin-top: 0;
    } 
    #invoice_receipt .modal-footer button{
        margin:0 50px;
    }
   
   
</style>