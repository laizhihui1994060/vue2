<template>
    <div class='registerAudit'>
        <div class='table' style="margin-top:40px;">
            <vue-table
                style='float:left'
                item-url="client:/regtenant/list"
                :table-iteration-field="tableIterationField"
                :linkBtn="linkBtn"
                type='post'
                ref='table'
                :filtrationCondition="false"
                @updataChosen='updataChosen'
                />
        </div>
        <register-audit-model :sysTenantRegId="sysTenantRegId" @update="send"/>
    </div>
</template>
 
<script>

import registerAuditModel from '../modal/registerAudit_model.vue'
import vueTable from '../../../../../common_component/vue-table.vue'
    export default{
        data(){
            return {
                res:{},
                items:[],
                sysTenantRegId:'',


                tableIterationField:[
                    {
                        tr:'注册时间',
                        field:'registerDate',
                        filter: 'date'
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
                        tr:'企业域名',
                        field:'domain',
                    },
                    {
                        tr:'企业地址',
                        field:'address',
                        filter: 'tooltip'
                    }
                ],
                linkBtn:[
                    {
                        text:'操作',
                        fn:function(self, key, value, item_index,item){
                            self.$emit('updataChosen', item);
                            $('#registerAuditModel').modal('show');
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
            send(){
                this.$refs.table.watchDataForm();
            }
        },
        components:{
            registerAuditModel,
            vueTable
        }
    }
</script>

<style>

    .registerAudit table td button{
        width: 70px
    }
</style>