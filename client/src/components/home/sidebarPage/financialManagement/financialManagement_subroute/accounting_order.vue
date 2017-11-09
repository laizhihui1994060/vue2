<template>
    <vue-table
        v-show='isShow'
        :filter-btns="filterBtns"
        :filter-input="filterInput"
        item-url="finance:/accounting/query/orderlistbycondition"
        type='post'
        :params='params'
        :table-iteration-field="tableIterationField"
        :linkBtn="linkBtn"
        :addBtns="addBtns"
        :rightBtn="rightBtn" 
        :excelDate="excelDate"
        :listDisplayOptions.sync='listDisplayOptions'
        @update:tableIterationField="(item) => {tableIterationField = item; isShow = true}"
        :enableTimeRange='true' />
</template>

<script>
    import vueTable from "../../../../../common_component/vue-table.vue";
    
    export default {
        data () {
            return {
                isShow: false,
                listDisplayOptions: {
                    path: '/finance/accountingorder_columns'
                },
                params: {
                    pageIndex:1,
                    pageSize:10
                },
                excelDate:{
                    url:'finance:/accounting/query/orderlistbycondition',
                    method:'post',
                    filename:"收现统计导出",
                    displayField:[
                        {
                            tr:'订单编号',
                            field:'orderCode',
                        },
                        {
                            tr:'业务类型',
                            field:'jobType',
                            filter:'jobType'
                        },
                        {
                            tr:'案件号',
                            field:'customerCaseNo',
                        },
                        {
                            tr:'收款方式',
                            field:'settleMethod',
                            filter: 'settleMethod',
                        },
                        {
                            tr:'预订救援时间',
                            field:'orderScheduleTime',
                            filter: 'date',
                        },
                        {
                            tr:'救援地',
                            field:'incidentAddrAddress',
                            filter: 'tooltip',
                        },
                        {
                            tr:'目的地',
                            field:'destinationAddrAddress',
                            filter: 'tooltip',
                        },
                        {
                            tr:'故障车牌',
                            field:'vehiclePlateNo',
                        },
                        {
                            tr:'车主号码',
                            field:'carOwnerPhone',
                        },
                        {
                            tr:'完成时间',
                            field:'finishOrderTime',
                            filter: 'date',
                        },
                        {
                            tr:'到达里程',
                            field:'milageToIncidentSpot',
                            filter: 'number'
                        },
                        {
                            tr:'拖车里程',
                            field:'milageTowing',
                            filter: 'number'
                        },
                        {
                            tr:'返程里程',
                            field:'milageBack',
                            filter: 'number'
                        },
                        {
                            tr:'司机',
                            field:'driverName',
                        },
                        {
                            tr:'客户',
                            field:'customerName',

                        },
                        { 
                            tr: '服务商',
                            field:'serviceProviderName',
                        },
                        {
                            tr:'核算状态',
                            field:'confirmedResult',
                            filter: 'confirmedResult',
                        },
                        {
                            tr:'核算时间',
                            field:'confirmedTime',
                            filter:'date',
                        },
                        {
                            tr:'核算人',
                            field:'confirmedPersonName',
                        },
                        {
                            tr:'佣金',
                            field:'commission',
                            filter: 'number',
                        },
                        {
                            tr:'总成本费用-现金',
                            field:'cashCompanyCharge',
                            filter: 'number',
                        },
                        {
                            tr:'总成本费用-成本',
                            field:'companyCharge',
                            filter: 'number',
                        },
                        {
                            tr:'总救援费用-现金',
                            field:'cashCharge',
                            filter: 'number',
                        },
                        {
                            tr:'总救援费用-成本',
                            field:'charge',
                            filter: 'number',
                        },
                        {
                            tr:'收款状态',
                            field:'paymentStatus',
                            filter: 'PARTIAL_PAYMENT',
                        },
                        {
                            tr: "任务结果",
                            field: "jobStatusOverall",
                            filter: 'jobStatusOverall',
                        }
                    ]
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
                    {
                        title:'技师',
                        hasAll: true,
                        method: 'post',
                        name:'towDriverId',
                        filter:"empName",
                        filterName: 'userId',
                        url:"client:/helper/emp",
                        params: { isDriver: true  }
                    },

                ],
                filterInput:[ 
                    {
                        url: "client:/search",
                        name:"param",
                        label:'案件号、故障车牌号、救援地址、车主号码',
                        flag: "ACCOUNTING_ORDER",
                        width:'300px'
                    }
                ],
                tableIterationField:[
                    {
                        tr:'订单编号',
                        sort: true,
                        rowspan:true,
                        field:'orderCode',
                        fieName: 't2.order_code',
                        link: {
                            text:'核算',
                            link_name:'accounting_order_business',
                            fn:function(self, key, value, item_index,item){
                                self.$router.push({ name: 'accounting_order_business', params: {id:item['towOrderId'],status:item['confirmedResult']}});
                            }
                        }
                    },
                    {
                        tr:'业务类型',
                        field:'jobType',
                        fieName: 't2.job_type',
                        sort:true,
                        rowspan:true,
                        filter:'jobType'
                    },
                    {
                        tr:'案件号',
                        rowspan:true,
                        sort: true,
                        field:'customerCaseNo',
                        fieName: 't2.customer_case_no',
                    },
                    {
                        tr:'收款方式',
                        field:'settleMethod',
                        sort: true,
                        rowspan:true,
                        filter: 'settleMethod',
                        fieName: 't2.settle_method',
                    },
                    {
                        tr:'预订救援时间',
                        field:'orderScheduleTime',
                        sort: true,
                        rowspan:true,
                        filter: 'date',
                        fieName: 't2.order_schedule_time',
                    },
                    {
                        tr:'救援地',
                        sort: true,
                        rowspan:true,
                        field:'incidentAddrAddress',
                        filter: 'tooltip',
                        fieName: 't2.incident_addr_address',
                    },
                    {
                        tr:'目的地',
                        sort: true,
                        rowspan:true,
                        field:'destinationAddrAddress',
                        filter: 'tooltip',
                        fieName: 't2.destination_addr_address',
                    },
                    {
                        tr:'故障车牌',
                        rowspan:true,
                        sort: true,
                        field:'vehiclePlateNo',
                        fieName: 'vehicle_plate_no',
                    },
                    {
                        tr:'车主号码',
                        rowspan:true,
                        sort: true,
                        field:'carOwnerPhone',
                        fieName: 't4.car_owner_phone',
                    },
                    {
                        tr:'完成时间',
                        field:'finishOrderTime',
                        sort: true,
                        rowspan:true,
                        filter: 'date',
                        fieName: 't2.finish_order_time',
                    },
                    {
                        tr:'到达里程',
                        field:'milageToIncidentSpot',
                        sort: true,
                        rowspan:true,
                        fieName: 'milage_to_incident_spot',
                    },
                    {
                        tr:'拖车里程',
                        field:'milageTowing',
                        sort: true,
                        rowspan:true,
                        fieName: 'milage_towing',
                    },
                    {
                        tr:'返程里程',
                        field:'milageBack',
                        sort: true,
                        rowspan:true,
                        fieName: 'milage_back',
                    },
                    {
                        tr:'司机',
                        field:'driverName',
                        sort: true,
                        rowspan:true,
                        fieName: 't1.tow_driver_id',
                    },
                    {
                        tr:'客户',
                        sort: true,
                        rowspan:true,
                        field:'customerName',
                        fieName: 't2.customer_id',
                        link: {
                            link_name: 'customer_add', 
                            link_key:"chosen",
                            link_Field:'customerId',
                            isCreate: false
                        }
                    },
                    { 
                        tr: '服务商',
                        sort: true,
                        rowspan:true,
                        field:'serviceProviderName',
                        fieName: 't2.bid_org_id'
                    },
                    {
                        tr:'核算状态',
                        field:'confirmedResult',
                        sort: true,
                        rowspan:true,
                        filter: 'confirmedResult',
                        fieName: 't2.confirmed_result',
                    },
                    {
                        tr:'核算时间',
                        field:'confirmedTime',
                        sort: true,
                        rowspan:true,
                        filter:'date',
                        fieName: 't2.confirmed_time',
                    },
                    {
                        tr:'核算人',
                        field:'confirmedPersonName',
                        sort: true,
                        rowspan:true,
                        fieName: 't2.confirmed_person_id'
                    },
                    {
                        tr:'佣金',
                        sort: true,
                        rowspan:true,
                        field:'commission',
                        filter: 'number',
                        fieName: 't2.commission',
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
                    },
                    {
                        tr:'收款状态',
                        sort: true,
                        rowspan:true,
                        field:'paymentStatus',
                        filter: 'PARTIAL_PAYMENT',
                        fieName: 't2.payment_status'
                    },
                    {
                        tr: "任务结果",
                        sort: true,
                        rowspan:true,
                        field: "jobStatusOverall",
                        filter: 'jobStatusOverall',
                        fieName: 't1.job_status_overall'
                    }
                ],
                linkBtn: [
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