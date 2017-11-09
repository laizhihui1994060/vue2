<template>
    <div class='tenant'>
         <vue-table
            item-url="client:/tenant/list"
            :table-iteration-field="tableIterationField"
            :linkBtn="linkBtn"
            type='post'
            ref='table'
            :params='params'
            :filter-btns='filterBtns'
            :isExportExcel='false'
            :isQuickSearch='false'
            :startEndCalss='startEndCalss'
            @updataChosen='updataChosen'
            />
        <tenantInformation :sysTenantRegId='sysTenantRegId'></tenantInformation>
    </div>
</template>
 
<script>

import tenantInformation from '../modal/tenantInformation.vue'
import vueTable from '../../../../../common_component/vue-table.vue'


    export default{
        data(){
            return {
                res:{},
                all: 0,
                items:[],
                pageIndex:1,
                sysTenantRegId:'',


                startEndCalss:{
                    start:'startRegisterDate',
                    end:'endRegisterDate'
                },
                params:{
                    pageSize:10,
                    pageIndex:1
                },
                filterBtns:[
                    {
                        title: '租户类型',
                        hasAll: true,
                        name: 'sysTenantType',
                        arr: [ { name: '救援服务商', code: 'VENDOR' }, { name: '客户', code: 'CUSTOMER' }, { name: '联合体', code: 'UNION' } ],
                        filter: 'name',
                        filterName: 'code',
                    },
                   
                    {
                        title:'审核状态',
                        hasAll: true,
                        name:'status',
                        arr: [ { name: '等待审核', code: 'PENDING' }, { name: '已经审核', code: 'APPROVED' }, { name: '拒绝', code: 'REJECTED' } ],
                        filter:"name",
                        filterName: 'code'
                    },
                    {
                        title:'是否平台可见',
                        hasAll: true,
                        arr: [ { name: '平台可见', code: 'true' }, { name: '平台不可见', code: 'false' }],
                        name:'isPublic',
                        filter:"name",
                        filterName: 'code'
                    } 
                ],
                tableIterationField:[
                    {
                        tr:'注册时间',
                        field:'registerDate',
                        filter: 'date'
                    },
                    {
                        tr:'审核代码',
                        field:'code',
                    },
                    {
                        tr:'姓名',
                        field:'adminName',
                    },
                    {
                        tr:'手机号码',
                        field:'adminMobile',
                    },
                    {
                        tr:'联系电话',
                        field:'contact',
                    },
                    {
                        tr:'企业名称',
                        field:'name',
                    },
                    {
                        tr:'企业地址',
                        field:'address',
                        filter: 'tooltip'
                    },
                    {
                        tr:'租户类型',
                        field:'sysTenantType',
                        filter: 'toSysTenantType'
                    },
                    {
                        tr:'审核状态',
                        field:'status',
                        filter: 'toSysTenantStatus'
                    }
                ],
                linkBtn:[
                    {
                        text:'查看',
                        fn:function(self, key, value, item_index,item){
                            self.$emit('updataChosen', item);
                            $('#tenantInformation').modal('show');
                        }
                    }
                ]
            }
        }, 
        methods: {
            updataChosen(item){
                console.log(item);
                this.sysTenantRegId = item.sysTenantRegId
            },
            send(param){
                this.$refs.table.watchDataForm();
            }
        },
        components:{
            vueTable,
            tenantInformation,
        },
        created(){
            const param = {
                pageIndex: this.pageIndex,
                pageSize:10
            }
        }
    }
</script>

<style>
    .tenant table td button{
        width: 70px;
    }
</style>