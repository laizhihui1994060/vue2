<template>
    <vue-table
        :filter-btns="filterBtns"
        :filter-input="filterInput"
        item-url="finance:/accounting/query/orderlist"
        type='post'
        :params='params'
        :table-iteration-field="tableIterationField"
        :linkBtn="linkBtn"
        :addBtns="addBtns"
        :rightBtn="rightBtn"
        :enableTimeRange='true' />
</template>

<script>
import vueTable from "../../../../../common_component/vue-table.vue";
    let bool = false;
    
    export default {
        data () {
            return {
                params: {
                    pageIndex:1,
                    pageSize:10
                },
                filterBtns:[
                    {
                        title:'客户名称',
                        name:'customerId',
                        filter:"name",
                        filterName:'partnerId' ,
                        url:"client:/helper/partner",
                        method:"post",
                        params:{isCustomer:true,cooperationStatus :'UNDER_CONTRACT'},
                        listWidth:'100px',
                        hasAll:true  
                    },
                    // {
                    //     title:'服务商名称',
                    //     name:'serviceProviderId',
                    //     filter:"name",
                    //     filterName:'partnerId' ,
                    //     url:"client:/helper/partner",
                    //     method:"post",
                    //     params:{isProvider:true,partnershipStatus  :'MY_SERIVCE_PROVIDER'},
                    //     listWidth:'100px',
                    //     hasAll:true  
                    // },
                    // {
                    //     title:'技师',
                    //     name:'driverId',
                    //     filter:"empName",
                    //     filterName:'userId' ,
                    //     url:"client:/helper/emp",
                    //     method:"post",
                    //     params:{isDriver:true},
                    //     listWidth:'100px',
                    //     hasAll:true   
                    // },
                    {
                        title:'核算状态',
                        name:'confirmedResult',
                        arr: [ { name: '未核算', code: 'NA' }, { name: '已核算', code: 'ACCEPTED' } ],
                        filter:"name",
                        filterName: 'code',
                        hasAll:true  
                    },
                    {
                        title:'结算方式',
                        name:'settleMethod',
                        arr: [ { name: '签单', code: 'SIGN' }, { name: '现金', code: 'CASH' } ],
                        filter:"name",
                        filterName: 'code',
                        hasAll:true  
                    },
                    {
                        title:'结算状态',
                        name:'paymentStatus',
                        arr: [ { name: '未结算', code: 'NO_PAYMENT' }, { name: '部分结算', code: 'PARTIAL_PAYMENT' }, { name: '全部结算', code: 'FULL_PAYMENT' } ],
                        filter:"name",
                        filterName: 'code',
                        hasAll:true  
                    },
                ],
                filterInput:[ 
                    {
                        url: "client:/search",
                        name:"param",
                        label:'订单编号、案件号、车主电话、故障车牌号',
                        flag: "ACCOUNTING_ORDER",
                        width:'300px'
                    }
                ],
                tableIterationField:[
                    {
                        tr:'订单编号',
                        rowspan:true,
                        sort: true,
                        field:'orderCode',
                        link: {
                            text:'核算',
                            link_name:'accounting_order_business',
                            fn:function(self, key, value, item_index,item){
                                self.$router.push({ name: 'accounting_order_business', params: {id:item['towOrderId'],status:item['confirmedResult']}});
                            }
                        }
                    },
                    {
                        tr:'客户',
                        rowspan:true,
                        sort: true,
                        field:'customerId',
                        info: 'partnerInfo',
                        uuid: 'partnerId',
                        returnName: 'name',
                        filter: 'arr', 
                        link: {
                            link_name: 'customer_add', 
                            link_key:"chosen",
                            link_Field:'customerId',
                            isCreate: false
                        }
                    },
                    {
                        tr: '服务商',
                        rowspan:true,
                        sort: true,
                        field:'bidOrgId',  
                        info: 'orgInfo',
                        uuid: 'orgId',
                        returnName: 'name',
                        filter: 'arr'
                    },
                    {
                        tr:'完成时间',
                        rowspan:true,
                        field:'finishOrderTime',
                        sort: true,
                        filter:'date'
                    },
                    {
                        tr:'核算状态',
                        rowspan:true,
                        field:'confirmedResult',
                        sort: true,
                        filter: 'confirmedResult'
                    },
                    {
                        tr:'结算方式',
                        rowspan:true,
                        field:'settleMethod',
                        sort: true,
                        filter: 'settleMethod'
                    },
                    {
                        tr:'佣金',
                        rowspan:true,
                        sort: true,
                        field:'commission',
                        filter: 'number'
                    },
                    {
                        tr:'总成本费用',
                        colspan: true,
                        table: [
                            {
                                tr:'现金',
                                field:'cashCompanyCharge',
                                filter: 'number'
                            },
                            {
                                tr:'签单',
                                field:'companyCharge',
                                filter: 'number'
                            },
                        ]
                    },
                    {
                        tr:'总救援费用',
                        colspan: true,
                        table: [
                            {
                                tr:'现金',
                                field:'cashCharge',
                                filter: 'number'
                            },
                            {
                                tr:'签单',
                                field:'charge',
                                filter: 'number'
                            },
                        ]
                    }
                ],
                linkBtn:[
                    // {
                    //     text:'核算',
                    //     link_name:'accounting_order_business',
                    //     fn:function(self, key, value, item_index,item){
                    //         self.$router.push({ name: 'accounting_order_business', params: {id:item['towOrderId'],status:item['confirmedResult']}});
                    //     }
                    // },
                ]
            }
        },
        components:{
            vueTable
        },
        methods:{

        }
    }
</script>
<style>
   
    
</style>