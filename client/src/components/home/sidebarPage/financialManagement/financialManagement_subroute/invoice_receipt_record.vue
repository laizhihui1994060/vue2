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
                        title:'领用人',
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
                        tr:'领用日期',
                        sort:true,
                        field:'orderNo'
                    },
                    {
                        tr:'编号',
                        sort:true,
                        field:'source'
                    },
                    {
                        tr:'领用人',
                        sort:true,
                        field:'name'
                    },
                    {
                        tr:'发票簿开头号码',
                        sort:true,
                        field:'resTime'
                    },
                    {
                        tr:'发票簿结尾号码',
                        sort:true,
                        field:'type'
                    },
                    {
                        tr:'领用张数',
                        sort:true,
                        field:'settlementMethod'
                    }
                ],
                linkBtn:[

                ],
                dropdownToggle:{
                    name: '领用记录',
                    ul: [
                        {
                            text:'开票登记',
                            link_name:'invoice_register',   //路由名字
                            link_key:'id',
                            link_Field:'type',
                            isCreate: true,
                        },
                        {
                            text:'发票簿入库',
                            link_name:'invoice_book_add',   
                            link_key:'id',
                            link_Field:'type',
                            isCreate: false,
                        },
                        {
                            text:'发票领用',
                            link_name:'invoice_receipt',   
                            link_key:'id',
                            link_Field:'type',
                        },
                        {
                            text:'发票退还',
                            link_name:'invoice_returned',   
                            link_key:'id',
                            link_Field:'type',
                        },
                        {
                            text:'入库记录',
                            link_name:'invoice_book_add_record',   
                            link_key:'id',
                            link_Field:'type',
                        },
                        {
                            text:'领用记录',
                            link_name:'invoice_receipt_record',   
                            link_key:'id',
                            link_Field:'type',
                        },
                        {
                            text:'退还记录',
                            link_name:'invoice_returned_record',   
                            link_key:'id',
                            link_Field:'type',
                        }
                    ]
                }
            }
        }
    }
</script>

<style>


</style>