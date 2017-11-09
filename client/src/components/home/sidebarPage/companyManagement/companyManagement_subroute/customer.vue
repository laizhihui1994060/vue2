<template>
    <vue-table
        :filter-btns="filterBtns"
        :filter-input="filterInput"
        item-url="client:/partner/customer/list"
        type='post'
        :params='params'
        :isTime='false'
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
                        title:'客户类型',
                        name:'companyType',
                        filter:"desc",
                        filterName: 'code',
                        url: 'control:/sys/param/org',
                        method: 'post',
                        params: [ '/customer/customer_types' ],
                        hasAll: true
                    },
                    
                    {
                        title:'客户状态',
                        name:'customerCoorperationStatus',
                        filter:"name",
                        filterName: 'code',
                        hasAll: true,
                        arr: [ { name: '跟进中', code: 'FOLLOWING' }, { name: '已经合作或签约', code: 'UNDER_CONTRACT' },  { name: '未合作', code: 'NONE' }, { name: '停止合作', code: 'STOP' } ]
                    },
                    {
                        title:'归属员工',
                        hasAll: true,
                        name:'hrEmployeeIdOwner',
                        url: 'client:/helper/emp',
                        method:'post',
                        filter: 'empName',
                        filterName: 'empId'
                    },
                    {
                        title:'结算方式',
                        hasAll: true,
                        url:'control:/sys/param/org',
                        method:'post',
                        params:[ '/order/settle_method' ],
                        filter:"desc",
                        filterName:'code',
                        name:"settlementMethod" 
                    },
                ],
                filterInput:[
                    {
                        url: "client:/search",
                        name:"param",
                        label:'客户名称',
                        flag: "CUSTOMER"
                    }
                ],
             
                tableIterationField:[
                    {
                        tr:'客户名称',
                        field:'name',
                        link: {
                            link_name: 'customer_add', 
                            link_key:"chosen",
                            link_Field:'sysPartnerId',
                            isCreate: false
                        }
                    },
                    {
                        tr:'客户全称',
                        field:'fullName',   
                    }, 
                    {
                        tr:'客户类型',
                        field:'companyType',   
                        filter: 'companyType'
                    }, 
                    {
                        tr:'客户状态',
                        field:'customerCoorperationStatus',
                        filter: 'customerCoorperationStatus'
                    },
                    {
                        tr:'结算方式',
                        field:'settlementMethod',
                        filter: 'settleMethod',
                    },
                    {
                        tr:'归属人员',
                        field:'append.empName',
                        filter: 'obj',
                        link: {
                            link_name: 'employee_add', 
                            link_key:"chosen",
                            link_Field:'hrEmployeeIdOwner',
                            isCreate: false
                        }
                    },
                    {
                        tr:'公司地址',
                        field:'address',
                        filter: 'tooltip'
                    }
                ],
                linkBtn:[

                ],
                addBtns:[
                    {
                        text:'+添加新客户',
                        link_name:'customer_add',   //路由名字
                        link_key:"chosen",
                        link_Field:'{}',
                        isCreate: true,
                    },
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