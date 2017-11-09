<template>
    <div>
           <vue-table
            :filter-btns="filterBtns"
            :filter-input="filterInput"
            item-url="/falseItem"
            :table-iteration-field="tableIterationField"
            :linkBtn="linkBtn"
            :rightBtn="rightBtn"/>
    </div>
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
                    title:'客户名称',
                    name:'type',
                    filter:"SVC_NAME",
                    url:"/item"  
                },
                {
                    title:'回访类型',
                    name:'source',
                    filter:"SVC_NAME",
                    url:"/item"  
                },
                {
                    title:'回访状态',
                    name:'resTime',
                    filter:"SVC_NAME",
                    url:"/item"  ,
                },
                {
                    title:'救援结果',
                    name:'resTime',
                    filter:"SVC_NAME",
                    url:"/item"  
                }
            ],
            filterInput:[
                {
                    name:"orderNo",
                    label:'订单编号'
                }
            ],
            tableIterationField:[
                {
                    tr:'订单编号',
                    sort:true,
                    field:'orderNo'
                },
                {
                    tr:'救援时间',
                    sort:true,
                    field:'source'
                },
                {
                    tr:'订单来源',
                    sort:true,
                    field:'name'
                },
                {
                    tr:'客户名称',
                    sort:true,
                    field:'resTime'
                },
                {
                    tr:'救援结果',
                    sort:true,
                    field:'type'
                },
                {
                    tr:'回访状态',
                    sort:true,
                    field:'settlementMethod'
                },
                {
                    tr:'回访类型',
                    sort:true,
                    field:'res'
                },
                {
                    tr:'满意程度',
                    sort:true,
                    field:'des'
                },
                {
                    tr:'回访时间',
                    sort:true,
                    field:'des'
                },
            ],
            linkBtn:[
                {
                    text:'查看详情',
                    link_name:'checkOrderVisit',
                    link_key:"chosen",
                    link_Field:'chosen'
                },
               
            ]
        }
    },
}
</script>
<style scoped>
    
</style>