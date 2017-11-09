<template>
    <div>
        <vue-table
            :filter-btns="filterBtns"
            :filter-input="filterInput"
            item-url="finance:/invoice/register/list"
            type='post'
            :params='params'
            :table-iteration-field="tableIterationField"
            :linkBtn="linkBtn"
            :rightBtn="rightBtn" 
            :addBtns = "addBtns"
            :dropdownToggle = "dropdownToggle" />

        <invoice-item/>
        <invoice-type/>
    </div>
</template>
<script>
import vueTable from "../../../../../common_component/vue-table.vue";
import invoiceItem from "../modal/invoiceItem.vue";
import invoiceType from "../modal/invoiceType.vue";

    export default {
        components:{
            vueTable,
            invoiceItem,
            invoiceType
        },
        data(){
            return {
                params:{
                    pageSize : 10,
                    pageIndex : 1,
                },
                filterBtns:[
                    {
                        title:'登记人',
                        name:'type',
                        url:'client:/helper/emp',
                        param:{'isUser':true},
                        method:'post' ,
                        filter:"empName",
                        listWidth:'100px'  

                    },
                    {
                        title:'客户',
                        name:'customerId',
                        url:'client:/helper/customer',
                        filter:"name",
                        listWidth:'100px'  
                    },
                    {
                        title:'发票类型',
                        url:'finance:/invoice/type/org',
                        filter:"name",
                        listWidth:'100px'  

                    },
                    {
                        title:'开票项目',
                        url:'finance:/invoice/item/org',
                        filter:"name",
                        listWidth:'100px'  

                    },
                    {
                        title:'开票公司',
                        url:'finance:/invoice/company/org',
                        filter:"companyName",
                        listWidth:'204px'  

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
                        tr:'发票号码',
                        sort:true,
                        field:'invoiceBookNo'
                    },
                    {
                        tr:'开票人',
                        sort:true,
                        filter:'arr',
                        field:'createdBy',
                        uuid:'userId',
                        returnName:'empName',
                        info:'userInfo'
                    },
                    {
                        tr:'开票金额',
                        sort:true,
                        field:'invoicingAmt'
                    },
                    {
                        tr:'开票项目',
                        sort:true,
                        field:'invoiceItemName'
                    },
                    {
                        tr:'开票日期',
                        sort:true,
                        field:'invoicingDate' ,
                        filter:'date'
                    },
                    {
                        tr:'开票单位',
                        sort:true,
                        field:'invoicingCompanyName'
                    },
                    {
                        tr:'发票类型',
                        sort:true,
                        field:'invoiceTypeId'
                    },
                    {
                        tr:'发票簿',
                        sort:true,
                        field:'invoiceBookId'
                    },
                    {
                        tr:'快递单号',
                        sort:true,
                        field:'mailNo'
                    }
                ],
                linkBtn:[
                    {
                        text:"编辑",
                        link_name:'invoice_check',   //路由名字
                        fn:function(self, key, value, item_index,item){
                            self.$router.push({ name: 'invoice_check', params: {isCreate:false,id:item['invoiceRegisterId'] + '|' + item['partnerId']}})
                        }
                    },
                ],
                dropdownToggle:{
                    name: '其他操作',
                    ul: [
                        {
                            text:'发票簿入库',
                            link_name:'invoice_book_add',   
                        },
                        {
                            text:'发票项目管理',
                            id:'#invoiceItem', 
                            model:true ,

                        }, 
                        {
                            text:'发票类型管理',
                            id:'#invoiceType', 
                            model:true ,

                        }, 
                        // {
                        //     text:'发票领用',
                        //     link_name:'invoice_receipt',   
                        //     link_key:'id',
                        //     link_Field:'type',
                        // }, 
                        // {
                        //     text:'发票退还',
                        //     link_name:'invoice_returned',   
                        //     link_key:'id',
                        //     link_Field:'type',
                        // },
                        // {
                        //     text:'入库记录',
                        //     link_name:'invoice_book_add_record',   
                        //     link_key:'id',
                        //     link_Field:'type',
                        // },
                        // {
                        //     text:'领用记录',
                        //     link_name:'invoice_receipt_record',   
                        //     link_key:'id',
                        //     link_Field:'type',
                        // },
                        // {
                        //     text:'退还记录',
                        //     link_name:'invoice_returned_record',   
                        //     link_key:'id',
                        //     link_Field:'type',
                        // }
                    ]
                }
            }
        }
        

    }
</script>
<style scoped>
    .right_content .table_box tbody>tr:nth-child(odd) td:nth-child(1){
        background: none;
    }
</style>