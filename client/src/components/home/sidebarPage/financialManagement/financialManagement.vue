<template>
    <div id="financial" style="flex:1" >
        <div class='nav'>
            <ul class="nav nav-pills nav-stacked" role="tablist">
                <router-link 
                    v-if="serverURL(['financialManagement','accounting_order'])"
                    tag="li" 
                    to="/LoginFinish/financialManagement/accounting_order"

                    >
                    <a>核算订单</a>
                </router-link>
                <router-link 
                    v-if="serverURL(['financialManagement','account_statement'])"
                    tag="li" 
                    to="/LoginFinish/financialManagement/account_statement"
                    >
                    <a>对账单</a>
                </router-link>
                <router-link 
                    v-if="serverURL(['financialManagement','collection_statistics'])"
                    tag="li" 
                    to="/LoginFinish/financialManagement/collection_statistics"
                    >
                    <a>收现统计</a>
                </router-link>
                <router-link
                    v-if="serverURL(['financialManagement','income'])" 
                    tag="li" 
                    to="/LoginFinish/financialManagement/income"
                    >
                    <a>收入</a>
                </router-link>
                <router-link 
                    v-if="serverURL(['financialManagement','expenditure'])"
                    tag="li" 
                    to="/LoginFinish/financialManagement/expenditure"
                    >
                    <a>支出</a>
                </router-link>
       <!--          <router-link
                    v-if="serverURL(['financialManagement','accounts_receivable'])" 
                    tag="li" 
                    to="/LoginFinish/financialManagement/accounts_receivable"
                    >
                    <a>应收账款</a>
                </router-link>
                <router-link 
                    v-if="serverURL(['financialManagement','accounts_payable'])"
                    tag="li" 
                    to="/LoginFinish/financialManagement/accounts_payable"
                    >
                    <a>应付账款</a>
                </router-link> -->
               <!--  <router-link 
                    v-if="serverURL(['financialManagement','invoice'])"
                    tag="li" 
                    to="/LoginFinish/financialManagement/invoice"
                    class='invoices'
                    >
                    <a>发票管理</a>
                </router-link> -->
  <!--                 <router-link 
                    v-if="serverURL(['financialManagement','reimbursement'])"
                    tag="li" 
                    to="/LoginFinish/financialManagement/reimbursement"
                    >
                    <a>报销管理</a>
                </router-link> -->
            </ul>
        </div>
        <div style='flex:1;padding-right:20px;'>
           <router-view></router-view>
        </div>  
    </div>
</template>

<script>
    
    export default {
     
        methods: {
            serverURL(url){
               return ConfigPage.isExist(url);
            }
        }
    }
</script>

<style>
    #financial{
        display: flex;
    }
    #financial .modal-header{
        text-align:center;
        font-size:20px;
    }
    #financial .modal-footer{
        margin-top:0;
        text-align: center;
    }
    #financial.container{
        padding-left:0;
        padding-right:0;
        padding-top:0;
        margin-top:20px;
    }
    #financial .nav{
        width:180px;
        color:#000 ;
        text-align:center;
        font-size:16px;
        float: left;
        flex-basis:210px;

    }
    #financial div.nav{
        box-sizing: content-box;
    }
    #financial .nav li{
        width: 190px;
        height: 45px;
        padding: 0;
        background: #fff;
        border-top: 1px solid #f6f6f6     
    }
    #financial .nav li a{
        display: block;
        text-align: center;
        line-height: 45px;
        font-size: 14px;
        color: #999999;
        font-weight: bold;
        padding: 0;
        border-radius: 0;
    }
   .nav > li > a:hover, .nav > li > a:focus{
        background-color:transparent;
   }
 
    #financial .btn-group{
        display: inline-block;
    }
    /*bootstrap*/

    #financial .nav li.router-link-active > a{
        background: #f4f4f4 !important;
        color: #1785F7 !important;
    }
    #financial .nav-stacked > li + li{
        margin: 0;
    }

    #invoice_receipt_record .input-append .form-group,
    #invoice_returned_record .input-append .form-group,
    #invoice_book_add_record .input-append .form-group{
        width: auto;
    }
    #financial .time input{
        cursor: pointer;
        width:100px;
        height:24px;
        border:none;
        padding-left:5px;
        background-color:#DFF5FD;
    }
    #financial .form-group{
        display:inline-block;   
    }
    #financial .disabled .setWidth{
        background-color:#fff;
    }
    #financial .disabled .dropdown-toggle{
      background-color:#eee;
    }

</style>