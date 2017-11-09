<template>
    <vue-table
        :filter-btns="filterBtns"
        :filter-input="filterInput"
        item-url="/falseItem"
        :table-iteration-field="tableIterationField"
        :linkBtn="linkBtn"
        :rightBtn="rightBtn" 
        :addBtns = "addBtns"
        :dropdownToggle = "dropdownToggle" />
</template>
<script>
import vueTable from "../../../../../common_component/vue-table.vue";

    export default {
        components:{
            vueTable
        },
        data(){
            return {
                filterBtns:[
                    {
                        title:'登记人',
                        name:'type',
                        filter:"SVC_NAME" 
                    },
                    {
                        title:'报销人',
                        name:'source',
                        filter:"SVC_NAME" 
                    },
                    {
                        title:'费用类型',
                        name:'source',
                        filter:"SVC_NAME" 
                    },
                ],
                addBtns: [
                    {
                        text:'+ 添加报销单',
                        link_name:'reimbursement_add',   //路由名字
                        link_key:"id",
                        link_Field:'type',
                        isCreate: true,
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
                        tr:'报销编号',
                        sort:true,
                        field:'orderNo'
                    },
                    {
                        tr:'报销人',
                        sort:true,
                        field:'source'
                    },
                    {
                        tr:'车牌号',
                        sort:true,
                        field:'name'
                    },
                    {
                        tr:'登记人',
                        sort:true,
                        field:'resTime'
                    },
                    {
                        tr:'报销金额',
                        sort:true,
                        field:'type'
                    },
                    {
                        tr:'费用类型',
                        sort:true,
                        field:'settlementMethod'
                    },
                    {
                        tr:'支付日期',
                        sort:true,
                        field:'res'
                    },
                    {
                        tr:'报销日期',
                        sort:true,
                        field:'des'
                    },
                    {
                        tr:'支付方式',
                        sort:true,
                        field:'des'
                    }
                ],
                linkBtn:[
                    {
                        text:'查看',
                        link_name:'reimbursement_add',   //路由名字
                        link_key:'id',
                        link_Field:'type',
                        isCreate: false,
                    }
                ]
            }
        }
        

    }
</script>

<style scoped>
    .right_content .table_box tbody > tr:nth-child(odd) td:nth-child(1){
        background: none;
    }
</style>