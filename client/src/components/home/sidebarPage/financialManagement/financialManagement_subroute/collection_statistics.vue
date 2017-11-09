<!-- 收现统计 -->
<template>
    <div id='collection_statistics'>
        <vue-table
            :filter-btns="filterBtns"
            :filter-input="filterInput"
            item-url="finance:/cashreceive/query/orderlist"
            type='post'
            :params='{pageIndex:1, pageSize:10}'
            :table-iteration-field="tableIterationField"
            :linkBtn="linkBtn"
            :excelDate="excelDate"
            :addBtns="addBtns"
            :enableTimeRange="true"
            :isQuickSearch='false'
            :rightBtn="rightBtn" /> 
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
            excelDate:{
                url:'finance:/cashreceive/query/orderlist',
                method:'post',
                filename:"收现统计导出",
                displayField:[
                    {
                        tr:'订单编号',
                        field:'orderCode'
                    },
                    {
                        tr:'客户名称',
                        field:'customerId',
                        info: 'partnerInfo',
                        uuid:'partnerId',
                        returnName: 'name',
                        filter: 'arr',
                    },
                    {
                        tr:'服务商',
                        field:'bidOrgId',
                        info: 'serviceProviderInfo',
                        uuid:'orgId',
                        returnName: 'name',
                        filter: 'arr',
                    },
                    {
                        tr:'救援时间',
                        field:'orderScheduleTime',
                        filter:'date',
                    },
                    {
                        tr:'业务类型',
                        field:'jobType',
                        filter:'jobType',
                    },
                    {
                        tr:'救援地',
                        field:'incidentAddrAddress',
                        filter:'tooltip',
                    },
                    {
                        tr:'目的地',
                        field:'destinationAddrAddress',
                        filter:'tooltip',
                    },
                    {
                        tr:'技师',
                        fieName: 'towDriverId',
                        field:'driver.empName',
                        filter:'obj',
                    },
                    {
                        tr:'司机收现金额',
                        field:'cashReceived',
                    },
                    {
                        tr:'总救援费用',
                        field:'cashCharge',
                    },
                    {
                        tr:'总成本费用',
                        field:'cashCompanyCharge',
                    }
                ]
            },
            filterBtns:[
                { 
                    title:'业务类型',
                    name:'jobType',
                    filter:"name",
                    filterName:'code' ,
                    url:"client:/job/type/grade",
                    listWidth:'100px',
                    hasAll:true  
                },
                {
                    title:'客户类型',
                    name:'customerType',
                    filter:"desc",
                    filterName:'code' ,
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
                    url:"client:/helper/partner",
                    params:{isCustomer:true,cooperationStatus :'UNDER_CONTRACT'},
                    method:'post',
                    hasAll:true  
                },
                {
                    title:'技师',
                    name:'driverId',
                    filter:"empName",
                    filterName:'userId' ,
                    url:"client:/helper/emp",
                    params:{isUser :true},
                    method:'post',
                    hasAll:true  
                },
                {
                    title:'结算方式',
                    name:'settleMethod',
                    arr: [ { name: '现金', code: "CASH" }, { name: '签单', code: 'SIGN' }, { name: '代付', code: 'HELPBUY' } ],
                    filter:"name",
                    filterName: 'code',
                    hasAll:true  
                }
            ],
            filterInput:[
                {
                    url: "client:/search",
                    flag: "CASH_RECEIVE",
                    name:"param", 
                    label:'救援地址'
                },
            ],
            tableIterationField:[
                {
                    tr:'订单',
                    field:'orderCode',
                    sort: true,
                    link: {
                        link_name:'accounting_order_business',
                        fn:function(self, key, value, item_index,item){
                            self.$router.push({ name: 'accounting_order_business', params: {id:item['towOrderId'],status:item['confirmedResult']}});
                        }
                    }
                },
                {
                    tr:'客户名称',
                    field:'customerId',
                    info: 'partnerInfo',
                    uuid:'partnerId',
                    returnName: 'name',
                    filter: 'arr',
                    sort: true,
                    link: {
                        link_name: 'customer_add', 
                        link_key:"chosen",
                        link_Field:"customerId",
                        isCreate: false
                    }
                },
                {
                    tr:'服务商',
                    field:'bidOrgId',
                    info: 'serviceProviderInfo',
                    uuid:'orgId',
                    returnName: 'name',
                    filter: 'arr',
                    sort: true
                },
                {
                    tr:'结算方式',
                    field:'settleMethod',
                    filter: 'settleMethod',
                    sort: true
                },
                {
                    tr:'救援时间',
                    field:'orderScheduleTime',
                    filter:'date',
                    sort: true
                },
                {
                    tr:'业务类型',
                    field:'jobType',
                    filter:'jobType',
                    sort: true
                },
                {
                    tr:'救援地',
                    field:'incidentAddrAddress',
                    filter:'tooltip',
                    sort: true
                },
                {
                    tr:'目的地',
                    field:'destinationAddrAddress',
                    filter:'tooltip',
                    sort: true
                },
                {
                    tr:'技师',
                    fieName: 'towDriverId',
                    field:'driver.empName',
                    filter:'obj',
                    sort: true
                },
                {
                    tr:'司机收现金额',
                    field:'cashReceived',
                    sort: true
                },
                {
                    tr:'总救援费用',
                    field:'cashCharge',
                    sort: true
                },
                {
                    tr:'总成本费用',
                    field:'cashCompanyCharge',
                    sort: true
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
    #collection_statistics .right_content{
        margin-left:0;
    }
    #collection_statistics .checkbox{

        margin: 0;
    }
    #collection_statistics .checkbox label{
        display: none
    }

    #collection_statistics .checkbox input[type="checkbox"]{
        margin: 0;
        position: static !important;
    }
</style>