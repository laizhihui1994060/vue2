<template>
    <vue-table
        :filter-btns="filterBtns"
        :filter-input="filterInput"
        item-url=""
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
                        title:'车牌号',
                        name:'status',
                        filter:"status",
                        url:"",
                        method: 'post',
                    },
                    {
                        title:'保险类型',
                        name:'source',
                        filter:"client_type",
                        url:"/item"  
                    }      
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
                        tr:'登记人',
                        sort:true,
                        field:'status'
                    },
                    {
                        tr:'保险类型',
                        sort:true,
                        field:'towTruckId'
                    },
                   
                    {
                        tr:'保险金额',
                        sort:true,
                        field:'inchargeId'
                    },
                    {
                        tr:'保险公司',
                        sort:true,
                        field:'maintainVendor'
                    },
                    {
                        tr:'开始日期',
                        sort:true,
                        field:'startTime'
                    },
                    {
                        tr:'结束日期',
                        sort:true,
                        field:'endTime'
                    }
                    
                ],
                linkBtn:[
                   {
                        text:'查看',
                        link_name:'annualRecord_add',   //路由名字
                        link_key:"chosen",
                        link_Field:'maintainId',
                        isCreate:false,
                        model:false,
                    },
                    {
                        text:'删除',
                        model:false,
                    }
                ],
                addBtns:[
                     {
                        text:"+ 添加年审记录",
                        link_name:'annualRecord_add',   //路由名字
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