<template>

        <vue-table
            :filter-btns="filterBtns"
            :filter-input="filterInput"
            item-url="finance:/payments/list"
            type='post'
            :params='params'
            :table-iteration-field="tableIterationField"
            :linkBtn="linkBtn"
            :rightBtn="rightBtn" 
            :addBtns = "addBtns"
            :enableTimeRange='true' />

</template>
<script>
import vueTable from "../../../../../common_component/vue-table.vue";


    export default {
        components:{
            vueTable
        },
        data(){
            return {
                params:{
                    pageSize:10,
                    pageIndex:1
                },
                filterBtns:[
                    {
                        hasAll: true,
                        title:'客户',
                        name:'partnerId',
                        url: 'client:/helper/partner',
                        method: 'post',
                        params: { isCustomer: true },
                        filter:"name",  
                        filterName: 'partnerId'
                    },
                    {
                        hasAll: true,
                        title:'付款方式',
                        name:'payMethod',
                        arr: [{ name:'现金', code:'CASH' }, {name: '银行转账', code: 'TRANSFER'}, {name: '电汇', code: 'WIRE'}, {name: '支票', code: 'CHECK'}],
                        filter:"name",  
                        filterName: 'code'
                    },
                ],
                addBtns: [

                ],
                filterInput:[
                    // {
                    //     url: "client:/search",
                    //     flag: "PAYMENT",
                    //     name:"param",
                    //     label:'付款单号、收款单编号'
                    // },
                ],
                tableIterationField:[
                    {
                        tr:'付款单编号',
                        sort:true,
                        field:'paymentsCode',
                        link: {
                            text:'查看',
                            link_name:'expenditure_check',   //路由名字
                            link_key:"information",
                            link_Field:'all'
                        }   
                    },
                    {
                        tr:'对账单编号',
                        sort:true,
                        field:'reconciliationCode'
                    },
                    {
                        tr:'往来单位',
                        field:'partnerId',
                        sort:true,
                        info: 'partnerInfo',
                        uuid:'partnerId',
                        returnName: 'name',
                        filter: 'arr'
                    },
                    {
                        tr:'收款人',
                        sort:true,
                        field:'receivePersonName',

                    },
                    {
                        tr:'付款方式',
                        sort:true,
                        field:'payMethod',
                        filter: 'payMethod'
                    },
                    {
                        tr:'付款日期',
                        sort:true,
                        field:'payDate',
                        filter: 'date',
                        param:true
                    },
                    {
                        tr:'付款金额',
                        sort:true,
                        field:'payAmt'
                    },
                    {
                        tr:'经手人',
                        field:'handlePersonName',
                        link: {
                             link_name:'employee_add',   //路由名字
                             link_key:"chosen",
                             link_Field:'handlePersonId',
                             isCreate:false,
                             model:false,
                        },
                        sort:true
                    },
                    {
                        tr:'备注',
                        sort:true,
                        field:'remark'
                    },
                    {
                        tr:'审核人',
                        sort:true,
                        info: 'userInfo',
                        field:'confirmedBy',
                        uuid: 'userId',
                        returnName: 'empName',
                        filter: 'arr'
                    }
                ],
                linkBtn:[
                    // {
                    //     text:'查看',
                    //     link_name:'expenditure_check',   //路由名字
                    //     link_key:"information",
                    //     link_Field:'all'
                    // },
                    // {
                    //     text:'冲销',
                    //     link_name:'expenditure_write_off',
                    //     link_key:"chosen",
                    //     link_Field:'type'
                    // }
                ]
            }
        }
    }
</script>


<style scoped>
    .right_content .table_box tbody>tr:nth-child(odd) td:nth-child(1){
        background: none;
    }
</style>