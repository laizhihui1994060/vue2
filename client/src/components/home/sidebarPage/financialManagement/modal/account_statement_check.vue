<template>
    <div id='account_statement_check'>
        <div style="margin:20px 0 0 0px;">
            <breadcrumb
                style='margin-bottom:0;'
                :arr="[{path:'/LoginFinish/financialManagement/account_statement',text:'对账单'},{path:'',text: '生成对账单'}]"/>
            
        </div>
    	<vue-table
            style='margin-top:0;'
    	    :filter-btns="filterBtns"
    	    :filter-input="filterInput"
    	    item-url="finance:/recon/order/list"
            type='post'
            :params='{pageIndex:1, pageSize:15 ,settleMethod:"SIGN"}'
    	    :table-iteration-field="tableIterationField"
    	    :linkBtn="linkBtn"
    	    :addBtns="addBtns"
    	    :rightBtn="rightBtn"
            :enableTimeRange='true'
            :checkbox="checkbox"/>
    </div>
</template>
<script>
import vueTable from "../../../../../common_component/vue-table.vue";
import breadcrumb from '../../../../../common_component/breadcrumb.vue'
var arr = [];

export default { 

    components:{
        vueTable,
        breadcrumb
    },
    created(){
           arr = [];
    },
    props:{
        
    },
    data(){
        return {
            checkbox:{
                field:'orderCode',
                fn:function(name,item,status,pageAll,vm){
                    var obj = {};
                    var checkedAll = $('input[name=checkbox_all]')[0].checked;
                    if(name == 'checkbox_all' ){
                        if(checkedAll){
                            console.log('全部checked');
                            var params = JSON.parse(JSON.stringify(vm.dataForm.condition_server));
                            params.pageIndex = 1;
                            params.pageSize = 15*pageAll;
                            console.warn(params);
                            send({
                                url: 'finance:/recon/order/list',
                                type: 'post',
                                param: params
                            }, function(err, res){
                                item = res.content;
                                arr = [];

                                item.forEach(function(it,index){
                                    obj = {
                                        totalAmt:Number(it.signInvoiceAmount),
                                        towOrderId:it.towOrderId,
                                        commissionTotalAmt:Number(it.commission),
                                        settleMethod:it.settleMethod,
                                        orderCode:it.orderCode,
                                        bidOrgId:it.bidOrgId ? it.bidOrgId  : ''
                                    };

                                    it.customerId ? obj.customerId = it.customerId :  obj.orgId = it.orgId;
                                    

                                    arr.push(obj);

                                });
                                vm.checkboxItem = arr;
                                console.log(arr);
                            });
                        }else{
                            arr = [];
                            $('input[name=checkbox]').each(function(index, el) {
                                el.checked = false;
                            });

                            $('input[name=checkbox_all]')[0].checked = false;
                            vm.checkbox_status = '';
                            vm.checkboxItem = arr;
                        }
                        
                       
                    }else if(name == 'checkbox'){
                        console.log('checkbox');
                        // 遍历
                        $('tbody tr').each( function(index, el){
                            var bool = arr.some( (obj, index) => {
                                if( $(el).find('td').eq(1).find('p').text() == obj.orderCode ){
                                    $(el).find('td input').checked = true;
                                    return true;
                                }
                            });
                            if(!bool) $(el).find('td input').checked = false;
                            
                        })

                        if($('#account_statement_check').find("input[value='" + item.orderCode +"']").is(':checked')){
                            for(var i = 0 ;i<arr.length;i++){
                                if(arr[i].orderCode == item.orderCode)return;
                            }

                            obj = {
                                totalAmt:Number(item.signInvoiceAmount),
                                towOrderId:item.towOrderId,
                                commissionTotalAmt:Number(item.commission),
                                customerId:item.customerId,
                                settleMethod:item.settleMethod,
                                orderCode:item.orderCode,
                                bidOrgId:item.bidOrgId ? item.bidOrgId  : ''
                            };
                            item.customerId ? obj.customerId = item.customerId :  obj.orgId = item.orgId;

                            arr.push(obj);



                        }else{

                            for(var i = 0 ;i<arr.length;i++){
                                if(arr[i].orderCode == item.orderCode){
                                    arr.splice(i,1)
                                }
                            }
                        }
                        if(arr.length == vm.recordSize){
                            $('input[name=checkbox_all]')[0].checked = true;
                            vm.checkbox_status = 'checkbox_all';
                            console.log(vm.checkbox_status )
                        }else{
                            $('input[name=checkbox_all]')[0].checked = false;
                            vm.checkbox_status = '';
                        }
                        vm.checkboxItem = arr;
                        console.log(arr)
                    }
                },
                text:'生成对账单',
                click(tableVM){
                    send({
                        type:'post',
                        url:'finance:/recon',
                        param:arr
                    },function(err,res){
                        if(err)return console.log(err);
                        if(res.status == 200){
                            tableVM.watchDataForm();
                            alert(res.msg, 'success');
                            arr = []
                        }else{
                            console.log(res);
                            alert(res.msg)
                        }
                    });
                }

            },
            filterBtns:[
                {
                    title:'救援结果',
                    name:'orderStatus',
                    filter:"cn",
                    filterName:'en' ,
                    arr:[{cn:'订单取消',en:'ORDER_CANCELLED'},{cn:'订单完成',en:'DONE'}],
                    hasAll:true  

                },
                // {
                //     title:'对账单类型',
                //     name:'finReconType',
                //     filter:"cn",
                //     filterName:'en' ,
                //     hasAll: true,
                //     arr:[{cn:'客户',en:'CUSTOMER'},{cn:'服务商',en:'PROVIDER'},{cn:'全部',en:'ALL'}]
                // },
                // {
                //     title:'结算方式',
                //     name:'settleMethod',
                //     filter:"cn",
                //     filterName:'en' ,
                //     arr:[{cn:'现金',en:'CASH'},{cn:'签单',en:'SIGN'}],
                //     hasAll:true  
                // },
                {
                    title:'客户类型',
                    name:'customerType',
                    filter:"desc",
                    filterName:'code' ,
                    hasAll: true,
                    url:"control:/sys/param",
                    params:['/customer/customer_types'],
                    method:'post',
                    hasAll:true  
                    
                },
                {
                    title:'客户名称',
                    name:'customerId',
                    filter:"name",
                    filterName:'partnerId' ,
                    hasAll: true,
                    url:"client:/helper/partner",
                    params:{isCustomer:true,cooperationStatus :'UNDER_CONTRACT'},
                    method:'post',
                    hasAll:true  

                },
                {
                    title:'服务商名称',
                    name:'providerId',
                    filter:"name",
                    filterName:'partnerId' ,
                    hasAll: true,
                    url:"client:/helper/partner",
                    params:{isProvider :true,partnershipStatus  :'MY_SERIVCE_PROVIDER'},
                    method:'post',
                    hasAll:true  

                    
                },
            ],
            filterInput:[

            ],
            tableIterationField:[
                {
                    tr:'订单编号',
                    field:'orderCode'
                },
                {
                    tr:'完成时间',
                    field:'completeTime',
                    filter:'date'
                },
                {
                    tr:'车牌号码',
                    field:'vehicleOwner.vehiclePlateNo',
                    filter:'arr'
                },
                {
                    tr:'客户案件号',
                    field:'customerCaseNo'
                },
                {
                    tr:'业务类型',
                    field:'jobType',
                    filter:'jobType'
                },
                {
                    tr:'救援地',
                    field:'incidentAddress',
                    filter:'tooltip'
                },
                {
                    tr:'客户名称',
                    field:'partnerInfo.fullName',
                    filter: 'arr.partnerInfo.orgInfo'
                },
                // {
                //     tr:'服务商',
                //     sort:true,
                //     field: 'orgInfo.name',
                //     filter:'arr'
                // },
                {
                    tr:'救援结果',
                    field:'orderStatus',
                    filter:'orderStatus'
                },
                {
                    tr:'结算方式',
                    field:'settleMethod',
                    filter:'settleMethod'
                },
                {
                    tr:'现金',
                    field:'cashCharge'
                },
                {
                    tr:'签单',
                    field:'signInvoiceAmount'
                },
                {
                    tr:'信息费',
                    field:'commission'
                }
            ],
            linkBtn:[
              
            ]

        }
    },
    methods:{
        
    }
}
</script>

<style>
    #account_statement_check{
    }
    #account_statement_check .right_content{
    	margin-left:0;
    }
    #account_statement_check .checkbox{
        padding: 8px 11px;
        margin: 0;
    }
    #account_statement_check .checkbox label{
        display: none
    }

    #account_statement_check .checkbox input[type="checkbox"]{
        margin: 0;
        position: static !important;
    }
</style>