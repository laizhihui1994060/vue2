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
                        title:'车牌号',
                        name:'type',
                        filter:"company_NAME",
                        url:"/item"  
                    },
                    {
                        title:'负责人',
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
                        label:'车牌号码'
                    }
                ],
            
                tableIterationField:[
                    {
                        tr:'登记日期',
                        sort:true,
                        field:'orderNo'
                    },
                    
                    {
                        tr:'车牌号码',
                        sort:true,
                        field:'name'
                    },
                   
                    {
                        tr:'事故日期',
                        sort:true,
                        field:'type'
                    },
                     {
                        tr:'负责人员',
                        sort:true,
                        field:'type'
                    },
                    {
                        tr:'理赔时间',
                        sort:true,
                        field:'type'
                    },
                    {
                        tr:'理赔金额',
                        sort:true,
                        field:'settlementMethod'
                    },
                    {
                        tr:'车辆损失',
                        sort:true,
                        field:'settlementMethod'
                    },
                     {
                        tr:'乙方损失',
                        sort:true,
                        field:'settlementMethod'
                    },
                    {
                        tr:'伤亡金额',
                        sort:true,
                        field:'settlementMethod'
                    },
                    {
                        tr:'三者损失',
                        sort:true,
                        field:'settlementMethod'
                    },
                    {
                        tr:'货物损失',
                        sort:true,
                        field:'settlementMethod'
                    },
                    {
                        tr:'其他损失',
                        sort:true,
                        field:'settlementMethod'
                    },
                    {
                        tr:'事故原因',
                        sort:true,
                        field:'settlementMethod'
                    },
                    
                ],
                linkBtn:[
                   {
                        text:"查看",
                        link_name:'accident_registration',   //路由名字
                        link_key:"chosen",
                        link_Field:'type',
                        isCreate: false,
                        model:false
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
                        text:"+事故登记",
                        link_name:'accident_registration',   //路由名字
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