<template>
        <vue-table
            :filter-btns="filterBtns"
            :filter-input="filterInput"
            item-url="/falseItem"
            :table-iteration-field="tableIterationField"
            :linkBtn="linkBtn"
            :rightBtn="rightBtn" 
            :addBtns = "addBtns" />
</template>
<script>

import vueTable from "../../../../../common_component/vue-table.vue";

    export default {

        components:{
           vueTable,
        },
        
        data(){
            return {
                filterBtns:[
                    {
                        title:'公司名称',
                        name:'type',
                        filter:"SVC_NAME",
                    },
                ],
                filterInput:[
                    {
                        name:"orderNo",
                        label:'订单编号'
                    },
                    {
                        name:"case",
                        label:'财务号'
                    }
                ],
                tableIterationField:[
                    {
                        tr:'公司名称',
                        sort:true,
                        field:'orderNo'
                    },
                    {
                        tr:'期初应收',
                        sort:true,
                        field:'source'
                    },
                    {
                        tr:'接单价格',
                        sort:true,
                        field:'name'
                    },
                    {
                        tr:'收现金额',
                        sort:true,
                        field:'resTime'
                    },
                    {
                        tr:'路桥费用',
                        sort:true,
                        field:'type'
                    },
                    {
                        tr:'等待费用',
                        sort:true,
                        field:'settlementMethod'
                    },
                    {
                        tr:'小轮金额',
                        sort:true,
                        field:'res'
                    },
                    {
                        tr:'期间应收',
                        sort:true,
                        field:'des'
                    },
                    {
                        tr:'期末应收',
                        sort:true,
                        field:'des'
                    }
                ],
                linkBtn:[

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