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
                    title:'奖惩',
                    name:'type',
                    filter:"company_NAME",
                    url:"/item"  
                },
                {
                    title:'登记时间',
                    name:'source',
                    filter:"client_type",
                    url:"/item"  
                },
                {
                    title:'姓名',
                    name:'empId',
                    filter:"empName",
                    filterName: 'empId',
                    url:"4577/v1/emp/basic?",
                    params: { pageSize:1000, pageIndex:1  }
                },
              
               
            ],
            filterInput:[
                {
                    name:"employeeNo",
                    label:'登记人编号'
                }
            ],
        
            tableIterationField:[
                {
                    tr:'登记时间',
                    sort:true,
                    field:'orderNo'
                },
                {
                    tr:'登记人',
                    sort:true,
                    field:'source'
                },
                {
                    tr:'奖惩',
                    sort:true,
                    field:'name'
                },
               
                {
                    tr:'员工编号',
                    sort:true,
                    field:'type'
                },
                 {
                    tr:'姓名',
                    sort:true,
                    field:'type'
                },
                {
                    tr:'金额',
                    sort:true,
                    field:'type'
                },
                {
                    tr:'奖惩日期',
                    sort:true,
                    field:'settlementMethod'
                },
                  {
                    tr:'原因',
                    sort:true,
                    field:'settlementMethod'
                }            
            ],
            linkBtn:[
                
            ],
            addBtns:[
                 {
                    text:"+ 工资奖励",
                    link_name:'salary_reward',   //路由名字
                    link_key:"chosen",
                    link_Field:'type',
                    isCreate: true,
                    isSalary: true,
                },
                {
                    text:"+ 工资扣除",
                    link_name:'salary_reward',   //路由名字
                    link_key:"chosen",
                    link_Field:'type',
                    isCreate: true,
                    isSalary: false
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