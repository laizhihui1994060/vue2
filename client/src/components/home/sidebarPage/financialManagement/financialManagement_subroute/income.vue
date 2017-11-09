<template>
    <vue-table
        :filter-btns="filterBtns"
        :filter-input="filterInput"
        item-url="finance:/receivables/list"
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
                    pageIndex:1,
                    pageSize:15
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
                
                filterInput:[
                    // {
                    //     url: "client:/search",
                    //     flag: "RECEIVABLE",
                    //     name:"param",
                    //     label:'收款单号、收款单编号'
                    // },
                ],
                tableIterationField:[
                    {
                        tr:'收款单编号',
                        field:'receivesCode',
                        sort:true,
                        link: {
                            text:'查看',
                            link_name:'income_check',   //路由名字
                            link_key:"information",
                            link_Field:'all',
                        }
                    },
                    {
                        tr:'对账单编号',
                        field:'reconciliationCode',
                        sort:true
                    },
                    {
                        tr:'付款客户',
                        sort:true,
                        field:'partnerId',
                        info: 'partnerInfo',
                        uuid:'partnerId',
                        returnName: 'name',
                        filter: 'arr',
                        link: {
                            link_name: 'customer_add', 
                            link_key:"chosen",
                            link_Field:'partnerId',
                            isCreate: false
                        }
                    },
                    {
                        tr:'付款人',
                        field:'payPersonName',
                        sort:true
                    },
                    {
                        sort:true,
                        tr:'付款方式',
                        field:'payMethod',
                        filter: 'payMethod'
                    },
                    {
                        tr:'收款日期',
                        field:'receiveDate',
                        param:true,
                        filter: 'date',
                        sort:true
                    },
                    {
                        tr:'收款金额',
                        field:'receiveAmt',
                        sort:true
                    },

                    {
                        tr:'经手人',
                        field:'handlePersonName',
                        sort:true,
                        link: {
                             link_name:'employee_add',   //路由名字
                             link_key:"chosen",
                             link_Field:'handlePersonId',
                             isCreate:false,
                             model:false,
                         }
                    },  
                    {
                        tr:'备注',
                        field:'remark',
                        sort:true
                    },
                    {
                        tr:'审核人',
                        field:'confirmedBy',
                        sort:true,
                        info: 'userInfo',
                        uuid: 'userId',
                        returnName: 'empName',
                        filter: 'arr',
                        // link: {
                        //      link_name:'employee_add',   //路由名字
                        //      link_key:"chosen",
                        //      link_Field:'confirmedBy',
                        //      isCreate:false,
                        //      model:false,
                        //  }
                    }
                ],
                linkBtn:[
                    // {
                    //     text:'查看',
                    //     link_name:'income_check',   //路由名字
                    //     link_key:"information",
                    //     link_Field:'all',
                    // },
                    // {
                    //     text:'冲销',
                    //     link_name:'income_write_off',
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