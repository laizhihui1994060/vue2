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
                    tr:'基本工资',
                    sort:true,
                    field:'type'
                },
                 {
                    tr:'住房补贴',
                    sort:true,
                    field:'type'
                },
                {
                    tr:'餐饮补贴',
                    sort:true,
                    field:'type'
                },
                {
                    tr:'高温补贴',
                    sort:true,
                    field:'settlementMethod'
                },
                  {
                    tr:'全勤奖',
                    sort:true,
                    field:'settlementMethod'
                },
                  {
                    tr:'出车业绩',
                    sort:true,
                    field:'settlementMethod'
                },
                  {
                    tr:'客户业绩',
                    sort:true,
                    field:'settlementMethod'
                },
                  {
                    tr:'下单业绩',
                    sort:true,
                    field:'settlementMethod'
                },
                  {
                    tr:'调度业绩',
                    sort:true,
                    field:'settlementMethod'
                },
                {
                    tr:'当月工资',
                    sort:true,
                    field:'settlementMethod'
                },
            ],
            linkBtn:[
              
            ],
            addBtns:[
                 {
                    text:"工资标准设置",
                    link_name:'wageSetting_standard',   //路由名字
                    link_key:"chosen",
                    link_Field:'type',
                    isCreate: true,
                },
                {
                    text:"生成工资单",
                    link_name:'',   //路由名字
                    link_key:"chosen",
                    link_Field:'type',
                    isCreate: true,
                }
            ]
        }
    },
        components:{
            vueTable
        }
    }
</script>

<style scoped>

</style>