<template>
    <vue-table
        :filter-btns="filterBtns"
        :filter-input="filterInput"
        item-url="client:/maintain/list"
        type='post'
        :params='params'
        :table-iteration-field="tableIterationField"
        :linkBtn="linkBtn"
        :addBtns="addBtns" 
        :rightBtn="rightBtn" /> 
       
</template>
<script>
 

import vueTable from "../../../../../common_component/vue-table.vue";
    export default {
        data () {
            return {
                params: {
                    "pageSize": 10,
                    "pageIndex": 1,
                },
                filterBtns:[
                    { 
                        title:'维修状态',
                        hasAll: true,
                        name:'status',
                        filter:"name",
                        filterName: "code",
                        arr: [ { name: '计划', code: 'TODO' }, { name: '维修中', code: 'DOING' }, { name: '完成', code: 'DONE' } ]
                    },
                    {
                        title:'车牌号',
                        hasAll: true,
                        name:'towTruckId',
                        filter:"plateNo",
                        filterName: 'id',
                        method: 'post',
                        url:"client:/helper/truck"  
                    },
                    {
                        title:'负责人',
                        hasAll: true,
                        name:'inchargeId',
                        filter:"empName",
                        filterName: 'empId',
                        url:"client:/emp/basic?",
                        params: { pageSize:1000, pageIndex:1  }
                    },
                ],
                filterInput:[
                    {
                        name:"employeeNo",
                        label:'车牌号码'
                    }
                ],
            
                tableIterationField:[
                    {
                        tr:'登记日期',
                        sort:true,
                        field:'registerTime',
                        filter: 'date'
                    },
                    {
                        tr:'维修状态',
                        sort:true,
                        field:'status'
                    },
                    {
                        tr:'车牌号码',
                        sort:true,
                        field:'towTruckId'
                    },
                   
                    {
                        tr:'负责人',
                        sort:true,
                        field:'inchargeId'
                    },
                    //  {
                    //     tr:'维修金额',
                    //     sort:true,
                    //     field:'type'
                    // },
                    {
                        tr:'维修单位',
                        sort:true,
                        field:'maintainVendor'
                    },
                    {
                        tr:'开始日期',
                        sort:true,
                        field:'startTime',
                        filter: 'date'
                    },
                    {
                        tr:'结束日期',
                        sort:true,
                        field:'endTime',
                        filter: 'date'
                    },
                    {
                        tr:'维修地点',
                        sort:true,
                        field:'maintainPlace'
                    },
                    {
                        tr:'维修说明',
                        sort:true,
                        field:'comments'
                    }
                    
                ],
                linkBtn:[
                   {
                        text:'查看',
                        link_name:'maintenance_registration',   //路由名字
                        link_key:"chosen",
                        link_Field:'maintainId',
                        isCreate:false,
                        model:false,
                    },
                    {
                        text:'订单',
                        model:true,
                    },
                    {
                        text:'对账单',
                        model:true,
                    },
                    {
                        text:'应收账款',
                        model:true,
                    },
                    {
                        text:'收款冲销',
                        model:true,
                    },
                    {
                        text:'新增发票',
                        model:true,
                    },
                ],
                addBtns:[
                     {
                        text:"+ 维修登记",
                        link_name:'maintenance_registration',   //路由名字
                        link_key:"chosen",
                        link_Field:'type',
                        isCreate: true,
                    },
                ]
            }
        },
        components:{
            vueTable,
        }
    }
</script>

<style scoped>

</style>