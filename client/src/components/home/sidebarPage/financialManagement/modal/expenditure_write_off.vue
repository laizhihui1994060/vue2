<template>
    <div id='expenditure_write_off' >
        <div class="modal-body">
            <breadcrumb
                :arr="[{path:'/LoginFinish/financialManagement/expenditure',text:'支出'},{path:'',text: '冲销付款单'}]"/>

            <div>
                <article style="margin-top:0">订单信息<i @click='showDetails'></i></article>
                <div class="details">
                        <div>
                            <btn-select  
                                width="464px" 
                                label="公司名称"
                                padding="0"
                                url="/item" 
                                filter="SVC_NAME" 
                                name="customer_name"
                                @updata="integrationDate"
                                label-right="12px" />
                        </div>
                        <div class='table clearfix'>
                            <article>订单</article>
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th @click='checkAll'><input type="checkbox" name='check_all' /></th>
                                            <th>订单编号</th>
                                            <th>救援类型</th>
                                            <th>故障车牌</th>
                                            <th>车型品牌</th>
                                            <th>技师</th>
                                            <th>救援时间</th>
                                            <th>应收金额</th>
                                            <th>冲销金额</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input type="checkbox" name='' />
                                            </td>
                                            <td>
                                                GZWS001
                                            </td>
                                            <td>
                                                拖车
                                            </td>
                                            <td>
                                                粤F23456
                                            </td>
                                            <td>
                                                普拉多
                                            </td>
                                            <td>
                                                章国栋
                                            </td>
                                            <td>
                                                2016/08/08
                                            </td>
                                            <td>
                                                200
                                            </td>
                                            <td class='money'>
                                                <span>300</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input type="checkbox" name='' />
                                            </td>
                                            <td>
                                                GZWS001
                                            </td>
                                            <td>
                                                拖车
                                            </td>
                                            <td>
                                                粤F23456
                                            </td>
                                            <td>
                                                普拉多
                                            </td>
                                            <td>
                                                章国栋
                                            </td>
                                            <td>
                                                2016/08/08
                                            </td>
                                            <td>
                                                200
                                            </td>
                                            <td class='money'>
                                                <span>300</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class='surplus'>
                                <span>剩余可冲销金额</span>
                                <span class='money'>300.00</span>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="btns">
                <button type="button" class="btn">冲销</button>
                <router-link tag='button' :to = "{ path: '/LoginFinish/financialManagement/expenditure' }" active-class=' ' class='btn' style='color: #39B6E5;'>取消并返回</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import btnSelect from '../../../../../common_component/btn_select.vue'
    import breadcrumb from '../../../../../common_component/breadcrumb.vue'

    export default {
        components:{
            btnSelect,
            breadcrumb
        },
        methods:{
            checkAll(){
                const checkedBool = $(event.target).is(':checked'),
                      $allCheckbox = $(event.target).parents('table').find(' tbody td:first-child input[type="checkbox"] ');

                console.log($allCheckbox)
                if(checkedBool){
                    $allCheckbox.prop('checked', true);
                    console.log('a')
                }else{
                    $allCheckbox.prop('checked', false);
                    console.log('ab')
                }
                
            },
            showDetails(){
                $(event.target).parent().toggleClass('up');
                $(event.target).parent().siblings('.details').slideToggle('fast');
            },
        }
    }
</script>

<style>
    #expenditure_write_off .modal-body{
        padding:15px 23px;
    }
    #expenditure_write_off .modal-body > div{
        margin-bottom: 40px;
    }
    #expenditure_write_off .modal-footer button{
        margin:0 50px;
    }
    #expenditure_write_off article{
        margin:0;
        float:none;
        font-size:18px;
    }
    #expenditure_write_off article:after{
        width:90%;
        left:100px;
    }
/*     #expenditure_write_off  article i{
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
    #expenditure_write_off  article.up i{
        background:url('../../../../../assets/down.png') no-repeat 0 7px;
    } */
    #expenditure_write_off .details{
        padding:10px 50px;
        background:#fff;
    }

    #expenditure_write_off .row{
        margin-bottom: 10px;
    }

    #expenditure_write_off .modal-body .details article{
        color:#999;
        margin-bottom:15px;
        font-size:14px;
    }
    #expenditure_write_off .modal-body .details article:after{
        content:'';
        width:100%;
        height:1px;
        display:block;
        background-color:#f6f6f6;
        position:relative;
        left:60px;
        top:-8px;
    }
    #expenditure_write_off .modal-body .name{
        margin-right:20px;
    }

    #expenditure_write_off .modal-body .table{

        margin-top:20px;
    }
    #expenditure_write_off .modal-body .table table{
        border-collapse: separate;
        border-spacing:0 5px;
        width:100%;
    }
    #expenditure_write_off .modal-body .table thead tr th{
        border-top:1px solid #eee;
        border-bottom:1px solid #eee;
    }
    #expenditure_write_off .modal-body .table thead tr th:first-child{
        border-left:1px solid #eee;
    }
    #expenditure_write_off .modal-body .table thead tr th:last-child{
        border-right:1px solid #eee;
    }
    #expenditure_write_off .modal-body .table thead th{
        padding:0 9px;
        font-size:14px;
        color:#333;
        font-weight:300;
        text-align:left;
    }
    #expenditure_write_off .modal-body .table tbody tr{
        background-color: #F6F6F6;
        height:24px;
    }
    #expenditure_write_off .modal-body .table tbody td{
        padding:0 9px;
    }
    #expenditure_write_off .modal-body .table tbody td span{
        padding:0px 20px 0px 5px;
        background-color:#DFF5FD;
    }
    #expenditure_write_off .modal-body .surplus{
        float:right;
        margin-top:50px;
        margin-right:20px;
        font-size:18px;;
    }
    #expenditure_write_off .modal-body .surplus .money{
        background-color:#f6f6f6;
        padding:0 10px 0 5px;
    }
    #expenditure_write_off .modal-footer{
        padding-top:0;
    }
    #expenditure_write_off .modal-footer button{
        margin:0 50px;
        height:24px;
        line-height:24px;
        width:80px;
        border:1px solid #39B6E5;
        background-color:#fff;
        padding:0;
        color:#39B6E5;
        font-size:14px;
    }
</style>