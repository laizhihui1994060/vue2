<template>
    <vue-table
        :filter-btns="filterBtns"
        :filter-input="filterInput"
        item-url="/falseItem"
        :table-iteration-field="tableIterationField"
        :linkBtn="linkBtn"
        :addBtns="addBtns" 
        :rightBtn="rightBtn"/>
       
</template>
<script>


import vueTable from "../../../../../common_component/vue-table.vue";


    let bool = false;
 
    export default {
           data () {
               return {
                filterBtns:[
                    {
                        title:'职位',
                        name:'position',
                        url: 'client:/helper/position',
                        filter:"name",
                        filterName: 'hrPositionId'
                    },
                    {
                        title:'性别',
                        arr: [ { name: '男', code: 'M'}, { name: '女', code: 'F' }, { name: '其它', code: 'O' } ],
                        name:'gender',
                        filter:"name",
                        filterName: 'code'
                    },
                    {
                        title:'姓名',
                        name:'empId',
                        filter:"empName",
                        filterName: 'empId',
                        url:"client:/emp/basic?",
                        params: { pageSize:1000, pageIndex:1  }
                    },
                  
                   
                ],
                filterInput:[
                    {
                        name:"employeeNo",
                        label:'员工编号'
                    }
                ],
            
                tableIterationField:[
                    {
                        tr:'员工编号',
                        sort:true,
                        field:'orderNo'
                    },
                    {
                        tr:'员工姓名',
                        sort:true,
                        field:'source'
                    },
                    {
                        tr:'职位',
                        sort:true,
                        field:'name'
                    },
                   
                    {
                        tr:'性别',
                        sort:true,
                        field:'type'
                    },
                     {
                        tr:'离职日期',
                        sort:true,
                        field:'type'
                    },
                    {
                        tr:'离职原因',
                        sort:true,
                        field:'type'
                    },
                    {
                        tr:'手机号码',
                        sort:true,
                        field:'settlementMethod'
                    },
                    
                ],
                linkBtn:[
                   {
                        text:'查看',
                        link_name:'turnover_leave',   //路由名字
                        link_key:"chosen",
                        link_Field:'type',
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
                        text:"+办理离职",
                        link_name:'turnover_leave',   //路由名字
                        link_key:"chosen",
                        link_Field:'type',
                        isCreate: true,
                    }
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